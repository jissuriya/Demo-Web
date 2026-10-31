'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Home, Info, Layers, GraduationCap, FolderOpen, Rocket, Mail, Menu, X, ArrowUpRight } from 'lucide-react'
import { logo } from '@/lib/content'

const links = [
  { label: 'Home',     icon: Home,           href: '/'         },
  { label: 'About',    icon: Info,           href: '/about'    },
  { label: 'Services', icon: Layers,         href: '/services' },
  { label: 'Courses',  icon: GraduationCap,  href: '/courses'  },
  { label: 'Projects', icon: FolderOpen,     href: '/projects' },
  { label: 'Careers',  icon: Rocket,         href: '/careers'  },
  { label: 'Contact',  icon: Mail,           href: '/contact'  },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (!open) return
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])

  return (
    <header className="header">
      <Link href="/" aria-label="MahilTechLab home" className="brand">
        <img src={logo} alt="MahilTechLab — Innovative Tech for Complex Challenges" width={430} height={131} />
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(({ label, icon: Icon, href }) => {
          const active = pathname === href
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={active ? 'nav-link active' : 'nav-link'}
            >
              <Icon size={14} strokeWidth={active ? 2.3 : 1.8} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      <Link href="/contact" className="nav-cta">
        Let&apos;s Talk <ArrowUpRight size={14} />
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-navigation"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {links.map(({ label, icon: Icon, href }) => {
            const active = pathname === href
            return (
              <Link
                key={label}
                href={href}
                className={active ? 'mobile-link active' : 'mobile-link'}
                onClick={() => setOpen(false)}
              >
                <span className="mobile-icon-wrap">
                  <Icon size={17} strokeWidth={active ? 2.2 : 1.7} />
                </span>
                <span>{label}</span>
                <ArrowUpRight size={14} className="mobile-arrow" />
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link href="/" className="brand">
          <img src={logo} width={430} height={131} alt="MahilTechLab" />
        </Link>
        <p>Thoughtfully built.<br />Limitlessly imagined.</p>
        <div>
          <Link href="/about">Our story</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Get in touch <ArrowUpRight size={14} /></Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MahilTechLab Solutions.</span>
        <span>Technology. Intelligence. Possibility.</span>
        <a href="#main">Back to top ↑</a>
      </div>
    </footer>
  )
}
