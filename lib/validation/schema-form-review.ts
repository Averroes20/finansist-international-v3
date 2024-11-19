import { z } from 'zod';

const ReviewSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  company: z.string().min(2, { message: 'Company must be at least 2 characters' }),
  review: z.string().min(10, { message: 'Review must be at least 10 characters' }),
});

export type ReviewType = z.infer<typeof ReviewSchema>;

export default ReviewSchema;
