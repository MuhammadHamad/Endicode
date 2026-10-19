import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { insertContactSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';
import { Resend } from 'resend';

// "website" is a honeypot: the form renders it hidden from people, so only bots fill it in.
const contactRequestSchema = insertContactSchema.extend({
  website: z.string().optional(),
});

const SUCCESS_MESSAGE = "Contact form submitted successfully. We'll get back to you soon!";
const FAILURE_MESSAGE = "Failed to submit contact form. Please try again later.";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const result = contactRequestSchema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = fromZodError(result.error);
      return res.status(400).json({
        message: "Validation failed",
        errors: errorMessage.toString()
      });
    }

    const { name, email, company, message, website } = result.data;

    // Honeypot filled in: report success so the bot moves on, but send nothing.
    if (website) {
      return res.status(201).json({ message: SUCCESS_MESSAGE });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;
    if (!apiKey || !contactEmail) {
      console.error('Contact form is not configured: RESEND_API_KEY and CONTACT_EMAIL must both be set.');
      return res.status(500).json({ message: FAILURE_MESSAGE });
    }

    const resend = new Resend(apiKey);

    // emails.send() reports failures through `error` rather than throwing.
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: contactEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\r?\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted via Endicode contact form</small></p>
      `
    });

    if (error) {
      console.error('Resend failed to send contact form email:', error);
      return res.status(500).json({ message: FAILURE_MESSAGE });
    }

    res.status(201).json({ message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ message: FAILURE_MESSAGE });
  }
}
