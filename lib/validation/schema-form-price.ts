import { z } from "zod";

const PriceServiceSchema = z.object({
  id: z.number(),
  serviceName: z.string().min(1, { message: 'Service name must be at least 1 character' }),
  code: z.string().min(1, { message: 'Code must be at least 1 character' }),
  fee: z.string().regex(/^\d+$/, { message: 'Fee must be a numeric string' }),
});

export type TypePriceService = z.infer<typeof PriceServiceSchema>;

export default PriceServiceSchema;