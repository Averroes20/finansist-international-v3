import { z } from 'zod';

// Validation schema for user registration
const validationRegister = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(100, { message: 'Name must be less than 100 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }).max(100, { message: 'Email must be less than 100 characters' }),
  role: z.string().min(2, { message: 'Role must be at least 2 characters' }).max(50, { message: 'Role must be less than 50 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(50, { message: 'Password must be less than 50 characters' }),
});

// Validation schema for editing user
const validationEditUser = z.object({
  id: z.number(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(100, { message: 'Name must be less than 100 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }).max(100, { message: 'Email must be less than 100 characters' }),
  role: z.string().min(2, { message: 'Role must be at least 2 characters' }).max(50, { message: 'Role must be less than 50 characters' }),
});

// Validation schema for changing password
const validationChangePassword = z
  .object({
    id: z.number(),
    currentPassword: z
      .string()
      .min(6, { message: 'Current password must be at least 6 characters.' })
      .max(50, { message: 'Current password must be less than 50 characters' }),
    newPassword: z
      .string()
      .min(6, { message: 'New password must be at least 6 characters.' })
      .max(50, { message: 'New password must be less than 50 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password must be at least 6 characters.' })
      .max(50, { message: 'Confirm password must be less than 50 characters' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password must match.',
    path: ['confirmPassword'],
  });

// Export types
export type TypeRegister = z.infer<typeof validationRegister>;
export type TypeEditUser = z.infer<typeof validationEditUser>;
export type TypeChangePassword = z.infer<typeof validationChangePassword>;

// Export schemas
export { validationRegister, validationEditUser, validationChangePassword };
