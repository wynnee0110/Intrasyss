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
      {/* Fixed header - consistent padding */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b-2 border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
        </div>
      </header>

      {/* PERFECT Hero - Fixed visual bugs */}
      <section className="relative h-[60vh] sm:h-[70vh] lg:h-[85vh] xl:h-[90vh] 2xl:h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-950" />
        <FlickeringGrid 
          className="absolute inset-0 opacity-20 sm:opacity-30 lg:opacity-40" 
          squareSize={3}
          gridGap={1}
          flickerChance={0.2}
          color="#fbbf24"
          maxOpacity={0.15}
        />
        
        {/* Fixed overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 lg:from-black/60 to-transparent" />
        
        <div className="relative z-10 flex h-full items-center justify-center px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
          <div className={`space-y-4 sm:space-y-6 lg:space-y-8 xl:space-y-10 transform transition-all duration-1000 ease-out w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl ${
            mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <h1 className={`${bebasNeue.className} 
                text-[3.5rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] xl:text-[9.5rem] 2xl:text-[11rem]
                text-yellow-400 drop-shadow-[0_0_35px_rgba(251,191,36,0.7)] leading-none tracking-tight lg:tracking-[0.02em] mx-auto`}>
                PAUGNAT
              </h1>
              <h1 className={`${bebasNeue.className} 
                text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem]
                text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] tracking-[0.05em] lg:tracking-[0.07em] mx-auto`}>
                2026
              </h1>
            </div>
            <div className="inline-flex items-center gap-3 sm:gap-4 lg:gap-5 px-8 sm:px-12 lg:px-16 xl:px-20 py-3.5 sm:py-4 lg:py-5 
              bg-slate-800/90 border-2 border-yellow-500/60 backdrop-blur-xl rounded-3xl lg:rounded-[2.5rem] 
              text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white shadow-2xl hover:shadow-yellow-500/30 
              transition-all duration-300 hover:scale-[1.02] mx-auto">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 bg-yellow-400 rounded-full shadow-xl lg:shadow-2xl flex-shrink-0" />
              <span className="tracking-[0.1em]">INTRAMURALS • USTP</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Leaderboard Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-t from-slate-900/95 via-slate-800/90 to-transparent/50">
        <div className="absolute inset-0 opacity-15 lg:opacity-20 bg-[radial-gradient(circle_at_50%_20%,#fbbf24,rgba(0,0,0,0)50%)]" />
        
        <div className="relative z-10">
          <div className="max-w-6xl lg:max-w-7xl xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className={`text-center space-y-6 sm:space-y-8 lg:space-y-12 xl:space-y-16 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-8"
            }`}>
              <div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 flex-wrap">
                <div className="w-20 sm:w-24 lg:w-32 xl:w-36 2xl:w-40 h-px bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent" />
                <h2 className={`${bebasNeue.className} 
                  text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 
                  text-yellow-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.6)] tracking-[0.08em] lg:tracking-[0.12em] leading-none`}>
                  LEADERBOARD
                </h2>
                <div className="w-20 sm:w-24 lg:w-32 xl:w-36 2xl:w-40 h-px bg-gradient-to-l from-yellow-500 via-yellow-400 to-transparent" />
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-slate-300 max-w-3xl mx-auto tracking-[0.12em] uppercase font-semibold">
                LIVE STANDINGS
              </p>
            </div>

            <div className={`mt-12 sm:mt-16 lg:mt-20 xl:mt-24 2xl:mt-32 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0 delay-800 scale-100" : "opacity-0 translate-y-8 scale-98"
            }`}>
              <div className="relative bg-slate-900/95 backdrop-blur-2xl rounded-3xl lg:rounded-[2.5rem] xl:rounded-[3rem] border-2 border-yellow-500/40 shadow-2xl shadow-yellow-500/10 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 sm:h-2 lg:h-3 xl:h-4 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 shadow-xl" />
                <div className="relative z-10 p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12">
                  <div className="bg-slate-800/98 rounded-[1.5rem] sm:rounded-[1.75rem] lg:rounded-[2rem] xl:rounded-[2.25rem] 
                    border border-slate-700/60 p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12 min-h-[28rem] sm:min-h-[32rem] lg:min-h-[40rem] xl:min-h-[44rem]">
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
