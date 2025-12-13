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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");

  function formatTime(timeString?: string) {
    if (!timeString) return "No Time";
    const [hour, minute] = timeString.split(":");
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${minute} ${ampm}`;
  }

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase
        .from("Events")
        .select("id, name, date, type, time, team1, team2")
        .order("date", { ascending: true });
      setEvents(data || []);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
        <div className="flex space-x-3 mb-4">
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
        <p className="text-lg font-semibold text-blue-600 animate-pulse">Loading events…</p>
      </div>
    );

  const filtered = tab === "all" ? events : events.filter((e) => e.type === tab);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white p-10">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Intramurals Matches
        </h1>

        {/* TABS */}
        <div className="flex gap-4 mb-10 border-b pb-3">
          {["all", "sport", "esport", "dance", "music"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                tab === item ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item === "all"
                ? "All Events"
                : item === "sport"
                ? "Sports"
                : item === "esport"
                ? "Esports"
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* MATCH LIST */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No matches found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 px-6 py-4 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition flex flex-col"
              >
                {/* Event Name */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h2>

                {/* Teams */}
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-semibold text-gray-800">{event.team1 || "Team A"}</div>
                  <div className="text-gray-500 font-medium">VS</div>
                  <div className="text-lg font-semibold text-gray-800">{event.team2 || "Team B"}</div>
                </div>

                {/* Date & Time */}
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <div>📅 {event.date}</div>
                  <div>🕒 {formatTime(event.time)}</div>
                </div>

                {/* Type Tag */}
                <div>
                  <span className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-full">
                    {event.type?.toUpperCase() || "EVENT"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
