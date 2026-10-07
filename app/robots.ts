import {brand} from '@/lib/content';
export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:'/api/'},...(brand.siteUrl?{sitemap:new URL('/sitemap.xml',brand.siteUrl).href}:{})};}
