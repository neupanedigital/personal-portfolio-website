import {brand} from '@/lib/content';
import {posts} from '@/content/posts';
export default function sitemap(){if(!brand.siteUrl)return [];return ['/','/about','/services','/blog','/contact',...posts.map(p=>`/blog/${p.slug}`)].map(path=>({url:new URL(path,brand.siteUrl).href}));}
