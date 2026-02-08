import { z } from 'zod';

const coordinateRegex = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*-?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

const LinkSchema = z.object({
  id: z.number(),
  key: z.string(),
  label: z.string().min(1, { message: 'Label must be at least 1 character' }).max(20, { message: 'Label must be less than 20 characters' }),
  url: z.string(),
  active: z.boolean(),
})
.superRefine((data, ctx) => {

  // ✅ kalau google maps
  if (data.key === 'address') {
    if (!coordinateRegex.test(data.url)) {
      ctx.addIssue({
        path: ['url'],
        code: z.ZodIssueCode.custom,
        message: 'Must be valid coordinates. Example: -6.200000,106.816666',
      });
    }
    return;
  }

  // ✅ selain maps → harus https
  if (!data.url.startsWith('https://')) {
    ctx.addIssue({
      path: ['url'],
      code: z.ZodIssueCode.custom,
      message: 'URL must start with https://',
    });
  }
});

export type TypeLink = z.infer<typeof LinkSchema>;

export default LinkSchema;
