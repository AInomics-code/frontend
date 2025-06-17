# Replit.md

## Overview

This is a full-stack web application built with Express.js backend and React frontend, designed as a conversational AI interface for business intelligence queries. The application uses PostgreSQL with Drizzle ORM for data persistence and provides a chat-like interface for users to interact with business data and analytics.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js 20 with TypeScript
- **Framework**: Express.js with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon serverless PostgreSQL
- **API Design**: RESTful endpoints for conversations and messages
- **Development**: TSX for TypeScript execution in development

## Key Components

### Database Schema
- **Conversations Table**: Stores chat conversation metadata (id, title, timestamps)
- **Messages Table**: Stores individual messages with role (user/assistant) and content
- Utilizes Drizzle's schema validation with Zod integration

### Chat Interface
- Real-time typing animation for AI responses
- Message persistence across sessions
- Support for rich text formatting and business intelligence visualizations
- Voice input capabilities (when supported by browser)
- Responsive design optimized for business dashboard usage

### Business Intelligence Integration
- AI-powered query analysis for business metrics
- Performance celebrations with confetti animations
- Specialized prompt generators for common business questions
- KPI dashboard with real-time metrics
- Integration with business context data (products, sales, clients)

### Storage Layer
- In-memory storage implementation for development
- Database migrations managed through Drizzle Kit
- Conversation and message CRUD operations
- Automatic timestamp management

## Data Flow

1. **User Input**: Messages entered through chat interface
2. **Frontend Processing**: React Query handles API calls and state management
3. **Backend Processing**: Express routes validate and process requests
4. **AI Processing**: Business intelligence analysis of user queries
5. **Data Persistence**: Messages stored in PostgreSQL via Drizzle ORM
6. **Response Delivery**: Typed responses streamed back to frontend
7. **UI Updates**: Real-time updates with typing animations and celebrations

## External Dependencies

### Core Dependencies
- **Database**: Neon serverless PostgreSQL for cloud-hosted database
- **AI Services**: OpenAI API integration for intelligent responses
- **UI Components**: Radix UI primitives for accessible component foundation
- **Font**: Google Fonts (Inter) for consistent typography

### Development Tools
- **Type Safety**: TypeScript across entire stack
- **Code Quality**: ESM modules with strict TypeScript configuration
- **Hot Reload**: Vite HMR for rapid development iteration
- **Path Aliases**: Configured for clean import statements

### Production Dependencies
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Error Handling**: Runtime error overlays in development

## Deployment Strategy

### Replit Configuration
- **Environment**: Node.js 20, Web, PostgreSQL 16 modules
- **Development**: `npm run dev` for concurrent frontend/backend development
- **Production Build**: `npm run build` creates optimized bundles
- **Deployment**: Autoscale deployment target with proper port configuration

### Environment Setup
- **Database URL**: Required environment variable for PostgreSQL connection
- **OpenAI API Key**: Optional for AI functionality
- **Port Configuration**: Frontend served on port 5000, backend API integrated

### Build Process
1. Frontend builds to `dist/public` directory
2. Backend bundles to `dist/index.js`
3. Static assets served by Express in production
4. Database migrations applied via `npm run db:push`

## Changelog
```
Changelog:
- June 16, 2025. Initial setup
- June 17, 2025. Complete Spanish localization implemented
  * All UI components translated to Spanish
  * KPI dashboard with realistic La Doña business data
  * BI sidebar with Spanish translations for Performance/Risks/Opportunities
  * Prompt generator with Spanish business questions
  * Chat interface and message components localized
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
Language: Spanish localization for all user-facing content.
Data requirements: Use realistic La Doña condiment business data.
```