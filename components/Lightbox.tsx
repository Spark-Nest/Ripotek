"use client";
import { useEffect } from "react";

export default function Lightbox({
  open, onClose, src, alt, caption
}: { open: boolean; onClose: () => void; src?: string; alt?: string; caption?: string; }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80 p-4 grid place-items-center" onClick={onClose}>
      <figure className="max-w-5xl w-full" onClick={(e)=>e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-auto rounded-xl" />
        {caption && <figcaption className="mt-2 text-center text-slate-200 text-sm">{caption}</figcaption>}
      </figure>
    </div>
  );
}
