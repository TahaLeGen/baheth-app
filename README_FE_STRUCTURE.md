# Frontend Project Structure

This document outlines the structure of our Next.js 16 + Shadcn + Redux Toolkit frontend application.

## 📁 Project Structure

```
src/
├── server/                  # Server-side code
│   ├── db.ts               # Database configuration (Drizzle + PostgreSQL)
│   └── db/
│       ├── index.ts        # Database exports
│       └── schema/         # Database schema definitions
│           ├── users.ts
│           ├── providers.ts
│           ├── equipments.ts
│           ├── categories.ts
│           ├── bookings.ts
│           ├── payments.ts
│           ├── chats.ts
│           ├── messages.ts
│           └── notifications.ts
│
├── app/
│   ├── layout.tsx            # Root layout wrapper
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   │
│   ├── api/                 # API Routes
│   │   ├── auth/
│   │   │   ├── sign-in/
│   │   │   │   └── route.ts
│   │   │   └── sign-up/
│   │   │       └── route.ts
│   │   ├── users/
│   │   │   ├── route.ts
│   │   │   └── [userId]/
│   │   │       └── route.ts
│   │   ├── providers/
│   │   │   ├── route.ts
│   │   │   └── [providerId]/
│   │   │       └── route.ts
│   │   ├── equipments/
│   │   │   ├── route.ts
│   │   │   └── [equipmentId]/
│   │   │       └── route.ts
│   │   ├── categories/
│   │   │   ├── route.ts
│   │   │   └── [categoryId]/
│   │   │       └── route.ts
│   │   ├── bookings/
│   │   │   ├── route.ts
│   │   │   └── [bookingId]/
│   │   │       └── route.ts
│   │   ├── chats/
│   │   │   ├── route.ts
│   │   │   └── [chatId]/
│   │   │       └── route.ts
│   │   ├── messages/
│   │   │   ├── route.ts
│   │   │   └── [messageId]/
│   │   │       └── route.ts
│   │   └── payments/
│   │       ├── route.ts
│   │       └── [paymentId]/
│   │           └── route.ts
│   │
│   ├── about/               # About section
│   │   └── page.tsx
│   │
│   ├── contact/             # Contact section
│   │   └── page.tsx
│   │
│   ├── listings/            # Equipment listings
│   │   ├── page.tsx
│   │   └── [listingId]/
│   │       └── page.tsx
│   │
│   ├── providers/           # Provider listings
│   │   ├── page.tsx
│   │   └── [providerId]/
│   │       └── page.tsx
│   │
│   ├── auth/                # Authentication pages
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   ├── sign-up/
│   │   │   ├── provider/
│   │   │   │   └── page.tsx
│   │   │   └── researcher/
│   │   │       └── page.tsx
│   │   ├── forget-password/
│   │   │   └── page.tsx
│   │   └── reset-password/
│   │       └── page.tsx
│   │
│   └── dashboard/           # Protected dashboard routes
       ├── layout.tsx        # Dashboard layout
       ├── page.tsx         # Dashboard home
       ├── settings/        # User settings
       │   └── page.tsx
       ├── admin/          # Admin section
       │   ├── page.tsx
       │   ├── providers/
       │   │   ├── page.tsx
       │   │   └── [providerId]/
       │   │       └── page.tsx
       │   ├── researchers/
       │   │   ├── page.tsx
       │   │   └── [researcherId]/
       │   │       └── page.tsx
       │   ├── equipments/
       │   │   ├── page.tsx
       │   │   └── [equipmentId]/
       │   │       └── page.tsx
       │   └── bookings/
       │       ├── page.tsx
       │       └── [bookingId]/
       │           └── page.tsx
       ├── provider/       # Provider section
       │   ├── page.tsx
       │   ├── equipments/
       │   │   ├── page.tsx
       │   │   └── [equipmentId]/
       │   │       └── page.tsx
       │   ├── bookings/
       │   │   ├── page.tsx
       │   │   └── [bookingId]/
       │   │       └── chat/
       │   │           └── page.tsx
       │   └── notifications/
       │       └── page.tsx
       └── researcher/     # Researcher section
           ├── page.tsx
           ├── equipments/
           │   ├── page.tsx
           │   └── [equipmentId]/
           │       └── page.tsx
           ├── providers/
           │   ├── page.tsx
           │   └── [providerId]/
           │       └── page.tsx
           ├── bookings/
           │   ├── page.tsx
           │   └── [bookingId]/
           │       └── chat/
           │           └── page.tsx
           └── notifications/
               └── page.tsx
│   │
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Root page
│
├── components/                # Reusable components
│   ├── ui/                   # Shadcn UI components
│   │   ├── avatar.tsx       # User avatar component
│   │   ├── badge.tsx        # Badge component
│   │   ├── breadcrumb.tsx   # Navigation breadcrumb
│   │   ├── button.tsx       # Button component
│   │   ├── card.tsx         # Card container
│   │   ├── collapsible.tsx  # Collapsible component
│   │   ├── dropdown-menu.tsx # Dropdown menu
│   │   ├── scroll-area.tsx  # Scrollable area
│   │   ├── separator.tsx    # Visual separator
│   │   ├── sheet.tsx        # Slide-out sheet
│   │   ├── sidebar.tsx      # Sidebar component
│   │   ├── skeleton.tsx     # Loading skeleton
│   │   ├── tooltip.tsx      # Tooltip component
│   │   ├── toast.tsx        # Toast component
│   │   └── toaster.tsx      # Toast manager component
│   ├── dashboard/            # Dashboard-specific components
│   │   ├── app-sidebar.tsx  # Main dashboard sidebar
│   │   ├── nav-main.tsx     # Main navigation
│   │   ├── nav-projects.tsx # Projects navigation
│   │   ├── nav-user.tsx     # User navigation
│   │   ├── team-switcher.tsx # Team selector
│   │   └── theme-toggle.tsx # Theme switcher component
│   ├── forms/                # Form components
│   ├── charts/               # Data visualization
│   └── layout/               # Layout components
│
├── store/                    # Redux Toolkit setup
│   ├── index.ts             # Store configuration
│   ├── hooks.ts             # Typed hooks
│   └── slices/              # Redux slices
│       ├── authSlice.ts     # Authentication state
│       ├── userSlice.ts     # User profile state
│       ├── providerSlice.ts # Provider features
│       ├── researcherSlice.ts # Researcher features
│       ├── bookingSlice.ts  # Booking management
│       ├── notificationSlice.ts # Notifications
│       ├── equipmentSlice.ts # Equipment management
│       └── uiSlice.ts       # UI state (theme, modals)
│
├── context/                  # React Context providers
│   ├── AuthContext.tsx      # Authentication context
│   └── ThemeContext.tsx     # Theme management (light/dark/system)
│
├── hooks/                    # Custom React hooks
│   ├── useAuth.ts           # Authentication hook
│   ├── useRole.ts           # Role management
│   └── useToast.ts          # Toast notifications
│
├── lib/                      # Utility functions
│   ├── utils.ts             # General utilities
│   └── roles.ts             # Role definitions
│
├── styles/                   # Global styles
│
└── types/                    # TypeScript definitions
    ├── user.ts              # User-related types
    ├── project.ts           # Project-related types
    └── api.ts               # API types

```

## 📂 Directory Descriptions

### App Directory (`app/`)
- Root directory using Next.js 16 App Router
- Groups routes by access level using route groups: (public) and (dashboard)
- Each section has its own layout and routing structure
- API Routes (`api/`) with RESTful endpoints:
  - Authentication: `/api/auth/` (sign-in, sign-up)
  - Users: `/api/users/` (CRUD operations)
  - Providers: `/api/providers/` (CRUD operations)
  - Equipment: `/api/equipments/` (CRUD operations)
  - Categories: `/api/categories/` (CRUD operations)
  - Bookings: `/api/bookings/` (CRUD operations)
  - Chats: `/api/chats/` (CRUD operations)
  - Messages: `/api/messages/` (CRUD operations)
  - Payments: `/api/payments/` (CRUD operations)

### Components (`components/`)
- Houses all reusable UI components
- Uses Shadcn UI as the base component library
- Organized by domain:
  - UI Components (`ui/`): 
    - Base Shadcn components
    - Notifications system (toast, toaster)
    - Form elements (input, button, etc.)
    - Navigation elements (sidebar, breadcrumb)
  - Dashboard Components (`dashboard/`): 
    - Layout and navigation
    - Role-specific components
    - Shared dashboard elements
  - Form Components (`forms/`): 
    - Authentication forms
    - Data entry forms
    - Validation and error handling
  - Chart Components (`charts/`): 
    - Data visualization
    - Analytics components
  - Layout Components (`layout/`): 
    - Page structure components
    - Shared layouts

### Store (`store/`)
- Redux Toolkit configuration and state management
- Organized into domain-specific slices
- Includes typed hooks for type-safe state access

### Context (`context/`)
- React Context providers for app-wide state
- Handles authentication and theme state
- Complements Redux for simpler state needs

### Hooks (`hooks/`)
- Custom React hooks for shared logic
- Authentication, role management, and UI utilities
- Promotes code reuse across components

### Library (`lib/`)
- Utility functions and constants
- Role definitions and permissions
- Helper functions used across the app

### Types (`types/`)
- TypeScript definitions for the entire app
- Ensures type safety and better DX
- Includes API types and models

## 🔑 Key Files

### Key Files

#### Root Files
- `app/layout.tsx`: Root layout with global providers and UI
- `app/page.tsx`: Main landing page
- `app/globals.css`: Global styles and Tailwind directives

#### Route Group Layouts
- `app/(public)/layout.tsx`: Public section layout and navigation
- `app/(dashboard)/layout.tsx`: Protected dashboard layout with role-based navigation

#### Core State Management
- `store/index.ts`: Redux store configuration
- `store/hooks.ts`: Typed hooks for Redux state
- `context/AuthContext.tsx`: Authentication provider
- `context/ThemeContext.tsx`: Theme management

#### Important Routes
- Authentication: `app/(public)/auth/*`
  - Sign in, sign up (provider/researcher)
  - Password management
- Admin: `app/(dashboard)/admin/*`
  - User management
  - Equipment control
  - Booking oversight
- Provider: `app/(dashboard)/provider/*`
  - Equipment management
  - Booking handling
  - Chat system
- Researcher: `app/(dashboard)/researcher/*`
  - Equipment browsing
  - Booking management
  - Provider interaction

## 📝 Next Steps

### State Management
- [x] Install Redux Toolkit and React-Redux packages
- [x] Configure store with slices in `store/index.ts`
- [x] Set up Redux Provider in root layout
- [x] Set up Theme Provider with dark/light/system modes
- [x] Implement Auth Context for authentication state
- [ ] Implement and test initial slices:
  - [ ] Authentication
  - [ ] User management
  - [ ] Equipment handling
  - [ ] Booking system
  - [ ] Notifications

### Authentication & Authorization
- [x] Create authentication routes
  - [x] Sign in page structure
  - [x] Sign up pages (Provider/Researcher)
  - [x] Password reset flow
  - [ ] Implement authentication logic
- [x] Set up role-based route protection structure
- [ ] Add JWT handling and refresh logic
- [x] Create API endpoints for auth
  - [x] POST /api/auth/sign-in
  - [x] POST /api/auth/sign-up
  - [ ] Implement authentication logic

### UI Implementation
- [x] Build layout components with Shadcn
  - [x] Sidebar component with responsive design
  - [x] Theme toggle with system/light/dark modes
  - [x] Basic UI components
    - [x] Button, Card, Avatar components
    - [x] Toast notifications system
    - [x] Forms and input components
    - [x] Navigation components
- [x] Create responsive navigation systems
  - [x] Main dashboard layout
  - [x] Collapsible sidebar
  - [x] Breadcrumb navigation
- [ ] Implement dashboard UI components
  - [x] Theme switcher in header
  - [ ] User profile section
  - [ ] Notifications panel
  - [ ] Search functionality
- [ ] Add loading and error states
  - [x] Skeleton components
  - [ ] Error boundaries
  - [ ] Loading indicators
- [ ] Design and build forms:
  - [ ] Authentication forms
  - [ ] Profile management
  - [ ] Equipment creation/editing
  - [ ] Booking forms

### Features & Functionality
- Equipment Management
  - [x] Create API endpoints
  - [ ] Implement CRUD operations
  - [ ] Add equipment search and filtering
  - [ ] Equipment categories management
- Booking System
  - [x] Create API endpoints
  - [ ] Implement booking flow
  - [ ] Add scheduling functionality
  - [ ] Booking status management
- Chat System
  - [x] Create API endpoints
  - [ ] Implement real-time chat
  - [ ] Add message notifications
  - [ ] Chat history management
- Dashboard Features
  - [x] Implement responsive layout
  - [x] Add theme switching (dark/light/system)
  - [ ] User profile management
  - [ ] Role-based access control
- Payment System
  - [x] Create API endpoints
  - [ ] Integrate payment gateway
  - [ ] Implement payment processing
  - [ ] Add payment history
- Notification System
  - [x] Create API structure
  - [ ] Implement real-time notifications
  - [ ] Add notification preferences
  - [ ] Email notifications

### API Integration
- [x] Set up API routes structure
  - [x] Authentication endpoints
  - [x] User management endpoints
  - [x] Provider management endpoints
  - [x] Equipment management endpoints
  - [x] Booking management endpoints
  - [x] Chat and messaging endpoints
  - [x] Payment endpoints
- [x] Database setup
  - [x] Configure PostgreSQL with Drizzle ORM
  - [x] Create database schema structure
  - [ ] Implement database migrations
- [ ] Implement RTK Query endpoints
- [x] Add request/response handling structure
- [x] Error management structure
- [ ] Implement data validation
- [ ] Set up data caching strategy

### Performance & Testing
- [ ] Component unit testing
- [ ] Integration testing
- [ ] Performance optimization
- [ ] Error boundaries
- [ ] Loading strategies
- [ ] SEO optimization