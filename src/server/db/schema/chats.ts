// import { pgTable, serial, integer } from "drizzle-orm/pg-core";
// import { bookings } from "./bookings";
// import { users } from "./users";

// export const chats = pgTable("chats", {
//   id: serial("id").primaryKey(),
//   booking_id: integer("booking_id")
//     .references(() => bookings.id)
//     .notNull(),
//   researcher_id: integer("researcher_id")
//     .references(() => users.user_id)
//     .notNull(),
//   provider_id: integer("provider_id")
//     .references(() => users.user_id)
//     .notNull(),
// });
