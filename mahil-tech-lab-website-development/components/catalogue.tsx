'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, ArrowUpRight } from 'lucide-react'
import { courses, projects } from '@/lib/content'
import { ProjectVisual } from './home-sections'
export function Catalogue({ type }: { type: 'courses' | 'projects' }) {
 const [query,setQuery] = useState('')
 const [category,setCategory] = useState('All')
 const [ready,setReady] = useState(false)
 useEffect(() => setReady(true),[])
 const data = type === 'courses' ? courses : projects
 const categories = ['All',...Array.from(new Set(data.map(item => item.category)))]
 const filtered = data.filter(item => (category === 'All' || item.category === category) && `${item.title} ${item.description} ${item.tech.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
 return <div data-ready={ready}><div className="catalogue-controls"><label className="search-field"><Search size={16}/><span className="sr-only">Search {type}</span><input placeholder={`Search ${type} or technologies…`} value={query} onChange={e => setQuery(e.target.value)} /></label><div className="filters" aria-label={`Filter ${type}`}>{categories.map(c => <button key={c} className="filter" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div></div><p className="muted-note" aria-live="polite" style={{marginBottom:22}}>{`${filtered.length} ${type} `}{type === 'projects' ? '· Illustrative concepts, not client case studies' : '· Proposed learning outlines; availability confirmed on inquiry'}</p><div className="catalogue-grid">{filtered.map((item) => type === 'courses' ? <Link className="course-card" href={`/courses/${item.slug}`} key={item.slug}><span className="course-symbol">{'{ ' + item.tech[0].toLowerCase() + ' }'}</span><span className="eyebrow">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><div className="tags">{item.tech.map(t => <span key={t}>{t}</span>)}</div><div className="course-bottom"><span>Explore learning outline</span><ArrowUpRight size={17}/></div></Link> : <Link className="project-card" href={`/projects/${item.slug}`} key={item.slug}><ProjectVisual index={projects.findIndex(p => p.slug === item.slug)}/><div className="project-caption"><div><span className="eyebrow">SAMPLE CONCEPT · {item.category}</span><h3>{item.title}</h3></div><ArrowUpRight size={20}/></div><p style={{fontSize:12}}>{item.description}</p></Link>)}{!filtered.length && <div className="empty-state"><h2>No matches just yet.</h2><p>Try a different technology or choose another category.</p><button className="button ghost" onClick={() => {setQuery('');setCategory('All')}}>Clear filters</button></div>}</div></div>
}
