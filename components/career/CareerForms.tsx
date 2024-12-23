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
        <Button
          className="mt-auto self-center text-base lg:text-lg lg:py-3 xl:text-xl xl:py-4"
          disabled={loading}
          style={{ backgroundColor: `#${colorHeader}` }}
        >
          {`${loading ? 'Submit...' : triggerText}`}
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-3xl lg:max-w-6xl max-h-[98%] overflow-y-auto p-0 border-0 text-inherit">
        <DialogHeader style={{ backgroundColor: `#${colorHeader}` }} className="p-6 text-white">
          <DialogTitle className="text-base lg:text-[1rem] xl:text-xl">{title}</DialogTitle>
          <DialogDescription className="text-white">{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col justify-center px-6 pb-6">
            <div className="grid grid-cols-2 gap-4 text-base lg:text-[1rem] lg:py-3 xl:text-xl xl:py-4">
              <Fields />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={`mt-4 self-center text-base lg:text-[1rem] lg:py-3 xl:text-xl xl:py-4 `}
              style={{ backgroundColor: `#${colorHeader}` }}
            >
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
    <TextInput<FormPatnerType> name="name" placeholder="Your Full Name" label="Name" isRequired className="col-span-1" />
    <TextInput<FormPatnerType> name="companyName" placeholder="e.g., Google" label="Company Name" isRequired className="col-span-1" />
    <TextInput<FormPatnerType> name="phone" placeholder="+123 456 7890" label="Phone" isRequired className="col-span-1" />
    <TextInput<FormPatnerType> name="email" placeholder="example@example.com" label="Email" isRequired className="col-span-1" />
    <FileInput<FormPatnerType> name="coverLetter" label="Cover Letter" accept="application/pdf" isRequired className="col-span-2" />
    <TextInput<FormPatnerType>
      name="message"
      placeholder="Please fill in your purpose..."
      label="Message"
      type="textarea"
      isRequired
      className="col-span-2"
    />
  </>
));

const JobFields: React.FC = memo(() => (
  <>
    <TextInput<FormJobType> name="name" placeholder="Your Full Name" label="Name" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="phone" placeholder="+123 456 7890" label="Phone" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="email" placeholder="example@example.com" label="Email" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="degree" placeholder="e.g., Bachelor" label="Degree" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="major" placeholder="e.g., Accounting" label="Major" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="graduationYear" placeholder="e.g., 2021" label="Graduation Year" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="university" placeholder="e.g., Universitas Indonesia" label="University" isRequired className="col-span-2" />
    <FileInput<FormJobType> name="cv" label="CV" accept="application/pdf" isRequired className="col-span-1" />
    <TextInput<FormJobType> name="desirablePosition" placeholder="Accounting Staff" label="Desirable Position" isRequired className="col-span-1" />
    <TextInput<FormJobType>
      name="coverLetter"
      placeholder="Please fill in your cover letter here..."
      label="Cover Letter"
      type="textarea"
      isRequired
      className="col-span-2"
    />
  </>
));

const InternFields: React.FC = memo(() => (
  <>
    <TextInput<FormInternType> name="name" placeholder="Your Full Name" label="Name" isRequired className="col-span-1" />
    <TextInput<FormInternType> name="phone" placeholder="+1234567890" label="Phone" isRequired className="col-span-1" />
    <TextInput<FormInternType> name="email" placeholder="example@example.com" label="Email" isRequired className="col-span-1" />
    <TextInput<FormInternType>
      name="campusAddress"
      placeholder="e.g., Jl. Lingkar, Kecamatan Beji, Kota Depok, Jawa Barat "
      label="Campus Address"
      isRequired
      className="col-span-1"
    />
    <TextInput<FormInternType>
      name="currentUniversity"
      placeholder="e.g., Universitas Indonesia"
      label="Current University"
      isRequired
      className="col-span-1"
    />
    <TextInput<FormInternType> name="gpa" placeholder="4.00" label="GPA" isRequired className="col-span-1" />
    <TextInput<FormInternType> name="desirablePosition" placeholder="e.g., Accounting" label="Desirable Position" isRequired className="col-span-1" />
    <FileInput<FormInternType> name="cv" label="CV" accept="application/pdf" isRequired className="col-span-1" />
    <TextInput<FormInternType>
      name="coverLetter"
      placeholder="Please fill in your cover letter here..."
      label="Cover Letter"
      type="textarea"
      isRequired
      className="col-span-2"
    />
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
      degree: '',
      major: '',
      graduationYear: '',
      phone: '',
      email: '',
      desirablePosition: '',
      university: '',
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
      currentUniversity: '',
      phone: '',
      email: '',
      desirablePosition: '',
      campusAddress: '',
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
