import { createClient } from '@supabase/supabase-js';

export const lsSupabase = createClient(
  import.meta.env.VITE_LSCONSULTING_SUPABASE_URL,
  import.meta.env.VITE_LSCONSULTING_SUPABASE_ANON_KEY
);
