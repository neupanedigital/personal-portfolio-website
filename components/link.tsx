import type {ComponentProps} from 'react';
// Native links keep this content-focused site navigable without client routing
// and avoid the starter's current prefetch/runtime interoperability issue.
export default function Link(props:ComponentProps<'a'>){return <a {...props}/>}
