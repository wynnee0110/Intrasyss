import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dbbfxoaabxxdzmpeomrw.supabase.co"; // your project URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiYmZ4b2FhYnh4ZHptcGVvbXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODc2OTEsImV4cCI6MjA4MDA2MzY5MX0.siexxur3KSA97Zq-ElgUk0hJS3K50RfGb9VSvMVtRzU";          // your anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
