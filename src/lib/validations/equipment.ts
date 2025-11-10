import { z } from 'zod';

// Equipment validation schemas
export const createEquipmentSchema = z.object({
  name: z.string().min(1, 'Equipment name is required').max(255),
  description: z.string().optional(),
  image: z.string().url().optional().or(z.literal('')),
  pricing: z.number().min(0, 'Pricing must be a positive number'),
  location: z.string().min(1, 'Location is required').max(255),
  availability: z.boolean().optional().default(true),
  categoryIds: z.array(z.string().uuid()).optional(),
});

export const updateEquipmentSchema = z.object({
  name: z.string().min(1, 'Equipment name is required').max(255).optional(),
  description: z.string().optional(),
  image: z.string().url().optional().or(z.literal('')),
  pricing: z.number().min(0, 'Pricing must be a positive number').optional(),
  location: z.string().min(1, 'Location is required').max(255).optional(),
  availability: z.boolean().optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
});

// Category validation schemas
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(255),
  image: z.string().url().optional().or(z.literal('')),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(255).optional(),
  image: z.string().url().optional().or(z.literal('')),
});

export type CreateEquipmentInput = z.infer<typeof createEquipmentSchema>;
export type UpdateEquipmentInput = z.infer<typeof updateEquipmentSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
