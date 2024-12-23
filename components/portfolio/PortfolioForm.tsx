import { software } from '@/lib/data/intro';
import PortfolioSchema, { PortfolioType } from '@/lib/validation/schema-form-portfolio';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FileInput from '@/components/common/FileInput';
import Modal from '@/components/common/Modal';
import MultiSelectInput from '@/components/common/MultiSelectInput';
import TextInput from '@/components/common/TextInput';

type Props = {
  data?: PortfolioType;
  onSubmit: (data: PortfolioType) => void;
  title: string;
  description: string;
  trigger: React.ReactNode;
};

const PortfolioForm: React.FC<Props> = ({ data, onSubmit, title, description, trigger }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<PortfolioType>({
    resolver: zodResolver(PortfolioSchema),
    defaultValues: data || {
      companyName: '',
      country: '',
      description: '',
      software: [],
      companyLogo: undefined as unknown as File,
    },
  });

  const handleSubmit = (data: PortfolioType) => {
    onSubmit(data);
    setOpen(false);
    form.reset();
  };

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  return (
    <Modal
      trigger={trigger}
      title={title}
      description={description}
      open={open}
      onOpenChange={setOpen}
      contentStyle='className="max-w-[90vw] max-h-[95vh] md:max-w-[50vw] md:max-h-[90vh] overflow-y-auto'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput<PortfolioType> label="Company Name" name="companyName" placeholder="Company Name" className="col-span-2" />
          <FileInput<PortfolioType>
            label="Company Logo"
            name="companyLogo"
            className="col-span-2"
            defaultImageUrl={data?.companyLogo as string}
            isRequired
          />
          <MultiSelectInput<PortfolioType> label="Sofrtware" name="software" placeholder="Sofrtware" options={software} className="col-span-2" />
          <TextInput<PortfolioType> label="Country" name="country" placeholder="Country" className="col-span-2" />
          <TextInput<PortfolioType> label="Description" name="description" placeholder="Description" type="textarea" className="col-span-2" />
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

export default memo(PortfolioForm);
