import { z } from 'zod';

export const PaprikaConfigSchema = z.object({
  id: z.number(),
  baseURL: z.string().url(),
  bearerToken: z.string(),
  user: z.string(),
  password: z.string(),
});

export const TokenResponseSchema = z.object({
  result: z.object({
    token: z.string(),
  }),
});
