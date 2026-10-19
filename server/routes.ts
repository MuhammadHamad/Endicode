import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "./schema";
import { fromZodError } from "zod-validation-error";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

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

  // WhatsApp Cloud API - send outbound message
  app.post("/api/whatsapp/send", async (req, res) => {
    try {
      if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
        return res.status(500).json({
          message: "WhatsApp API is not configured. Please set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN environment variables.",
        });
      }

      const { userName, userPhone, message } = req.body ?? {};

      if (!userPhone || !message) {
        return res.status(400).json({
          message: "Missing required fields: userPhone and message",
        });
      }

      const bodyText = `From ${userName || "Website visitor"} (${userPhone}): ${message}`;

      const whatsappResponse = await fetch(
        `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: userPhone,
            type: "text",
            text: {
              body: bodyText,
            },
          }),
        }
      );

      const data = await whatsappResponse.json();

      if (!whatsappResponse.ok) {
        console.error("WhatsApp send error:", data);
        return res.status(502).json({
          message: "Failed to send WhatsApp message",
          details: data,
        });
      }

      res.status(200).json({
        message: "Message sent to WhatsApp",
        whatsapp: data,
      });
    } catch (error) {
      console.error("WhatsApp send exception:", error);
      res.status(500).json({
        message: "Unexpected error while sending WhatsApp message",
      });
    }
  });

  // WhatsApp Cloud API - basic polling endpoint (stub for future enhancement)
  app.get("/api/whatsapp/messages", async (req, res) => {
    try {
      if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
        return res.status(500).json({
          message: "WhatsApp API is not configured. Please set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN environment variables.",
        });
      }

      // NOTE: In a production setup, incoming messages are best handled via webhooks
      // and stored in a database. This endpoint is a lightweight polling example
      // that can be wired up once your WhatsApp Cloud API account is ready.

      res.status(200).json({
        messages: [],
        note: "Polling endpoint is a placeholder. Configure webhooks + storage for full bidirectional chat.",
      });
    } catch (error) {
      console.error("WhatsApp poll exception:", error);
      res.status(500).json({
        message: "Unexpected error while fetching WhatsApp messages",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
