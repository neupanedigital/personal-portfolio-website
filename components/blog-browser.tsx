'use client';
import {useState} from 'react';
import {useArticleSearchTool} from '@/lib/use-article-search-tool';
import {posts} from '@/content/posts';
import {ArticleCard} from './article-card';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';
import {Empty,EmptyTitle,EmptyDescription} from '@/components/ui/empty';
export function BlogBrowser(){const[q,setQ]=useState('');const[category,setCategory]=useState('all');useArticleSearchTool(setQ,setCategory);const filtered=posts.filter(p=>(category==='all'||p.category===category)&&`${p.title} ${p.excerpt} ${p.body}`.toLowerCase().includes(q.trim().toLowerCase()));return <><div className="filters"><label className="sr-only" htmlFor="search">Search articles</label><input id="search" type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search ideas, topics, or questions…"/><Select value={category} onValueChange={setCategory}><SelectTrigger aria-label="Article category" className="category-select"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem>{[...new Set(posts.map(p=>p.category))].map(c=><SelectItem value={c} key={c}>{c}</SelectItem>)}</SelectContent></Select></div><p className="micro" aria-live="polite">{filtered.length} {filtered.length===1?'article':'articles'}</p>{filtered.length?<div className="grid article-grid">{filtered.map(p=><ArticleCard key={p.slug} post={p} index={posts.indexOf(p)}/>)}</div>:<Empty className="empty"><EmptyTitle>No matching articles yet</EmptyTitle><EmptyDescription>Try a broader search or choose another category.</EmptyDescription><button onClick={()=>{setQ('');setCategory('all')}}>Clear search and filters</button></Empty>}</>}

