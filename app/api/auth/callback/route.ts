import { NextResponse } from "next/server";

export const runtime = "edge";

// Handles Google's OAuth2 callback, exchanges code for access/refresh tokens
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.json(
      { error: "Missing code parameter" },
      { status: 400 }
    );
  }

  // Exchange authorization code for tokens
  const tokenRes = await fetch(process.env.TOKEN_URI!, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.CLIENT_ID!,
      client_secret: process.env.CLIENT_SECRET!,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.REDIRECT_URI!,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.json();
    return NextResponse.json({ error: err }, { status: tokenRes.status });
  }

  const tokenJson = await tokenRes.json();
  const { access_token, refresh_token } = tokenJson;

  // Log the refresh token so you can copy it into your .env.local
  console.log("Got refresh token:", refresh_token);

  // Return tokens to the browser (for one-time copy/paste into env)
  return NextResponse.json({ access_token, refresh_token });
}
