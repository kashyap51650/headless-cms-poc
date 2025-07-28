# Event Management App with Contentful CMS

A modern, full-featured event management application built with React, TypeScript, Vite, and Contentful as a headless CMS. This application demonstrates best practices for building scalable web applications with modern technologies.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom theme
- **State Management**: TanStack Query (React Query) for server state
- **Form Management**: React Hook Form with Zod validation
- **CMS**: Contentful (Headless CMS)
- **Icons**: Lucide React
- **Build Tool**: Vite with HMR

## 🏗️ Architecture Overview

This application follows a modern headless CMS architecture:

```
Frontend (React + TypeScript)
    ↓
API Layer (Services)
    ↓
Contentful CMS (Headless)
    ↓
Content Delivery API
```

### Key Features

- 📅 **Event Management**: Create, edit, and manage events
- 👥 **Multi-user Support**: Organizers, speakers, and categories
- 🔍 **Advanced Search**: Filter events by categories, dates, and keywords
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Modern UI**: Beautiful, accessible interface with Tailwind CSS
- ⚡ **Performance**: Optimized with caching and lazy loading
- 🔒 **Type Safety**: Full TypeScript integration

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- A Contentful account (free tier available)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd headless-cms-poc
npm install
```

### 2. Environment Configuration

Create environment files:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Contentful credentials:

```env
# Contentful Configuration
VITE_SPACE_ID=your_space_id
VITE_CONTENT_DELIVERY_API_KEY=your_delivery_token
VITE_CONTENT_PREVIEW_API_KEY=your_preview_token
VITE_CONTENT_MANAGEMENT_API_KEY=your_management_token

# App Configuration
VITE_APP_ENVIRONMENT=master
```

### 3. Contentful Setup

#### A. Create Content Models

Set up these content models in your Contentful space:

**Event Content Model:**

```
Content Type ID: event
Fields:
- title (Short text) - Event name
- slug (Short text) - URL slug
- date (Date & time) - Event start date
- description (Rich text) - Event description
- banner (Media) - Event banner image
- bannerURL (Short text) - URL of image
- isPublished (Boolean) - Visibility status
- organizer (Reference) - Link to organizer
- categories (References, multiple) - Event categories
- speakers (References, multiple) - Event speakers
```

**Category Content Model:**

```
Content Type ID: category
Fields:
- title (Short text) - Category name
- slug (Short text) - URL slug
```

**Speaker Content Model:**

```
Content Type ID: speaker
Fields:
- name (Short text) - Speaker name
- bio (Long text) - Speaker biography
- avatar (Media) - Profile image
```

**Author Content Model:**

```
Content Type ID: author
Fields:
- name (Short text) - Organizer name
- email (Short text) - Contact email
- avatar (Media) - Profile image
```

#### B. API Keys Setup

1. Go to **Settings → API keys** in Contentful
2. Create a new API key or use existing
3. Copy the Space ID and tokens to your `.env.local`

### 4. Start Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see your application.

## 🎯 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── forms/           # Form-specific components
│   ├── layout/          # Layout components (Sidebar, etc.)
│   └── dashboard/       # Dashboard-specific components
├── hooks/               # Custom React hooks
├── services/            # API service layers
├── types/               # TypeScript type definitions
├── schemas/             # Zod validation schemas
├── data/                # Mock data and constants
```

## 🔧 Key Components

### Services Layer

The application uses a service layer pattern for API interactions:

```typescript
// Event Service Example
export class EventService {
  static async getEvents(options = {}) {
    // Fetch from Contentful with fallback to mock data
  }

  static async createEvent(eventData) {
    // Create event in Contentful
  }

  static async updateEvent(id, eventData) {
    // Update event in Contentful
  }
}
```

### React Query Integration

All API calls are wrapped with TanStack Query for caching:

```typescript
export const useEvents = (options = {}) => {
  return useQuery({
    queryKey: ["events", options],
    queryFn: () => EventService.getEvents(options),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### Form Validation

Forms use React Hook Form with Zod schemas:

```typescript
const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  // ... other fields
});
```

## 🎨 Styling & Theming

The app uses Tailwind CSS v4 with a custom theme defined in `src/index.css`:

```css
@theme {
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  /* Custom color palette */
}
```

## 📱 Features Guide

### Event Management

- **Create Events**: Rich form with validation
- **Edit Events**: Update existing events
- **Draft Mode**: Save events as drafts before publishing
- **Categories**: Organize events categories
- **Speakers**: Assign multiple speakers to events

### Dashboard

- **Statistics**: Overview of events, categories, speakers
- **Recent Activity**: Latest events and updates
- **Quick Actions**: Fast access to common tasks

### Search & Filtering

- **Text Search**: Search events by title, description
- **Category Filter**: Filter by event categories
- **Date Range**: Filter by event dates
- **Pagination**: Handle large datasets efficiently

## 🔄 Data Flow

1. **Content Creation**: Create content in Contentful web interface
2. **API Fetch**: Services layer fetches data via Contentful API
3. **Caching**: TanStack Query caches responses
4. **Components**: React components consume cached data
5. **Updates**: Form submissions update Contentful via Management API

## 📚 Learning Resources

### Contentful

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Content Modeling Best Practices](https://www.contentful.com/developers/docs/concepts/data-model/)
- [Contentful Management API](https://www.contentful.com/developers/docs/references/content-management-api/)

### Styling

- [Tailwind CSS](https://tailwindcss.com/docs)
