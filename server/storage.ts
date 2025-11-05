import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { contacts, type InsertContact } from './schema';
import { eq } from 'drizzle-orm';

// Create SQLite database connection
const sqlite = new Database('database.sqlite');
export const db = drizzle(sqlite);

export const storage = {
  // Create a new contact
  async createContact(data: InsertContact) {
    const result = db.insert(contacts).values(data).returning();
    return result.get();
  },

  // Get all contacts
  async getContacts() {
    return db.select().from(contacts).all();
  },

  // Get contact by ID
  async getContactById(id: number) {
    return db.select().from(contacts).where(eq(contacts.id, id)).get();
  },

  // Update contact
  async updateContact(id: number, data: Partial<InsertContact>) {
    const result = db.update(contacts).set(data).where(eq(contacts.id, id)).returning();
    return result.get();
  },

  // Delete contact
  async deleteContact(id: number) {
    const result = db.delete(contacts).where(eq(contacts.id, id)).returning();
    return result.get();
  }
};

export default storage;