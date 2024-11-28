import ReviewSchema, { ReviewType } from '@/lib/validation/schema-form-review';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import Modal from './Modal';
import TextInput from './TextInput';

type Props = {
  data?: ReviewType;
  onSubmit: (data: ReviewType) => void;
  title: string;
  description: string;
  trigger: React.ReactNode;
};

const ReviewForm: React.FC<Props> = ({ data, onSubmit, title, description, trigger }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<ReviewType>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: data || {
      company: '',
      name: '',
      review: '',
    },
  });

  const handleSubmit = (data: ReviewType) => {
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
      contentStyle="max-w-[90vw] max-h-[95vh] md:max-w-[50vw] md:max-h-[90vh] overflow-y-auto"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput<ReviewType> name="name" placeholder="Name" label="Name" isRequired className="col-span-1" />
          <TextInput<ReviewType> name="company" placeholder="Company" label="Company" isRequired className="col-span-1" />
          <TextInput<ReviewType> name="review" placeholder="Review" label="Review" type="textarea" className="col-span-2" isRequired />
          <div className="col-span-2 flex justify-end">
            <Button type="submit" className="px-28">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ReviewForm;
