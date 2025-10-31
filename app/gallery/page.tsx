"use client";

import { useState } from "react";
import { sanity } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import Image from "next/image";

// If you're fetching server-side in a future version, 
// move the Sanity query to a server component and pass props down.

const items = [
  // Temporary static placeholders until hooked to Sanity
  {
    id: 1,
    img: { asset: "sample1" },
    alt: "Compressor performance dashboard",
    album: "Energy Analytics",
    caption: "Databricks-powered monitoring system.",
  },
  {
    id: 2,
    img: { asset: "sample2" },
    alt: "AI training session",
    album: "Training",
    caption: "Fabric + Power BI Masterclass in Calgary.",
  },
  {
    id: 3,
    img: { asset: "sample3" },
    alt: "Pipeline optimization",
    album: "Engineering",
    caption: "Azure-native data lakehouse for operations data.",
  },
];

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<{
    src: string;
    alt?: string;
    caption?: string;
  } | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Gallery</h1>
      <p className="mt-2 text-slate-600">
        Highlights from training, client projects, and community.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => {
          // In your live version, replace this with urlFor(it.img).auto("format").url()
          const src =
            typeof it.img?.asset === "string"
              ? `/images/${it.img.asset}.jpg`
              : "";

          return (
            <button
              key={it.id}
              className="rtk-card group relative aspect-[4/3] overflow-hidden"
              onClick={() => {
                if (src) {
                  setActive({
                    src,
                    alt: it.alt,
                    caption: it.caption,
                  });
                  setOpen(true);
                }
              }}
            >
              {src ? (
                <Image
                  src={src}
                  alt={it.alt || ""}
                  fill
                  className="rtk-media fade-in"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-slate-100 text-slate-500">
                  No image
                </div>
              )}

              {/* optional ink overlay */}
              <div className="rtk-ink" />

              {/* chip / album */}
              <div className="absolute left-2 bottom-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                {it.album}
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal Viewer */}
      {open && active && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt || ""}
              width={1200}
              height={800}
              className="rounded-2xl shadow-xl object-contain"
            />
            {active.caption && (
              <p className="mt-2 text-center text-slate-100">
                {active.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
