import { NextResponse } from 'next/server';
import { getAllMovies, fetchNowPlayingMovies, fetchUpcomingMovies } from '@/services/movies';

export const revalidate = 3600; // 1-hour ISR cache

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    if (type === 'now_playing') {
      const movies = await fetchNowPlayingMovies();
      return NextResponse.json({ movies, count: movies.length });
    }

    if (type === 'upcoming') {
      const movies = await fetchUpcomingMovies();
      return NextResponse.json({ movies, count: movies.length });
    }

    const movies = await getAllMovies();
    return NextResponse.json({ movies, count: movies.length });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch movies', message: error.message },
      { status: 500 }
    );
  }
}
