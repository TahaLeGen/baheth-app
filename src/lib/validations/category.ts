import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, 'Category name must be at least 2 characters')
    .max(255, 'Category name must be less than 255 characters')
    .trim(),
  image: z
    .string()
    .url('Image must be a valid URL')
    .optional()
    .or(z.literal('')),
  parentId: z
    .string()
    .uuid('Invalid parent category')
    .optional()
    .nullable()
    .or(z.literal('')),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
