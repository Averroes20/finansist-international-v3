import TextInput from '@/components/common/TextInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInternSchema, FormInternType, FormJobSchema, FormJobType, FormPatnerSchema, FormPatnerType } from '@/lib/validation/schema-form-career';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info, Minus, Plus } from 'lucide-react';
import { memo, useState } from 'react';
import { DefaultValues, FieldValues, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { ZodType } from 'zod';
import FileInputPDF from '../common/FileInputPDF';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

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
        <Button className="mt-auto self-center text-base py-3 px-5" disabled={loading} style={{ backgroundColor: `#${colorHeader}` }}>
          {`${loading ? 'Submit...' : triggerText}`}
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-3xl lg:max-w-6xl max-h-[98%] overflow-y-auto p-0 border-0 text-inherit">
        <DialogHeader style={{ backgroundColor: `#${colorHeader}` }} className="p-6 text-white">
          <DialogTitle className="text-base xl:text-xl text-center">{title}</DialogTitle>
          <DialogDescription className="text-white text-center">{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col justify-center px-6 pb-6">
            <div className="grid grid-cols-2 gap-4 text-base lg:py-3 xl:text-xl xl:py-4">
              <Fields />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={`mt-4 self-center text-base py-3 px-5`}
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
    <FileInputPDF<FormPatnerType> name="coverLetter" label="Cover Letter" accept="application/pdf" isRequired className="col-span-2" />
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

const JobFields: React.FC = memo(() => {
  const { control, register } = useFormContext<FormJobType>();
  const { append, remove, fields } = useFieldArray({ control, name: 'language' });

  if (fields.length === 0) {
    append({ language: '', level: '' });
  }
  return (
    <TooltipProvider>
      <TextInput<FormJobType> name="name" placeholder="Your Full Name" label="Name" isRequired className="col-span-1" />
      <TextInput<FormJobType> name="phone" placeholder="+123 456 7890" label="Phone" isRequired className="col-span-1" />
      <TextInput<FormJobType> name="email" placeholder="example@example.com" label="Email" isRequired className="col-span-1" />
      <TextInput<FormJobType> name="degree" placeholder="e.g., SMA, S1, S2, or S3" label="Latest Degree" isRequired className="col-span-1" />
      <TextInput<FormJobType> name="major" placeholder="e.g., Accounting" label="Major" isRequired className="col-span-1" />
      <TextInput<FormJobType> name="graduationYear" placeholder="e.g., 2021" label="Graduation Year" isRequired className="col-span-1" />
      <TextInput<FormJobType> name="university" placeholder="e.g., Universitas Indonesia" label="University" isRequired className="col-span-1" />
      <FileInputPDF<FormJobType> name="cv" label="CV & Supporting Documents" accept="application/pdf" multiple={true} isRequired className="col-span-1" />
      <TextInput<FormJobType> name="desirablePosition" placeholder="Accounting Staff" label="Desirable Position" isRequired className="col-span-1" />
      <div className="col-span-1">
        <label className="text-sm md:text-base font-medium mb-3 flex">
          <span className="mr-2">Language</span>{' '}
          <Tooltip>
            <TooltipTrigger type="button">
              <Info size={16} className="text-blue-500" />
            </TooltipTrigger>
            <TooltipContent className="space-y-3">
              <b>List of levels of proficiency:</b>
              <ol className="list-decimal list-inside">
                <li>Basic</li>
                <li>Conversational</li>
                <li>Fluent</li>
                <li>Native</li>
              </ol>
            </TooltipContent>
          </Tooltip>
        </label>
        {fields &&
          fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-4">
              <div className="flex gap-3">
                <Input {...register(`language.${index}.language`)} placeholder="e.g., English" className="flex-1" />
                <Input {...register(`language.${index}.level`)} placeholder="e.g., Conversational" className="flex-1" />
              </div>
              <button
                onClick={() => remove(index)}
                type="button"
                disabled={fields.length === 1}
                className={`p-3 bg-red-500 text-white rounded-full ${fields.length === 1 ? 'opacity-50 text-black' : ''}`}
              >
                <Minus size={16} />
              </button>
              <button onClick={() => append({ language: '', level: '' })} type="button" className="p-3 bg-green-500 text-white rounded-full">
                <Plus size={16} />
              </button>
            </div>
          ))}
      </div>
      <TextInput<FormJobType>
        name="coverLetter"
        placeholder="Please fill in your cover letter here..."
        label="Cover Letter"
        type="textarea"
        isRequired
        className="col-span-2"
      />
    </TooltipProvider>
  );
});

const InternFields: React.FC = memo(() => (
  <>
    <TextInput<FormInternType> name="name" placeholder="Your Full Name" label="Name" isRequired className="col-span-1" />
    <TextInput<FormInternType> name="phone" placeholder="+1234567890" label="Phone" isRequired className="col-span-1" />
    <TextInput<FormInternType> name="email" placeholder="example@example.com" label="Email" isRequired className="col-span-1" />
    <TextInput<FormInternType>
      name="campusAddress"
      placeholder="e.g., Jl. Lingkar, Kecamatan Beji, Kota Depok, Jawa Barat "
      label="Address University"
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
    <TextInput<FormInternType> name="gpa" placeholder="4.00" label="Latest GPA" isRequired className="col-span-1" />
    <TextInput<FormInternType> name="desirablePosition" placeholder="e.g., Accounting" label="Desirable Position" isRequired className="col-span-1" />
    <FileInputPDF<FormInternType> name="cv" label="CV" accept="application/pdf" isRequired className="col-span-1" />
    <FileInputPDF<FormInternType> name="applyLatter" label="Application Letter" accept="application/pdf" isRequired className="col-span-2" />
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

export const FormJobs = (props: Omit<FormProps<FormJobType>, FormOmittedProps>) => (
  <FormComponent
    schema={FormJobSchema}
    defaultValues={{
      name: '',
      degree: undefined,
      major: '',
      graduationYear: '',
      phone: '',
      email: '',
      desirablePosition: '',
      university: '',
      coverLetter: '',
      language: [{ language: '', level: '' }],
      cv: [],
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
      applyLatter: new File([], '', { type: 'application/pdf' }),
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
