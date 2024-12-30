import { z } from 'zod';

const allowedMimeTypes = ['application/pdf', 'application/msword'];

const FormPatnerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(7, { message: 'Phone must be at least 7 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  companyName: z.string().min(3, { message: 'Company must be at least 3 characters' }),
  coverLetter: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: 'Cover letter must not be empty',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than or equal to 5MB',
    })
    .refine((file) => allowedMimeTypes.includes(file.type), {
      message: 'Invalid file type. Only PDF or Word documents are allowed',
    }),
  message: z.string().min(5, { message: 'Message must be at least 5 characters' }),
});

const FormJobSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(7, { message: 'Phone must be at least 7 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  degree: z.string().min(3, { message: 'Degree must be at least 3 characters' }).max(50, { message: 'Degree must be at most 50 characters' }),
  university: z.string().min(3, { message: 'University place must be at least 3 characters' }),
  major: z.string().min(3, { message: 'Major place must be at least 3 characters' }).max(50, { message: 'Major must be at most 50 characters' }),
  graduationYear: z.string().regex(/^\d{4}$/, { message: 'Invalid graduation year' }),
  desirablePosition: z.string().min(5, { message: 'Desirable position must be at least 5 characters' }),
  cv: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: 'Cover letter must not be empty',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than or equal to 5MB',
    })
    .refine((file) => allowedMimeTypes.includes(file.type), {
      message: 'Invalid file type. Only PDF or Word documents are allowed',
    }),

  language: z
    .array(
      z.object({
        language: z.string().optional(),
        level: z.string().optional(),
      })
    )
    .optional(),
  coverLetter: z.string().min(5, { message: 'Cover letter must be at least 5 characters' }),
});

const FormInternSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(7, { message: 'Phone must be at least 7 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  currentUniversity: z.string().min(3, { message: 'Current university must be at least 3 characters' }),
  campusAddress: z.string().min(3, { message: 'Campus address must be at least 3 characters' }),
  gpa: z
    .string()
    .min(3, { message: 'GPA must be at least 3 characters. Example: 3.50' })
    .regex(/^[0-4]\.\d{2}$/),
  desirablePosition: z.string().min(5, { message: 'Desirable position must be at least 5 characters' }),
  cv: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: 'Cover letter must not be empty',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than or equal to 5MB',
    })
    .refine((file) => allowedMimeTypes.includes(file.type), {
      message: 'Invalid file type. Only PDF or Word documents are allowed',
    }),
  applyLatter: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: 'Application letter must not be empty',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than or equal to 5MB',
    })
    .refine((file) => allowedMimeTypes.includes(file.type), {
      message: 'Invalid file type. Only PDF or Word documents are allowed',
    }),
  coverLetter: z.string().min(5, { message: 'Cover letter must be at least 5 characters' }),
});

export type FormPatnerType = z.infer<typeof FormPatnerSchema>;
export type FormJobType = z.infer<typeof FormJobSchema>;
export type FormInternType = z.infer<typeof FormInternSchema>;

export { FormPatnerSchema, FormJobSchema, FormInternSchema };
