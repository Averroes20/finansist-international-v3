import validationFormPortfolio, { TypePortfolio } from '@/lib/validation/schema-form-portfolio';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import TextInput from './TextInput';
import FileInput from './FileInput';

type Props = {
  data?: TypePortfolio;
  onSubmit: (data: TypePortfolio) => void;
  title: string;
  description: string;
  trigger: React.ReactNode;
};

const PortfolioForm: React.FC<Props> = ({ data, onSubmit, title, description, trigger }) => {
  const form = useForm<TypePortfolio>({
    resolver: zodResolver(validationFormPortfolio),
    defaultValues: data || {
      companyName: '',
      country: '',
      description: '',
      companyLogo: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[95vh] md:max-w-[50vw] md:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput<TypePortfolio> label="Company Name" name="companyName" placeholder="Company Name" className="col-span-2" />
            <FileInput<TypePortfolio> label="Company Logo" name="companyLogo" className="col-span-2" />
            <TextInput<TypePortfolio> label="Country" name="country" placeholder="Country" className="col-span-2" />
            <TextInput<TypePortfolio> label="description" name="description" placeholder="Description" type="textarea" className="col-span-2" />
            <div className="col-span-2 flex justify-center">
              <Button type="submit" className="px-28">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(PortfolioForm);
