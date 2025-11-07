import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const insertContactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string().nullable().optional(),
  message: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type SelectContact = typeof contacts.$inferSelect;
