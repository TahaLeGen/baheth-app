import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 50 }).notNull(), // Researcher, Provider, Admin
  password: varchar("password", { length: 255 }).notNull(),
  organization: varchar("organization", { length: 255 }),
  phone_number: varchar("phone_number", { length: 20 }),
});
