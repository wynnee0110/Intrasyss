"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

type Event = {
  id: number | null;
  name: string;
  date: string;
  time: string;
  type: string;
  team1: string;
  team2: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<Event>({
    id: null,
    name: "",
    date: "",
    time: "",
    type: "",
    team1: "",
    team2: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch("/api/check-auth", { credentials: "include" });
      if (!res.ok) {
        router.push("/admin/login");
        return;
      }
      loadEvents();
    } catch (err) {
      console.error("Auth check failed:", err);
      router.push("/admin/login");
    }
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      await fetch("/api/logout", { method: "POST", credentials: "include" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      router.push("/admin/login");
    }
  }

  async function loadEvents() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Events")
        .select("*")
        .order("date", { ascending: true });
      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      console.error("Failed to load events:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveEvent() {
    if (!form.name.trim()) {
      return;
    }
    const { id, ...payload } = form;
    try {
      if (id) {
        const { error } = await supabase.from("Events").update(payload).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("Events").insert([payload]);
        if (error) throw error;
      }
      setForm({ id: null, name: "", date: "", time: "", type: "", team1: "", team2: "" });
      loadEvents();
    } catch (error: any) {
      console.error("Error:", error);
    }
  }

  function editEvent(ev: Event) {
    setForm(ev);
  }

  async function deleteEvent(id: number) {
    if (!confirm("Are you sure?")) return;
    try {
      const { error } = await supabase.from("Events").delete().eq("id", id);
      if (error) throw error;
      loadEvents();
    } catch (error: any) {
      console.error("Error deleting event:", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-700 border-t-yellow-400 rounded-full animate-spin mx-auto mb-6 shadow-xl" />
          <p className={`${bebasNeue.className} text-2xl text-slate-300 tracking-wider uppercase`}>Loading Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Header */}
      <div className="bg-slate-800/95 backdrop-blur-xl border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div>
            <h1 className={`${bebasNeue.className} text-5xl text-yellow-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)] tracking-[0.15em] uppercase mb-2`}>
              ADMIN PANEL
            </h1>
            <p className="text-slate-300 text-lg tracking-wider uppercase font-semibold">PAUGNAT 2026 CONTROL</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 
                       rounded-2xl font-black text-lg uppercase tracking-[0.1em] shadow-xl hover:shadow-2xl 
                       hover:-translate-y-1 transition-all duration-300 border-2 border-red-500/50"
          >
            LOGOUT
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Form */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/90 backdrop-blur-2xl rounded-3xl border border-slate-700/50 shadow-2xl p-8 sticky top-8 space-y-6">
              <h2 className={`${bebasNeue.className} text-2xl text-yellow-400 tracking-[0.1em] uppercase mb-1 border-b border-yellow-400/30 pb-4`}>
                {form.id ? "EDIT EVENT" : "NEW EVENT"}
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Event Name</label>
                  <input
                    className="w-full px-6 py-4 bg-slate-700/50 border-2 border-slate-600/50 rounded-2xl text-white placeholder-slate-400 
                              focus:border-yellow-400 focus:outline-none focus:ring-4 ring-yellow-400/20 transition-all duration-300 
                              backdrop-blur-sm font-semibold text-lg"
                    placeholder="Battle of Champions"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-5 py-3 bg-slate-700/30 border border-slate-600 rounded-xl text-slate-200 focus:border-yellow-400 
                                focus:outline-none focus:ring-2 ring-yellow-400/30 transition-all backdrop-blur-sm"
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Time</label>
                    <input
                      type="time"
                      className="w-full px-5 py-3 bg-slate-700/30 border border-slate-600 rounded-xl text-slate-200 focus:border-yellow-400 
                                focus:outline-none focus:ring-2 ring-yellow-400/30 transition-all backdrop-blur-sm"
                      value={form.time}
                      onChange={e => setForm({ ...form, time: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Event Type</label>
                  <select
                    className="w-full px-5 py-3 bg-slate-700/30 border border-slate-600 rounded-xl text-slate-200 focus:border-yellow-400 
                              focus:outline-none focus:ring-2 ring-yellow-400/30 transition-all backdrop-blur-sm font-semibold"
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="">Select Type</option>
                    <option value="sport">⚽ Sport</option>
                    <option value="esport">🎮 Esport</option>
                    <option value="dance">💃 Dance</option>
                    <option value="music">🎵 Music</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Team 1</label>
                  <input
                    className="w-full px-5 py-3 bg-slate-700/30 border border-slate-600 rounded-xl text-slate-200 placeholder-slate-500 
                              focus:border-yellow-400 focus:outline-none focus:ring-2 ring-yellow-400/30 transition-all backdrop-blur-sm"
                    placeholder="Red Lions"
                    value={form.team1}
                    onChange={e => setForm({ ...form, team1: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Team 2</label>
                  <input
                    className="w-full px-5 py-3 bg-slate-700/30 border border-slate-600 rounded-xl text-slate-200 placeholder-slate-500 
                              focus:border-yellow-400 focus:outline-none focus:ring-2 ring-yellow-400/30 transition-all backdrop-blur-sm"
                    placeholder="Blue Eagles"
                    value={form.team2}
                    onChange={e => setForm({ ...form, team2: e.target.value })}
                  />
                </div>

                <button
                  onClick={saveEvent}
                  disabled={!form.name.trim()}
                  className={`w-full py-4 rounded-2xl font-black text-xl uppercase tracking-[0.1em] transition-all duration-300 shadow-2xl
                            ${form.name.trim()
                              ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black border-2 border-yellow-400/50 hover:shadow-yellow-500/25 hover:-translate-y-1'
                              : 'bg-slate-700/50 border-2 border-slate-600/50 text-slate-500 cursor-not-allowed'
                            }`}
                >
                  {form.id ? "UPDATE EVENT" : "CREATE EVENT"}
                </button>

                {form.id && (
                  <button
                    onClick={() => setForm({ id: null, name: "", date: "", time: "", type: "", team1: "", team2: "" })}
                    className="w-full py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 border border-slate-600/50 
                               rounded-xl font-semibold uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5"
                  >
                    CANCEL EDIT
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`${bebasNeue.className} text-3xl text-slate-200 tracking-[0.15em] uppercase`}>MATCH SCHEDULE</h2>
              <span className="bg-slate-700/50 text-slate-300 px-6 py-2 rounded-2xl text-sm font-black tracking-wider border border-slate-600/50">
                {events.length} EVENTS
              </span>
            </div>
            
            {events.length === 0 ? (
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-16 text-center shadow-2xl">
                <div className="text-8xl mb-6 opacity-50">📅</div>
                <p className="text-2xl text-slate-400 font-black tracking-wider uppercase mb-2">NO EVENTS</p>
                <p className="text-slate-500 text-lg tracking-wide">Create your first match above</p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((ev) => (
                  <div key={ev.id} className="group bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 
                                             hover:bg-slate-700/90 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/10 
                                             transition-all duration-500 shadow-xl">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-5 py-2 rounded-2xl text-sm font-black uppercase tracking-wider text-white shadow-lg
                                          bg-gradient-to-r from-blue-500 to-blue-600">⚽ {ev.type.toUpperCase()}</span>
                        </div>
                        
                        <h3 className="text-2xl font-black text-white mb-4 tracking-tight drop-shadow-lg group-hover:text-yellow-300 transition-colors">
                          {ev.name}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-slate-300 font-semibold mb-6">
                          <span className="bg-slate-700/60 px-6 py-3 rounded-2xl text-lg border border-slate-600/50">
                            {ev.team1}
                          </span>
                          <span className="text-2xl font-black text-yellow-400 drop-shadow-lg tracking-wider">VS</span>
                          <span className="bg-yellow-500/20 px-6 py-3 rounded-2xl text-lg border-2 border-yellow-400/50 backdrop-blur-sm">
                            {ev.team2}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-8 text-lg text-slate-400 font-bold tracking-wider">
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-slate-400 rounded-full" />
                            {ev.date}
                          </span>
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                            {ev.time}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 ml-4 flex-shrink-0">
                        <button
                          onClick={() => editEvent(ev)}
                          className="group/edit p-4 bg-slate-700/50 hover:bg-yellow-500/20 hover:border-yellow-400/50 
                                    border border-slate-600/50 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl"
                          title="Edit"
                        >
                          <svg className="w-6 h-6 text-slate-400 group-hover/edit:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteEvent(ev.id!)}
                          className="group/delete p-4 bg-red-600/30 hover:bg-red-600/50 hover:border-red-500/50 
                                    border border-red-500/30 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl"
                          title="Delete"
                        >
                          <svg className="w-6 h-6 text-red-400 group-hover/delete:text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
