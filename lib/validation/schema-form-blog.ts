import { z } from 'zod';

const validationFormBlog = z.object({
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
  resume: z
    .string()
    .min(5, {
      message: 'Resume must be at least 5 characters.',
    })
    .max(255, {
      message: 'Resume must be less than 255 characters.',
    }),
  article: z.string().min(100, {
    message: 'Article must be at least 100 characters.',
  }),
  category: z.string().min(5, {
    message: 'Category must be at least 5 characters.',
  }),
  cover: z.string().optional(),
});

export type TypeBlog = z.infer<typeof validationFormBlog>;

export default validationFormBlog;
