import { z } from 'zod';

const BlogSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: 'Title must be at least 5 characters.',
    })
    .max(255, {
      message: 'Title must be less than 255 characters.',
    }),
  author: z.string().min(5, {
    message: 'Author must be at least 5 characters.',
  }),
  resume: z.string().min(5, {
    message: 'Resume must be at least 5 characters.',
  }),
  article: z.string().min(100, {
    message: 'Article must be at least 100 characters.',
  }),
  category: z.string({ required_error: 'Please select an category for your blog' }),
  cover: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .refine(
      (file) => {
        if (typeof file === 'string') return true;
        return file instanceof File && file.size <= 3 * 1024 * 1024;
      },
      {
        message: 'Input must be a File or URL and less than 3MB',
      }
    ),
});

export type BlogType = z.infer<typeof BlogSchema>;

export default BlogSchema;
