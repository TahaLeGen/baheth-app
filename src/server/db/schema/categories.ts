// import { pgTable, serial, varchar, text , integer } from "drizzle-orm/pg-core";

// export const categories = pgTable("categories", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }).notNull(),
//   image: text("image"),
// });

// // Table pivot pour relation N:M Equipment <-> Category
// import { equipments } from "./equipments";

// export const equipment_categories = pgTable("equipment_categories", {
//   equipment_id: integer("equipment_id")
//     .references(() => equipments.id)
//     .notNull(),
//   category_id: integer("category_id")
//     .references(() => categories.id)
//     .notNull(),
// });
