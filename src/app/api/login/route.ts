import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer"; // your server-side supabase client
import { signJWT } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Sign in with Supabase
    const { data, error } = await supabaseServer.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return NextResponse.json({ error: error?.message || "Invalid credentials" }, { status: 401 });
    }

    // Create JWT
    const token = signJWT({ id: data.user.id, email: data.user.email });

    // Return response with cookie
    const res = NextResponse.json({ success: true });
    res.headers.append(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; SameSite=Strict${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`
    );

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
