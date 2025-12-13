import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true, message: "Logged out" });
  
  // Clear the token cookie
  res.headers.append(
    "Set-Cookie",
    "token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
  );

  return res;
}