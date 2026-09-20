/**
 * Safe Runtime Environment Validator for BookByShow
 * Provides typed feature flags ensuring zero runtime crashes when keys are omitted.
 */

export const env = {
  // AI
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  hasGemini: !!process.env.GEMINI_API_KEY,

  // Event Ticketing
  ticketmasterApiKey: process.env.TICKETMASTER_API_KEY || '',
  hasTicketmaster: !!process.env.TICKETMASTER_API_KEY,

  // Movies & Theatres
  tmdbApiKey: process.env.TMDB_API_KEY || '',
  hasTmdb: !!process.env.TMDB_API_KEY,

  // AdSense Monetization
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-8603573631283451',
  hasAdSense: true,

  // Price Drop Email Delivery
  resendApiKey: process.env.RESEND_API_KEY || '',
  alertEmailFrom: process.env.ALERT_EMAIL_FROM || 'alerts@bookbyshow.com',
  hasResend: !!process.env.RESEND_API_KEY,

  // App Metadata
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://bookbyshow.com',
  isProduction: process.env.NODE_ENV === 'production',
};
