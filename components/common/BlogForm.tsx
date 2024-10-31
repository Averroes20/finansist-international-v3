import validationFormBlog, { TypeBlog } from '@/lib/validation/schema-form-blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form } from '../ui/form';
import FileInput from './FileInput';
import TextEditorInput from './TextEditorInput';
import TextInput from './TextInput';

type Props = {
  data?: TypeBlog;
  onSubmit: (data: TypeBlog) => void;
  title: string;
  description: string;
  trigger: React.ReactNode;
};

const BlogForm: React.FC<Props> = ({ data, onSubmit, title, description, trigger }) => {
  const form = useForm<TypeBlog>({
    resolver: zodResolver(validationFormBlog),
    defaultValues: data || {
      title: '',
      author: '',
      resume: '',
      article: '',
      category: '',
      cover: '',
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
      <DialogContent className="max-w-[90vw] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput<TypeBlog> label="Title" name="title" placeholder="Title" className="col-span-2" />
            <FileInput<TypeBlog> label="Cover" name="cover" className="col-span-2" />
            <TextInput<TypeBlog> label="Author" name="author" placeholder="Author" className="col-span-1" />
            <TextInput<TypeBlog> label="Category" name="category" placeholder="Category" className="col-span-1" />
            <TextInput<TypeBlog> label="Resume" name="resume" placeholder="Resume" type="textarea" className="col-span-2" />
            <TextEditorInput<TypeBlog> label="Article" name="article" placeholder="Write your article here..." />
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

export default memo(BlogForm);
