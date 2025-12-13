import { createClient } from '@supabase/supabase-js'

// Hardcoded for debugging - REMOVE AFTER TESTING
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dbbfxoaabxxdzmpeomrw.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiYmZ4b2FhYnh4ZHptcGVvbXJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDQ4NzY5MSwiZXhwIjoyMDgwMDYzNjkxfQ._lKDrAhkw_5JHeW5L96OTuQE4zIGaf6Z-BR79871x8w'

console.log('Supabase Server URL:', supabaseUrl)

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})