'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowUpRight, ArrowDown, MoveUpRight } from 'lucide-react'

// Load once — never unmount
const HeroScene = dynamic(() => import('./hero-scene'), {
  ssr: false,
  loading: () => <div className="scene-fallback" />,
})

// ── Hero section (always rendered, shown only on /) ────────────────────────
function HeroContent() {
  return (
    <section className="hero" id="home-hero" aria-labelledby="hero-title">
      <div className="hero-scene" aria-hidden="true">
        <HeroScene />
      </div>
      <div className="hero-haze" />
      <div className="hero-content">
        <div className="eyebrow hero-eyebrow">
          <span className="status-dot" /> A NEW DIMENSION OF TECHNOLOGY
        </div>
        <h1 id="hero-title">
          Beyond Code.<br /><span>Beyond Limits.</span>
        </h1>
        <p>
          Engineering intelligent solutions<br className="mobile-break" /> for a world without boundaries.
        </p>
        <div className="hero-actions">
          <Link href="#introduction" className="button primary">
            Explore Our World <ArrowUpRight size={17} />
          </Link>
          <Link href="/services" className="button ghost">
            Discover Our Expertise <MoveUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#introduction" className="scroll-cue">
          <span><ArrowDown size={15} /></span> SCROLL TO EXPLORE
        </a>
        <span className="scene-caption">
          <span className="status-dot" /> IDEAS WITHOUT BOUNDARIES
        </span>
        <span className="hero-index">01 <span>/ 07</span></span>
      </div>
    </section>
  )
}

// ── Page wrapper with transition animation ─────────────────────────────────
export function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const contentRef = useRef<HTMLDivElement>(null)

  // Scroll to top + trigger CSS transition on every route change
  useEffect(() => {
    // Always reset scroll to top — fixes "opens at half page" issue
    window.scrollTo({ top: 0, behavior: 'instant' })

    const el = contentRef.current
    if (!el) return
    el.classList.remove('page-enter-active')
    // Force reflow so animation restarts cleanly
    void el.offsetHeight
    el.classList.add('page-enter-active')
  }, [pathname])

  return (
    <>
      {/* Hero is always mounted — only visible on home route */}
      <div
        className="persistent-hero"
        aria-hidden={!isHome}
        style={{
          display: isHome ? 'block' : 'none',
          // Keep it in the DOM but hidden — WebGL context stays alive
        }}
      >
        <HeroContent />
      </div>

      {/* Page content with enter animation */}
      <div ref={contentRef} className="page-enter" key={pathname}>
        {children}
      </div>
    </>
  )
}
