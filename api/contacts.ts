import type { VercelRequest, VercelResponse } from '@vercel/node';

// This endpoint is no longer needed as we're using email notifications
// Keeping it here for backwards compatibility
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  res.status(200).json({ 
    message: "Contact submissions are now sent via email notifications" 
  });
}
