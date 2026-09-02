// Set NEXT_PUBLIC_SITE_URL in Vercel (Project Settings → Environment Variables)
// once the final domain is known — used for canonical URLs, sitemap.xml and
// robots.txt. Falls back to a placeholder so builds work without it.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kairo.example.com").replace(/\/$/, "");
