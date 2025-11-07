import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "./schema";
import { fromZodError } from "zod-validation-error";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error as any);
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: errorMessage.toString() 
        });
      }

      const contact = await storage.createContact(result.data);

      // Send email notification
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.CONTACT_EMAIL || "itshammadofficial@gmail.com",
        subject: `New Contact Form Submission from ${result.data.name}`,
        html: `
          <p>You have received a new contact form submission:</p>
          <ul>
            <li><strong>Name:</strong> ${result.data.name}</li>
            <li><strong>Email:</strong> ${result.data.email}</li>
            <li><strong>Company:</strong> ${result.data.company || 'N/A'}</li>
            <li><strong>Message:</strong> ${result.data.message}</li>
          </ul>
        `,
      });
      
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
