export type PreparedDelivery={endpoint:string;payload:Record<string,string>};
export type DeliveryResult={ok:boolean;message:string};
const failure='The email service could not accept your enquiry. Your details are still here. Please try again later or email digitalbiznep@gmail.com directly.';

// FormSubmit's public AJAX endpoint is intended for browser submissions.
// Do not relay it through the hosting provider, or automatically retry delivery:
// an uncertain response may already represent an accepted enquiry.
export async function deliverEnquiry(delivery:PreparedDelivery,send:typeof fetch=fetch):Promise<DeliveryResult>{
 try{
  const url=new URL(delivery.endpoint);
  if(url.origin!=='https://formsubmit.co'||!url.pathname.startsWith('/ajax/')||url.username||url.password)throw new Error('Invalid delivery destination');
  const response=await send(url.href,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},credentials:'omit',referrerPolicy:'strict-origin-when-cross-origin',signal:AbortSignal.timeout(20000),body:JSON.stringify(delivery.payload)});
  const result=await response.json() as {success?:unknown;message?:unknown};
  const message=typeof result?.message==='string'?result.message:'';
  if(/activat|confirm.{0,30}email|check.{0,30}email/i.test(message))return {ok:false,message:'Email delivery is awaiting activation by the website owner. Your details are still here; please email digitalbiznep@gmail.com directly for now.'};
  if(!response.ok||!(result?.success===true||result?.success==='true'))return {ok:false,message:failure};
  return {ok:true,message:'Your enquiry has been accepted by the email service. Thank you! This is a consultation request, not a confirmed appointment.'};
 }catch{return {ok:false,message:'We could not confirm delivery. Your details are still here. Please email digitalbiznep@gmail.com directly, or try again later.'}}
}
