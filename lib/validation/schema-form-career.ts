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
  lastEducation: z.string().min(3, { message: 'Last education must be at least 3 characters' }),
  desirablePosition: z.string().min(5, { message: 'Desirable position must be at least 5 characters' }),
  collegePlace: z.string().min(3, { message: 'College place must be at least 3 characters' }),
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
  coverLetter: z.string().min(5, { message: 'Cover letter must be at least 5 characters' }),
});

const FormInternSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(7, { message: 'Phone must be at least 7 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  currentCollege: z.string().min(3, { message: 'Current college must be at least 3 characters' }),
  collegePlace: z.string().min(3, { message: 'College place must be at least 3 characters' }),
  gpa: z
    .string()
    .min(3, { message: 'GPA must be at least 3 characters. Example: 3.50' })
    .regex(/^[0-4]\.[0-9]{2}$/),
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
  coverLetter: z.string().min(5, { message: 'Cover letter must be at least 5 characters' }),
});

export type FormPatnerType = z.infer<typeof FormPatnerSchema>;
export type FormJobType = z.infer<typeof FormJobSchema>;
export type FormInternType = z.infer<typeof FormInternSchema>;

export { FormPatnerSchema, FormJobSchema, FormInternSchema };
