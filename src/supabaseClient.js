import { createClient } from '@supabase/supabase-js'

// Estos datos los sacas de Project Settings > API en tu panel de Supabase
const supabaseUrl = 'https://acirnmmhsubuatqddtzs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjaXJubW1oc3VidWF0cWRkdHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NjUwMDUsImV4cCI6MjA4ODA0MTAwNX0.RGGgogXM6kZw9O8a3hDoCMw8Wy5dQArE_-n4iO_Luto'

export const supabase = createClient(supabaseUrl, supabaseKey)