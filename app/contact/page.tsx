
'use client';
import { useState } from 'react';

export default function Contact(){
  const [status, setStatus] = useState<string|undefined>();

  async function submit(e: any){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus('Sending...');
    try {
      const res = await fetch('/api/lead', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
      if(!res.ok) throw new Error('Failed');
      setStatus('Thanks! We will reach out shortly.');
      e.currentTarget.reset();
    } catch {
      setStatus('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Contact Ripotek</h1>
      <p className="mt-2 text-slate-700">Separate forms for Consulting, Training, and Careers. Or book a discovery call below.</p>

      <form onSubmit={submit} className="card grid gap-3 mt-6">
        <div className="grid md:grid-cols-3 gap-3">
          <input className="border rounded-lg px-3 py-2" name="name" placeholder="Name" required/>
          <input className="border rounded-lg px-3 py-2" name="email" placeholder="Work Email" type="email" required/>
          <select className="border rounded-lg px-3 py-2" name="type">
            <option>Consulting</option>
            <option>Training</option>
            <option>Careers</option>
          </select>
        </div>
        <textarea className="border rounded-lg px-3 py-2" rows={4} name="message" placeholder="What can we help you build?" required/>
        <button className="btn btn-primary w-fit">Submit</button>
        {status && <small className="helper">{status}</small>}
      </form>

      <div id="book" className="mt-10 card">
        <div className="h3">Book a discovery call</div>
        <p className="text-sm text-slate-600">Neutral booking widget embed. Replace the iframe src with your provider later.</p>
        <div className="mt-4 aspect-video rounded-xl bg-slate-100 grid place-items-center">
        <iframe
  title="Booking"
  src="https://calendly.com/paroyal007/30min-1"
  className="w-full h-full rounded-xl border"
  allow="camera; microphone; fullscreen"
></iframe>

        </div>
      </div>
    </div>
  );
}
