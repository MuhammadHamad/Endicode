import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
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
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error('Get contacts error:', error);
      res.status(500).json({ 
        message: "Failed to retrieve contacts" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
