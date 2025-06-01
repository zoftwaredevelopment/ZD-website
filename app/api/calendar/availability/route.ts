export const runtime = "edge";

import { NextResponse } from "next/server";
import { importPKCS8 } from "jose";

// Define atob for environments where it might not exist (though Edge should have it)
const atob =
  globalThis.atob ??
  ((b64: string) => Buffer.from(b64, "base64").toString("utf8"));

// Custom base64url encoding function to avoid btoa issues
const base64UrlEncode = (data: Uint8Array | string): string => {
  // Convert input to Uint8Array if it's a string
  const buffer =
    typeof data === "string" ? new TextEncoder().encode(data) : data;

  // Convert to base64 using a manual approach
  const base64 = btoa(String.fromCharCode.apply(null, Array.from(buffer)));

  // Convert to base64url format: remove padding, replace + with -, / with _
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};

async function getAccessToken(): Promise<string> {
  // Parse the service account key (raw JSON or base64-encoded)
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY!;
  const sa = JSON.parse(raw.startsWith("{") ? raw : atob(raw));
  const alg = "RS256";
  const now = Math.floor(Date.now() / 1000);

  // Import the private key from PEM format
  const pem = sa.private_key; // Use as-is, assuming it has proper newlines
  const cryptoKey = await importPKCS8(pem, alg);

  // JWT Header
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  // JWT Payload (sub is the impersonated user's email, same as CALENDAR_ID)
  const payload = {
    scope: "https://www.googleapis.com/auth/calendar",
    iss: sa.client_email,
    sub: process.env.CALENDAR_ID, // Email of the user to impersonate
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600, // 1 hour expiration
  };

  // Encode header and payload to base64url
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  // Sign using Web Crypto API
  const signature = await crypto.subtle.sign(
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  // Convert signature to base64url
  const encodedSignature = base64UrlEncode(new Uint8Array(signature));
  const jwt = `${signingInput}.${encodedSignature}`;

  // Exchange JWT for access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.json();
    throw new Error(`OAuth error: ${err.error_description || err.error}`);
  }

  const { access_token } = await tokenRes.json();
  return access_token;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const start = url.searchParams.get("start_time");
  const end = url.searchParams.get("end_time");

  if (!start || !end) {
    return NextResponse.json(
      { error: "Missing start_time or end_time" },
      { status: 400 }
    );
  }

  try {
    const token = await getAccessToken();
    const fbRes = await fetch(
      "https://www.googleapis.com/calendar/v3/freeBusy",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeMin: start,
          timeMax: end,
          items: [{ id: process.env.CALENDAR_ID }],
        }),
      }
    );

    if (!fbRes.ok) {
      const err = await fbRes.json();
      return NextResponse.json({ error: err }, { status: fbRes.status });
    }

    const fbJson = await fbRes.json();
    const busy = fbJson.calendars?.[process.env.CALENDAR_ID!]?.busy || [];
    return NextResponse.json({ busy });
  } catch (e: any) {
    console.error("Availability error:", e);
    return NextResponse.json(
      { error: e.message, stack: e.stack },
      { status: 500 }
    );
  }
}
