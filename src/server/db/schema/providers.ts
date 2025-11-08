// import { pgTable, serial, integer, varchar, text } from "drizzle-orm/pg-core";
// import { users } from "./users";

// export const providers = pgTable("providers", {
//   id: serial("id").primaryKey(),
//   user_id: integer("user_id")
//     .references(() => users.user_id)
//     .notNull(),
//   location: text("location").notNull(),
// });
