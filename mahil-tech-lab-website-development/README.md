# MahilTechLab Solutions

Next.js App Router website with React Three Fiber, Drei, Three.js, GSAP, and Tailwind CSS.

## Content

Edit `lib/content.ts` for service, course, and sample project content. Company page copy is in `app/[section]/page.tsx`. All project entries are explicitly illustrative concepts; course outlines are proposed, not verified scheduled offerings. Replace team and history notices only with verified information.

The supplied logo is referenced from the user's specified Source URL, as requested.

## Inquiry handling

The contact form validates inquiries server-side and downloads a plain-text draft. It does not send messages or persist data. `/api/inquiry` performs input validation, payload-size checks, same-origin checking, and a honeypot check. No provider credentials are required for this draft-only flow.

Before enabling delivery, connect an email integration, verify the company sender domain and recipient inbox, and add durable rate limiting and bot verification. Return a delivery confirmation only after the provider accepts the message; describe provider acceptance accurately, without claiming inbox delivery. Do not enable a send button before this is complete.

## Deployment

Deploy the Next.js project through Vercel's Publish workflow. No database or email integration is required for the current draft-only website. Baseline response headers are configured in `next.config.mjs`. The sitemap resolves URLs using the request origin; confirm it on the canonical production domain after publishing.

## Verification

The project uses pnpm with the pinned `packageManager` in package.json. Frozen-lockfile installation, TypeScript checking, and production build validate the dependency and route setup. Verify browser interactions, mobile navigation, contact drafts, and WebGL separately; compilation alone does not validate them.

3D rendering reduces pixel density and geometry on mobile, pauses continuous rendering offscreen, and respects reduced-motion preferences. A lightweight gradient fallback keeps HTML content usable if WebGL cannot initialize.
