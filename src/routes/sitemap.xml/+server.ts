import { siteUrl } from "$lib/data/seo";

export const prerender = true;

const pages = ["", "/works", "/jobs", "/events"];

export async function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      ${pages
        .map(
          (page) => `
        <url>
          <loc>${siteUrl}${page}/</loc>
          <changefreq>weekly</changefreq>
          <priority>${page === "" ? "1.0" : "0.8"}</priority>
        </url>
      `,
        )
        .join("")}
    </urlset>`;

  return new Response(body, {
    headers: {
      "Cache-Control": "max-age=0, s-maxage=3600",
      "Content-Type": "application/xml",
    },
  });
}
