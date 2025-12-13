"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

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
    fetch("/api/check-auth", { credentials: "include" })
      .then((res) => {
        if (!res.ok) router.push("/admin/login");
        else loadEvents();
      })
      .catch(() => router.push("/admin/login"));
  }, []);

  async function loadEvents() {
    setLoading(true);
    const { data, error } = await supabase.from("Events").select("*").order("date");
    if (error) console.error(error);
    setEvents(data || []);
    setLoading(false);
  }

  async function saveEvent() {
    const { id, ...payload } = form;
    if (id) {
      const { error } = await supabase.from("Events").update(payload).eq("id", id);
      if (error) return alert(error.message);
      alert("Event updated!");
    } else {
      const { error } = await supabase.from("Events").insert([payload]);
      if (error) return alert(error.message);
      alert("Event added!");
    }
    setForm({ id: null, name: "", date: "", time: "", type: "", team1: "", team2: "" });
    loadEvents();
  }

  function editEvent(ev: Event) {
    setForm(ev);
  }

  async function deleteEvent(id: number) {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("Events").delete().eq("id", id);
    if (error) return alert(error.message);
    loadEvents();
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
        <input
          className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400"
          placeholder="Event Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="date"
          className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="time"
          className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <select
          className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="sport">Sport</option>
          <option value="esport">Esport</option>
          <option value="dance">Dance</option>
          <option value="music">Music</option>
        </select>
        <input
          className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400"
          placeholder="Team 1"
          value={form.team1}
          onChange={(e) => setForm({ ...form, team1: e.target.value })}
        />
        <input
          className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-400"
          placeholder="Team 2"
          value={form.team2}
          onChange={(e) => setForm({ ...form, team2: e.target.value })}
        />
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 col-span-1 md:col-span-2 transition"
          onClick={saveEvent}
        >
          {form.id ? "Update Event" : "Add Event"}
        </button>
      </div>

      {/* Events List */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg mb-1">{ev.name}</h3>
            <p className="text-gray-600">{ev.team1} vs {ev.team2}</p>
            <p className="text-gray-500 text-sm">{ev.date} • {ev.time} • {ev.type}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => editEvent(ev)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => deleteEvent(ev.id!)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
