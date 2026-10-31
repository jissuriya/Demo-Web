import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { ServiceCards, ContactCTA } from '@/components/home-sections'
import { Catalogue } from '@/components/catalogue'
import { ContactForm } from '@/components/contact-form'
const pages: Record<string,{label:string;title:string;description:string}> = {
 about:{label:'THE THINKING BEHIND THE TECHNOLOGY',title:'Ideas are only the beginning.',description:'We bring engineering, intelligence, and imagination together to move ambitious ideas forward.'},
 services:{label:'OUR EXPERTISE',title:'Built around your possibilities.',description:'From the first idea to the next iteration. Explore thoughtful technology solutions for your business.'},
 courses:{label:'LEARN. BUILD. GO BEYOND.',title:'Build skills. Open possibilities.',description:'Explore practical technology learning, grounded in real projects and the fundamentals that matter.'},
 projects:{label:'EXPLORING WHAT’S POSSIBLE',title:'Ideas, taking shape.',description:'A collection of illustrative product concepts. These samples show possible directions, not verified client work.'},
 careers:{label:'GROW WITH PURPOSE',title:'Great work begins with people.',description:'For curious thinkers, thoughtful builders, and people who see possibility where others see complexity.'},
 contact:{label:'LET’S START A CONVERSATION',title:'What could we build together?',description:'A new product, a bigger question, or the next step in your learning journey. Start with an idea.'},
}
export function generateStaticParams(){return Object.keys(pages).map(section=>({section}))}
export async function generateMetadata({params}:{params:Promise<{section:string}>}):Promise<Metadata>{const {section}=await params;const p=pages[section];return {title:p ? section[0].toUpperCase()+section.slice(1) : 'Not found',description:p?.description}}
export default async function ContentPage({params}:{params:Promise<{section:string}>}) {
 const {section}=await params;const page=pages[section];if(!page)notFound()
 return <><section className="page-header"><div className="eyebrow"><span className="small-line"/>{page.label}</div><h1>{page.title}</h1><p>{page.description}</p></section>
 <section className="page-section">
 {section==='services' && <ServiceCards all/>}
 {(section==='courses'||section==='projects') && <Catalogue type={section}/>}
 {section==='about' && <><div className="editorial-grid"><div><h2>Technology with intention.</h2><p>MahilTechLab Solutions focuses on software development, AI and machine learning, digital solutions, and technology training. We connect thoughtful design with practical engineering to help ideas become useful digital experiences.</p><div className="company-values"><div><h3>Our mission</h3><p>Build purposeful digital solutions and make practical technology learning more accessible.</p></div><div><h3>Our vision</h3><p>A future where intelligent technology opens possibilities for businesses and learners alike.</p></div></div></div><div className="info-panel"><h3>How we approach the work</h3><p>Understand the problem before choosing the technology. Design for the people who will use it. Build with maintainability, accessibility, and performance in mind. Learn, test, and improve.</p><div className="tags">{['Software engineering','AI & ML','Digital experiences','Technology training'].map(t=><span key={t}>{t}</span>)}</div><Link href="/services" className="text-link">Explore our capabilities <ArrowUpRight size={17}/></Link></div></div><div className="editorial-grid" style={{marginTop:65}}><div className="info-panel"><h3>The people behind the ideas</h3><p>Verified team profiles and founder information will be added here when supplied by MahilTechLab Solutions.</p></div><div className="info-panel"><h3>Our journey</h3><p>Company milestones and history are awaiting verified details. We prefer a real story to an invented timeline.</p></div></div></>}
 {section==='careers' && <><div className="editorial-grid"><div><h2>Stay curious. Build thoughtfully.</h2><p>We value practical problem-solving, clear communication, and the willingness to keep learning. Explore how your interests align with software, design, and intelligent technology.</p></div><div className="info-panel"><h3>Interested in an internship?</h3><p>Share your interests and the skills you would like to develop. Inquiry does not imply an available position or placement.</p><Link href="/contact?interest=Internship" className="text-link" style={{marginTop:24}}>Prepare an internship inquiry <ArrowUpRight size={17}/></Link></div></div><div className="empty-state" style={{marginTop:55}}><h2>No verified openings to list.</h2><p>Current vacancies have not been supplied. Check back for confirmed opportunities.</p><Link href="/contact?interest=Careers" className="button ghost">General careers inquiry <ArrowUpRight size={16}/></Link></div></>}
 {section==='contact' && <div className="contact-grid"><div><h2>A little context.<br />A world of possibility.</h2><p>Tell us what you have in mind and which area you would like to explore.</p><div className="info-panel" style={{marginTop:30}}><h3>Inquiry delivery not connected</h3><p>You can prepare and download your inquiry below. Online delivery will be enabled once a verified company inbox and email provider are configured. No message is sent or stored at this stage.</p></div></div><ContactForm /></div>}
 </section>{section!=='contact'&&<ContactCTA/>}</>
}
