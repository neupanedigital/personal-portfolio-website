import type {Metadata} from 'next';
import {brand} from './content';
export function seo(title:string,description:string,path:string):Metadata{return {title,description,openGraph:{title,description,type:'website',...(brand.siteUrl?{url:new URL(path,brand.siteUrl).href}:{})},twitter:{card:'summary',title,description},...(brand.siteUrl?{alternates:{canonical:new URL(path,brand.siteUrl).href}}:{})};}
