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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 overflow-x-hidden">
      {/* Fixed responsive header */}
      <header className="sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
        </div>
      </header>

      {/* Fully Responsive Hero Section - Fixed overflow */}
      <section className="relative h-screen sm:h-[70vh] md:h-[75vh] lg:h-[80vh] xl:h-[85vh] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center overflow-hidden">
        <FlickeringGrid 
          className="absolute inset-0 w-full h-full opacity-5 sm:opacity-10 md:opacity-15 lg:opacity-20" 
          squareSize={4}
          gridGap={2}
          flickerChance={0.1}
          color="#facc15"
          maxOpacity={0.1}
        />
        
        <div className={`w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 transform transition-all duration-800 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <h1 className={`${bebasNeue.className} 
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 
              text-yellow-400 drop-shadow-2xl leading-none tracking-tight lg:tracking-tight mx-auto`}>
              PAUGNAT
            </h1>
            <h2 className={`${bebasNeue.className} 
              text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
              text-white/95 tracking-wider font-light mx-auto`}>
              2026
            </h2>
          </div>
          
          <div className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 
            bg-slate-800/90 backdrop-blur-md border border-yellow-400/60 rounded-2xl shadow-xl
            text-lg sm:text-xl md:text-2xl font-bold text-white hover:bg-slate-700/90 
            transition-all duration-300 hover:scale-105 mx-auto">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full shadow-lg flex-shrink-0" />
            <span className="tracking-wider uppercase">USTP</span>
          </div>
        </div>
      </section>

      {/* Fully Responsive Leaderboard Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-slate-900/80 to-slate-950/50">
        <div className="max-w-6xl sm:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-800 ${
            mounted ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-6"
          }`}>
            <h2 className={`${bebasNeue.className} 
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
              text-yellow-400 drop-shadow-xl tracking-tight mb-4 sm:mb-6 mx-auto`}>
              LEADERBOARD
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-white/90 uppercase tracking-widest font-light mx-auto">
              Live Standings
            </p>
          </div>

          <div className={`transition-all duration-600 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <LeaderboardSection />
          </div>
        </div>
      </section>
    </div>
  );
}
