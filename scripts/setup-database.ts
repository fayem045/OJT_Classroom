#!/usr/bin/env node
// Import required dependencies
import { drizzle } from "drizzle-orm/postgres-js"; // Drizzle ORM for database operations
import postgres from "postgres"; // PostgreSQL client
import * as dotenv from "dotenv"; // For loading environment variables
import { activities, systemMetrics, users } from "../src/server/db/schema"; // Database schema definitions
import { sql } from "drizzle-orm"; // SQL template literal for raw queries

// Load environment variables from .env file
dotenv.config();

// Get database URL from environment variables
const { DATABASE_URL } = process.env;

// Exit if DATABASE_URL is not provided
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is required");
  process.exit(1);
}

// Database connection configuration
const connectionConfig = {
  ssl: true, // Enable SSL for secure connection
  max: 1, // Maximum number of connections in the pool
  idle_timeout: 20, // Time in seconds before idle connections are closed
  connect_timeout: 10, // Time in seconds to wait for connection
};

// Initialize database client and ORM
const client = postgres(DATABASE_URL, connectionConfig);
const db = drizzle(client);

/**
 * Main setup function that initializes the database
 * Creates necessary tables and initial data if they don't exist
 */
async function setup() {
  console.log("🚀 Starting database setup...");

  try {
    // Test database connection by executing a simple query
    console.log("⏳ Testing database connection...");
    await db.execute(sql`SELECT NOW()`);
    console.log("✅ Database connection successful");

    // Initialize system metrics table with default values if empty
    console.log("⏳ Setting up system metrics...");
    const existingMetrics = await db.select().from(systemMetrics).limit(1);
    
    if (!existingMetrics.length) {
      // Insert default system metrics if none exist
      await db.insert(systemMetrics).values({
        systemLoad: 0, // Initial system load
        storageUsage: 0, // Initial storage usage
        lastBackup: new Date(), // Set current date as last backup
      });
      console.log("✅ System metrics initialized");
    } else {
      console.log("ℹ️ System metrics already exist");
    }

    // Create default admin user if none exists
    console.log("⏳ Setting up admin user...");
    const adminExists = await db.select().from(users).where(sql`role = 'admin'`);
    
    if (!adminExists.length) {
      // Insert default admin user with environment variable or fallback email
      await db.insert(users).values({
        email: process.env.ADMIN_EMAIL ?? 'admin@example.com',
        role: 'admin',
        clerkId: 'default_admin',
      });
      console.log("✅ Default admin user created");
    } else {
      console.log("ℹ️ Admin user already exists");
    }

    // Initialize activity log with system initialization record
    console.log("⏳ Setting up activity log...");
    await db.insert(activities).values({
      type: 'system',
      action: 'Database initialized',
    });
    console.log("✅ Activity log initialized");

    console.log("\n🎉 Database setup completed successfully!");
  } catch (error) {
    // Error handling with detailed error information
    console.error("\n❌ Error during database setup:");
    if (error instanceof Error) {
      console.error(`   ${error.message}`);
      if ('code' in error) {
        console.error(`   Error code: ${(error as any).code}`);
      }
    } else {
      console.error(error);
    }
    process.exit(1);
  } finally {
    // Always close the database connection
    await client.end();
  }
}

// Execute setup function and handle any uncaught errors
setup().catch((error) => {
  console.error("\n❌ Fatal error during setup:", error);
  process.exit(1);
});
