import Database from 'better-sqlite3';
import type { InsertContact } from './schema';

// Create SQLite database connection
const sqlite = new Database('database.sqlite');

// Create contacts table if it doesn't exist
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );
`);

export const storage = {
  // Create a new contact
  async createContact(data: InsertContact) {
    const stmt = sqlite.prepare(`
      INSERT INTO contacts (name, email, company, message, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const now = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    const info = stmt.run(data.name, data.email, data.company, data.message, now, now);
    return { id: info.lastInsertRowid, ...data, createdAt: now, updatedAt: now };
  },

  // Get all contacts
  async getContacts() {
    const stmt = sqlite.prepare('SELECT * FROM contacts');
    return stmt.all();
  },

  // Get contact by ID
  async getContactById(id: number) {
    const stmt = sqlite.prepare('SELECT * FROM contacts WHERE id = ?');
    return stmt.get(id);
  },

  // Update contact
  async updateContact(id: number, data: Partial<InsertContact>) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);
    const stmt = sqlite.prepare(`UPDATE contacts SET ${fields}, updated_at = ? WHERE id = ?`);
    const now = Math.floor(Date.now() / 1000);
    stmt.run(...values, now, id);
    return { id, ...data };
  },

  // Delete contact
  async deleteContact(id: number) {
    const stmt = sqlite.prepare('DELETE FROM contacts WHERE id = ?');
    const info = stmt.run(id);
    return { id, changes: info.changes };
  }
};

export default storage;