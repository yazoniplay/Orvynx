const SUPABASE_URL = "https://klzdnzcegyyelzgsxfdw.supabase.co";
const SUPABASE_KEY = "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
