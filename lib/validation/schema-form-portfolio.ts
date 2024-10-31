import { z } from 'zod';

const validationFormPortfolio = z.object({
  companyName: z.string().min(5, { message: 'Company name must be at least 5 characters' }),
  country: z.string().min(1, { message: 'Company name must be at least 1 characters' }),
  description: z.string().min(10, { message: 'Company name must be at least 10 characters' }),
  companyLogo: z.string().optional(),
});

export type TypePortfolio = z.infer<typeof validationFormPortfolio>;

export default validationFormPortfolio;
