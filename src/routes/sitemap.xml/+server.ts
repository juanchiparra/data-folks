import { siteUrl } from "#lib/data/seo.js";

export const prerender = true;

const pages = ["", "/works", "/jobs", "/events"];

export async function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
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
      "Content-Type": "application/xml",
    },
  });
}
