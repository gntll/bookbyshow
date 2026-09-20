import { NextRequest, NextResponse } from 'next/server';
import { generateShowScoutResponse } from '@/services/ai';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.message || body.query;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Message query parameter is required' },
        { status: 400 }
      );
    }

    const result = await generateShowScoutResponse(prompt);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (err: any) {
    console.error('Error in /api/ai/chat:', err);
    return NextResponse.json(
      {
        error: 'Failed to process AI assistant request',
        reply: "I'm having a brief issue retrieving live showtimes. You can explore our catalog directly using the search bar above!",
        suggestedActions: ['View Now Showing', 'View Concerts', 'Browse IMAX Deals'],
        matchedMovies: [],
        matchedEvents: [],
        matchedShowtimes: [],
      },
      { status: 500 }
    );
  }
}
