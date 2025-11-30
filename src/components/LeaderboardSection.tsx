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
    else setLeaderboard(data);
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
        {leaderboard.map((team, index) => {
          // Highlight top 3 teams
          let bgColor = "bg-gray-50";
          if (index === 0) bgColor = "bg-yellow-100";
          else if (index === 1) bgColor = "bg-gray-200";
          else if (index === 2) bgColor = "bg-orange-100";

          return (
            <div
              key={team.id}
              className={`flex items-center justify-between p-4 border-b last:border-none hover:bg-gray-100 transition ${bgColor}`}
            >
              {/* Rank */}
              <span className="font-bold w-8 text-lg text-gray-700"># {index + 1}</span>

              {/* Team logo + name */}
              <div className="flex items-center space-x-4">
                {team.logo_url ? (
                  <img
                    src={team.logo_url}
                    alt={team.name}
                    className="h-10 w-10 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                    {team.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-lg font-medium text-gray-800">{team.name}</span>
              </div>

              {/* Score */}
              <span className="text-lg font-bold text-gray-900">{team.score}</span>

              {/* Medals */}
              <div className="flex items-center space-x-2 ml-6">
                {team.gold && team.gold > 0 && (
                  <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                    🥇 {team.gold}
                  </span>
                )}
                {team.silver && team.silver > 0 && (
                  <span className="flex items-center gap-1 text-gray-400 font-semibold">
                    🥈 {team.silver}
                  </span>
                )}
                {team.bronze && team.bronze > 0 && (
                  <span className="flex items-center gap-1 text-orange-500 font-semibold">
                    🥉 {team.bronze}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
