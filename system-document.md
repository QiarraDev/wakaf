# Wakaf Konstruksi - MVP System Document

## Product Name
Wakaf Konstruksi

## Product Summary
Wakaf Konstruksi is a trust-first digital platform for construction-based wakaf projects. The product helps donors fund construction projects, helps project owners submit needs, and helps administrators track progress and release funds only after milestone verification.

**The MVP proves one core promise: wakaf money can be tracked transparently from donation to physical construction outcome.**

## Problem Statement
Wakaf construction suffers from three main issues:

1. **Trust Gap**: Donors often do not trust where funds go
2. **Project Disorganization**: Projects are poorly organized and can stall or become unclear
3. **Verification Difficulty**: Construction progress is hard to verify for ordinary donors

## Product Vision
Build a transparent wakaf construction ecosystem where:
- Each donation is linked to a real project
- Each project is linked to verifiable milestones
- Each milestone is linked to controlled fund release

## MVP Objective
Demonstrate a working end-to-end flow for:
- Browsing projects
- Making a donation
- Storing funds in a locked/pending state
- Uploading project progress evidence
- Verifying milestone completion
- Releasing funds in stages
- Showing donors clear transaction and progress history

## MVP Success Criteria
The MVP is successful if:
- Users can clearly understand and trust the flow
- Team can demonstrate a believable operational process
- Can show:
  - One donor contributing to one project
  - One project moving through multiple milestones
  - One admin approving evidence
  - One simulated fund release
  - One donor receiving a receipt/wakaf certificate

## Target Users

### Donor (Wakif)
A person who wants to give wakaf funds and monitor the result. Primary goal: transparency and trust.

### Project Owner
An institution, committee, or representative that manages a construction project. Primary goal: clear communication with donors.

### Admin (Nazhir)
An internal operator who manages projects, validates progress, and controls the system. Primary goal: operational efficiency and audit trail.

### Verifier
A trusted reviewer who confirms whether a milestone has been completed based on submitted evidence. Primary goal: quality assurance.

## MVP Scope

### In Scope ✓
- Project listing and project detail pages
- Donation form with mock payment flow
- Donation status tracking (locked/pending/released)
- Milestone progress tracking with visual timeline
- Evidence upload (photo/document)
- Verification review interface
- Simulated escrow and disbursement flow
- Receipt/certificate generation
- Basic admin dashboard
- Audit logging for all actions
- Role-based access control

### Out of Scope ✗
- Contractor bidding marketplace
- Advanced payment reconciliation automation
- Full bank integration for real escrow (MVP uses simulated escrow)
- LMS and certification modules
- AI-based image verification
- Mobile app (responsive web MVP)
- Advanced analytics
- Notification system (Phase 2+)

## Product Rules
- Donor funds must never appear as directly controlled by the project owner
- Each project must have milestones
- Each milestone must have a status (pending, in_progress, approved, completed)
- Funds may only be released after milestone approval
- All administrative actions must be logged with timestamp and user
- Every donation must have a traceable record
- Every uploaded evidence item must be linked to a milestone
- No donation record should be editable without audit logging
- No disbursement should happen without verification approval

## Business Logic

### Donation Flow
1. Donor submits donation on project detail page
2. System creates donation record with `escrow_status: locked`
3. Payment is marked as `received` (simulated)
4. Funds remain locked until milestone is approved
5. Donor receives confirmation with certificate/receipt option
6. Donor can track donation status on donor dashboard

### Milestone Flow
1. Project is broken into stages: foundation → structure → roofing → finishing → handover
2. Each milestone has:
   - Target percentage of total budget
   - Progress photos requirement
   - Status tracking (pending → in_progress → approved → completed)
   - Evidence submission deadline

### Verification Flow
1. Project owner uploads evidence (photos, documents, notes) for a milestone
2. Verifier reviews evidence with a structured checklist
3. Verifier can approve or request revisions with feedback
4. On approval, milestone status → `approved` and funds become releasable
5. All verification actions logged with timestamp and notes

### Disbursement Flow
1. Disbursement record created for each approved milestone
2. Shows: amount, status, timestamp, related evidence approval
3. Status progresses: pending → released → completed
4. Releases funds from escrow to project owner

### Certificate Flow
1. After successful donation, donor receives wakaf certificate
2. Certificate displays: donor name, project, amount, date, unique reference
3. Certificate is downloadable as PDF
4. Certificate references donation ID for traceability

## Roles and Permissions

### Donor
- ✓ View public projects (listing, detail)
- ✓ Submit donation
- ✓ View own donation history
- ✓ View project progress and milestones
- ✓ Download certificate/receipt
- ✓ View donation timeline/history

### Project Owner
- ✓ Submit project details (if admin grants)
- ✓ Upload milestone evidence
- ✓ View project dashboard
- ✓ Track milestone approval status
- ✗ Access other projects' data
- ✗ Release funds directly

### Verifier
- ✓ Review submitted evidence
- ✓ Approve/reject milestone claims
- ✓ Add verification notes
- ✓ View all projects' evidence
- ✗ Release funds
- ✗ Manage users

### Admin
- ✓ Manage users and roles
- ✓ Create/edit/delete projects
- ✓ Manage milestones
- ✓ Approve/reject evidence
- ✓ Release funds manually
- ✓ View complete audit logs
- ✓ View financial dashboard
- ✓ Create reports

## Key Screens

### Public Screens
- **Landing Page**: Hero section, platform overview, call-to-action
- **Project Catalog**: List of all active projects with search/filter
- **Project Detail**: Full project info, milestones, donation CTA
- **Donation Checkout**: Modal/form with amount, confirmation, mock payment

### Donor Screens
- **Donor Dashboard**: My donations, quick stats, recent activity
- **Donation History**: Detailed list with status, amount, project link
- **Progress Timeline**: Visual milestone timeline with evidence
- **Certificate Page**: Download/view certificate, share option

### Admin Screens
- **Project Management**: Create/edit/view all projects
- **Milestone Review**: Evidence review interface with decision tools
- **Fund Release**: Approve/release funds with logging
- **Financial Dashboard**: Total collected, released, pending by project
- **Audit Log**: All system actions with filters
- **User Management**: Manage roles and permissions

## User Experience Principles
- **Trustworthiness**: Clear, transparent fund movement visualization
- **Simplicity**: Minimal friction for donors, clear workflows for admins
- **Clarity**: Information hierarchy prioritizes:
  1. Project trust (description, milestones)
  2. Amount raised (progress bar, target)
  3. Milestone progress (timeline with status)
  4. Evidence (photos, verification status)
  5. Fund movement (locked → released)
- **Feedback**: Clear confirmation for all actions, status updates
- **Accessibility**: WCAG AA compliance, readable fonts, sufficient contrast

## Data Integrity Principles
- Preserve clear audit trail for all actions
- No donation record editable without logging
- No disbursement without approval
- Evidence remains tied to milestone it supports
- All manual changes traceable through audit logs
- Timestamp all state transitions

## Operational Assumptions for MVP
- MVP uses simulated escrow logic (no real bank integration)
- UI and data model clearly represent: locked → pending → approved → released states
- All workflows must be convincingly demonstrable
- Authentication uses JWT or session-based (no OAuth in MVP)
- File uploads stored in local or S3-like storage
- Email notifications optional (Phase 2+)

## Recommended MVP Build Order
1. **Phase 1**: Authentication and role setup
2. **Phase 2**: Project listing and detail pages
3. **Phase 3**: Donation form and records
4. **Phase 4**: Milestone tracking and UI
5. **Phase 5**: Evidence upload and review
6. **Phase 6**: Simulated fund release
7. **Phase 7**: Certificate generation
8. **Phase 8**: Audit logging and finalization

## Definition of Done
The MVP is done when:
- ✓ User can donate to a project
- ✓ System records donation with locked status
- ✓ Project progresses through milestones
- ✓ Evidence can be uploaded and reviewed
- ✓ Admin can approve milestone and release funds
- ✓ Donation shown as contributing to real progress
- ✓ Donor can download certificate
- ✓ All actions are logged

---

# UI/UX Design System (shadcn/ui)

## Design Philosophy
**Trust through Transparency**: The UI should feel secure, professional, and transparent. Construction-focused wakaf requires confidence that funds are being properly managed and construction is happening.

## Color Palette

### Primary Colors (Trust & Security)
- **Primary Blue** `#1e40af`: Professional, trustworthy primary actions
- **Success Green** `#16a34a`: Approved milestones, successful donations
- **Warning Amber** `#d97706`: Pending/locked states, caution
- **Danger Red** `#dc2626`: Rejected, failed states

### Neutral Colors
- **Background** `#ffffff` or `#f9fafb` (light)
- **Text Primary** `#111827` (near-black)
- **Text Secondary** `#6b7280` (gray)
- **Border** `#e5e7eb` (light gray)
- **Divider** `#f3f4f6` (very light)

### Islamic Heritage Accent (Optional)
- **Gold Accent** `#d4af37`: Special certificates, premium badges
- **Deep Teal** `#0f766e`: Secondary emphasis (alternative to blue)

## Typography

### Font Stack
```
Font Family: "Inter", "Segoe UI", system-ui, sans-serif
```

### Hierarchy
- **H1 (Hero)**: 32-40px, weight 700, line-height 1.2
  - Landing page hero, section titles
- **H2 (Section)**: 24-28px, weight 600, line-height 1.3
  - Page titles, major sections
- **H3 (Subsection)**: 18-20px, weight 600, line-height 1.4
  - Subsection headers
- **Body Large**: 16px, weight 400, line-height 1.5
  - Primary content, project descriptions
- **Body**: 14px, weight 400, line-height 1.5
  - Standard text, card content
- **Body Small**: 12px, weight 400, line-height 1.5
  - Metadata, timestamps, helper text
- **Label**: 12px, weight 500, line-height 1.4
  - Form labels, buttons

## Component Library (shadcn/ui)

### Core Components
1. **Button**: Primary (blue), Secondary (outline), Danger (red)
   - Sizes: sm (12px), md (14px), lg (16px)
   - States: default, hover, active, disabled
   
2. **Card**: Clean white cards with subtle border
   - Used for: projects, donations, milestones, evidence items
   - Padding: 20px or 24px
   
3. **Badge**: Colored status indicators
   - Success (green): approved, completed, released
   - Warning (amber): pending, locked, in_progress
   - Danger (red): rejected, cancelled
   
4. **Progress Bar**: Visual donation progress
   - Shows raised vs target amount
   - Labeled with percentage
   
5. **Modal/Dialog**: Donation form, evidence upload, confirmations
   - Clean, centered, with clear close action
   
6. **Tabs**: Switch between donation history, project details sections
7. **Forms**: Input, Select, Textarea, File upload with clear validation
8. **Tables**: Admin dashboards, audit logs (responsive scrolling on mobile)
9. **Tooltip**: Explain locked funds, approval status, etc.
10. **Skeleton**: Loading states for project cards, donation list

## Spacing & Layout

### Grid System
- Margin/Padding base unit: 4px
- Spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px

### Container Widths
- Mobile: full width (16px padding)
- Tablet (768px): max-width 720px
- Desktop (1024px+): max-width 1280px

### Component Spacing
- Card margins: 16px vertical, 16px horizontal on mobile; 24px on desktop
- Section margins: 48px vertical
- Component padding: 16-24px

## Visual Patterns

### Donation Status Indicator
```
[Status Badge] + [Amount] + [Progress Bar] + [Action Button]
Example: [LOCKED] Rp 5.000.000 [████░░░░░░] 40% → [View Progress]
```

### Milestone Timeline
- Vertical timeline with: icon → title → status → % of budget
- Approved: checkmark (green), locked (amber), rejected (red)
- Expandable to show evidence + verification details

### Evidence Gallery
- Grid layout (2-3 columns on desktop)
- Thumbnail images with verification badge
- Hover to see: timestamp, uploader, verification notes
- Click to expand full image

### Financial Dashboard
- **Key Metrics Cards**: Total Raised, Locked, Approved, Released (4 cards)
- **Bar Chart**: Funds by project
- **Timeline Chart**: Fund movement over time
- **Transaction Table**: Sortable, filterable

## Interactive Elements

### Hover States
- Buttons: background color shift, subtle shadow
- Cards: lift slightly (shadow), border highlight
- Links: underline, color change

### Loading States
- Skeleton screens for lists and cards
- Spinner overlay for modals/forms
- Progress bar for file uploads

### Success/Error States
- Success: green toast/banner, checkmark icon
- Error: red toast/banner, X icon
- Warning: amber toast/banner, alert icon

## Accessibility Guidelines

### Color Contrast
- All text must meet WCAG AA standards (4.5:1 for normal text)
- Don't rely on color alone (use icons, text labels, patterns)

### Interactive Elements
- Minimum touch target: 44x44px (mobile)
- Keyboard navigation: Tab, Enter, Escape, Arrow keys
- Focus indicators: visible blue outline or shadow
- ARIA labels: buttons, form inputs, status indicators

### Forms
- Clear labels for all inputs
- Error messages in red with icon
- Help text below inputs
- Required field indicator (*)

## Responsive Breakpoints
```
Mobile: < 768px (full width, single column, large touch targets)
Tablet: 768px - 1024px (2-column layouts where appropriate)
Desktop: 1024px+ (multi-column, side navigation)
```

## Dark Mode (Future Enhancement)
- Inverse colors: `#0f172a` background, `#f1f5f9` text
- Preserve contrast ratios and accent colors

---

# High-Level Architecture

## Tech Stack
- **Frontend**: Next.js 14+ with TypeScript
- **UI Library**: shadcn/ui + Tailwind CSS
- **Backend**: Node.js API (NestJS or Express)
- **Database**: PostgreSQL (relational for audit trail)
- **File Storage**: Local storage (MVP) or S3-compatible (production-ready)
- **Authentication**: JWT with refresh tokens
- **Deployment**: Vercel (frontend), Railway/Render (backend)

## Database Schema (Simplified for MVP)

### Core Tables
```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role ENUM('donor', 'project_owner', 'verifier', 'admin'),
  status ENUM('active', 'inactive', 'suspended'),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  target_amount BIGINT NOT NULL,
  raised_amount BIGINT DEFAULT 0,
  status ENUM('draft', 'active', 'completed', 'cancelled'),
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Milestones
CREATE TABLE milestones (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  name VARCHAR(255) NOT NULL,
  target_percentage INT,
  status ENUM('pending', 'in_progress', 'approved', 'completed'),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Donations
CREATE TABLE donations (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  donor_id UUID REFERENCES users(id),
  amount BIGINT NOT NULL,
  payment_status ENUM('pending', 'received', 'failed'),
  escrow_status ENUM('locked', 'pending', 'approved', 'released'),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Evidence Uploads
CREATE TABLE evidence_uploads (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  milestone_id UUID REFERENCES milestones(id),
  uploaded_by UUID REFERENCES users(id),
  file_url VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Verifications
CREATE TABLE verifications (
  id UUID PRIMARY KEY,
  evidence_id UUID REFERENCES evidence_uploads(id),
  verifier_id UUID REFERENCES users(id),
  decision ENUM('approved', 'rejected', 'pending'),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Disbursements
CREATE TABLE disbursements (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  milestone_id UUID REFERENCES milestones(id),
  amount BIGINT NOT NULL,
  status ENUM('pending', 'released', 'completed'),
  released_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Audit Log
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  action VARCHAR(255) NOT NULL,
  actor_id UUID REFERENCES users(id),
  resource_type VARCHAR(100),
  resource_id UUID,
  changes JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints (MVP)

### Authentication
```
POST   /api/auth/register          → Create donor account
POST   /api/auth/login             → JWT token
POST   /api/auth/logout            → Clear session
GET    /api/auth/me                → Current user profile
```

### Projects (Public)
```
GET    /api/projects               → List all active projects
GET    /api/projects/:id           → Project detail with milestones
GET    /api/projects/:id/milestones → Milestones for project
```

### Donations
```
POST   /api/donations              → Create donation (mock payment)
GET    /api/donations/:id          → Donation detail
GET    /api/donations              → My donations (donor only)
GET    /api/projects/:id/donations → All donations for project (admin)
```

### Evidence & Verification
```
POST   /api/evidence               → Upload evidence
GET    /api/evidence/:id           → Evidence detail
GET    /api/projects/:id/evidence  → All evidence for project
POST   /api/verifications          → Submit verification decision
GET    /api/verifications          → Pending verifications (verifier only)
```

### Admin
```
POST   /api/projects               → Create project (admin only)
PATCH  /api/projects/:id           → Edit project
PATCH  /api/milestones/:id         → Update milestone
POST   /api/disbursements/release  → Release funds
GET    /api/audit-logs             → Audit log (admin only)
GET    /api/dashboard              → Financial dashboard (admin only)
```

## MVP Release Strategy

### Phase 1: Core Flows (Week 1-2)
- Project listing & detail pages
- Donation form with mock payment
- Donor dashboard

### Phase 2: Verification (Week 3)
- Evidence upload interface
- Admin verification dashboard
- Simulated fund release

### Phase 3: Polish & Deploy (Week 4)
- Certificate generation
- Audit logging
- Performance & security review
- Deployment to production

---

# Success Metrics & KPIs

- Number of projects created and active
- Donation conversion rate (visitors → donors)
- Average donation amount
- Percentage of donors revisiting project progress
- Number of milestones approved
- Time from evidence upload to verification
- Total funds tracked through complete flow
- System uptime

---

# Notes for Development

This document is structured for rapid MVP development. Prioritize:

1. **End-to-end user journey** over feature completeness
2. **Data integrity & audit trails** over advanced features
3. **Clear UI/UX** over premium animations
4. **Demonstrability** over production scale

Use shadcn/ui components as prescribed. Keep styling consistent. Focus on trust-building visual elements (progress bars, status indicators, timelines, certificates).
