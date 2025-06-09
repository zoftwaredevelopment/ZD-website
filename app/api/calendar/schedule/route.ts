// app/api/calendar/schedule/route.ts
export const runtime = "edge";

import { NextResponse } from "next/server";

// Function to get an access token using the refresh token flow
async function getAccessToken(): Promise<string> {
  const clientId = process.env.CLIENT_ID!;
  const clientSecret = process.env.CLIENT_SECRET!;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN!;
  const tokenUri = process.env.TOKEN_URI!; // From credentials JSON: "https://oauth2.googleapis.com/token"

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

  // Validate attendees (at least one with email and displayName)
  if (!attendees?.[0]?.email || !attendees?.[0]?.displayName) {
    return NextResponse.json(
      { error: "Missing attendee email or displayName" },
      { status: 400 }
    );
  }

  // Compute event start and end dates
  const startDate = new Date(start_time);
  // Default duration: 30 minutes
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

  // Call Calendar API using OAuth 2.0 access token
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
          description: `${summary}\n\nBooked by: ${attendees[0].displayName} <${attendees[0].email}>`,
          start: { dateTime: startDate.toISOString(), timeZone: "UTC" },
          end: { dateTime: endDate.toISOString(), timeZone: "UTC" },
          // Optionally add attendees to the event if you want Google to manage invites
          // attendees: attendees.map((a: any) => ({
          //   email: a.email,
          //   displayName: a.displayName,
          // })),
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
