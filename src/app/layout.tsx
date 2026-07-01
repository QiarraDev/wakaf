import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Wakaf Konstruksi - Platform Wakaf Transparan",
  description: "Platform marketplace wakaf konstruksi berbasis blockchain. Berwakaf aman dengan jaminan SNI, izin PBG, dan pencairan dana Escrow per-milestone (Anti-mangkrak).",
  keywords: "wakaf, konstruksi, transparansi, escrow, milestone, infrastruktur",
  authors: [{ name: "Wakaf Konstruksi Team" }],
  openGraph: {
    title: "Wakaf Konstruksi - Platform Wakaf Transparan",
    description: "Berwakaf aman dengan transparansi penuh dari donasi hingga fisik bangunan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 200px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
