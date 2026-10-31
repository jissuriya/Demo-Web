'use client'
import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Set invisible state IMMEDIATELY (no 1-frame flash) then animate in on scroll
        gsap.set(ref.current, { y: 16, opacity: 0 })
        gsap.to(ref.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            once: true,
            fastScrollEnd: true,
          },
        })
      })
    }, ref)
    return () => context.revert()
  }, [])

  return <div ref={ref} className={className}>{children}</div>
}
