import { z } from 'zod';

const UrlSchema = z.string().url();

export { UrlSchema };
