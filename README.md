# Task Management Dashboard

A modern, responsive task management application built with React, TypeScript, and Supabase.

## Features

- ✨ Beautiful and responsive UI with Tailwind CSS
- 🌓 Dark mode support
- 🔄 Drag and drop task management
- 🔍 Advanced filtering and search
- ✅ Form validation with Zod
- 🔐 Data persistence with Supabase
- 📱 Mobile-friendly design

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Router
- Zod (Form Validation)
- Supabase (Backend)
- Hello Pangea DnD (Drag and Drop)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── lib/           # Utilities and configurations
├── pages/         # Route components
├── store/         # Zustand state management
├── types/         # TypeScript type definitions
└── supabase/      # Supabase migrations and types
```

## Features Implementation

### Dark Mode
- System preference detection
- Persistent theme selection
- Smooth transitions

### Task Management
- Create, read, update, and delete tasks
- Drag and drop between status columns
- Priority levels (Low, Medium, High)
- Due date tracking
- Status tracking (Todo, In Progress, Done)

### Form Validation
- Real-time validation with Zod
- Error messages
- Date validation for future dates

### Data Persistence
- Supabase backend integration
- Real-time updates
- Secure data access with RLS policies

## Assumptions and Design Decisions

1. Authentication
   - Email/password authentication
   - Protected routes and data access

2. Task Organization
   - Three-column Kanban board layout
   - Drag and drop for status updates
   - Priority-based visual indicators

3. User Experience
   - Responsive design for all screen sizes
   - Intuitive navigation
   - Real-time feedback on actions

4. Performance
   - Optimized re-renders
   - Lazy loading of components
   - Efficient state management

## Future Improvements

- Collaborative features
- Task categories and tags
- Due date notifications
- Activity history
- Data export/import
- Team management features