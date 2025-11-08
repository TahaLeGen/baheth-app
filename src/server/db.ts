// src/server/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://postgres:houssem123456@localhost:5432/app_baheth",
});

export const db = drizzle(pool);
