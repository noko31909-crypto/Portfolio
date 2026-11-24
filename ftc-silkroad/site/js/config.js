// Deployment settings. Leave supabaseUrl empty to run the site on the example
// listings in data/demo-listings.json.
//
// The anon key is public by design: Row Level Security limits it to reading the
// public_listings view (see supabase/schema.sql). Never put the service-role key here.
export const config = {
  supabaseUrl: '', // e.g. 'https://abcdefgh.supabase.co'
  supabaseAnonKey: '',
  botUsername: '', // Telegram bot that teams post through, without the @
};
