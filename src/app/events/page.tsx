"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Event = {
  id: number;
  name: string;
  date: string;
  type?: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      // Make sure the table name matches exactly (case-sensitive)
      const { data, error } = await supabase
        .from("Events") // <-- match your table name
        .select("id, name, date, type")
        .order("date", { ascending: true });

      if (error) {
        console.error("Supabase fetch error:", error);
      } else {
        console.log("Supabase data:", data);
        setEvents(data || []);
      }

      setLoading(false);
    }

    fetchEvents();
  }, []);

  if (loading) return <p className="p-8 text-center">Loading events...</p>;
  if (events.length === 0) return <p className="p-8 text-center">No events found</p>;

  return (
    <div className="min h-screen w-full bg-white p-8  ">
      <h1 className="text-black text-4xl font-bold mb-8 text-center">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {events.map((event) => (
          <div
            key={event.id || Math.random()} // fallback key
            className="p-5 border rounded-2xl shadow hover:shadow-lg bg-gray-100 transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold mb-2 text-black">{event.name || "Untitled Event"}</h3>
            <p className="text-gray-600 mb-2">{event.date || "No Date"}</p>
            {event.type && (
              <span className="text-sm px-2 py-1 bg-gray-200 text-black rounded-full">
                {event.type}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
