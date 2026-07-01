# Wakaf MVP System Design

## 1. Architecture
- **Framework:** Next.js 14+ utilizing the **App Router** (`src/app`).
- **Language:** TypeScript for type safety and better developer experience.
- **Deployment:** Recommended Vercel deployment for seamless CI/CD and edge caching.

## 2. Data & State Management
- **State Management:** React Context API for global state (e.g., user session mock) and localized React Hooks (`useState`, `useReducer`) for component-level state.
- **Data Persistence:** For the MVP, we will use mock JSON data stored in a `src/data` directory. User interactions (like simulated donations) can be temporarily stored in the browser's `localStorage`.

## 3. Styling Strategy
- **Vanilla CSS:** We will use standard CSS Modules (`*.module.css`) to maintain scoped styles without relying on heavy frameworks like Tailwind.
- **Design System:** A global `globals.css` file will define CSS variables (custom properties) for a vibrant color palette, typography (Inter or Roboto via next/font), and spacing tokens to ensure a premium, rich aesthetic.

## 4. UI/UX Principles
- **Glassmorphism & Gradients:** Subtle use of glassmorphic cards and soft gradients for a modern look.
- **Micro-animations:** CSS transitions on hover states, buttons, and page loads to make the application feel responsive and alive.
