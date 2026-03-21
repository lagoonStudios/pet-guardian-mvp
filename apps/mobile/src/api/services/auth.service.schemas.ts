import { z } from 'zod';

export const signInDtoSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const signUpDtoSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
