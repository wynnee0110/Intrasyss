"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const [profile, setProfile] = useState({ full_name: "", avatar_url: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabase.auth.getUser().then(r => r.data.user?.id))
        .single();

      if (data) setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Profile</h1>
      <p>Name: {profile.full_name}</p>
      <p>Avatar: {profile.avatar_url || "No avatar"}</p>
    </div>
  );
}
