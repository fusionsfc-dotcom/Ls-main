import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const url =
  import.meta.env.VITE_LSCONSULTING_SUPABASE_URL ??
  `https://${projectId}.supabase.co`;
const key =
  import.meta.env.VITE_LSCONSULTING_SUPABASE_ANON_KEY ?? publicAnonKey;

export const lsSupabase = createClient(url, key);
