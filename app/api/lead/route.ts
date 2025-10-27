import { NextResponse } from "next/server";

export async function POST(req: Request){
  const body = await req.json();
  const portal = process.env.HUBSPOT_PORTAL_ID;

  const GUIDS: Record<string, string | undefined> = {
    "Consulting": process.env.HUBSPOT_FORM_GUID_CONSULTING,
    "Training": process.env.HUBSPOT_FORM_GUID_TRAINING,
    "Careers": process.env.HUBSPOT_FORM_GUID_CAREERS
  };

  const formGuid = GUIDS[body.type as string] || process.env.HUBSPOT_FORM_GUID;

  if (portal && formGuid){
    try {
      await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${formGuid}`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          fields: [
            { name: "email", value: body.email },
            { name: "firstname", value: body.name },
            { name: "message", value: body.message },
            { name: "lifecyclestage", value: body.type }
          ],
          context: { pageUri: "https://www.ripotek.ca/contact", pageName: "Contact" }
        })
      });
    } catch {}
  }
  return NextResponse.json({ ok: true });
}
