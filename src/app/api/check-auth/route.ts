import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";

function parseCookies(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  return Object.fromEntries(cookie.split("; ").map(c => c.split("=")));
}

export async function GET(req: Request) {
  try {
    const cookies = parseCookies(req);
    const token = cookies["token"];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyJWT(token);
    return NextResponse.json({ success: true, user: payload });
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
