// app/api/calendar/availability/route.ts
export const runtime = "edge";

import { NextResponse } from "next/server";

// Function to get an access token using the refresh token flow
async function getAccessToken(): Promise<string> {
  // Use environment variables as defined in .env.local
  const clientId = process.env.CLIENT_ID!;
  const clientSecret = process.env.CLIENT_SECRET!;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN!;
  const tokenUri = process.env.TOKEN_URI!; // From credentials JSON: "https://oauth2.googleapis.com/token"

  // Request a new access token using the refresh token
  const tokenRes = await fetch(tokenUri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
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
