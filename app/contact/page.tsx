"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const [error, setError] = useState<string>("");

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
      type: String(formData.get("type") || "Consulting")
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        setStatus("error");
        setError(data?.error || "Submission failed");
      } else {
        setStatus("ok");
        form.reset();
      }
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Network error");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Contact Ripotek</h1>
      <p className="mt-2 text-slate-700">Tell us a bit about your needs and we’ll reply shortly.</p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" required className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" name="email" required className="mt-1 w-full rounded border px-3 py-2" />
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
          <textarea name="message" required rows={5} className="mt-1 w-full rounded border px-3 py-2" />
        </div>

        <button
          disabled={status === "loading"}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-br from-[#7b34ff] to-[#142a66]"
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {status === "ok" && (
          <div className="text-green-700">Thanks! We received your message.</div>
        )}
        {status === "error" && (
          <div className="text-red-700">Sorry, something went wrong. {error}</div>
        )}
      </form>

      {/* Booking widget stays below if you like */}
      {/* <div className="mt-10 aspect-video">
        <iframe ... />
      </div> */}
    </div>
  );
}
