import {z} from 'zod';
export const enquirySchema=z.object({
 name:z.string().trim().min(2,'Please enter your full name (at least 2 characters).').max(100,'Please keep your name under 100 characters.'),
 email:z.string().trim().email('Please enter a valid email address.').max(254),
 business:z.string().trim().max(150,'Please keep the business name under 150 characters.').optional().default(''),
 website:z.string().trim().max(500).refine(v=>{if(!v)return true;try{return ['http:','https:'].includes(new URL(v).protocol)}catch{return false}},'Enter a full website address, such as https://example.com.').optional().default(''),
 service:z.enum(['','strategy','seo','social','advertising','email','conversion']).optional().default(''),
 message:z.string().trim().min(10,'Please tell me a little more (at least 10 characters).').max(5000,'Please keep your message under 5,000 characters.'),
 companyFax:z.string().max(0,'Unable to submit this request.').optional().default(''),
});
export type Enquiry=z.infer<typeof enquirySchema>;
export type DeliveryEnv={CONTACT_TO_EMAIL?:string;SITE_ORIGIN?:string;FORM_SITE_URL?:string};
export function deliveryReady(env:DeliveryEnv){return z.string().email().safeParse(env.CONTACT_TO_EMAIL).success}
const attempts=new Map<string,{count:number;expires:number}>();
function reply(status:number,data:object){return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})}
// Per-isolate best-effort limiting. For high-volume public launches, add edge rate limiting.
export async function handleEnquiry(request:Request,env:DeliveryEnv){
 if(request.method!=='POST')return reply(405,{error:'Use the enquiry form to send a request.'});
 const origin=request.headers.get('origin');
 const allowedOrigin=env.SITE_ORIGIN||new URL(request.url).origin;
 if(origin&&origin!==allowedOrigin)return reply(403,{error:'Please submit the form from this website.'});
 if(!request.headers.get('content-type')?.includes('application/json'))return reply(415,{error:'Please use the enquiry form.'});
 const now=Date.now();for(const[key,value]of attempts)if(value.expires<now)attempts.delete(key);
 const ip=(process.env.VERCEL==='1'?request.headers.get('x-forwarded-for')?.split(',')[0]?.trim():request.headers.get('cf-connecting-ip'))||'local-or-unknown';
 const entry=attempts.get(ip)||{count:0,expires:now+600000};
 if(entry.count>=5)return reply(429,{error:'Too many attempts. Please wait 10 minutes before trying again.'});
 if(attempts.size>=10000&&!attempts.has(ip))return reply(429,{error:'The enquiry service is busy. Please try again later.'});
 entry.count++;attempts.set(ip,entry);
 let body='';let size=0;
 try{const reader=request.body?.getReader();if(!reader)return reply(400,{error:'Your request is empty.'});const decoder=new TextDecoder();while(true){const{done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>16384){await reader.cancel();return reply(413,{error:'Your message is too long. Please shorten it and try again.'})}body+=decoder.decode(value,{stream:true})}body+=decoder.decode();}catch{return reply(400,{error:'Unable to read your request. Please try again.'})}
 let parsed;try{parsed=enquirySchema.safeParse(JSON.parse(body))}catch{return reply(400,{error:'Your request could not be read. Please try again.'})}
 if(!parsed.success)return reply(422,{error:'Please check the highlighted fields.',fields:parsed.error.flatten().fieldErrors});
 if(!deliveryReady(env))return reply(503,{error:'Online enquiries are not connected yet. Your request has not been sent. Please return later.'});
 const data=parsed.data;
 const formUrl=new URL('/contact',env.FORM_SITE_URL||request.url).href;
 // This only validates and prepares delivery. No success is reported until
 // FormSubmit accepts the subsequent browser request.
 return reply(200,{delivery:{endpoint:`https://formsubmit.co/ajax/${encodeURIComponent(env.CONTACT_TO_EMAIL!)}`,payload:{name:data.name,email:data.email,business:data.business||'Not provided',website:data.website||'Not provided',service:data.service||'Not sure yet',message:data.message,_subject:'New enquiry — Neupane Digital Service',_template:'table',_replyto:data.email,_honey:'',_captcha:'false',source:formUrl,appointment_status:'Consultation request only — not a confirmed appointment'}}});
}
