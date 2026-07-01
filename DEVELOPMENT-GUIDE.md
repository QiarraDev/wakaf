# 🛠️ Development Guide - Wakaf Konstruksi MVP

Quick guide untuk melanjutkan development setelah MVP landing page.

---

## 📋 Phase 2: Campaign Pages

### 1. Campaign Listing Page (`/campaigns`)

**File**: `src/app/campaigns/page.tsx`

```tsx
// Template untuk campaign listing dengan filter/search
import { mockCampaigns } from '@/data/mock-campaigns';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import styles from './page.module.css';

export default function CampaignsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Semua Program Wakaf</h1>
        <p>Pilih program wakaf yang ingin Anda dukung</p>
      </header>
      
      <div className={styles.filters}>
        {/* Filter by category */}
        {/* Search bar */}
        {/* Sort options */}
      </div>
      
      <div className={styles.campaignGrid}>
        {mockCampaigns.map((campaign) => (
          <Card key={campaign.id}>
            {/* Campaign card component */}
          </Card>
        ))}
      </div>
    </div>
  );
}
```

**Styling Tips**:
- Use the same grid layout as landing page
- Add filter section at top with buttons/select
- Use consistent spacing (24px gap between cards)

---

### 2. Campaign Detail Page (`/campaigns/[id]`)

**File**: `src/app/campaigns/[id]/page.tsx`

```tsx
// Template untuk campaign detail dengan donasi flow
interface CampaignDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function CampaignDetails({ params }: CampaignDetailsProps) {
  const { id } = await params;
  const campaign = mockCampaigns.find((c) => c.id === parseInt(id));
  
  if (!campaign) return <div>Campaign not found</div>;
  
  return (
    <div className={styles.container}>
      <div className={styles.heroImage}>
        {/* Full-width campaign image */}
      </div>
      
      <div className={styles.content}>
        <section className={styles.projectInfo}>
          {/* Title, description, organization info */}
        </section>
        
        <section className={styles.progressSection}>
          {/* Large progress bar, target amount, donors count */}
        </section>
        
        <section className={styles.milestonesSection}>
          {/* Milestone timeline */}
        </section>
        
        <aside className={styles.donationBox}>
          {/* Donation form (Phase 2-3) */}
          {/* Call to action */}
        </aside>
      </div>
    </div>
  );
}
```

**Key Components**:
- Large hero image at top
- Project description
- Milestone timeline (expandable)
- Donation sidebar
- Recent donors list

---

## 💳 Phase 2-3: Donation Flow

### Donation Form Component

**File**: `src/components/campaigns/DonationForm.tsx`

```tsx
interface DonationFormProps {
  campaignId: string;
  targetAmount: number;
}

export const DonationForm: React.FC<DonationFormProps> = ({
  campaignId,
  targetAmount,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Validate form
    // 2. Create donation record
    // 3. Show mock payment modal
    // 4. Redirect to success/certificate page
  };
  
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Lakukan Wakaf Sekarang</h3>
      
      <div className={styles.formGroup}>
        <label>Nama Lengkap</label>
        <input 
          type="text"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          placeholder="Masukkan nama Anda"
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Email</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan email Anda"
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Jumlah Wakaf</label>
        <input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Rp 0"
          min="100000"
        />
        <p className={styles.hint}>Minimum: Rp 100.000</p>
      </div>
      
      <div className={styles.summary}>
        <div>Total Wakaf: <strong>Rp {parseInt(amount).toLocaleString('id-ID')}</strong></div>
      </div>
      
      <Button variant="primary" size="lg" fullWidth>
        Lanjutkan ke Pembayaran
      </Button>
    </form>
  );
};
```

### Mock Payment Modal

```tsx
interface MockPaymentModalProps {
  isOpen: boolean;
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}

export const MockPaymentModal: React.FC<MockPaymentModalProps> = ({
  isOpen,
  amount,
  onSuccess,
  onClose,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const simulatePayment = async () => {
    setIsProcessing(true);
    // Simulate 2 second payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onSuccess();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Konfirmasi Wakaf</h2>
        <p>Jumlah: <strong>Rp {amount.toLocaleString('id-ID')}</strong></p>
        <p className={styles.notice}>
          Ini adalah simulasi pembayaran untuk MVP demo
        </p>
        <div className={styles.actions}>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button 
            variant="primary" 
            onClick={simulatePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Memproses...' : 'Bayar Sekarang'}
          </Button>
        </div>
      </div>
    </div>
  );
};
```

---

## 📊 Phase 3: Dashboard

### Donor Dashboard (`/dashboard`)

**File**: `src/app/dashboard/page.tsx`

```tsx
// Stats cards, donation history, impact summary
export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <h1>Dashboard Donor</h1>
      
      <div className={styles.statsGrid}>
        <StatsCard 
          label="Total Wakaf"
          value="Rp 15.000.000"
          icon="heart"
        />
        <StatsCard 
          label="Terkunci (Escrow)"
          value="Rp 10.000.000"
          icon="lock"
        />
        <StatsCard 
          label="Dilepaskan"
          value="Rp 5.000.000"
          icon="check"
        />
        <StatsCard 
          label="Program Diikuti"
          value="3"
          icon="target"
        />
      </div>
      
      <section className={styles.donationHistory}>
        <h2>Riwayat Wakaf</h2>
        {/* Donation list with status badges */}
      </section>
      
      <section className={styles.impact}>
        <h2>Impact Tracker</h2>
        {/* Show how donations are being used */}
      </section>
    </div>
  );
}
```

---

## 🔐 Phase 4: Admin Panel

### Admin Dashboard (`/admin`)

**File**: `src/app/admin/page.tsx`

```tsx
export default function AdminDashboardPage() {
  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      
      <div className={styles.metrics}>
        <MetricCard title="Total Collected" value="Rp 2.5B" trend="+12%" />
        <MetricCard title="In Escrow" value="Rp 1.8B" trend="0%" />
        <MetricCard title="Released" value="Rp 700M" trend="+8%" />
        <MetricCard title="Active Projects" value="24" trend="+3" />
      </div>
      
      <section className={styles.projects}>
        <h2>Kelola Project</h2>
        <Button variant="primary">+ Buat Project Baru</Button>
        {/* Project table */}
      </section>
      
      <section className={styles.pending}>
        <h2>Verifikasi Milestone</h2>
        {/* Pending evidence review */}
      </section>
      
      <section className={styles.audit}>
        <h2>Audit Log</h2>
        {/* Activity log table */}
      </section>
    </div>
  );
}
```

---

## 🗂️ Project Structure Recommendations

```
src/
├── app/
│   ├── campaigns/
│   │   ├── [id]/
│   │   │   ├── page.tsx           (Campaign detail)
│   │   │   └── page.module.css
│   │   ├── page.tsx               (Campaign listing)
│   │   └── page.module.css
│   ├── dashboard/
│   │   ├── page.tsx               (Donor dashboard)
│   │   └── page.module.css
│   ├── admin/
│   │   ├── page.tsx               (Admin dashboard)
│   │   ├── projects/              (Manage projects)
│   │   ├── verify/                (Verify milestones)
│   │   └── page.module.css
│   ├── simulasi/
│   │   ├── page.tsx               (Wakaf simulator)
│   │   └── page.module.css
│   └── layout.tsx
├── components/
│   ├── campaigns/
│   │   ├── DonationForm.tsx        ✨ NEW
│   │   ├── DonationModal.tsx       ✨ NEW
│   │   ├── MilestoneTimeline.tsx   ✨ NEW
│   │   └── CertificateModal.tsx
│   ├── dashboard/
│   │   ├── StatsCard.tsx           ✨ NEW
│   │   ├── DonationHistory.tsx     ✨ NEW
│   │   └── ImpactTracker.tsx       ✨ NEW
│   ├── admin/
│   │   ├── ProjectList.tsx         ✨ NEW
│   │   ├── VerificationPanel.tsx   ✨ NEW
│   │   ├── FundReleaseForm.tsx     ✨ NEW
│   │   └── AuditLog.tsx            ✨ NEW
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx               ✨ NEW
│   │   ├── Modal.tsx               ✨ NEW
│   │   ├── Table.tsx               ✨ NEW
│   │   ├── Tabs.tsx                ✨ NEW
│   │   └── Form.tsx                ✨ NEW
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── hooks/
│   ├── useDonations.ts             ✨ NEW
│   ├── useMilestones.ts            ✨ NEW
│   └── useAuth.ts                  ✨ NEW
├── context/
│   └── AppContext.tsx              ✨ NEW (for global state)
├── types/
│   ├── campaign.ts                 ✨ NEW
│   ├── donation.ts                 ✨ NEW
│   ├── milestone.ts                ✨ NEW
│   └── user.ts                     ✨ NEW
├── api/
│   ├── campaigns.ts                ✨ NEW (API calls)
│   ├── donations.ts                ✨ NEW
│   ├── verification.ts             ✨ NEW
│   └── admin.ts                    ✨ NEW
└── data/
    ├── mock-campaigns.ts
    ├── mock-donations.ts           ✨ NEW
    ├── mock-milestones.ts          ✨ NEW
    └── mock-users.ts               ✨ NEW
```

---

## 🎯 Component Checklist

### UI Components to Build
- [ ] Badge (status indicators)
- [ ] Modal/Dialog
- [ ] Table with sorting/pagination
- [ ] Tabs
- [ ] Form inputs (text, email, number, select)
- [ ] Textarea
- [ ] File upload
- [ ] Dropdown menu
- [ ] Tooltip
- [ ] Alert/Toast
- [ ] Skeleton loader
- [ ] Spinner

### Feature Components to Build
- [ ] DonationForm
- [ ] DonationModal
- [ ] MilestoneTimeline
- [ ] EvidenceUploader
- [ ] VerificationPanel
- [ ] CertificateViewer
- [ ] StatsCard
- [ ] DonationHistory
- [ ] ProjectManagementTable
- [ ] AuditLogViewer

---

## 📝 Styling Conventions

### CSS Module Pattern
```tsx
// Component.tsx
import styles from './Component.module.css';

export const Component = () => {
  return <div className={styles.container}></div>;
};

// Component.module.css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 16px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .container {
    padding: 16px 12px;
  }
  
  .title {
    font-size: 24px;
  }
}
```

### Utility Classes (in globals.css)
```css
.container { max-width: 1280px; margin: 0 auto; }
.badge { display: inline-flex; padding: 4px 12px; border-radius: 9999px; }
.status-indicator { display: inline-flex; align-items: center; gap: 6px; }
```

---

## 🧪 Testing Setup (Optional for MVP)

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Example test**:
```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with primary variant', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('primary');
  });
});
```

---

## 🚀 Performance Tips

1. **Image Optimization**: Use Next.js `Image` component
   ```tsx
   import Image from 'next/image';
   <Image src="/path.jpg" alt="desc" width={800} height={600} />
   ```

2. **Code Splitting**: Dynamic imports for large components
   ```tsx
   const DonationForm = dynamic(() => import('./DonationForm'));
   ```

3. **Data Fetching**: Use Server Components where possible
   ```tsx
   // In app directory, components are Server by default
   export default async function Page() {
     const data = await fetch(...);
   }
   ```

4. **Caching**: Implement proper cache headers
   ```tsx
   export const revalidate = 3600; // ISR: revalidate every hour
   ```

---

## 🔗 Data Flow Example

```
Landing Page (Static)
    ↓
Campaign Listing (Server Component with mock data)
    ↓
Campaign Detail (Dynamic route with [id])
    ↓ (User clicks "Wakaf Sekarang")
Donation Form (Client Component with state)
    ↓ (Form submit)
Mock Payment Modal (Client Component)
    ↓ (Success)
Certificate Page (Dynamic route with donation ID)
    ↓
Donor Dashboard (Protected route, requires auth)
```

---

## 📞 Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Test build
npm start

# Lint
npm run lint

# Format code (add eslint rule if needed)
npm run lint -- --fix

# Clean install
rm -rf node_modules package-lock.json && npm install
```

---

## 🎓 Next Learning Resources

1. **Next.js Docs**: https://nextjs.org/docs
2. **React Docs**: https://react.dev
3. **Tailwind CSS**: https://tailwindcss.com
4. **shadcn/ui**: https://ui.shadcn.com

---

## 📌 Important Notes

1. **Always use TypeScript** for type safety
2. **Keep components small** and reusable
3. **Use CSS Modules** over inline styles for isolation
4. **Mobile-first design** - build mobile first, then enhance
5. **Accessibility matters** - use semantic HTML, ARIA labels
6. **Test your changes** before pushing

---

**Last Updated**: July 1, 2026  
**Version**: MVP Development Guide v1
