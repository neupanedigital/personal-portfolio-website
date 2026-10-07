# Neupane Digital Service

This repository root contains the complete Next.js website for Vercel, including its pages, styling, articles, assets and FormSubmit enquiry integration.

## Vercel

- Import `neupanedigital/personal-portfolio-website`.
- Use the repository root (`./`) as Root Directory and the Next.js framework preset.
- Install with `npm ci`; build with `npm run build`.
- The primary website address is `https://www.neupaneb.com.np`; the apex domain currently redirects to it in Vercel.
- The enquiry recipient defaults to `digitalbiznep@gmail.com`; no email API key is needed. The recipient's FormSubmit activation must remain active.
- Optional `CONTACT_TO_EMAIL` and `SITE_ORIGIN` values are server environment variables. Leave `SITE_ORIGIN` unset to support both Vercel previews and production through same-origin validation.

Run `npm run dev` for a local preview, `npm test` for enquiry validation/delivery tests, and `npm run build` for a production build.

## Source location

The previous outer repository tracked `portfolio` as a Git repository reference without its source contents. The Vercel version now lives directly in this folder so GitHub and Vercel receive real source files.

The original `portfolio/` directory remains locally as the independently managed Sites checkout. It and its deployment archive are excluded from this repository. Use the root files for future changes to the Vercel website; changes to that older Sites checkout do not automatically update this version.

Edit `lib/content.ts` for business/contact details, `content/posts.ts` for articles, and `app/globals.css` for styling.
