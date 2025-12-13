"use client";

import { useEffect, useState } from "react";
import { Bebas_Neue } from "next/font/google";
import { FlickeringGrid } from "@/components/ui/shadcn-io/flickering-grid";
import Header from "@/components/header";
import LeaderboardSection from "@/components/LeaderboardSection";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-black">
      {/* Classic bold header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b-2 border-yellow-500">
        <div className="max-w-7xl mx-auto px-6">
          <Header />
        </div>
      </header>

      {/* Hero - Classic stadium lights */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-950" />
        <FlickeringGrid 
          className="absolute inset-0 opacity-50" 
          squareSize={4}
          gridGap={1}
          flickerChance={0.3}
          color="#fbbf24"
          maxOpacity={0.25}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className={`space-y-6 transform transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}>
            <div className="space-y-3">
              <h1 className={`${bebasNeue.className} text-[120px] lg:text-[180px] text-yellow-400 drop-shadow-[0_0_40px_rgba(251,191,36,0.7)] leading-none tracking-[0.03em]`}>
                PAUGNAT
              </h1>
              <h1 className={`${bebasNeue.className} text-[70px] lg:text-[100px] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] tracking-[0.08em]`}>
                2026
              </h1>
            </div>
            <div className="inline-flex items-center gap-3 px-10 py-5 bg-slate-800/80 border border-yellow-500/40 backdrop-blur-md rounded-2xl text-xl font-bold text-white shadow-xl">
              <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg" />
              INTRAMURALS • USTP
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard - Classic scoreboard */}
      <section className="relative py-24 bg-gradient-to-t from-slate-900 via-slate-800 to-transparent">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_20%,#fbbf24,rgba(0,0,0,0)50%)]" />
        
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className={`text-center space-y-8 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-8"
            }`}>
              <div className="flex items-center justify-center gap-8">
                <div className="w-24 h-px bg-gradient-to-r from-yellow-500 to-transparent" />
                <h2 className={`${bebasNeue.className} text-5xl lg:text-7xl text-yellow-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)] tracking-[0.12em]`}>
                  LEADERBOARD
                </h2>
                <div className="w-24 h-px bg-gradient-to-l from-yellow-500 to-transparent" />
              </div>
              <p className="text-xl text-slate-300 max-w-xl mx-auto tracking-[0.1em] uppercase font-semibold">
                LIVE STANDINGS
              </p>
            </div>

            <div className={`mt-20 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0 delay-800 scale-100" : "opacity-0 translate-y-8 scale-98"
            }`}>
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border-2 border-yellow-500/30 shadow-2xl shadow-black/50 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-md" />
                <div className="relative z-10 p-4">
                  <div className="bg-slate-800/95 rounded-[1.75rem] border border-slate-700/50 p-8 lg:p-12 min-h-[36rem]">
                    <LeaderboardSection />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
