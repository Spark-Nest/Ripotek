import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand: icon + RIPOTEK */}
        <Link href="/" className="flex items-center gap-3 no-underline">
            <Image
              src="/assets/ripotek_logo.png"
              alt="Ripotek logo"
              width={64}     // was 32
              height={64}    // was 32
              className="w-auto h-18"   // forces height look across screens
              priority
            />

          <span className="text-xl font-extrabold tracking-wide text-slate-900">
            RIPOTEK
          </span>
        </Link>

        {/* ...keep your existing nav / CTA buttons here... */}
      </div>
    </header>
  );
}
