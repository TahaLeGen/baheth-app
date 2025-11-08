// import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
// import { users } from "./users";
// import { bookings } from "./bookings";

// export const notifications = pgTable("notifications", {
//   id: serial("id").primaryKey(),
//   user_id: integer("user_id")
//     .references(() => users.user_id)
//     .notNull(),
//   booking_id: integer("booking_id")
//     .references(() => bookings.id),
//   status_id: integer("status_id"), // lier à booking_statuses si nécessaire
//   message: text("message").notNull(),
//   date: timestamp("date").defaultNow(),
// });
