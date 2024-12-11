import { FormInternSchema, FormInternType, FormJobSchema, FormJobType, FormPatnerSchema, FormPatnerType } from '@/lib/validation/schema-form-career';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useState } from 'react';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { ZodType } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form } from '@/components/ui/form';
import FileInput from '@/components/common/FileInput';
import TextInput from '@/components/common/TextInput';

type FormProps<T> = {
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => void;
  title: string;
  loading: boolean;
  description: string;
  fields: React.FC;
  triggerText: string;
  colorHeader: string;
};

const FormComponent = <T extends FieldValues>({
  schema,
  colorHeader,
  defaultValues,
  loading,
  onSubmit,
  title,
  description,
  fields: Fields,
  triggerText,
}: FormProps<T>) => {
  const [open, setOpen] = useState(false);
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = (data: T) => {
    onSubmit(data);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-auto self-center" disabled={loading} style={{ backgroundColor: `#${colorHeader}` }}>
          {`${loading ? 'Submit...' : triggerText}`}
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-3xl lg:max-w-4xl max-h-[98%] overflow-y-auto p-0 border-0 text-inherit">
        <DialogHeader style={{ backgroundColor: `#${colorHeader}` }} className="p-6 text-white">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-white">{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col justify-center px-6 pb-6">
            <div className="grid grid-cols-2 gap-4">
              <Fields />
            </div>
            <Button type="submit" disabled={loading} className={`mt-4 self-center`} style={{ backgroundColor: `#${colorHeader}` }}>
              {`${loading ? 'Submit...' : 'Submit'}`}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const PatnerFields: React.FC = memo(() => (
  <>
    <TextInput<FormPatnerType> name="name" placeholder="Name" label="Name" isRequired className="col-span-1" />
    <TextInput<FormPatnerType> name="companyName" placeholder="Company Name" label="Company Name" isRequired className="col-span-1" />
    <TextInput<FormPatnerType> name="phone" placeholder="e.g., +123 456 7890" label="Phone" isRequired className="col-span-1" />
    <TextInput<FormPatnerType> name="email" placeholder="e.g., example@example.com" label="Email" isRequired className="col-span-1" />
    <FileInput<FormPatnerType> name="coverLetter" label="Cover Letter" accept="application/pdf" isRequired className="col-span-2" />
    <TextInput<FormPatnerType> name="message" placeholder="Message" label="Message" type="textarea" isRequired className="col-span-2" />
  </>
));

const JobFields: React.FC = memo(() => (
  <>
    <TextInput<FormJobType> name="name" placeholder="Name" label="Name" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="phone" placeholder="e.g., +123 456 7890" label="Phone" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="email" placeholder="e.g., example@example.com" label="Email" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="lastEducation" placeholder="Last Education" label="Last Education" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="collegePlace" placeholder="College Place" label="College Place" isRequired className="col-span-2" />
    <FileInput<FormJobType> name="cv" label="CV" accept="application/pdf" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="desirablePosition" placeholder="Desirable Position" label="Desirable Position" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="coverLetter" placeholder="Cover Letter" label="Cover Letter" type="textarea" isRequired className="col-span-2" />
  </>
));

const InternFields: React.FC = memo(() => (
  <>
    <TextInput<FormInternType> name="name" placeholder="Name" label="Name" isRequired className="col-span-1" />
    <TextInput<FormInternType> name="phone" placeholder="e.g., +123 456 7890" label="Phone" isRequired className="col-span-1" />
    <TextInput<FormInternType> name="email" placeholder="e.g., example@example.com" label="Email" isRequired className="col-span-1" />
    <TextInput<FormInternType> name="currentCollege" placeholder="Current College" label="Current College" isRequired className="col-span-1" />
    <TextInput<FormInternType> name="collegePlace" placeholder="College Place" label="College Place" isRequired className="col-span-1" />
    <TextInput<FormInternType> name="gpa" placeholder="e.g., 4.00" label="GPA" isRequired className="col-span-1" />
    <TextInput<FormInternType>
      name="desirablePosition"
      placeholder="Desirable Position"
      label="Desirable Position"
      isRequired
      className="col-span-1"
    />
    <FileInput<FormInternType> name="cv" label="CV" accept="application/pdf" isRequired className="col-span-1" />
    <TextInput<FormInternType> name="coverLetter" placeholder="Cover Letter" label="Cover Letter" type="textarea" isRequired className="col-span-2" />
  </>
));

PatnerFields.displayName = 'PatnerFields';
JobFields.displayName = 'JobFields';
InternFields.displayName = 'InternFields';

type FormOmittedProps = 'schema' | 'defaultValues' | 'title' | 'description' | 'fields' | 'triggerText';

export const FormPatner = (props: Omit<FormProps<FormPatnerType>, FormOmittedProps>) => (
  <FormComponent
    schema={FormPatnerSchema}
    loading={props.loading}
    defaultValues={{ name: '', phone: '', email: '', companyName: '', coverLetter: new File([], '', { type: 'application/pdf ' }), message: '' }}
    onSubmit={props.onSubmit}
    title="Partnership"
    description="Complete your details below, then click submit."
    fields={PatnerFields}
    triggerText="Contact Us"
    colorHeader={props.colorHeader}
  />
);

export const FormJob = (props: Omit<FormProps<FormJobType>, FormOmittedProps>) => (
  <FormComponent
    schema={FormJobSchema}
    defaultValues={{
      name: '',
      lastEducation: '',
      phone: '',
      email: '',
      desirablePosition: '',
      collegePlace: '',
      coverLetter: '',
      cv: new File([], '', { type: 'application/pdf' }),
    }}
    loading={props.loading}
    onSubmit={props.onSubmit}
    title="Job Application"
    description="Complete your details below, then click submit."
    fields={JobFields}
    triggerText="Apply Now"
    colorHeader={props.colorHeader}
  />
);

export const FormIntern = (props: Omit<FormProps<FormInternType>, FormOmittedProps>) => (
  <FormComponent
    schema={FormInternSchema}
    defaultValues={{
      name: '',
      currentCollege: '',
      phone: '',
      email: '',
      desirablePosition: '',
      collegePlace: '',
      gpa: '',
      coverLetter: '',
      cv: new File([], '', { type: 'application/pdf' }),
    }}
    loading={props.loading}
    onSubmit={props.onSubmit}
    title="Internship Application"
    description="Complete your details below, then click submit."
    fields={InternFields}
    triggerText="Apply Now"
    colorHeader={props.colorHeader}
  />
);
