#!/usr/bin/env node
import { db } from "../src/server/db";
import { activities, companies, systemMetrics, users } from "../src/server/db/schema";
import { sql } from "drizzle-orm";

async function setup() {
  console.log("🚀 Starting database setup...");

  try {
    // Check database connection
    await db.execute(sql`SELECT NOW()`);
    console.log("✅ Database connection successful");

    // Initialize system metrics
    await db.insert(systemMetrics).values({
      systemLoad: 0,
      storageUsage: 0,
      lastBackup: new Date(),
    });
    console.log("✅ System metrics initialized");

    // Create default admin user if not exists
    const adminExists = await db.select().from(users).where(sql`role = 'admin'`);
    
    if (!adminExists.length) {
      await db.insert(users).values({
        email: process.env.ADMIN_EMAIL ?? 'admin@example.com',
        role: 'admin',
        clerkId: 'default_admin',
      });
      console.log("✅ Default admin user created");
    } else {
      console.log("ℹ️ Admin user already exists");
    }

    console.log("\n🎉 Database setup completed successfully!");
  } catch (error) {
    console.error("❌ Error during database setup:", error);
    process.exit(1);
  }
}

setup().catch(console.error);
