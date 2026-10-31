'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function ArchitecturalWalls({ compact }: { compact: boolean }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    for (let i = 0; i <= 60; i++) {
      const z = -23 + i * .55
      const x = 4.4 + .018 * (z + 12) ** 2
      if (!i) shape.moveTo(x, z); else shape.lineTo(x, z)
    }
    for (let i = 60; i >= 0; i--) {
      const z = -23 + i * .55
      shape.lineTo(5.1 + .018 * (z + 12) ** 2, z)
    }
    shape.closePath()
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 6.6, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: .12, bevelThickness: .12 })
    geo.rotateX(Math.PI / 2)
    geo.translate(0, 6.6, 0)
    return geo
  }, [])
  useEffect(() => () => geometry.dispose(), [geometry])
  return <>{[-1, 1].map(side => <group key={side} scale={[side, 1, 1]}>
    <mesh geometry={geometry} castShadow receiveShadow><meshStandardMaterial color="#f5f7fc" roughness={.28} metalness={.08} side={THREE.DoubleSide} /></mesh>
    {Array.from({ length: compact ? 28 : 45 }, (_, i) => {
      const z = -22 + i * (compact ? 1.1 : .68)
      const x = 4.16 + .018 * (z + 12) ** 2
      return <mesh key={i} position={[x, 3.3, z]} rotation={[0, -Math.atan(.036 * (z + 12)), 0]} castShadow receiveShadow><boxGeometry args={[.55, 6.6, .13]} /><meshStandardMaterial color="white" roughness={.4} /></mesh>
    })}
    <pointLight position={[4.2, .6, -2]} color={side === -1 ? '#b2a1ff' : '#8de8ff'} intensity={35} distance={12} />
  </group>)}</>
}
function CircularStage() {
  return <group position={[0, 0, 1]}>
    {[{r:3.35,y:.12,h:.24}, {r:2.95,y:.31,h:.15}, {r:2.64,y:.44,h:.12}].map((step,i) => <mesh key={i} position={[0,step.y,0]} receiveShadow castShadow><cylinderGeometry args={[step.r,step.r,step.h,96]} /><meshStandardMaterial color={i === 1 ? '#dce8ff' : '#ffffff'} roughness={.22} metalness={.13} /></mesh>)}
    <mesh position={[0,.24,0]} rotation={[-Math.PI/2,0,0]}><torusGeometry args={[3.1,.035,8,96]} /><meshStandardMaterial color="#b7bcff" emissive="#adbeff" emissiveIntensity={.7} /></mesh>
  </group>
}
function CameraController({ reduced }: { reduced: boolean }) {
  const scroll = useRef({ value: 0 })
  useEffect(() => {
    if (reduced) return
    gsap.registerPlugin(ScrollTrigger)
    const tween = gsap.to(scroll.current, { value: 1, ease: 'none', scrollTrigger: { trigger: '#home-hero', start: 'top top', end: 'bottom top', scrub: true } })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [reduced])
  useFrame(({ camera, pointer, clock }, delta) => {
    const t = reduced ? 0 : clock.elapsedTime
    const x = reduced ? 0 : pointer.x * .32 + Math.sin(t * .13) * .07
    camera.position.x = THREE.MathUtils.damp(camera.position.x, x, 2, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 4.5 + (reduced ? 0 : pointer.y * .12), 2, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 15 - scroll.current.value * 1.6, 4, delta)
    camera.lookAt(0, 2.4, -4)
  })
  return null
}
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <div className="scene-fallback" /> : this.props.children }
}
export default function HeroScene() {
  const [reduced, setReduced] = useState(false)
  const [compact, setCompact] = useState(false)
  const [active, setActive] = useState(true)
  useEffect(() => {
    const small = matchMedia('(max-width: 760px)')
    const resize = () => setCompact(small.matches)
    resize(); small.addEventListener('change', resize)
    const hero = document.getElementById('home-hero')
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: '300px 0px' })
    if (hero) observer.observe(hero)
    return () => { observer.disconnect(); small.removeEventListener('change', resize) }
  }, [])
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update(); media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return <SceneBoundary><Canvas shadows={!compact} dpr={compact ? 1 : [1, 1.5]} camera={{ position: [0,4.5,16], fov: 48 }} gl={{ antialias: true, powerPreference: 'low-power' }} frameloop={reduced || !active ? 'demand' : 'always'} fallback={<div className="scene-fallback" />}>
    <color attach="background" args={['#f5f7fc']} /><fog attach="fog" args={['#f5f7fc', 20, 53]} />
    <ambientLight intensity={1.8} /><hemisphereLight args={['#ffffff','#d1d9ed', 1.5]} />
    <directionalLight position={[0,12,4]} intensity={3.4} castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-15} shadow-camera-right={15} shadow-camera-top={15} shadow-camera-bottom={-15} shadow-bias={-.001} />
    <ArchitecturalWalls compact={compact} /><CircularStage />
    <mesh rotation={[-Math.PI/2,0,0]} receiveShadow position={[0,-.04,-8]}><planeGeometry args={[100,100]} /><meshStandardMaterial color="#f4f6fc" roughness={.18} metalness={.16} /></mesh>
    <ContactShadows position={[0,.005,1]} scale={22} opacity={.23} blur={2.5} far={8} frames={1} resolution={256} />
    <CameraController reduced={reduced} />
  </Canvas></SceneBoundary>
}
