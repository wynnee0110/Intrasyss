import { createClient } from '@supabase/supabase-js'

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dbbfxoaabxxdzmpeomrw.supabase.co'
}

function getSupabaseServiceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiYmZ4b2FhYnh4ZHptcGVvbXJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDQ4NzY5MSwiZXhwIjoyMDgwMDYzNjkxfQ._lKDrAhkw_5JHeW5L96OTuQE4zIGaf6Z-BR79871x8w'
}

export const supabaseServer = createClient(getSupabaseUrl(), getSupabaseServiceKey(), {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})