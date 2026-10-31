'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowUpRight, ArrowDown, MoveUpRight } from 'lucide-react'
const HeroScene = dynamic(() => import('./hero-scene'), { ssr: false, loading: () => <div className="scene-fallback" /> })
export function Hero() {
  return <section className="hero" id="home-hero" aria-labelledby="hero-title">
    <div className="hero-scene" aria-hidden="true"><HeroScene /></div>
    <div className="hero-haze" />
    <div className="hero-content">
      <div className="eyebrow hero-eyebrow"><span className="status-dot" /> A NEW DIMENSION OF TECHNOLOGY</div>
      <h1 id="hero-title">Beyond Code.<br /><span>Beyond Limits.</span></h1>
      <p>Engineering intelligent solutions<br className="mobile-break" /> for a world without boundaries.</p>
      <div className="hero-actions"><Link href="#introduction" className="button primary">Explore Our World <ArrowUpRight size={17} /></Link><Link href="/services" className="button ghost">Discover Our Expertise <MoveUpRight size={16} /></Link></div>
    </div>
    <div className="hero-bottom"><a href="#introduction" className="scroll-cue"><span><ArrowDown size={15} /></span> SCROLL TO EXPLORE</a><span className="scene-caption"><span className="status-dot" /> IDEAS WITHOUT BOUNDARIES</span><span className="hero-index">01 <span>/ 07</span></span></div>
  </section>
}
