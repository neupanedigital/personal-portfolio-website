import {BlogBrowser} from '@/components/blog-browser';
import {CTA} from '@/components/site';
import {seo} from '@/lib/seo';
export const metadata=seo('Marketing Insights','Practical articles on AI marketing, digital strategy, and turning website visitors into leads.','/blog');
export default function Blog(){return <main id="main"><section className="page-hero"><div className="container"><p className="eyebrow">THE MARKETING NOTEBOOK</p><h1>Fresh thinking.<br/><em>Practical next steps.</em></h1><p className="lead">Ideas to help you make sense of marketing, use AI thoughtfully, and move your business forward.</p></div></section><section className="section container"><BlogBrowser/></section><CTA/></main>}
