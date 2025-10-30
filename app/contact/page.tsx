"use client";

import { useEffect, useRef, useState } from "react";

type LeadType = "Consulting" | "Training" | "Careers";
type Status = "idle" | "loading" | "ok" | "error";

function SuccessPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M20 7L9 18l-5-5" stroke="currentColor" className="text-green-600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900">Submitted successfully!</h3>
        <p className="mt-2 text-sm text-slate-600">Thanks for reaching out. We’ll get back to you shortly.</p>
        <button onClick={onClose} className="mt-5 inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-br from-[#7b34ff] to-[#142a66]">
          Close
        </button>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [type, setType] = useState<LeadType>("Consulting");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [openPopup, setOpenPopup] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Field visibility by type
  const needs = {
    Training:   { firstname: true, lastname: true, email: true, phone: false, company: false, city: false, state: false },
    Careers:    { firstname: true, lastname: true, email: true, phone: true, company: false, city: true, state: true },
    Consulting: { firstname: true, lastname: true, email: true, phone: true, company: true, city: true, state: true },
  }[type];

 async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setStatus("loading");
  setError("");

  // 👇 capture the form element BEFORE any await
  const formEl = e.currentTarget as HTMLFormElement;

  const fd = new FormData(formEl);
  const payload: any = {
    type,
    firstname: fd.get("firstname")?.toString().trim(),
    lastname:  fd.get("lastname")?.toString().trim(),
    email:     fd.get("email")?.toString().trim(),
    phone:     fd.get("phone")?.toString().trim(),
    company:   fd.get("company")?.toString().trim(),
    city:      fd.get("city")?.toString().trim(),
    state:     fd.get("state")?.toString().trim(),
    message:   fd.get("message")?.toString().trim(),
  };

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || data?.ok === false) {
      setStatus("error");
      setError(data?.detail || data?.error || "Submission failed");
      return;
    }

    // ✅ safe: we stored the element before the await
    formEl.reset();
    setStatus("ok");
    setOpenPopup(true);
    setTimeout(() => setOpenPopup(false), 3000);
  } catch (err: any) {
    setStatus("error");
    setError(err?.message || "Network error");
  }
}

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Contact Ripotek</h1>
      <p className="mt-2 text-slate-700">Tell us a bit about your needs. We’ll route it to the right team.</p>

      <form ref={formRef} onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div>
          <label className="block text-sm font-medium">I’m interested in</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value as LeadType)}
            className="mt-1 w-full rounded border px-3 py-2"
          >
            <option>Consulting</option>
            <option>Training</option>
            <option>Careers</option>
          </select>
        </div>

        {/* Names + email always shown */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First name</label>
            <input name="firstname" required className="mt-1 w-full rounded border px-3 py-2" placeholder="Jane" />
          </div>
          <div>
            <label className="block text-sm font-medium">Last name</label>
            <input name="lastname" required className="mt-1 w-full rounded border px-3 py-2" placeholder="Doe" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" name="email" required className="mt-1 w-full rounded border px-3 py-2" placeholder="you@example.com" />
        </div>

        {/* Conditional fields */}
        {needs.phone && (
          <div>
            <label className="block text-sm font-medium">Phone number</label>
            <input name="phone" className="mt-1 w-full rounded border px-3 py-2" placeholder="+1 403 ..." />
          </div>
        )}
        {needs.company && (
          <div>
            <label className="block text-sm font-medium">Company name</label>
            <input name="company" className="mt-1 w-full rounded border px-3 py-2" placeholder="Your company" />
          </div>
        )}
        {(needs.city || needs.state) && (
          <div className="grid sm:grid-cols-2 gap-4">
            {needs.city && (
              <div>
                <label className="block text-sm font-medium">City</label>
                <input name="city" className="mt-1 w-full rounded border px-3 py-2" placeholder="Calgary" />
              </div>
            )}
            {needs.state && (
              <div>
                <label className="block text-sm font-medium">State/Region</label>
                <input name="state" className="mt-1 w-full rounded border px-3 py-2" placeholder="Alberta" />
              </div>
            )}
          </div>
        )}

        {/* Optional free-text for any type */}
        <div>
          <label className="block text-sm font-medium">Message (optional)</label>
          <textarea name="message" rows={4} className="mt-1 w-full rounded border px-3 py-2" placeholder="Tell us about your project or goals" />
        </div>

        <button disabled={status === "loading"} className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-br from-[#7b34ff] to-[#142a66]">
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {status === "error" && <div className="text-red-700">Sorry, something went wrong. {error}</div>}

        <div aria-live="polite" className="sr-only">
          {status === "loading" && "Sending message"}
          {status === "ok" && "Submitted successfully"}
          {status === "error" && `Submission failed: ${error}`}
        </div>
      </form>

      <SuccessPopup open={openPopup} onClose={() => setOpenPopup(false)} />
    </div>
  );
}
