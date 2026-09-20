import { NextResponse } from 'next/server';
import { generateDynamicShowtimes } from '@/services/showtimes';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('movieId');
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const cinemaId = searchParams.get('cinemaId') || undefined;
  const city = searchParams.get('city') || undefined;

  if (!movieId) {
    return NextResponse.json({ error: 'movieId is required' }, { status: 400 });
  }

  try {
    const showtimes = generateDynamicShowtimes({
      movieId,
      date,
      cinemaId,
      city,
    });
    return NextResponse.json({ showtimes, count: showtimes.length, date });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to generate showtimes', message: error.message },
      { status: 500 }
    );
  }
}
