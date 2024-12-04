import { z } from 'zod';

const CommentSchema = z.object({
  blogId: z.number(),
  comment: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
});

export type CommentType = z.infer<typeof CommentSchema>;

export default CommentSchema;
