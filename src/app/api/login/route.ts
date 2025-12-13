import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { signJWT } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    console.log('=== LOGIN ATTEMPT ===');
    console.log('ENV CHECK:', {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ SET' : '✗ MISSING',
      serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ SET' : '✗ MISSING',
      jwtSecret: process.env.JWT_SECRET ? '✓ SET' : '✗ MISSING'
    });

    const { email, password } = await req.json();
    console.log('Login attempt for:', email);

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Sign in with Supabase
    const { data, error } = await supabaseServer.auth.signInWithPassword({
      email,
      password,
    });

    console.log('Supabase response:', {
      success: !!data?.user,
      error: error?.message,
      code: error?.code
    });

    if (error || !data.user) {
      return NextResponse.json({ 
        error: error?.message || "Invalid credentials",
        code: error?.code 
      }, { status: 401 });
    }

    // Create JWT
    const token = signJWT({ id: data.user.id, email: data.user.email });

    // Return response with cookie
    const res = NextResponse.json({ success: true, user: { email: data.user.email } });
    res.headers.append(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; SameSite=Strict${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`
    );

    console.log('✓ Login successful');
    return res;
  } catch (err) {
    console.error('❌ Login error:', err);
    return NextResponse.json({ error: "Server error", details: String(err) }, { status: 500 });
  }
}