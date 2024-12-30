import { z } from 'zod';

const HttpsLinkValidator = z
  .string()
  .url({ message: 'Must be a valid URL' })
  .refine(
    (value) => {
      return value.startsWith('https://') && value.length >= 1 && value.length <= 100;
    },
    {
      message: 'URL must start with https:// and be between 1 and 100 characters',
    }
  );

const LinkSchema = z.object({
  id: z.number(),
  label: z.string().min(1, { message: 'Label must be at least 1 character' }).max(20, { message: 'Label must be less than 20 characters' }),
  url: HttpsLinkValidator,
  active: z.boolean(),
});

export type TypeLink = z.infer<typeof LinkSchema>;

export default LinkSchema;
