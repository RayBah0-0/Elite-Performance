import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rtregpwgnoubiweluygx.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qy9kMwnOUWZPvBgkOOvzUA_8REEwwtq';

export const supabase = createClient(supabaseUrl, supabaseKey);
