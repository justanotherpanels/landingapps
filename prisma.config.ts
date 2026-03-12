import "dotenv/config"; // Most environments handle this, but for Prisma 7 we might need more
import * as dotenv from "dotenv";
import * as path from "path";
import { defineConfig } from "prisma/config";

// Explicitly load .env and override any existing environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env"), override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
