# Hadaf - Frontend

## Description
This repository contains the web interface for the Hadaf platform. Built with Next.js and React, it serves as the user-facing portal allowing interaction with the Hadaf backend systems for managing ad-hoc charitable tasks and data.

## Local Setup Instructions

The most reliable and recommended way to run the frontend locally is **natively via Node.js**. While a Docker setup is provided (`docker-compose.dev.yml`), native execution is significantly faster and provides a seamless Hot Module Replacement (HMR) experience during development.

### Prerequisites
* Node.js 20+ (recommended)
* npm, yarn, or pnpm

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/hadaf-tj/hadaf-frontend
   cd hadaf-frontend
   ```
   
2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *The application will start at `http://localhost:3000`.*
   *Note: This project leverages Turbopack for local development (`next dev --turbopack`).*

---

## Architecture Overview

The Hadaf frontend is built using a modern React stack, designed to be scalable, responsive, and easy to extend. We use **Next.js (App Router)** to leverage both Server-Side Rendering (SSR) for performance/SEO and Client Components for interactivity.

### Tech Stack
- **Framework:** Next.js (App Router)
- **UI Library:** React 19
- **Styling:** TailwindCSS
- **Internationalization (i18n):** Next-intl (English, Russian, Tajik)
- **State Management:** React Hooks & Context API

### System Layers
The frontend architecture follows a clear directory structure that separates concerns:

1. **Routing & Pages (`app/`)**
   - We use Next.js App Router. Each folder inside `app/` corresponds to a route (e.g., `app/dashboard/page.tsx` maps to `/dashboard`).
   - Pages handle data fetching and pass data down to components.
   - *How to extend:* To add a new page (e.g., `/settings`), create a folder `app/settings/` and add a `page.tsx` file inside it.

2. **UI Components (`components/`)**
   - Reusable UI elements (buttons, modals, headers) that do not depend on the route.
   - Divided into logical subfolders (e.g., `components/layout`, `components/ui`).
   - *How to extend:* Build your atomic components here and reuse them across different pages.

3. **API Integration (`lib/api/` or direct fetches)**
   - The frontend communicates with the backend via REST API. 
   - Note: To avoid CORS issues during development, API calls starting with `/api/v1/...` are proxied to the backend via `next.config.ts` rewrites.

4. **Translations (`messages/`)**
   - Contains JSON files (`en.json`, `ru.json`, `tg.json`) for multi-language support.
   - *How to extend:* When adding new text to the UI, define the keys here and use the `useTranslations` hook in your components.

### Adding New Features
To add a new feature to the platform:
1. Identify if it needs a new route or just a component.
2. If it's a route, create the folder and `page.tsx` in `app/`.
3. Create the UI building blocks in `components/`.
4. Add necessary text translations in `messages/`.
5. Connect your components to the backend API endpoints.

---

## Contributing
Direct commits to the `main` branch are disabled. Please fork this repository and create a new feature branch for your work.

For a comprehensive guide covering branch management, commit standards, and Pull Request formatting, please carefully read the global [CONTRIBUTING.md](https://github.com/social-housing/.github/blob/main/profile/CONTRIBUTING.md).
