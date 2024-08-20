/**
 * This file contains the Supabase client configuration and a utility function to get the client.
 * The Supabase client is initialized with the Supabase URL and an anonymous key. The URL and key are
 * stored in environment variables. If the environment variables are not set, an error is logged to the console.
 * The utility function returns the initialized Supabase client. The client can be used to interact with
 * the Supabase database.
 */

import { createClient } from '@supabase/supabase-js';

console.log('Environment variables:', process.env);
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const  supabase = createClient(supabaseUrl, supabaseAnonKey);

// export const default getSupabase = () => {
//   if (!supabaseUrl || !supabaseAnonKey) {
//     console.error('Missing Supabase environment variables');
//     throw new Error('Supabase environment variables are missing');
//   }
//   return supabase
// }

export default function getSupabaseClient() {
  return { supabase }
}

console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


