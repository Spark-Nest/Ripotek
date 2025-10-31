import { sanity } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";
import { Suspense } from "react";

export const revalidate = 120;

async function fetchData() {
  return sanity.fetch(`
  *[_type=="gallery"]|order(date desc){
    title, "slug": slug.current, description, date, tags, industry, services,
    images[]{asset, alt, caption}
  }`);
}

export default async function GalleryPage() {
  const albums = await fetchData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Gallery</h1>
      <p className="mt-2 text-slate-600">Training, client workshops, and community highlights.</p>

      <div className="mt-8 grid gap-10">
        {albums.map((g: any, gi: number) => (
          <Album key={gi} album={g} />
        ))}
      </div>
    </div>
  );
}

/* Client subcomponent with lightbox */
"use client";
import { useMemo, useState } from "react";

function Album({ album }: { album: any }) {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState<{src?: string; alt?: string; caption?: string}>({});

  const images = useMemo(() => (album.images || []).map((im: any) => ({
    src: im?.asset ? urlFor(im).width(1600).height(900).fit("crop").auto("format").url() : "",
    alt: im?.alt || album.title,
    caption: im?.caption
  })), [album]);

  return (
    <section>
      <h2 className="text-2xl font-bold">{album.title}</h2>
      {album.description && <p className="text-slate-600 mt-1">{album.description}</p>}

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((im: any, i: number) => (
          <button key={i} className="card relative aspect-[4/3]" onClick={() => (setImg(im), setOpen(true))}>
            {im.src ? (
              <Image src={im.src} alt={im.alt} fill className="object-cover fade-in" sizes="(max-width: 640px) 100vw, 33vw" />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-slate-100 text-slate-500">No image</div>
            )}
          </button>
        ))}
      </div>

      <Lightbox open={open} onClose={() => setOpen(false)} src={img.src} alt={img.alt} caption={img.caption}/>
    </section>
  );
}
