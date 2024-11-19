import { FormInternSchema, FormInternType, FormJobSchema, FormJobType, FormPatnerSchema, FormPatnerType } from '@/lib/validation/schema-form-career';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { ZodType } from 'zod';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form } from '../ui/form';
import FileInput from './FileInput';
import TextInput from './TextInput';

type FormProps<T> = {
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => void;
  title: string;
  description: string;
  fields: React.FC;
  triggerText: string;
};

const FormComponent = <T extends FieldValues>({ schema, defaultValues, onSubmit, title, description, fields: Fields, triggerText }: FormProps<T>) => {
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
        <Button className="mt-auto self-center">{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90%] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <Fields /> {/* Render the memoized field component */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const PatnerFields: React.FC = React.memo(() => (
  <>
    <TextInput<FormPatnerType> name="name" placeholder="Name" label="Name" isRequired />
    <TextInput<FormPatnerType> name="companyName" placeholder="Company Name" label="Company Name" isRequired />
    <TextInput<FormPatnerType> name="phone" placeholder="Phone" label="Phone" isRequired />
    <TextInput<FormPatnerType> name="email" placeholder="Email" label="Email" isRequired />
    <FileInput<FormPatnerType> name="coverLetter" label="Cover Letter" accept="application/pdf" isRequired />
    <TextInput<FormPatnerType> name="message" placeholder="Message" label="Message" type="textarea" isRequired />
  </>
));

const JobFields: React.FC = React.memo(() => (
  <>
    <TextInput<FormJobType> name="name" placeholder="Name" label="Name" isRequired />
    <TextInput<FormJobType> name="phone" placeholder="Phone" label="Phone" isRequired />
    <TextInput<FormJobType> name="email" placeholder="Email" label="Email" isRequired />
    <TextInput<FormJobType> name="lastEducation" placeholder="Last Education" label="Last Education" isRequired />
    <TextInput<FormJobType> name="collegePlace" placeholder="College Place" label="College Place" isRequired />
    <FileInput<FormJobType> name="cv" label="CV" accept="application/pdf" isRequired />
    <TextInput<FormJobType> name="desirablePosition" placeholder="Desirable Position" label="Desirable Position" isRequired />
    <TextInput<FormJobType> name="coverLetter" placeholder="Cover Letter" label="Cover Letter" type="textarea" isRequired />
  </>
));

const InternFields: React.FC = React.memo(() => (
  <>
    <TextInput<FormInternType> name="name" placeholder="Name" label="Name" isRequired />
    <TextInput<FormInternType> name="phone" placeholder="Phone" label="Phone" isRequired />
    <TextInput<FormInternType> name="email" placeholder="Email" label="Email" isRequired />
    <TextInput<FormInternType> name="currentCollege" placeholder="Current College" label="Current College" isRequired />
    <TextInput<FormInternType> name="collegePlace" placeholder="College Place" label="College Place" isRequired />
    <TextInput<FormInternType> name="gpa" placeholder="GPA" label="GPA" isRequired />
    <TextInput<FormInternType> name="desirablePosition" placeholder="Desirable Position" label="Desirable Position" isRequired />
    <FileInput<FormInternType> name="cv" label="CV" accept="application/pdf" isRequired />
    <TextInput<FormInternType> name="coverLetter" placeholder="Cover Letter" label="Cover Letter" type="textarea" isRequired />
  </>
));

PatnerFields.displayName = 'PatnerFields';
JobFields.displayName = 'JobFields';
InternFields.displayName = 'InternFields';

export const FormPatner = (
  props: Omit<FormProps<FormPatnerType>, 'schema' | 'defaultValues' | 'title' | 'description' | 'fields' | 'triggerText'>
) => (
  <FormComponent
    schema={FormPatnerSchema}
    defaultValues={{ name: '', phone: '', email: '', companyName: '', coverLetter: new File([], '', { type: 'application/pdf ' }), message: '' }}
    onSubmit={props.onSubmit}
    title="Partnership"
    description="Complete your details below, then click submit."
    fields={PatnerFields}
    triggerText="Contact Us"
  />
);

export const FormJob = (props: Omit<FormProps<FormJobType>, 'schema' | 'defaultValues' | 'title' | 'description' | 'fields' | 'triggerText'>) => (
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
    onSubmit={props.onSubmit}
    title="Job Application"
    description="Complete your details below, then click submit."
    fields={JobFields}
    triggerText="Apply Now"
  />
);

export const FormIntern = (
  props: Omit<FormProps<FormInternType>, 'schema' | 'defaultValues' | 'title' | 'description' | 'fields' | 'triggerText'>
) => (
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
    onSubmit={props.onSubmit}
    title="Internship Application"
    description="Complete your details below, then click submit."
    fields={InternFields}
    triggerText="Apply Now"
  />
);
