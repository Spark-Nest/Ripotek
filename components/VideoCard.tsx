import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/image";

type Props = {
  href: string;
  title: string;
  duration?: string;
  thumbnail?: any; // Sanity image field
  alt?: string;
  category?: string;
};

export default function VideoCard({ href, title, duration, thumbnail, alt, category }: Props) {
  const src = thumbnail?.asset ? urlFor(thumbnail).width(960).height(540).fit("crop").auto("format").url() : undefined;

  return (
    <Link href={href} className="card block overflow-hidden rounded-2xl border">
      <div className="relative aspect-video">
        {src ? (
          <Image
            src={src}
            alt={alt || title}
            fill
            className="object-cover fade-in"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-slate-100 text-slate-500">No thumbnail</div>
        )}

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 hover:opacity-100 transition" />
        {/* play icon */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="h-12 w-12 rounded-full bg-white/90 text-teal-700 grid place-items-center opacity-0 group-hover:opacity-100 transition">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7-11-7z" />
            </svg>
          </div>
        </div>

        {/* duration chip */}
        {duration && (
          <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
            {duration}
          </div>
        )}
        {/* category pill */}
        {category && (
          <div className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-xs text-teal-700">
            {category}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="font-semibold clamp-2">{title}</div>
      </div>
    </Link>
  );
}
