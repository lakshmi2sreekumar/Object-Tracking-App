import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL// Replace with your Supabase project URL
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase