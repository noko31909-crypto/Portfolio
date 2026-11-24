// Deployment settings. The database belongs to the Telegram bot
// (github.com/Quantelteam/SilkRoad); the site only reads its listings_public view.
// Until supabaseAnonKey is set, the site runs on the example listings in
// data/demo-listings.json and says so at the top of the page.
//
// The anon key is public by design: the bot's Row Level Security limits it to
// reading listings_public and parts. Never put the service-role key here.
export const config = {
  supabaseUrl: 'https://oikyjgdaogqojhcjkrrd.supabase.co',
  supabaseAnonKey: '', // Supabase → Project Settings → API → anon / publishable key
  botUsername: 'ftc_silkroad_bot', // Telegram bot that teams post through, without the @
};
