# system-design.md

## Overview
Wakaf Konstruksi is a trust-first wakaf construction platform that lets donors fund projects, project owners submit needs, and construction partners execute work with transparent milestone-based disbursement.

The MVP should prove one thing well: **money moves only through controlled escrow-like flow, and every project update is visible and verifiable**.

## MVP Goals
- Let donors browse active wakaf construction projects.
- Let donors contribute to a selected project.
- Show donation status and project progress transparently.
- Support milestone-based approval and release flow.
- Generate a simple wakaf receipt or certificate.
- Give admins a way to create projects and update progress.

## Non-Goals for MVP
- Full procurement marketplace.
- Advanced contractor bidding engine.
- LMS and certification system.
- Complex AI verification.
- Full regulatory automation.

## User Roles
### Donor
Views projects, contributes funds, tracks progress, and receives updates.

### Project Owner
Submits a project, uploads progress evidence, and requests milestone review.

### Admin
Creates and manages projects, approves evidence, and updates milestones.

### Verifier
Checks submitted evidence and approves or rejects milestone claims.

## Core User Journeys
### Donation Journey
1. Donor opens project list.
2. Donor selects a project.
3. Donor enters amount and submits donation.
4. Donation is recorded as locked or pending release.
5. Donor receives receipt and project update access.

### Project Execution Journey
1. Admin or project owner creates project.
2. Project receives donations.
3. Construction progresses by milestone.
4. Evidence is uploaded for review.
5. Verifier approves evidence.
6. Funds are released per milestone.

### Transparency Journey
1. Donor opens project dashboard.
2. Donor sees target, raised amount, milestone status, and photos.
3. Donor can view transaction history and updates.

## High-Level Architecture
### Frontend
A web app with donor and admin views.
Recommended stack for MVP:
- Next.js or similar React-based frontend
- Tailwind CSS or similar UI system
- Chart components for progress visualization

### Backend
A simple API server that handles:
- authentication
- project CRUD
- donation records
- milestone status updates
- evidence uploads
- receipt generation

Recommended stack for MVP:
- Node.js with NestJS or Express
- REST API first

### Database
Relational database is recommended for auditability.
Suggested tables:
- users
- roles
- projects
- project_milestones
- donations
- payment_transactions
- evidence_uploads
- verifications
- disbursements
- notifications
- receipts

### Storage
Use object storage for:
- project images
- milestone photos
- receipts
- supporting documents

### Payments and Escrow Simulation
For MVP, start with a simulated escrow ledger.
Later, integrate a payment gateway and bank transfer rails.
MVP should preserve a clear separation between:
- money received
- money locked
- money released

### Notification Layer
Send updates through:
- email
- WhatsApp or Telegram later
- in-app notifications for MVP

## Data Model Summary
### users
- id
- name
- email
- phone
- role
- status
- created_at

### projects
- id
- title
- description
- location
- target_amount
- raised_amount
- status
- owner_id
- created_at

### project_milestones
- id
- project_id
- name
- target_percentage
- status
- approved_by
- approved_at

### donations
- id
- project_id
- donor_id
- amount
- payment_status
- escrow_status
- created_at

### evidence_uploads
- id
- project_id
- milestone_id
- uploaded_by
- file_url
- notes
- created_at

### verifications
- id
- evidence_id
- verifier_id
- decision
- notes
- created_at

### disbursements
- id
- project_id
- milestone_id
- amount
- status
- released_at

## MVP API Endpoints
### Auth
- POST /auth/login
- POST /auth/logout
- GET /auth/me

### Projects
- GET /projects
- POST /projects
- GET /projects/:id
- PATCH /projects/:id

### Milestones
- GET /projects/:id/milestones
- POST /projects/:id/milestones
- PATCH /milestones/:id

### Donations
- POST /donations
- GET /donations/:id
- GET /projects/:id/donations

### Evidence and Verification
- POST /evidence
- GET /projects/:id/evidence
- POST /verifications

### Disbursement
- POST /disbursements/release
- GET /projects/:id/disbursements

### Notifications
- GET /notifications
- POST /notifications/test

## MVP Screens
### Public
- Landing page
- Project list
- Project detail page
- Donation confirmation page

### Donor Dashboard
- My donations
- Project progress timeline
- Receipt and certificate

### Admin Dashboard
- Create project
- Update project progress
- Review evidence
- Approve milestone
- Release funds

## Security and Audit Requirements
- Role-based access control.
- Every fund movement logged.
- Every milestone approval timestamped.
- Evidence and receipts stored immutably.
- Admin actions must be traceable.

## Success Metrics for MVP
- Number of projects created.
- Donation conversion rate.
- Percentage of donors who revisit project progress.
- Number of milestones approved.
- Time from evidence upload to verification.
- Total funds successfully tracked through the flow.

## MVP Release Strategy
### Phase 1
Build donor-facing project browsing and donation flow.

### Phase 2
Add admin project management and milestone tracking.

### Phase 3
Add evidence verification and simulated escrow release.

### Phase 4
Add receipts, certificates, notifications, and analytics.

## Recommended Tech Stack
- Frontend: Next.js
- Backend: Node.js API
- Database: PostgreSQL
- File storage: S3-compatible storage
- Auth: JWT or session-based auth
- Hosting: Vercel for frontend, Render or Railway for backend

## Notes for Antigravity or Kiro Use
This document is intentionally structured so an AI coding assistant can generate:
- database schema
- API routes
- UI pages
- service modules
- state management
- test cases

The first build should focus on the donation and milestone flow only.
