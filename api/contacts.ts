import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const contacts = await storage.getContacts();
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ 
      message: "Failed to retrieve contacts" 
    });
  }
}
