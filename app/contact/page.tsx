
import Link from '@/components/link';
import {brand,booking,offer} from '@/lib/content';
import {deliveryReady,type DeliveryEnv} from '@/lib/enquiry';
import {ContactForm} from '@/components/contact-form';
import {CTA} from '@/components/site';
import {seo} from '@/lib/seo';
export const metadata=seo('Contact & Free Consultation','Tell me about your business and request a free consultation with a customized digital marketing plan.','/contact');
export default function Contact(){const ready=deliveryReady({CONTACT_TO_EMAIL:process.env.CONTACT_TO_EMAIL||brand.email});return <main id="main"><section className="page-hero"><div className="container"><p className="eyebrow">LET’S START A CONVERSATION</p><h1>Your next step<br/><em>starts with a conversation.</em></h1><p className="lead">Tell me where you are now, and where you’d like your business to go.</p></div></section><section id="consultation" className="section container contact-layout"><div><p className="eyebrow">YOUR FREE CONSULTATION</p><h2>Clarity for what comes next.</h2><p>{offer}</p><ul className="ticks"><li>A look at your business and current marketing</li><li>Opportunities that fit your goals and resources</li><li>Clear priorities you can start acting on</li></ul><div style={{marginTop:30}}>{brand.bookingUrl?<><Link className="button" href={booking}>Book a Free Consultation Call</Link><p className="micro" style={{marginTop:14}}>Choose a time using the booking provider. Appointment confirmation comes from the provider.</p></>:<p className="notice">Use the enquiry form to request a consultation. Submitting a request does not confirm an appointment; the next step will be arranged by email.</p>}</div>{brand.email&&<><h3>Prefer email?</h3><a className="text-link" href={`mailto:${brand.email}`}>{brand.email}</a></>}{brand.socials.map(s=><p key={s.url}><a href={s.url}>{s.label}</a></p>)}</div><ContactForm ready={ready}/></section><CTA label="Let’s turn your questions into a clear plan."/></main>}



