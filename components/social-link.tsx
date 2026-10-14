export function SocialLink({label,url}:{label:string;url:string}) {
 const facebook=label.toLowerCase()==='facebook';
 return <a href={url} className={facebook?'social-icon-link':undefined} aria-label={label} title={label}>
  {facebook?<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.025 4.388 11.02 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.49 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.098 24 12.073Z"/></svg>:label}
 </a>;
}
