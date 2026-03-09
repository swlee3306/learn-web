import {z} from 'zod';

export const usernameSchema = z
  .string()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/, 'Use letters, numbers, underscore');

export const passwordSchema = z.string().min(6).max(100);
