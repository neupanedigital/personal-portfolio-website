import Link from '@/components/link';
import {notFound} from 'next/navigation';
import {posts,readingTime} from '@/content/posts';
import {CTA} from '@/components/site';
import {ArticleCard} from '@/components/article-card';
import {seo} from '@/lib/seo';
import {brand} from '@/lib/content';
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){const{slug}=await params;const p=posts.find(x=>x.slug===slug);return p?seo(p.title,p.excerpt,`/blog/${slug}`):seo('Article not found','This article could not be found.',`/blog/${slug}`)}
export function generateStaticParams(){return posts.map(p=>({slug:p.slug}))}
export default async function Article({params}:Props){const{slug}=await params;const post=posts.find(p=>p.slug===slug);if(!post)notFound();return <main id="main"><section className="page-hero"><div className="container"><Link href="/blog" className="text-link">All articles</Link><p className="eyebrow" style={{marginTop:30}}>{post.category} · {readingTime(post.body)} MIN READ</p><h1>{post.title}</h1><p className="lead">{post.excerpt}</p></div></section><article className="prose">{post.body.split('\n\n').map((block,i)=>block.startsWith('## ')?<h2 key={i}>{block.slice(3)}</h2>:<p key={i}>{block}</p>)}</article>{brand.siteUrl&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Article',headline:post.title,description:post.excerpt,url:new URL(`/blog/${post.slug}`,brand.siteUrl).href}).replace(/</g,'\\u003c')}}/>}<section className="section soft"><div className="container"><h2>Keep exploring</h2><div className="grid article-grid">{posts.filter(p=>p.slug!==slug).map(p=><ArticleCard post={p} index={posts.indexOf(p)} key={p.slug}/>)}</div></div></section><CTA/></main>}

