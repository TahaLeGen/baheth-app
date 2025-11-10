import { pgTable, uuid, varchar, timestamp, pgEnum, text, boolean, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define the user role enum
export const userRoleEnum = pgEnum('user_role', ['researcher', 'provider', 'admin']);

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull().default('researcher'),
  organization: varchar('organization', { length: 255 }),
  phoneNumber: varchar('phone_number', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Categories table
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  parentId: uuid('parent_id').references((): any => categories.id, { onDelete: 'cascade' }),
  image: varchar('image', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Equipment table
export const equipment = pgTable('equipment', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  providerId: uuid('provider_id').notNull().references(() => users.id),
  description: text('description'),
  image: varchar('image', { length: 500 }),
  availability: boolean('availability').notNull().default(true),
  pricing: decimal('pricing', { precision: 10, scale: 2 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Equipment categories junction table (many-to-many relationship)
export const equipmentCategories = pgTable('equipment_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  equipmentId: uuid('equipment_id').notNull().references(() => equipment.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  equipment: many(equipment),
}));

export const equipmentRelations = relations(equipment, ({ one, many }) => ({
  provider: one(users, {
    fields: [equipment.providerId],
    references: [users.id],
  }),
  equipmentCategories: many(equipmentCategories),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  equipmentCategories: many(equipmentCategories),
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'categoryHierarchy',
  }),
  children: many(categories, {
    relationName: 'categoryHierarchy',
  }),
}));

export const equipmentCategoriesRelations = relations(equipmentCategories, ({ one }) => ({
  equipment: one(equipment, {
    fields: [equipmentCategories.equipmentId],
    references: [equipment.id],
  }),
  category: one(categories, {
    fields: [equipmentCategories.categoryId],
    references: [categories.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Equipment = typeof equipment.$inferSelect;
export type NewEquipment = typeof equipment.$inferInsert;

export type EquipmentCategory = typeof equipmentCategories.$inferSelect;
export type NewEquipmentCategory = typeof equipmentCategories.$inferInsert;
