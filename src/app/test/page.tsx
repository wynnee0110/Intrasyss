"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestPage() {
  useEffect(() => {
    supabase
      .from("Events")
      .select("*")
      .then(({ data, error }) => {
        console.log("DATA:", data);
        console.log("ERROR:", error);
      });
  }, []);

  return <h1>Check console</h1>;
}
