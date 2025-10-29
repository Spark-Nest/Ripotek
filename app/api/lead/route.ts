import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

type Payload = {
  name: string;
  email: string;
  message: string;
  type?: "Consulting" | "Training" | "Careers";
};

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstname: parts[0], lastname: "" };
  return { firstname: parts.slice(0, -1).join(" "), lastname: parts.slice(-1).join(" ") };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>;
    const type = (body.type as Payload["type"]) || "Consulting";
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing name, email, or message" }, { status: 400 });
    }

    const { firstname, lastname } = splitName(name);

    const portal = process.env.HUBSPOT_PORTAL_ID;
    const GUIDS: Record<string, string | undefined> = {
      Consulting: process.env.HUBSPOT_FORM_GUID_CONSULTING,
      Training: process.env.HUBSPOT_FORM_GUID_TRAINING,
      Careers: process.env.HUBSPOT_FORM_GUID_CAREERS
    };
    const formGuid = GUIDS[type] || process.env.HUBSPOT_FORM_GUID;

    // If not configured, fail gracefully with a helpful message.
    if (!portal || !formGuid) {
      return NextResponse.json(
        { ok: false, error: "HubSpot env vars missing (portal or form GUID)" },
        { status: 500 }
      );
    }

    // Try to include tracking cookie + page context
    const cookieStore = cookies();
    const hutk = cookieStore.get("hubspotutk")?.value; // HubSpot tracking cookie if present
    const hdrs = headers();
    const pageUri = hdrs.get("referer") || "https://www.ripotek.com/contact";
    const pageName = "Contact";

    // Build the submission payload
    const submission = {
      fields: [
        { name: "email", value: email },
        { name: "firstname", value: firstname },
        { name: "lastname", value: lastname },
        { name: "message", value: message },
      ],
      context: {
        hutk,                // ok if undefined
        pageUri,
        pageName,
      },
      // Generic GDPR consent (safe to include; ignored if your form doesn’t require it)
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "I agree to allow Ripotek to store and process my personal data.",
          communications: []
        }
      }
    };

    const hsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${formGuid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(submission)
      }
    );

    const text = await hsRes.text(); // read body no matter what, so we can show details

    if (!hsRes.ok) {
      // echo HubSpot’s message so you’ll see exactly which field is missing
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
