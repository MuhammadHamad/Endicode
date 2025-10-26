# Overview

Endicode is a production-ready marketing website for an agency specializing in modern web/app development and AI automation services. The site features a glassmorphism design with electric-blue and neon-mint color palette, interactive automation demos, and comprehensive lead processing capabilities. Built as a full-stack application with both client-side demos and server-side contact form handling.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter (lightweight React router) for client-side navigation
- **Styling**: Tailwind CSS with custom design system featuring glassmorphism effects and gradient meshes
- **UI Components**: shadcn/ui component library with Radix UI primitives for accessibility
- **Animations**: Framer Motion for page transitions, scroll animations, and micro-interactions
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **State Management**: TanStack Query for server state management and caching

## Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints
- **Storage**: In-memory storage implementation with interface for future database integration
- **API Design**: RESTful endpoints for contact form submission and retrieval
- **Data Validation**: Zod schemas shared between frontend and backend for consistent validation
- **Error Handling**: Centralized error handling with structured error responses

## Data Processing
- **CSV Processing**: Papa Parse for client-side CSV file parsing and lead scoring
- **Automation Logic**: Custom algorithms for lead triage, inquiry analysis, and automated response generation
- **Lead Scoring**: Multi-factor scoring system based on keywords, urgency, and complexity indicators
- **Export Functionality**: Client-side CSV generation and download capabilities

## Design System
- **Typography**: Inter and Inter Tight fonts with custom CSS variables for consistent spacing
- **Color Palette**: Electric blue (#4EA8FF) and neon mint (#66FBD1) with zinc base colors
- **Glass Morphism**: Custom CSS classes for glass card effects with backdrop blur
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities
- **Accessibility**: WCAG compliant with proper focus states, ARIA labels, and semantic HTML

## Performance Optimizations
- **Bundle Splitting**: Vite's automatic code splitting for optimal loading
- **Asset Optimization**: Font preloading and optimized image handling
- **SEO**: Complete metadata, OpenGraph tags, structured data, and sitemap
- **Analytics**: Placeholder analytics system for future integration

# External Dependencies

## Core Libraries
- **React Ecosystem**: React 18, React DOM, React Hook Form, Framer Motion
- **UI Components**: Radix UI primitives, Lucide React icons, class-variance-authority
- **Styling**: Tailwind CSS, clsx for conditional classes, PostCSS for processing
- **Validation**: Zod for schema validation, zod-validation-error for error formatting
- **Routing**: Wouter for lightweight React routing
- **Data Fetching**: TanStack React Query for server state management

## Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Type Checking**: TypeScript with strict configuration
- **Testing**: Playwright for end-to-end testing
- **Development**: Replit-specific plugins for development environment integration

## Backend Dependencies
- **Server**: Express.js with TypeScript definitions
- **Database ORM**: Drizzle ORM configured for PostgreSQL (ready for future database integration)
- **Database Driver**: Neon serverless for PostgreSQL connectivity
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Utilities**: date-fns for date manipulation, nanoid for ID generation

## Data Processing
- **CSV Handling**: Papa Parse for client-side CSV parsing and generation
- **File Operations**: Browser File API for upload handling and download generation

## External Services Ready
- **Database**: Configured for PostgreSQL via Drizzle ORM with environment variable setup
- **Analytics**: Placeholder system ready for Google Analytics or similar integration
- **Email**: Contact form backend ready for email service integration (SendGrid, etc.)
- **Calendar**: Booking page placeholder ready for Calendly or similar integration