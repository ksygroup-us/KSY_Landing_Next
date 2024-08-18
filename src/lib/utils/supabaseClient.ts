import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zlaoygmutbyatmoadtuj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsYW95Z211dGJ5YXRtb2FkdHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1MjAxMDksImV4cCI6MjAzOTA5NjEwOX0.0wfhMS9ZR7HAZvPjV-yeGlW6kd_4DTKGCrLc_SlsGic';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

export const getSupabase = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are missing')
  }
  return supabase
}

console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);