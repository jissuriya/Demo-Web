import { courses, projects, services } from '@/lib/content'
export function GET(request:Request){
 const base=new URL(request.url).origin
 const paths=['','/about','/services','/courses','/projects','/careers','/contact',...courses.map(c=>`/courses/${c.slug}`),...projects.map(p=>`/projects/${p.slug}`),...services.map(s=>`/services/${s.slug}`)]
 const escape=(value:string)=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>${escape(base+path)}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}})
}
