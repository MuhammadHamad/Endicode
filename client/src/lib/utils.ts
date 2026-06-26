import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Single source of truth for the calendar booking link.
// Update this once when the Calendly/Cal.com URL is finalized.
export const CALENDLY_URL = "https://calendly.com/itshammadofficial/30min"

export const WHATSAPP_URL =
  "https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project."

export const CONTACT_EMAIL = "hello@endicode.com"
