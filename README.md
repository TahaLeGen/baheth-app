# Baheth App

A modern Next.js 15 application built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- ⚡ **Next.js 15** - Latest version with React 19
- 🎯 **TypeScript** - Full type safety
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful and accessible UI components
- 🌙 **Dark Mode** - Built-in dark/light theme support
- 📱 **Responsive Design** - Mobile-first approach

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── components/          # Components showcase page
│   ├── globals.css         # Global styles with shadcn/ui theme
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   └── ui/                 # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       └── avatar.tsx
└── lib/
    └── utils.ts            # Utility functions
```

## Available Components

This project includes the following shadcn/ui components:

- **Button** - Various button styles and variants
- **Card** - Container component for content
- **Input** - Form input fields
- **Badge** - Labels and status indicators
- **Avatar** - User profile pictures

Visit `/components` to see all components in action.

## Adding More Components

To add more shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add tabs
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [shadcn/ui Documentation](https://ui.shadcn.com) - explore available components
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about utility classes
- [TypeScript Documentation](https://www.typescriptlang.org/docs) - learn about TypeScript

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
