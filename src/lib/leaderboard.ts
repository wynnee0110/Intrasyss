import { supabase } from "./supabaseClient";

export async function getLeaderboard() {
  const { data, error } = await supabase
    .from("Leaderboard")
    .select("*")
    .order("score", { ascending: false });

  if (error) console.error(error);
  return data || [];
}
