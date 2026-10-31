import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Navbar, Footer } from '@/components/site-shell'
import { PageShell } from '@/components/page-shell'
import './globals.css'
export const metadata: Metadata = {
  title: { default: 'MahilTechLab Solutions — Beyond Code. Beyond Limits.', template: '%s | MahilTechLab Solutions' },
  description: 'Engineering intelligent solutions for a world without boundaries. Explore software development, AI, design, and technology training at MahilTechLab Solutions.',
  openGraph: { title: 'MahilTechLab Solutions', description: 'Beyond Code. Beyond Limits. Software, intelligence, and future-ready learning.', type: 'website' },
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f8faff', width: 'device-width', initialScale: 1 }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en"><body><a href="#main" className="skip-link">Skip to content</a><Navbar /><main id="main"><PageShell>{children}</PageShell></main><Footer />{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
