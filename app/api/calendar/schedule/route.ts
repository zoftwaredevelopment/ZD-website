export const runtime = "edge";

import { NextResponse } from "next/server";
import { importPKCS8 } from "jose";

// Define atob for environments where it might not exist (though Edge should have it)
const atob =
  globalThis.atob ??
  ((b64: string) => Buffer.from(b64, "base64").toString("utf8"));

// Custom base64url encoding function to avoid btoa issues
const base64UrlEncode = (data: Uint8Array | string): string => {
  const buffer =
    typeof data === "string" ? new TextEncoder().encode(data) : data;
  const base64 = btoa(String.fromCharCode.apply(null, Array.from(buffer)));
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};

// Helper to exchange service-account JWT for Google OAuth2 access token
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

  // JWT Payload
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

/**
 * POST /api/calendar/schedule
 * Schedules an event on the server-side calendar (no attendees/invites)
 * and emails the user a custom confirmation with an ICS file (METHOD:PUBLISH)
 */
export async function POST(req: Request) {
  // Parse JSON body from request
  const { start_time, summary, attendees } = await req.json();

  // Validate required fields
  if (!start_time || !summary) {
    return NextResponse.json(
      { error: "Missing start_time or summary" },
      { status: 400 }
    );
  }

  // Compute event start and end dates
  const startDate = new Date(start_time);
  // Default duration: 30 minutes
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

  // Call Calendar API directly using service-account JWT
  try {
    const token = await getAccessToken();
    const evRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        process.env.CALENDAR_ID!
      )}/events?sendUpdates=none`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary,
          description: `${summary}\n\nBooked by: ${
            attendees?.[0]?.displayName || "Unknown"
          } <${attendees?.[0]?.email || "no-email@example.com"}>`,
          start: { dateTime: startDate.toISOString() },
          end: { dateTime: endDate.toISOString() },
        }),
      }
    );

    if (!evRes.ok) {
      const err = await evRes.json();
      console.error("Calendar API error:", err);
      return NextResponse.json({ error: err }, { status: evRes.status });
    }

    const event = await evRes.json();
    return NextResponse.json({ status: "scheduled", event });
  } catch (e: any) {
    console.error("Scheduling error:", e);
    return NextResponse.json(
      { error: e.message, stack: e.stack },
      { status: 500 }
    );
  }
}
