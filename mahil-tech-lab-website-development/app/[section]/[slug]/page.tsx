import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import { courses, services, projects } from '@/lib/content'
import { ProjectVisual } from '@/components/home-sections'
const collection = (section:string) => section==='courses'?courses:section==='services'?services:section==='projects'?projects:[]
export function generateStaticParams(){return ['services','courses','projects'].flatMap(section=>collection(section).map(item=>({section,slug:item.slug})))}
export async function generateMetadata({params}:{params:Promise<{section:string;slug:string}>}):Promise<Metadata>{const {section,slug}=await params;const item=collection(section).find(i=>i.slug===slug);return {title:item?.title??'Not found',description:item?.description}}
export default async function DetailPage({params}:{params:Promise<{section:string;slug:string}>}){
 const {section,slug}=await params;const item=collection(section).find(i=>i.slug===slug);if(!item)notFound()
 const course=section==='courses'?courses.find(i=>i.slug===slug):undefined
 const service=section==='services'?services.find(i=>i.slug===slug):undefined
 return <><section className="page-header"><Link className="text-link" href={`/${section}`}><ArrowLeft size={15}/> All {section}</Link><h1>{item.title}</h1><p>{item.description}</p><div className="tags">{item.tech.map(t=><span key={t}>{t}</span>)}</div></section><section className="detail-content">
 {course&&<><div className="info-panel" style={{marginBottom:40}}><p>Proposed learning outline. Availability, delivery format, schedule, and fees must be confirmed by MahilTechLab. No certification or placement guarantees are implied.</p></div><h2>What you could explore</h2><div className="curriculum">{course.curriculum.map((c,i)=><div key={c}><span>0{i+1}</span>{c}</div>)}</div><h2>Learn through building.</h2><p>Connect core concepts to a practical project, with an emphasis on readable code, sound foundations, and real-world problem-solving.</p></>}
 {service&&<><h2>Made for your next step.</h2><p>We start by understanding your goals, users, and constraints. Together, we define the right scope and a practical technical approach.</p><h2>Capabilities</h2><div className="curriculum">{service.capabilities.map((c,i)=><div key={c}><span>0{i+1}</span>{c}</div>)}</div><h2>From possibility to a clear plan.</h2><p>Example applications include internal tools, customer experiences, and connected digital workflows. The right solution depends on your business needs; scope and technologies are agreed during discovery.</p></>}
 {section==='projects'&&<><ProjectVisual index={projects.findIndex(i=>i.slug===slug)}/><div className="info-panel" style={{marginBlock:35}}><h3>Illustrative concept</h3><p>This is sample content, not a completed client engagement. Visuals are conceptual interface studies. No client, results, deployment, or delivery claims are implied.</p></div><h2>The idea</h2><p>{item.description}</p><h2>A possible approach</h2><p>Begin with user needs, develop a focused interface prototype, and validate the core workflow before committing to a full implementation. The technologies above are illustrative options.</p></>}
 <Link href={`/contact?interest=${encodeURIComponent(item.title)}`} className="button primary">{course?'Prepare an enrollment inquiry':'Discuss your idea'} <ArrowUpRight size={17}/></Link>
 </section></>
}
