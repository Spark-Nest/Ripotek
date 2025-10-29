"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

function SuccessPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Submission successful"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Checkmark */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 7L9 18l-5-5"
              stroke="currentColor"
              className="text-green-600"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-slate-900">
          Submitted successfully!
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Thanks for reaching out. We’ll get back to you shortly.
        </p>

        <button
          onClick={onClose}
          className="mt-5 inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-br from-[#7b34ff] to-[#142a66]"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [openPopup, setOpenPopup] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      type: String(formData.get("type") || "Consulting"),
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
      } else {
        setStatus("ok");
        form.reset();
        // Open popup and auto-dismiss after 3s
        setOpenPopup(true);
        setTimeout(() => setOpenPopup(false), 3000);
      }
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Network error");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Contact Ripotek</h1>
      <p className="mt-2 text-slate-700">
        Tell us a bit about your needs and we’ll reply shortly.
      </p>

      {/* Live region for screen readers */}
      <div aria-live="polite" className="sr-only">
        {status === "loading" && "Sending message"}
        {status === "ok" && "Submitted successfully"}
        {status === "error" && `Submission failed: ${error}`}
      </div>

      <form ref={formRef} onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">I’m interested in</label>
          <select name="type" className="mt-1 w-full rounded border px-3 py-2">
            <option>Consulting</option>
            <option>Training</option>
            <option>Careers</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="How can we help?"
          />
        </div>

        <button
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-br from-[#7b34ff] to-[#142a66]"
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {status === "error" && (
          <div className="text-red-700">
            Sorry, something went wrong. {error}
          </div>
        )}
      </form>

      {/* The success popup */}
      <SuccessPopup open={openPopup} onClose={() => setOpenPopup(false)} />
    </div>
  );
}
