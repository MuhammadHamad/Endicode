import type { VercelRequest, VercelResponse } from '@vercel/node';

// Contact form temporarily disabled
// Will be re-enabled later with proper email service setup
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.status(503).json({ 
    message: "Contact form is temporarily unavailable. Please try again later." 
  });
}
