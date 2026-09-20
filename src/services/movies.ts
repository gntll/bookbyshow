import { Movie, MovieFormat } from '@/types';
import { MOVIES } from '@/data/mockData';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

/**
 * Returns dynamic dates relative to today's current date
 */
function getRelativeDate(daysOffset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
}

/**
 * Ensures movie release dates and statuses always reflect the current calendar period,
 * guaranteeing zero manual updates are needed even without external API keys.
 */
export function getAutoUpdatedMovies(): Movie[] {
  return MOVIES.map((movie, index) => {
    let releaseDate = movie.releaseDate;
    let status = movie.status || 'now_showing';
    let releaseStatusLabel = movie.releaseStatusLabel || 'Now Showing';

    // Distribute movies across currently playing and upcoming releases
    if (index < 6) {
      // Current blockbusters playing in theatres today
      status = 'now_showing';
      releaseDate = getRelativeDate(-7 - index * 4);
      releaseStatusLabel = 'Now In Theatres';
    } else if (index < 8) {
      // Pre-sales / Advance bookings for next week
      status = 'advance_booking';
      releaseDate = getRelativeDate(4 + (index - 6) * 5);
      releaseStatusLabel = 'Tickets Open';
    } else {
      // Upcoming releases next month
      status = 'coming_soon';
      releaseDate = getRelativeDate(25 + (index - 8) * 15);
      releaseStatusLabel = 'Coming Soon';
    }

    return {
      ...movie,
      releaseDate,
      status,
      releaseStatusLabel,
    };
  });
}

/**
 * Normalizes a TMDB raw movie object into BookByShow's Movie format
 */
function normalizeTmdbMovie(raw: any, status: 'now_showing' | 'coming_soon' | 'advance_booking'): Movie {
  const formats: MovieFormat[] = ['Digital Standard'];
  if (raw.vote_average >= 7.5) formats.push('Dolby Cinema', 'IMAX with Laser');
  if (raw.popularity > 100) formats.push('RealD 3D');

  const releaseStatusLabel =
    status === 'now_showing'
      ? 'Now In Theatres'
      : status === 'advance_booking'
      ? 'Advance Booking'
      : 'Coming Soon';

  return {
    id: `tmdb-${raw.id}`,
    title: raw.title,
    slug: raw.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    tagline: raw.tagline || 'Experience it on the biggest screen.',
    synopsis: raw.overview || 'Synopsis not yet available.',
    runtimeMinutes: raw.runtime || 125,
    genre: raw.genres ? raw.genres.map((g: any) => g.name) : ['Action', 'Drama'],
    certificateRating: raw.adult ? 'R' : 'PG-13',
    releaseDate: raw.release_date || getRelativeDate(0),
    posterUrl: raw.poster_path ? `${TMDB_IMAGE_BASE}/w780${raw.poster_path}` : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
    backdropUrl: raw.backdrop_path ? `${TMDB_IMAGE_BASE}/w1280${raw.backdrop_path}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop',
    trailerYoutubeId: 'bKGxHflevYY',
    director: 'Hollywood Visionary',
    cast: ['Ensemble Cast', 'Lead Actor'],
    imdbScore: Number((raw.vote_average || 7.8).toFixed(1)),
    rtScore: Math.min(99, Math.round((raw.vote_average || 7.5) * 11)),
    userRating: Number(((raw.vote_average || 8) / 2).toFixed(1)),
    ratingCount: raw.vote_count || 12500,
    formats,
    lowestPrice: 14.5,
    isTrending: raw.popularity > 50,
    isSpotlight: raw.vote_average >= 7.8,
    languages: ['English'],
    status,
    releaseStatusLabel,
  };
}

/**
 * Fetches now playing movies from TMDB if API key is present, otherwise returns rolling catalog
 */
export async function fetchNowPlayingMovies(): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    return getAutoUpdatedMovies().filter((m) => m.status === 'now_showing');
  }

  try {
    const res = await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&region=US&page=1`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
    const data = await res.json();
    return (data.results || []).slice(0, 12).map((m: any) => normalizeTmdbMovie(m, 'now_showing'));
  } catch (error) {
    console.error('Failed to fetch from TMDB, falling back to dynamic catalog:', error);
    return getAutoUpdatedMovies().filter((m) => m.status === 'now_showing');
  }
}

/**
 * Fetches upcoming movies from TMDB if API key is present, otherwise returns rolling catalog
 */
export async function fetchUpcomingMovies(): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    return getAutoUpdatedMovies().filter((m) => m.status !== 'now_showing');
  }

  try {
    const res = await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&region=US&page=1`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
    const data = await res.json();
    return (data.results || []).slice(0, 8).map((m: any) => normalizeTmdbMovie(m, 'coming_soon'));
  } catch (error) {
    console.error('Failed to fetch upcoming from TMDB, falling back to dynamic catalog:', error);
    return getAutoUpdatedMovies().filter((m) => m.status !== 'now_showing');
  }
}

/**
 * Retrieves all movies (both now showing and upcoming)
 */
export async function getAllMovies(): Promise<Movie[]> {
  const [nowPlaying, upcoming] = await Promise.all([
    fetchNowPlayingMovies(),
    fetchUpcomingMovies(),
  ]);
  return [...nowPlaying, ...upcoming];
}

/**
 * Finds a single movie by ID or slug
 */
export async function getMovieByIdOrSlug(idOrSlug: string): Promise<Movie | null> {
  const all = await getAllMovies();
  return all.find((m) => m.id === idOrSlug || m.slug === idOrSlug) || null;
}
