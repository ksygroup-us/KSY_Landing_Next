import { createClient } from '@supabase/supabase-js';

// Check for environment variables first, then fallback to hardcoded values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zlaoygmutbyatmoadtuj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsYW95Z211dGJ5YXRtb2FkdHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1MjAxMDksImV4cCI6MjAzOTA5NjEwOX0.0wfhMS9ZR7HAZvPjV-yeGlW6kd_4DTKGCrLc_SlsGic';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseAnonKey are required!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function getSupabaseClient() {
  return { supabase };
}

// For debugging purposes, you can uncomment these lines:
// console.log('Supabase URL:', supabaseUrl);
// console.log('Supabase Anon Key:', supabaseAnonKey);

