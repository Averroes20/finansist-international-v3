import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import TextInput from '@/components/common/TextInput';
import CommentSchema, { CommentType } from '@/lib/validation/schema-form-comment';

type Props = {
  onSubmit: (data: CommentType) => void;
};

const CommentForm: React.FC<Props> = ({ onSubmit }) => {
  const form = useForm<CommentType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      blogId: 0,
      name: '',
      email: '',
      comment: '',
    },
  });

  const handleSubmit = (data: CommentType) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <div className="py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput<CommentType> name="name" placeholder="Name" label="Name" isRequired className="col-span-2 md:col-span-1" />
          <TextInput<CommentType> name="email" placeholder="Email" label="Email" isRequired className="col-span-2 md:col-span-1" />
          <TextInput<CommentType> name="comment" placeholder="Comment" label="Comment" type="textarea" className="col-span-2" isRequired />
          <div className="col-span-3 md:col-span-1 md:col-start-2 flex md:justify-end">
            <Button type="submit" variant={'outline'} className="md:px-28 w-full border-green-600 hover:bg-green-600 hover:text-white">
              Post Comment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CommentForm;
