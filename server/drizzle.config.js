import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  out: "./drizzle", // Directory for migrations
  schema: "./src/db/schema.js", // Path to your Drizzle schema file
  dialect: "postgresql", // Specify the database dialect
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
    url:process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false, // Allow self-signed certificates
    // },
  },
//   strict: true, // Optional: Enable strict schema validation
});


// import { defineConfig } from "drizzle-kit";
// import "dotenv/config";

// export default defineConfig({
//   out: "./src/db/migrations", // Directory for migrations
//   schema: "./src/db/schema.js", // Path to your Drizzle schema file
//   dialect: "postgresql", // Specify the database dialect
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL, // Use database URL
//   },
//   strict: true, // Optional: Enable strict schema validation
// });
