
export default function Footer(){
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-extrabold">Ripotek Technology Inc.</div>
          <p className="text-slate-600 mt-2">Calgary, Alberta • Founded March 2023</p>
        </div>
        <div>
          <div className="font-bold">Company</div>
          <ul className="mt-2 space-y-1 text-slate-600">
            <li><a href="/about">About</a></li>
            <li><a href="/about#mission">Mission & Values</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>
        <div>
          <div className="font-bold">Legal</div>
          <ul className="mt-2 space-y-1 text-slate-600">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/refunds">Training Refund Policy</a></li>
          </ul>
        </div>
        <div>
          <div className="font-bold">Newsletter</div>
          <p className="text-slate-600">Blog & monthly newsletter: Coming Soon</p>
        </div>
      </div>
    </footer>
  );
}
