/**
 * PyLearn - Supabase Integration
 * 
 * Din molnbaserade databas och autentisering.
 * För att detta ska fungera behöver du din Supabase URL och din Anon Key.
 *
 * Du hittar dem i din Supabase Dashboard under Settings -> API.
 */

// --- DINA SUPABASE-UPPGIFTER ---
const SUPABASE_URL = 'https://osjnjpwpewhxcacauogj.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_GbbXEBPLfEot7324WSetPQ_oYNq7NaI';

// Skapa Supabase-klienten (funktionen finns globalt tack vare CDN:et i index.html)
const { createClient } = window.supabase;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
