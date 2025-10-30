import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

type LeadType = "Consulting" | "Training" | "Careers";

type IncomingPayload = {
  type: LeadType;
  // common
  firstname?: string;
  lastname?: string;
  email?: string;
  // consulting/careers extras
  phone?: string;
  company?: string;
  city?: string;
  state?: string; // “State/Region”
  // optional free-text
  message?: string;
};

const PORTAL = process.env.HUBSPOT_PORTAL_ID;

const FORM_GUIDS: Record<LeadType, string | undefined> = {
  Consulting: process.env.HUBSPOT_FORM_GUID_CONSULTING,
  Training: process.env.HUBSPOT_FORM_GUID_TRAINING,
  Careers: process.env.HUBSPOT_FORM_GUID_CAREERS,
};

// IMPORTANT: update these if your HubSpot “internal names” differ.
// Open HubSpot → Marketing → Forms → Edit → Field → “Internal name”
const FIELD_MAP: Record<LeadType, Array<keyof IncomingPayload>> = {
  Training: ["firstname", "lastname", "email"],
  Careers: ["firstname", "lastname", "email", "phone", "city", "state"],
  Consulting: ["email", "firstname", "lastname", "phone", "company", "state", "city"],
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as IncomingPayload;

    const type: LeadType = (body.type as LeadType) || "Consulting";
    const formId = FORM_GUIDS[type];

    if (!PORTAL || !formId) {
      return NextResponse.json(
        { ok: false, error: "HubSpot env vars missing (portal or form GUID)" },
        { status: 500 }
      );
    }

    // Build fields: only include those expected by the selected form, if they have a value.
    const wanted = FIELD_MAP[type];
    const fields = wanted
      .map((name) => ({ name, value: (body as any)[name]?.toString().trim() || "" }))
      .filter((f) => f.value); // drop empties

    // Minimal validation for requireds (email is always a good idea)
    if (!fields.find((f) => f.name === "email")) {
      return NextResponse.json(
        { ok: false, error: "Missing required field: email" },
        { status: 400 }
      );
    }

    // Context: tracking cookie + page info
    const cookieStore = cookies();
    const hutk = cookieStore.get("hubspotutk")?.value;
    const hdrs = headers();
    const pageUri = hdrs.get("referer") || "https://www.ripotek.com/contact";
    const pageName = "Contact";

    // Optional: generic consent block (kept simple)
    const submission = {
      fields: fields.map((f) => ({ name: f.name, value: f.value })),
      context: { hutk, pageUri, pageName },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "I agree to allow Ripotek to store and process my personal data.",
          communications: [],
        },
      },
    };

    const hsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL}/${formId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(submission),
      }
    );

    const text = await hsRes.text();
    if (!hsRes.ok) {
      // Echo HubSpot error so you see exactly which field name is wrong/missing
      return NextResponse.json(
        { ok: false, error: "HubSpot submission failed", detail: text },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, detail: text });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "Server error", detail: e?.message || String(e) },
      { status: 500 }
    );
  }
}
