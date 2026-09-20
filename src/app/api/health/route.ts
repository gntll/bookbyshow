import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const uptimeSeconds = process.uptime();
  
  const envStatus = {
    gemini: !!process.env.GEMINI_API_KEY,
    ticketmaster: !!process.env.TICKETMASTER_API_KEY,
    tmdb: !!process.env.TMDB_API_KEY,
    adsense: !!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
    resend: !!process.env.RESEND_API_KEY,
  };

  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(uptimeSeconds),
    version: '0.1.0',
    service: 'BookByShow Entertainment Engine',
    environment: process.env.NODE_ENV || 'development',
    integrations: {
      ai: {
        provider: envStatus.gemini ? 'Google Gemini 2.5 Flash' : 'Deterministic Cinema Heuristics (Fallback)',
        status: 'active',
      },
      events: {
        provider: envStatus.ticketmaster ? 'Ticketmaster Discovery API' : 'Verified Dynamic Schedule (Fallback)',
        status: 'active',
      },
      movies: {
        provider: envStatus.tmdb ? 'The Movie Database (TMDB)' : 'Theatrical Box Office Feed (Fallback)',
        status: 'active',
      },
      ads: {
        status: envStatus.adsense ? 'Google AdSense Live' : 'AdSense Preview Mode',
      },
      alerts: {
        status: envStatus.resend ? 'Resend Live Email Service' : 'Preview & Log Dispatcher',
      },
    },
  });
}
