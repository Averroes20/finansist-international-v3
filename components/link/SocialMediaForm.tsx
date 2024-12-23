'use client';

import LinkSchema, { TypeLink } from '@/lib/validation/schema-form-link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../common/Modal';
import { Form } from '../ui/form';
import TextInput from '../common/TextInput';
import { Button } from '../ui/button';

type Props = {
  data: TypeLink;
  onSubmit: (data: TypeLink) => void;
  title: string;
  description: string;
  trigger: React.ReactNode;
};
const SocialMediaForm: React.FC<Props> = ({ data, onSubmit, title, description, trigger }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<TypeLink>({
    resolver: zodResolver(LinkSchema),
    defaultValues: data || {
      label: '',
      url: '',
    },
  });

  const handleSubmit = (data: TypeLink) => {
    onSubmit(data);
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  return (
    <Modal trigger={trigger} title={title} description={description} open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <TextInput<TypeLink> name="label" disabled placeholder="Enter your label.." label="Label" isRequired />
          <TextInput<TypeLink> name="url" placeholder="Enter your link.." label="Link" isRequired />
          <div className="col-span-2 flex justify-center">
            <Button type="submit" className="px-28">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default SocialMediaForm;
