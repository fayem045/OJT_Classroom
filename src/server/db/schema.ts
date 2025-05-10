import { sql } from "drizzle-orm";
import { 
  integer, 
  pgEnum,
  pgTableCreator, 
  serial, 
  text, 
  timestamp, 
  varchar,
  boolean
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name) => `ojtclassroom-finalproj_${name}`,
);

// Enums
export const userRoleEnum = pgEnum('user_role', ['student', 'professor', 'admin']);
export const activityTypeEnum = pgEnum('activity_type', ['student', 'professor', 'company', 'system']);

// Users table
export const users = createTable(
  "user",
  {
    id: serial("id").primaryKey(),
    clerkId: text("clerk_id").notNull().unique(),
    email: varchar("email", { length: 255 }).notNull(),
    role: userRoleEnum("role").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

// Companies table
export const companies = createTable(
  "company",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    address: text("address"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

// Activities table
export const activities = createTable(
  "activity",
  {
    id: serial("id").primaryKey(),
    type: activityTypeEnum("type").notNull(),
    action: text("action").notNull(),
    userId: integer("user_id").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  }
);

// System metrics table
export const systemMetrics = createTable(
  "system_metrics",
  {
    id: serial("id").primaryKey(),
    systemLoad: integer("system_load").notNull(),
    storageUsage: integer("storage_usage").notNull(),
    lastBackup: timestamp("last_backup").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  }
);
