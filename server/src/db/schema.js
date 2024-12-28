import { sql } from "drizzle-orm";
import { pgTable, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  created_at: timestamp("created_at").defaultNow(),
});

export const seats = pgTable("seats", {
  id: serial("id").primaryKey(),
  row_number: integer("row_number").notNull(),
  seat_number: integer("seat_number").notNull(),
  is_reserved: boolean("is_reserved").default(false),
  reserved_by: integer("reserved_by").references(() => users.id),
  created_at: timestamp("created_at").defaultNow(),
});
