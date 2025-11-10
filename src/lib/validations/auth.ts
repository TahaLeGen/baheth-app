import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['researcher', 'provider', 'admin']),
  organization: z.string().optional(),
  phoneNumber: z.string().min(8, 'Phone number must be at least 8 characters'),
}).refine((data) => {
  // Organization is required for providers
  if (data.role === 'provider' && !data.organization) {
    return false;
  }
  return true;
}, {
  message: 'Organization is required for providers',
  path: ['organization'],
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
