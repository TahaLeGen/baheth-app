import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { users } from "./schema/users";
// import { providers } from "./schema/providers";
// import { equipments } from "./schema/equipments";
// import { categories, equipment_categories } from "./schema/categories";
// import { bookings, booking_statuses } from "./schema/bookings";
// import { chats } from "./schema/chats";
// import { messages } from "./schema/messages";
// import { notifications } from "./schema/notifications";
// import { payments } from "./schema/payments";

const client = postgres("postgresql://postgres:houssem123456@localhost:5432/app_baheth");
export const db = drizzle(client);

export {
  users,
  // providers,
  // equipments,
  // categories,
  // equipment_categories,
  // bookings,
  // booking_statuses,
  // chats,
  // messages,
  // notifications,
  // payments,
};
