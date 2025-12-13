"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // wait 50ms to ensure cookie is set
      setTimeout(() => router.push("/admin"), 50);
    } catch (err) {
      setError("Server error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`${bebasNeue.className} text-6xl lg:text-7xl text-yellow-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.6)] tracking-[0.1em] uppercase mb-4`}>
            ADMIN
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full shadow-lg" />
        </div>

        {/* Card */}
        <div className="bg-slate-800/90 backdrop-blur-2xl rounded-3xl border border-slate-700/50 shadow-2xl p-10 space-y-6">
          {/* Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-4 text-center">
              <p className="text-red-300 font-bold tracking-wide uppercase text-sm">{error}</p>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Email</label>
            <input
              type="email"
              placeholder="admin@paugnat.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-slate-700/50 border-2 border-slate-600/50 rounded-2xl text-white placeholder-slate-400 
                        focus:border-yellow-400 focus:outline-none focus:ring-4 ring-yellow-400/20 transition-all duration-300 
                        backdrop-blur-sm font-semibold text-lg"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-slate-700/50 border-2 border-slate-600/50 rounded-2xl text-white placeholder-slate-400 
                        focus:border-yellow-400 focus:outline-none focus:ring-4 ring-yellow-400/20 transition-all duration-300 
                        backdrop-blur-sm font-semibold text-lg"
              disabled={loading}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className={`w-full py-5 rounded-2xl font-black text-xl uppercase tracking-[0.1em] transition-all duration-300 
                      shadow-2xl transform hover:-translate-y-1 hover:shadow-3xl active:translate-y-0
                      ${loading || !email || !password
                        ? 'bg-slate-700/50 border-2 border-slate-600/50 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black border-2 border-yellow-400/50 hover:shadow-yellow-500/25 hover:shadow-2xl'
                      }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              "ACCESS CONTROL"
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500 tracking-wider uppercase">
          PAUGNAT 2026 • ADMIN PANEL
        </div>
      </div>
    </div>
  );
}
