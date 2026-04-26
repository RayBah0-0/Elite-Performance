import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rtregpwgnoubiweluygx.supabase.co';
const supabaseKey = 'sb_publishable_qy9kMwnOUWZPvBgkOOvzUA_8REEwwtq';

export const supabase = createClient(supabaseUrl, supabaseKey);
