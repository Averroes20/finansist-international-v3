import { z } from 'zod';

const PortfolioSchema = z.object({
  companyName: z.string().min(5, { message: 'Company name must be at least 5 characters' }),
  country: z.string().min(1, { message: 'Company name must be at least 1 characters' }),
  description: z.string().min(10, { message: 'Company name must be at least 10 characters' }),
  software: z.array(z.string().min(1)).optional(),
  companyLogo: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .refine((file) => typeof file === 'string' || file instanceof File, {
      message: 'Input must be a File or URL',
    }),
});

export type PortfolioType = z.infer<typeof PortfolioSchema>;

export default PortfolioSchema;
