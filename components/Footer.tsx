import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image
            src="/assets/ripotek_logo.png"
            alt="Ripotek logo"
            width={32}
            height={32}
            className="w-auto h-8"
          />

          <span className="font-semibold text-slate-900">RIPOTEK</span>
        </Link>

        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} Ripotek. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
