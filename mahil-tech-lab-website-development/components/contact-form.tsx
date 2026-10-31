'use client'
import { useEffect, useState, type FormEvent } from 'react'
import { ArrowDownToLine } from 'lucide-react'
import { services, courses } from '@/lib/content'
export function ContactForm() {
 const [interest,setInterest]=useState('General inquiry')
 const [busy,setBusy]=useState(false)
 const [status,setStatus]=useState('')
 const [ready,setReady]=useState(false)
 const options=Array.from(new Set(['General inquiry',...services.map(s=>s.title),...courses.map(c=>c.title),'Careers','Internship']))
 useEffect(()=>{const requested=new URLSearchParams(window.location.search).get('interest');if(requested)setInterest(requested);setReady(true)},[])
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setBusy(true);setStatus('')
  const data=Object.fromEntries(new FormData(event.currentTarget).entries())
  try{
   const response=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
   const result=await response.json()
   if(!response.ok)throw new Error(result.error||'Unable to validate your inquiry. Please try again.')
   const text=`MahilTechLab Solutions — Inquiry draft\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone||'Not provided'}\nInterest: ${data.interest}\n\n${data.message}\n\nThis draft has not been sent. Online delivery is not configured.`
   const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='mahiltechlab-inquiry.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
   setStatus('Your inquiry draft was prepared for download. It has not been sent or stored.')
  }catch(error){setStatus(error instanceof Error?error.message:'Something went wrong. Please try again.')}finally{setBusy(false)}
 }
 return <form className="contact-form" onSubmit={submit} data-ready={ready}><div className="form-row"><label className="form-field">Your name<input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Full name" /></label><label className="form-field">Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label></div><label className="form-field">Phone (optional)<input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="Include your country code" /></label><label className="form-field">I&apos;m interested in<select name="interest" value={interest} onChange={e=>setInterest(e.target.value)}>{!options.includes(interest)&&<option>{interest}</option>}{options.map(o=><option key={o}>{o}</option>)}</select></label><label className="form-field">Tell us about your idea<textarea name="message" required minLength={10} maxLength={5000} placeholder="What would you like to build, explore, or learn?" /></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><p className="muted-note">This form validates and downloads a draft only. Nothing is sent or saved. Please do not include passwords or sensitive information.</p><button type="submit" className="button primary" disabled={busy}>{busy?'Preparing draft…':'Download inquiry draft'}<ArrowDownToLine size={16}/></button>{status&&<p className="form-status" role="status">{status}</p>}</form>
}
