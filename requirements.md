# Wakaf MVP Requirements

## 1. Overview
The Wakaf Platform is a modern web application designed to facilitate Islamic endowments (Wakaf). It connects donors (Wakif) with administrators (Nazhir) who manage specific charitable projects, such as building mosques, wells, or educational facilities.

## 2. User Roles
- **Wakif (Donor):** Can browse active campaigns, view campaign details, make a donation, and track their contribution history.
- **Nazhir (Admin):** Can view an aggregate reporting dashboard to monitor total collected funds and a complete ledger of all transactions.

## 3. Core Features
- **Campaign Discovery:** View a list of ongoing Wakaf campaigns with progress bars, target amounts, and summaries.
- **Campaign Details:** Detailed view of a specific campaign including descriptions, updates, and photos.
- **Donation Flow (Mock):** An interactive modal/page to simulate a payment gateway integration for making a Wakaf contribution.
- **Wakif Dashboard:** A personalized page showing the user's past contributions and the impact of their Wakaf.
- **Wakaf Simulation (Calculator):** A dedicated tool to calculate the projected financial and social impact of routine wakaf contributions over a specified period.
- **Digital Wakaf Certificate:** A beautifully designed digital certificate that serves as proof of a successful wakaf transaction, which can be viewed and printed.
- **Admin Reporting Dashboard:** A specialized view for Nazhirs to track total platform donations and view detailed transaction logs.

## 4. Non-Functional Requirements
- **Framework:** Next.js.
- **Styling:** Vanilla CSS (CSS Modules) emphasizing premium, vibrant aesthetics with micro-animations.
- **Performance:** Optimized for fast page loads with server-side rendering (SSR) or static site generation (SSG) where applicable.
- **Responsive:** Mobile-first responsive design.
