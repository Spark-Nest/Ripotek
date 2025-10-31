import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/image";

export default function VideoCard({
  href,
  title,
  category,
  duration,
  thumbnail,
}: {
  href: string;
  title: string;
  category?: string;
  duration?: string;
  thumbnail?: { asset?: any; alt?: string };
}) {
  const src = thumbnail?.asset
    ? urlFor(thumbnail).width(800).height(450).fit("crop").auto("format").url()
    : "/placeholder-16x9.jpg";

  return (
    <Link href={href} className="rtk-card group block overflow-hidden no-underline">
      <div className="relative aspect-video">
        <Image
          src={src}
          alt={thumbnail?.alt || title}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="rtk-media"
          priority={false}
        />
        {/* play overlay */}
        <div className="absolute inset-0 grid place-items-center bg-black/0 group-hover:bg-black/10 transition">
          <div className="h-12 w-12 grid place-items-center rounded-full bg-white/95 text-teal-700 shadow">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7-11-7z" />
            </svg>
          </div>
        </div>

        {/* chips */}
        <div className="absolute left-2 bottom-2 flex gap-2">
          {category && <span className="chip">{category}</span>}
          {duration && <span className="chip">{duration}</span>}
        </div>
      </div>

      <div className="p-4">
        <div className="line-clamp-2 font-semibold text-slate-900">{title}</div>
      </div>
    </Link>
  );
}
