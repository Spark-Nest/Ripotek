
import Link from "next/link";

export default function Header(){
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <img src="/assets/ripotek_favicon.svg" width={32} height={32} alt="Ripotek" />
          <div className="font-extrabold tracking-tight leading-none">RIPOTEK <span className="text-teal-600">Technology Inc.</span></div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/services">Services</Link>
          <Link href="/training">Training</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/careers">Careers</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn btn-ghost">Request proposal</Link>
          <a href="/contact#book" className="btn btn-primary">Book a discovery call</a>
        </div>
      </div>
    </header>
  );
}
