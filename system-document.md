# Wakaf MVP System Documentation

## 1. Directory Structure

```text
/src
  /app
    layout.tsx           # Root layout (Navbar, Footer)
    page.tsx             # Landing Page (Hero, Featured Campaigns)
    /campaigns
      page.tsx           # List of all campaigns
      /[id]
        page.tsx         # Campaign details & donation
    /dashboard
      page.tsx           # Wakif contribution history
  /components
    /ui                  # Reusable atomic components (Button, Card, Modal)
    /campaigns           # Campaign specific components (CampaignList, Progress)
    /layout              # Navbar, Footer
  /lib
    utils.ts             # Helper functions (currency formatter, etc.)
  /data
    mock-campaigns.ts    # JSON data for MVP
```

## 2. Routing Map
- `/` - Home Page. Explains the platform and shows highlighted campaigns.
- `/campaigns` - Explore page to filter and search available Wakaf opportunities.
- `/campaigns/[id]` - Dynamic route for viewing a single campaign.
- `/dashboard` - Private route (mocked) to view user's Wakaf portfolio.
- `/admin` - Reporting dashboard for Nazhir to view aggregated transactions.

## 3. Key Components
- **`Button`:** Highly interactive, styled with CSS modules.
- **`CampaignCard`:** Displays image, title, and a progress bar.
- **`ProgressBar`:** A visual indicator of funds raised vs. target.
- **`DonationModal`:** A controlled component handling the mock transaction flow.
