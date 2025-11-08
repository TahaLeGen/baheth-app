// import { pgTable, serial, varchar, text, boolean, integer, decimal } from "drizzle-orm/pg-core";
// import { providers } from "./providers";

// export const equipments = pgTable("equipments", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }).notNull(),
//   provider_id: integer("provider_id")
//     .references(() => providers.id)
//     .notNull(),
//   description: text("description"),
//   availability: boolean("availability").default(true).notNull(),
//   pricing_type: varchar("pricing_type", { length: 10 }).notNull(), // hour/day
//   price_per_unit: decimal("price_per_unit", { precision: 10, scale: 2 }).notNull(),
//   experiment_duration: integer("experiment_duration"), // en minutes ou heures selon pricing_type
//   location: text("location"),
// });
