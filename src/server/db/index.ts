<<<<<<< HEAD
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "~/env";
import * as schema from "./schema";

// Database connection configuration
const connectionConfig = {
  // Enable SSL for Neon database
  ssl: true,
  // Maximum number of concurrent connections
  max: env.NODE_ENV === "production" ? 20 : 10,
  // Idle connection timeout (in seconds)
  idle_timeout: env.NODE_ENV === "production" ? 30 : 20,
  // Connection timeout (in seconds)
  connect_timeout: 10,
  // Connection retry settings
  max_retries: 3,
  retry_interval: 1000,
  // Enable debug logging in development
  debug: env.NODE_ENV === "development",
  // Connection error handler
  onnotice: (notice: { message?: string }) => {
    if (notice.message) {
      console.log("Database Notice:", notice.message);
    }
  },
  onparameter: (key: string, value: string) => {
    if (key === "server_version") {
      console.log("Connected to Postgres version:", value);
    }
  },
};

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL, connectionConfig);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
=======
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { env } from "~/env";
import * as schema from "./schema";

const sqlite = new Database("classroom_ojt.db");

// Enable foreign keys
sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite, { schema });
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77
