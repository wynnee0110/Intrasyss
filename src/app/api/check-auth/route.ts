import { NextResponse } from "next/server";
import { verifyJWT, isTokenExpired } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized", expired: false }, { status: 401 });
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
      // Clear expired token
      const res = NextResponse.json({ error: "Token expired", expired: true }, { status: 401 });
      res.headers.append(
        "Set-Cookie",
        "token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
      );
      return res;
    }

    const payload = verifyJWT(token);

    if (!payload) {
      return NextResponse.json({ error: "Invalid token", expired: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, user: payload });
  } catch (err) {
    console.error("Auth check error:", err);
    return NextResponse.json({ error: "Unauthorized", expired: false }, { status: 401 });
  }
}