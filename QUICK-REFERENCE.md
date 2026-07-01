# Wakaf Konstruksi MVP - Quick Reference

## 🎯 What is This MVP?

A trust-first landing page for Wakaf Konstruksi with:
- Beautiful hero section with animated shapes
- Featured campaigns showcase with progress bars
- Professional design system (shadcn/ui inspired)
- Fully responsive (mobile, tablet, desktop)
- Ready for Phase 2 development

---

## 🚀 How to Run

```bash
# Start dev server
npm run dev

# Open in browser
http://localhost:3001

# Stop server
Ctrl+C
```

---

## 📁 Where to Find Things

```
Landing Page:           src/app/page.tsx
Landing Styles:         src/app/page.module.css
Design System:          src/app/globals.css
Navigation:             src/components/layout/Navbar.tsx
Button Component:       src/components/ui/Button.tsx
Card Component:         src/components/ui/Card.tsx
Mock Data:              src/data/mock-campaigns.ts
Tailwind Config:        tailwind.config.ts
PostCSS Config:         postcss.config.mjs
```

---

## 🎨 Color Palette

```
Primary Blue:     #1e40af  (Buttons, headers)
Success Green:    #16a34a  (Approved states)
Warning Amber:    #d97706  (Pending, locked)
Danger Red:       #dc2626  (Errors)
Gold Accent:      #d4af37  (Certificates)
Dark Text:        #111827  (Primary text)
Light Border:     #e5e7eb  (Borders)
Light BG:         #f9fafb  (Background)
```

---

## 📐 Spacing Scale (4px Base)

```
4px   - Minimal
8px   - Compact
12px  - Small
16px  - Default (most common)
24px  - Medium
32px  - Large
48px  - Extra large
```

---

## 🔤 Typography

```
h1:    40px, weight 700  (Page heroes)
h2:    28px, weight 600  (Sections)
h3:    20px, weight 600  (Subsections)
Body:  16px, weight 400  (Main text)
Small: 14px, weight 400  (Cards)
Label: 12px, weight 500  (Buttons)
```

---

## 🧩 Component Usage

### Button
```tsx
<Button variant="primary" size="lg">Text</Button>
```
**Variants:** primary | secondary | outline | danger  
**Sizes:** sm | md | lg

### Card
```tsx
<Card className={styles.campaignCard}>
  {children}
</Card>
```

### Progress Bar
```tsx
<div className={styles.progressBar}>
  <div className={styles.progressFill} style={{ width: `${progress}%` }} />
</div>
```

---

## 🏗️ How to Add Something New

### New Page
1. Create: `src/app/yourpage/page.tsx`
2. Create: `src/app/yourpage/page.module.css`
3. Add route to Navbar.tsx
4. Run `npm run dev`

### New Component
1. Create: `src/components/ui/YourComponent.tsx`
2. Create: `src/components/ui/YourComponent.module.css`
3. Import and use in page
4. Run `npm run dev`

### New Color
1. Edit: `tailwind.config.ts` or `src/app/globals.css`
2. Run `npm run dev` (auto-reloads)

---

## 📋 Responsive Breakpoints

```
Mobile:    < 768px       (Full width, 1 column)
Tablet:    768-1024px    (2 columns)
Desktop:   1024px+       (3+ columns)
```

In CSS:
```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

---

## 🎬 Animations

- **Morphing shape:** 8 second loop
- **Fade in:** 300ms
- **Slide up:** 300ms from bottom
- **Card hover:** Lift + shadow
- **Button hover:** Color shift + shadow

---

## 🧪 Testing

**Responsive Design:**
F12 → Toggle device toolbar → Select device

**Performance:**
F12 → Lighthouse → Analyze page load

**Accessibility:**
F12 → Lighthouse → Check score

---

## 📞 Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 busy | Server auto-uses 3001 ✓ |
| npm install fails | Try `npm install --legacy-peer-deps` |
| Styles not updating | Check filename: must be `.module.css` |
| Component not found | Check import path |

---

## 📚 Documentation Files

- **MVP-STATUS.md** → What's implemented
- **DEVELOPMENT-GUIDE.md** → Build Phase 2-4
- **README-MVP.md** → Project overview
- **system-document.md** → Full design system

---

## 🎯 Next Phase Checklist

**Phase 2:** Campaign listing & detail pages  
**Phase 3:** Donation form & dashboard  
**Phase 4:** Admin panel & verification  

---

## ✨ Tips & Tricks

- Ctrl+P: Open file quickly
- Cmd+F: Find text
- Cmd+H: Find & replace
- Cmd+Shift+P: Command palette
- F12: DevTools debugging
- Toggle device: Test responsive

---

**Ready?** → `npm run dev` → http://localhost:3001

**Questions?** Check DEVELOPMENT-GUIDE.md

---

Built with ❤️ for Wakaf Konstruksi MVP | July 1, 2026
