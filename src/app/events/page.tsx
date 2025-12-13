"use client";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Event = {
  id: number;
  name: string;
  date: string;
  type?: string;
  time?: string;
  team1?: string;
  team2?: string;
};

type Tab = "all" | "sport" | "esport" | "dance" | "music";

function formatDay(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", { weekday: "long" });
}

function formatTime12(timeString?: string) {
  if (!timeString) return "TBA";
  const [hStr, mStr] = timeString.split(":");
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("all");

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase
        .from("Events")
        .select("id, name, date, type, time, team1, team2")
        .order("date", { ascending: true });

      const eventsWithFallback = (data || []).map((event: Event) => ({
        ...event,
        team1: event.team1 || "Team 1",
        team2: event.team2 || "Team 2",
      }));

      setEvents(eventsWithFallback);
      setLoading(false);
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-black">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-yellow-400 rounded-full animate-spin mb-6 shadow-lg" />
        <p className="text-xl font-bold tracking-wide text-slate-300 uppercase">
          Loading Schedule...
        </p>
      </div>
    );
  }

  const filtered =
    tab === "all" ? events : events.filter((e) => e.type === tab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl lg:text-7xl font-black text-yellow-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] tracking-[0.1em] uppercase">
            SCHEDULE
          </h1>
          <p className="text-xl text-slate-300 tracking-wider uppercase font-semibold max-w-2xl mx-auto">
            Intramurals 2026 • All Matches
          </p>
        </header>

        {/* Classic tabs */}
        <div className="flex flex-wrap gap-3 justify-center border-b border-slate-700 pb-6">
          {["all", "sport", "esport", "dance", "music"].map((item) => {
            const value = item as Tab;
            const active = tab === value;
            return (
              <button
                key={item}
                onClick={() => setTab(value)}
                className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  active
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/25 hover:shadow-xl"
                    : "bg-slate-800/50 text-slate-300 border-2 border-slate-700/50 hover:border-yellow-400 hover:bg-slate-700/70 hover:text-yellow-300"
                }`}
              >
                {item === "all"
                  ? "All"
                  : item === "sport"
                  ? "Sports"
                  : item === "esport"
                  ? "Esports"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Classic match cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-slate-500 font-semibold tracking-wide uppercase mb-4">
              No matches in this category
            </p>
            <p className="text-slate-400">Check back soon for updates</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <div
                key={event.id}
                className="group bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-yellow-400/50 hover:bg-slate-700/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Match info */}
                <div className="flex justify-between items-start gap-6 mb-6">
                  {/* Teams */}
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="flex items-center gap-4 group-hover:text-yellow-300 transition-colors">
                      <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center border-2 border-slate-600 shadow-md" />
                      <span className="text-lg font-bold text-slate-200 truncate">
                        {event.team1}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400 group-hover:text-slate-200 transition-colors">
                      <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center border-2 border-slate-500" />
                      <span className="text-lg font-semibold">
                        {event.team2}
                      </span>
                    </div>
                  </div>

                  {/* Date/Time */}
                  <div className="flex flex-col items-end text-right min-w-[100px]">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {formatDay(event.date)}
                    </span>
                    <span className="text-xl font-black text-yellow-400 mt-2 drop-shadow-lg">
                      {formatTime12(event.time)}
                    </span>
                  </div>
                </div>

                {/* Event type & ID */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <span className="px-4 py-2 bg-slate-700/50 text-xs uppercase tracking-wider text-slate-300 font-bold rounded-xl border border-slate-600">
                    {event.type || "Match"}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ID #{event.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
