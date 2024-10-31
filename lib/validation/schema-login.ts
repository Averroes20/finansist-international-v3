import { z } from 'zod';

const validationLogin = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export type TypeLogin = z.infer<typeof validationLogin>;

export default validationLogin;
