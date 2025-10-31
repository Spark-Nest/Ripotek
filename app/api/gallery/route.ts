import { NextResponse } from "next/server";
import { sanity } from "@/lib/sanity";

// page size
const LIMIT = 18;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
  const start = (page - 1) * LIMIT;
  const end = start + LIMIT;

  // flatten images across all galleries, newest first
  const data = await sanity.fetch(
    `*[_type=="gallery"]|order(date desc){
      title, "slug": slug.current, images[]{asset, alt, caption}
    }`
  );

  // Flatten to individual image items with album metadata
  const flat: any[] = [];
  for (const g of data) {
    for (const im of (g.images || [])) {
      if (im?.asset) {
        flat.push({
          album: g.title,
          alt: im.alt || g.title,
          caption: im.caption,
          img: im
        });
      }
    }
  }

  const pageItems = flat.slice(start, end);
  const hasMore = end < flat.length;

  return NextResponse.json({
    items: pageItems,
    nextPage: hasMore ? page + 1 : null,
    total: flat.length
  });
}
