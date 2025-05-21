import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
<<<<<<< HEAD
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["ojtclassroom-finalproj_*"],
=======
  dialect: "sqlite",
  dbCredentials: {
    url: "file:./classroom_ojt.db",
  },
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77
} satisfies Config;
