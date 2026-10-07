import Link from '@/components/link';
import {posts,readingTime} from '@/content/posts';
export function ArticleCard({post,index=0}:{post:typeof posts[number];index?:number}){return <article className="card"><Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true"><div className={`article-cover cover-${index%3}`}><span>{post.symbol}</span></div></Link><div className="article-body"><p className="article-meta">{post.category} · {readingTime(post.body)} min read</p><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="card-link" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>Read article</Link></div></article>}

