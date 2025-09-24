import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertContactSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const result = insertContactSchema.safeParse(req.body);
    
    if (!result.success) {
      const errorMessage = fromZodError(result.error);
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: errorMessage.toString() 
      });
    }

    const contact = await storage.createContact(result.data);
    
    res.status(201).json({ 
      message: "Contact form submitted successfully",
      id: contact.id 
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ 
      message: "Failed to submit contact form" 
    });
  }
}
