import type { VercelRequest, VercelResponse } from '@vercel/node';
import { insertContactSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';
import { Resend } from 'resend';

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

    const { name, email, phone, message, company, website, budget } = result.data;

    // Initialize Resend with API key from environment
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email notification
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'your-email@example.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${website ? `<p><strong>Website:</strong> ${website}</p>` : ''}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Submitted via Endicode contact form</small></p>
      `
    });
    
    res.status(201).json({ 
      message: "Contact form submitted successfully. We'll get back to you soon!"
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ 
      message: "Failed to submit contact form. Please try again later." 
    });
  }
}
