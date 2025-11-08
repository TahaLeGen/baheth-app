// import { pgTable, serial, integer, decimal, text, timestamp , varchar } from "drizzle-orm/pg-core";
// import { providers } from "./providers";
// import { users } from "./users";
// import { equipments } from "./equipments";
// import { chats } from "./chats";

// export const bookings = pgTable("bookings", {
//   id: serial("id").primaryKey(),
//   provider_id: integer("provider_id")
//     .references(() => providers.id)
//     .notNull(),
//   researcher_id: integer("researcher_id")
//     .references(() => users.user_id)
//     .notNull(),
//   equipment_id: integer("equipment_id")
//     .references(() => equipments.id)
//     .notNull(),
//   chat_id: integer("chat_id")
//     .references(() => chats.id),
//   total_cost: decimal("total_cost", { precision: 10, scale: 2 }),
//   analysis_result_file: text("analysis_result_file"),
//   created_at: timestamp("created_at").defaultNow(),
//   updated_at: timestamp("updated_at").defaultNow(),
// });

// export const booking_statuses = pgTable("booking_statuses", {
//   id: serial("id").primaryKey(),
//   booking_id: integer("booking_id")
//     .references(() => bookings.id)
//     .notNull(),
//   status: varchar("status", { length: 100 }).notNull(), // order_confirmed, sample_sent, etc.
//   status_date: timestamp("status_date").defaultNow(),
//   changed_by: integer("changed_by") // user_id
//     .references(() => users.user_id),
//   created_at: timestamp("created_at").defaultNow(),
// });
