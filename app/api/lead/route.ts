
import { NextResponse } from "next/server";

export async function POST(req: Request){
  const body = await req.json();
  const portal = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;
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
            { name: "type", value: body.type }
          ],
          context: { pageUri: "https://ripotek.example/contact", pageName: "Contact" }
        })
      });
    } catch(e){ /* ignore in starter */ }
  }
  return NextResponse.json({ ok: true });
}
