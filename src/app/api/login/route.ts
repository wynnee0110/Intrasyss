import { NextResponse } from "next/server";
import { createClient, User } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

// Server-side Supabase client
const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function signJWT(payload: { id: string; email: string | null }) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json() as { email: string; password: string };

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Use normal auth client for email/password login
    const { data, error } = await supabaseServer.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return NextResponse.json({ error: error?.message || "Invalid credentials" }, { status: 401 });
    }

    const user: User = data.user;

  const token = signJWT({ id: user.id, email: user.email ?? null });


    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
