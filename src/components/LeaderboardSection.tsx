"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Team {
  id: string;
  name: string;
  score: number;
  logo_url?: string;
  gold?: number;
  silver?: number;
  bronze?: number;
}

export default function LeaderboardSection() {
  const [leaderboard, setLeaderboard] = useState<Team[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .order("score", { ascending: false });

    if (error) console.error(error);
    else setLeaderboard(data || []);
  };

  if (!leaderboard.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-24 text-center bg-gradient-to-b from-slate-900/50 to-transparent rounded-3xl border border-slate-700/50 px-4">
        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white/10 rounded-3xl flex items-center justify-center mb-6 sm:mb-8 border-4 border-white/20 backdrop-blur-xl shadow-2xl">
          <span className="text-2xl sm:text-4xl font-bold text-white drop-shadow-xl">01</span>
        </div>
        <p className="text-xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 tracking-tight">EMPTY STANDINGS</p>
        <p className="text-base sm:text-lg text-slate-400 font-medium tracking-widest uppercase">Awaiting first scores</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-1 bg-slate-900/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
      {/* Responsive header */}
      <div className="bg-slate-800/80 px-4 sm:px-8 py-4 sm:py-5 border-b border-white/10">
        <div className="flex items-center justify-between text-xs sm:text-sm font-mono uppercase tracking-[0.4em] text-slate-400">
          <span className="w-12 sm:w-20 min-w-0 flex-shrink-0 text-left">POS</span>
          <span className="flex-1 pl-2 sm:pl-6 min-w-0 truncate text-center sm:text-left">TEAM</span>
          <span className="w-24 sm:w-32 text-right min-w-0 truncate">AWARDS</span>
        </div>
      </div>

      {/* Responsive rows */}
      <div className="divide-y divide-white/5">
        {leaderboard.map((team, index) => {
          const position = index + 1;
          const isPodium = position <= 3;

          return (
            <div
              key={team.id}
              className={`
                group hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent
                hover:border-l-white/30 ${isPodium ? `bg-gradient-to-r from-white/5 to-transparent border-l-white/50` : ""}
              `}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-8 py-5 sm:py-6 gap-4 sm:gap-0">
                {/* Position */}
                <div className="w-full sm:w-20 flex justify-center sm:justify-start">
                  <span className={`text-xl sm:text-2xl font-mono font-bold leading-none ${
                    position === 1 ? "text-yellow-400" : 
                    position === 2 ? "text-slate-300" : 
                    position === 3 ? "text-amber-400" : "text-slate-400"
                  }`}>
                    {position.toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Team */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center flex-1 gap-3 sm:gap-5 pl-0 sm:pl-4 w-full sm:min-w-0">
                  {team.logo_url ? (
                    <div className="flex-shrink-0 relative">
                      <img
                        src={team.logo_url}
                        alt={team.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-white/20 shadow-xl hover:shadow-white/30 transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-xl group-hover:shadow-white/30 transition-all duration-300">
                      <span className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase leading-none">
                        {team.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1 w-full">
                    <div className="text-base sm:text-lg font-bold text-white truncate tracking-tight group-hover:text-white/90 transition-colors leading-tight">
                      {team.name}
                    </div>
                  </div>
                </div>

                {/* Medal icons only - responsive */}
                <div className="w-full sm:w-32 flex flex-wrap gap-2 sm:gap-2 sm:flex-nowrap items-center justify-end pr-0 sm:pr-1">
                  {team.gold && team.gold > 0 && (
                    <div className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-yellow-500/15 border border-yellow-400/40 rounded-lg sm:rounded-xl backdrop-blur-sm shadow-lg flex-shrink-0 min-w-[80px] justify-center">
                      <span className="text-base sm:text-lg">🥇</span>
                      <span className="text-xs font-bold text-yellow-300 tracking-tight">{team.gold}</span>
                    </div>
                  )}
                  {team.silver && team.silver > 0 && (
                    <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-slate-500/15 border border-slate-400/40 rounded-lg sm:rounded-lg backdrop-blur-sm shadow-md flex-shrink-0 min-w-[70px] justify-center">
                      <span className="text-sm sm:text-base">🥈</span>
                      <span className="text-xs font-bold text-slate-300 tracking-tight">{team.silver}</span>
                    </div>
                  )}
                  {team.bronze && team.bronze > 0 && (
                    <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-amber-500/20 border border-amber-400/40 rounded-lg sm:rounded-lg backdrop-blur-sm shadow-md flex-shrink-0 min-w-[70px] justify-center">
                      <span className="text-sm sm:text-base">🥉</span>
                      <span className="text-xs font-bold text-amber-300 tracking-tight">{team.bronze}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
