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
    <div className="w-full space-y-0.5 bg-slate-900/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
      {/* PERFECT MATCH Header */}
      <div className="bg-slate-800/80 px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border-b border-white/10">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-slate-400">
          <span className="w-8 sm:w-10 lg:w-14 flex-shrink-0 text-left font-semibold">POS</span>
          <span className="flex-1 px-1 sm:px-2 lg:pl-4 min-w-0 truncate text-left font-semibold">TEAM</span>
          <span className="w-20 sm:w-24 lg:w-40 text-right flex-shrink-0 font-semibold">AWARDS</span>
        </div>
      </div>

      {/* PERFECT MATCH Rows */}
      <div className="divide-y divide-white/5">
        {leaderboard.map((team, index) => {
          const position = index + 1;
          const isPodium = position <= 3;

          return (
            <div
              key={team.id}
              className={`
                group hover:bg-white/5 transition-all duration-300 border-l-3 border-transparent
                hover:border-l-white/30 ${isPodium ? `bg-gradient-to-r from-white/5 to-transparent border-l-white/50` : ""}
              `}
            >
              <div className="flex items-center justify-between px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
                {/* PERFECT Position */}
                <div className="w-8 sm:w-10 lg:w-14 flex-shrink-0">
                  <span className={`text-sm sm:text-base lg:text-lg font-mono font-bold leading-none ${
                    position === 1 ? "text-yellow-400" : 
                    position === 2 ? "text-slate-300" : 
                    position === 3 ? "text-amber-400" : "text-slate-400"
                  }`}>
                    {position.toString().padStart(2, '0')}
                  </span>
                </div>

                {/* PERFECT Team */}
                <div className="flex items-center flex-1 gap-1 sm:gap-2 lg:gap-3 px-1 sm:px-2 lg:pl-4 min-w-0">
                  {team.logo_url ? (
                    <div className="flex-shrink-0">
                      <img
                        src={team.logo_url}
                        alt={team.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg object-cover border border-white/20 shadow-sm hover:shadow-white/30 transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20 shadow-sm group-hover:shadow-white/30 transition-all duration-300">
                      <span className="text-xs font-bold text-white tracking-tight uppercase leading-none">
                        {team.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-white truncate tracking-tight group-hover:text-white/90 transition-colors leading-tight">
                      {team.name}
                    </div>
                  </div>
                </div>

                {/* PERFECT Awards - WIDER PC GAPS */}
                <div className="w-20 sm:w-24 lg:w-40 h-7 sm:h-8 lg:h-9 flex items-center justify-end gap-1 sm:gap-1.5 lg:gap-3 pr-1 lg:pr-4 flex-shrink-0">
                  {team.gold && team.gold > 0 && (
                    <div className="flex items-center gap-0.5 px-1 py-0.5 bg-yellow-500/20 border border-yellow-400/50 rounded-md backdrop-blur-sm shadow-sm flex-shrink-0 min-w-[2.25rem] sm:min-w-[2.5rem] lg:min-w-[2.75rem]">
                      <span className="text-xs sm:text-sm lg:text-base flex-shrink-0">🥇</span>
                      <span className="text-xs sm:text-sm lg:text-base font-bold text-yellow-300 flex-shrink-0">{team.gold}</span>
                    </div>
                  )}
                  {team.silver && team.silver > 0 && (
                    <div className="flex items-center gap-0.5 px-0.75 py-0.5 bg-slate-500/20 border border-slate-400/50 rounded-sm backdrop-blur-sm shadow-sm flex-shrink-0 min-w-[2rem] sm:min-w-[2.25rem] lg:min-w-[2.5rem]">
                      <span className="text-xs sm:text-sm lg:text-base flex-shrink-0">🥈</span>
                      <span className="text-xs sm:text-sm lg:text-base font-bold text-slate-300 flex-shrink-0">{team.silver}</span>
                    </div>
                  )}
                  {team.bronze && team.bronze > 0 && (
                    <div className="flex items-center gap-0.5 px-0.75 py-0.5 bg-amber-500/20 border border-amber-400/50 rounded-sm backdrop-blur-sm shadow-sm flex-shrink-0 min-w-[2rem] sm:min-w-[2.25rem] lg:min-w-[2.5rem]">
                      <span className="text-xs sm:text-sm lg:text-base flex-shrink-0">🥉</span>
                      <span className="text-xs sm:text-sm lg:text-base font-bold text-amber-300 flex-shrink-0">{team.bronze}</span>
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
