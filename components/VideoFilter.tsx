"use client";
import { useRouter, useSearchParams } from "next/navigation";

const CATS = ["All", "Training Demos", "Case Studies", "Webinars"] as const;

export default function VideoFilter() {
  const router = useRouter();
  const sp = useSearchParams();
  const selected = sp.get("category") || "All";

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    const qs = new URLSearchParams(sp);
    if (val === "All") qs.delete("category");
    else qs.set("category", val);
    router.push(`/videos?${qs.toString()}`);
  }

  return (
    <div className="mt-4 flex items-center gap-3">
      <label className="text-sm text-slate-600">Filter by category</label>
      <select
        className="rounded border px-3 py-1.5 text-sm"
        value={selected}
        onChange={onChange}
      >
        {CATS.map(c => <option key={c}>{c}</option>)}
      </select>
    </div>
  );
}
