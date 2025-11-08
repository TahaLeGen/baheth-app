// import { pgTable, serial, integer, text, timestamp, boolean } from "drizzle-orm/pg-core";
// import { chats } from "./chats";
// import { users } from "./users";

// export const messages = pgTable("messages", {
//   id: serial("id").primaryKey(),
//   chat_id: integer("chat_id")
//     .references(() => chats.id)
//     .notNull(),
//   sender_id: integer("sender_id")
//     .references(() => users.user_id)
//     .notNull(),
//   receiver_id: integer("receiver_id")
//     .references(() => users.user_id)
//     .notNull(),
//   content: text("content").notNull(),
//   sent_at: timestamp("sent_at").defaultNow(),
//   read_status: boolean("read_status").default(false).notNull(),
// });
