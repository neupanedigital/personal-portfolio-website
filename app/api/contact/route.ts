
import {handleEnquiry,type DeliveryEnv} from '@/lib/enquiry';
import {brand} from '@/lib/content';
export async function POST(request:Request){const settings=process.env as DeliveryEnv;return handleEnquiry(request,{...settings,CONTACT_TO_EMAIL:settings.CONTACT_TO_EMAIL||brand.email,FORM_SITE_URL:brand.siteUrl})}

