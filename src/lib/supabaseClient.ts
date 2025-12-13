import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dbbfxoaabxxdzmpeomrw.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiYmZ4b2FhYnh4ZHptcGVvbXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODc2OTEsImV4cCI6MjA4MDA2MzY5MX0.siexxur3KSA97Zq-ElgUk0hJS3K50RfGb9VSvMVtRzU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)