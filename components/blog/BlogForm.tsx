import BlogSchema, { BlogType } from '@/lib/validation/schema-form-blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import DropdownInput from '@/components/common/DropdownInput';
import FileInput from '@/components/common/FileInput';
import Modal from '@/components/common/Modal';
import TextEditorInput from '@/components/common/TextEditorInput';
import TextInput from '@/components/common/TextInput';
import { categories } from '@/lib/data/categories';

type Props = {
  data?: BlogType;
  onSubmit: (data: BlogType) => void;
  title: string;
  description: string;
  trigger: React.ReactNode;
};

const BlogForm: React.FC<Props> = ({ data, onSubmit, title, description, trigger }) => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<BlogType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: data || {
      title: '',
      author: '',
      resume: '',
      article: '',
      category: '',
      cover: undefined as unknown as File,
    },
  });

  const handleSubmit = (data: BlogType) => {
    onSubmit(data);
    setOpen(false);
    form.reset();
  };

  useEffect(() => {
    if (data) {
      form.reset({ ...data });
    }
  }, [data, form]);

  return (
    <Modal
      trigger={trigger}
      title={title}
      description={description}
      open={open}
      onOpenChange={setOpen}
      contentStyle='className="max-w-[90vw] max-h-[95vh] md:max-w-[80vw] md:max-h-[90vh] overflow-y-auto'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput<BlogType> label="Title" name="title" placeholder="Title" className="col-span-2" isRequired />
          <FileInput<BlogType> label="Cover" name="cover" className="col-span-2" defaultImageUrl={data?.cover as string} isRequired />
          <TextInput<BlogType> label="Author" name="author" placeholder="Author" className="col-span-1" isRequired />
          <DropdownInput<BlogType>
            label="Category"
            name="category"
            className="col-span-1"
            data={categories}
            placeholder="Select a category"
            isRequired
          />
          <TextInput<BlogType> label="Resume" name="resume" placeholder="Resume" type="textarea" className="col-span-2" isRequired />
          <TextEditorInput<BlogType> label="Article" name="article" placeholder="Write your article here..." isRequired />
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

export default memo(BlogForm);
