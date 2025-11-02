import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image src="/assets/ripotek_favicon.svg" alt="Ripotek logo" width={28} height={28} />
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Ripo<span className="bg-gradient-to-r from-sky-400 to-teal-300 bg-clip-text text-transparent">tek</span>
          </span>
        </Link>

        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} Ripotek. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

