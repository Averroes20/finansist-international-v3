'use client';

import PriceServiceSchema, { TypePriceService } from '@/lib/validation/schema-form-price';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../common/Modal';
import { Form } from '../ui/form';
import TextInput from '../common/TextInput';
import { Button } from '../ui/button';
import ButtonSwitch from '../common/ButtonSwitch';

type Props = {
  data: TypePriceService;
  onSubmit: (data: TypePriceService) => void;
  title: string;
  description: string;
  trigger: React.ReactNode;
};

const PriceServiceForm: React.FC<Props> = ({ data, onSubmit, title, description, trigger }) => {
  const [open, setOpen] = useState(false)
  const form = useForm<TypePriceService>({
    resolver: zodResolver(PriceServiceSchema),
    defaultValues: data
  });

  const handleSubmit = (data: TypePriceService) => {
    onSubmit(data);
    setOpen(false);
  }

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  return (
    <Modal trigger={trigger} title={title} description={description} open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <TextInput<TypePriceService> name="serviceName" disabled placeholder="Enter service name.." label="Service Name" isRequired />
          <TextInput<TypePriceService> name="fee" placeholder="Enter fee service.." label="Fee Service" isRequired />
          {/* <TextInput<TypePriceService> name="annual_fee" placeholder="Enter fee service.." label="Annual Fee Service" isRequired /> */}
          <ButtonSwitch<TypePriceService> name="is_discount" label="Active Icon Discount" isRequired />
          {/* <TextInput<TypePriceService> name="code" disabled placeholder="Enter code price.." label="Code" isRequired /> */}
          <div className="col-span-2 flex justify-center">
            <Button type="submit" className="px-28">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}

export default PriceServiceForm