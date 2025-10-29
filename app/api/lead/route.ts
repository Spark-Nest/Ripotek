import { NextResponse } from "next/server";

type Payload = {
  name: string;
  email: string;
  message: string;
  type?: "Consulting" | "Training" | "Careers";
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>;
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();
    const type = (body.type as Payload["type"]) || "Consulting";

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing name, email, or message" },
        { status: 400 }
      );
    }

    const portal = process.env.HUBSPOT_PORTAL_ID;
    const GUIDS: Record<string, string | undefined> = {
      Consulting: process.env.HUBSPOT_FORM_GUID_CONSULTING,
      Training: process.env.HUBSPOT_FORM_GUID_TRAINING,
      Careers: process.env.HUBSPOT_FORM_GUID_CAREERS
    };
    const formGuid = GUIDS[type] || process.env.HUBSPOT_FORM_GUID;

    // If HubSpot isn't configured, return success so the UI doesn't break,
    // but include a hint for logs.
    if (!portal || !formGuid) {
      console.warn("HubSpot env vars missing. Portal or formGuid not set.");
      return NextResponse.json({ ok: true, note: "HubSpot not configured" });
    }

    const hsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${formGuid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          fields: [
            { name: "email", value: email },
            { name: "firstname", value: name },
            { name: "message", value: message },
            { name: "lifecyclestage", value: type }
          ],
          context: {
            pageUri: "https://www.ripotek.com/contact",
            pageName: "Contact"
          }
        })
      }
    );

    if (!hsRes.ok) {
      const txt = await hsRes.text();
      console.error("HubSpot submission failed:", hsRes.status, txt);
      return NextResponse.json(
        { ok: false, error: "HubSpot submission failed", detail: txt },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Lead API error:", e?.message || e);
    return NextResponse.json(
      { ok: false, error: "Server error", detail: e?.message || String(e) },
      { status: 500 }
    );
  }
}
