import { NextResponse } from "next/server";

export const runtime = "edge";

// Redirects the user to Google's OAuth2 consent page for offline calendar access
export async function GET(req: Request) {
  // Build the OAuth2 consent URL
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    redirect_uri: process.env.REDIRECT_URI!,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/calendar.freebusy",
      "https://www.googleapis.com/auth/calendar.events",
    ].join(" "),
    access_type: "offline", // request a refresh token
    prompt: "consent", // force re-consent to always get a refresh token
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return NextResponse.redirect(authUrl);
}
