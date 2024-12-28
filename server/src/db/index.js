// const { drizzle } = require('drizzle-orm/node-postgres');
// const { neon } = require("@neondatabase/serverless");

// import { drizzle } from "drizzle-orm/node-postgres";
// import { neon } from "@neondatabase/serverless";
// import * as schema from "./schema.js";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
// const schema = require("./schema");
// const { Pool } = require('pg');
// const dotenv = require('dotenv');
import dotenv from "dotenv";

dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });
const sql = neon(
  process.env.DATABASE_URL,
);


// const db = drizzle(pool);
// const db = drizzle(sql, { schema });

// module.exports = db;


export const db = drizzle(sql, { schema });