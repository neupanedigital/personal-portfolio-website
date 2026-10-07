import type {Metadata} from 'next';
import './globals.css';
import {Header,Footer} from '@/components/site';
import {brand} from '@/lib/content';
export const metadata:Metadata={title:{default:`AI Marketing for Small Businesses | ${brand.name}`,template:`%s | ${brand.name}`},description:'Practical AI-powered marketing to help small and medium businesses attract relevant customers, strengthen their online presence, and turn enquiries into opportunities.',icons:{icon:'/favicon.svg'},openGraph:{type:'website',title:brand.name,description:'Human insight. AI advantage. Practical marketing for your next stage of growth.'},twitter:{card:'summary',title:brand.name,description:'Practical AI marketing for small and medium businesses.'},...(brand.siteUrl?{metadataBase:new URL(brand.siteUrl)}:{})};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><Header/>{children}<Footer/></body></html>}
