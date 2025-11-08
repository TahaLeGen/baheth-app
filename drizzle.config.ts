import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./src/server/db/schema", // chemin vers tes schemas
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://postgres:houssem123456@localhost:5432/app_baheth",
  }
});
