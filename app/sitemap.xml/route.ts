const urls = [
  "", "about", "services", "training", "industries",
  "case-studies", "resources", "careers", "contact", "privacy", "terms", "refunds"
];

export function GET() {
  const items = urls.map(u => `<url><loc>https://www.ripotek.com/${u}</loc></url>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
