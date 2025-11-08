// import { pgTable, serial, integer, decimal, varchar, timestamp } from "drizzle-orm/pg-core";
// import { bookings } from "./bookings";

// export const payments = pgTable("payments", {
//   id: serial("id").primaryKey(),
//   booking_id: integer("booking_id")
//     .references(() => bookings.id)
//     .notNull(),
//   amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
//   method: varchar("method", { length: 50 }).notNull(),
//   status: varchar("status", { length: 50 }).notNull(),
//   transaction_date: timestamp("transaction_date").defaultNow(),
// });
