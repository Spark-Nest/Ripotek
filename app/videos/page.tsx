import { sanity } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import VideoFilter from "@/components/VideoFilter";

export const revalidate = 60;

export default async function VideosPage({
  searchParams,
}: { searchParams?: { category?: string } }) {
  const cat = searchParams?.category;

  // Featured video: newest featured or newest overall if none featured
  const featured = await sanity.fetch(
    cat && cat !== "All"
      ? `*[_type=="video" && category==$cat]|order(date desc)[0]{
          title, teaser, duration, category, videoIdOrUrl, "href": "/videos/"+slug.current, thumbnail{asset,alt}
        }`
      : `*[_type=="video" && isFeatured==true]|order(date desc)[0]{
          title, teaser, duration, category, videoIdOrUrl, "href": "/videos/"+slug.current, thumbnail{asset,alt}
        }`,
    { cat }
  ) || await sanity.fetch(
    `*[_type=="video"]|order(date desc)[0]{
      title, teaser, duration, category, videoIdOrUrl, "href": "/videos/"+slug.current, thumbnail{asset,alt}
    }`
  );

  // Grid items
  const items = await sanity.fetch(
    cat && cat !== "All"
      ? `*[_type=="video" && category==$cat && slug.current!=$slug]|order(date desc){
          title, duration, category, "href": "/videos/"+slug.current, thumbnail{asset,alt}
        }`
      : `*[_type=="video" && slug.current!=$slug]|order(date desc){
          title, duration, category, "href": "/videos/"+slug.current, thumbnail{asset,alt}
        }`,
    { cat, slug: featured?.href?.split("/").pop() }
  );

  // hero image
  const heroSrc = featured?.thumbnail?.asset
    ? urlFor(featured.thumbnail).width(1440).height(810).fit("crop").auto("format").url()
    : "/placeholder-16x9.jpg";

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold">Videos</h1>
          <p className="mt-2 text-slate-600">
            Training demos, case studies, and webinar replays.
          </p>
        </div>
        <VideoFilter />
      </div>

      {/* Featured hero */}
      {featured && (
        <Link href={featured.href} className="mt-8 block no-underline">
          <div className="rtk-card overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={heroSrc}
                alt={featured.thumbnail?.alt || featured.title}
                fill
                sizes="100vw"
                className="rtk-media"
                priority
              />
              {/* Play overlay */}
              <div className="absolute inset-0 grid place-items-center bg-black/0 hover:bg-black/10 transition">
                <div className="h-16 w-16 grid place-items-center rounded-full bg-white/95 text-teal-700 shadow">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7-11-7z" />
                  </svg>
                </div>
              </div>
              {/* chips */}
              <div className="absolute left-3 bottom-3 flex gap-2">
                {featured.category && <span className="chip">{featured.category}</span>}
                {featured.duration && <span className="chip">{featured.duration}</span>}
              </div>
            </div>
            <div className="p-5">
              <div className="text-2xl font-extrabold text-slate-900 line-clamp-2">{featured.title}</div>
              {featured.teaser && <p className="mt-2 text-slate-700 line-clamp-2">{featured.teaser}</p>}
            </div>
          </div>
        </Link>
      )}

      {/* Grid */}
      <h2 className="h3 mt-10">{cat && cat !== "All" ? cat : "All videos"}</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items?.map((v: any, i: number) => <VideoCard key={i} {...v} />)}
      </div>
    </div>
  );
}
