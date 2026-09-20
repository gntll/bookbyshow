import { Movie, MovieFormat, ProviderQuote, Showtime } from '@/types';
import { CINEMAS, MOVIES } from '@/data/mockData';

// Standard theatrical screening slots
const SCREENING_SLOTS = [
  { time: '11:30', period: 'matinee', discount: 2.0 },
  { time: '14:15', period: 'afternoon', discount: 1.0 },
  { time: '17:00', period: 'early_evening', discount: 0 },
  { time: '19:45', period: 'prime_evening', discount: 0 },
  { time: '22:30', period: 'late_night', discount: 0.5 },
];

/**
 * Deterministic pseudo-random helper based on string seed
 */
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const x = Math.sin(hash++) * 10000;
  return x - Math.floor(x);
}

export interface DynamicShowtimesOptions {
  movieId: string;
  date?: string; // YYYY-MM-DD
  cinemaId?: string;
  city?: string;
  movie?: Movie;
}

/**
 * Generates dynamic, format-aware theatrical showtimes for any given movie and calendar date.
 * Automatically advances schedules with the calendar so no manual maintenance is ever needed.
 */
export function generateDynamicShowtimes(options: DynamicShowtimesOptions): Showtime[] {
  const targetDate = options.date || new Date().toISOString().split('T')[0];
  const movie = options.movie || MOVIES.find((m) => m.id === options.movieId || m.slug === options.movieId);

  if (!movie) return [];

  let cinemas = CINEMAS;
  if (options.cinemaId) {
    cinemas = cinemas.filter((c) => c.id === options.cinemaId);
  } else if (options.city) {
    const cityFiltered = cinemas.filter((c) => c.city.toLowerCase() === options.city?.toLowerCase());
    if (cityFiltered.length > 0) {
      cinemas = cityFiltered;
    }
  }

  const showtimes: Showtime[] = [];

  cinemas.forEach((cinema) => {
    // Find matching formats available at this cinema for this movie
    const formatsToUse: MovieFormat[] = cinema.screens.filter((s) =>
      movie.formats.includes(s)
    );

    // Fallback to standard digital if no direct intersection
    if (formatsToUse.length === 0) {
      formatsToUse.push('Digital Standard');
    }

    formatsToUse.forEach((format, formatIdx) => {
      // Pick realistic slots for each auditorium format
      const slotIndices = format.includes('IMAX')
        ? [0, 2, 3] // Matinee, Early Evening, Prime Evening
        : format.includes('Dolby')
        ? [1, 3, 4] // Afternoon, Prime Evening, Late Night
        : [0, 1, 2, 3, 4]; // Standard gets full rotation

      slotIndices.forEach((slotIdx) => {
        const slot = SCREENING_SLOTS[slotIdx];
        const seedStr = `${targetDate}-${cinema.id}-${movie.id}-${format}-${slot.time}`;
        const rand = seededRandom(seedStr);

        // Calculate format premium
        let formatSurcharge = 0;
        if (format.includes('IMAX 70mm')) formatSurcharge = 6.0;
        else if (format.includes('IMAX')) formatSurcharge = 5.0;
        else if (format.includes('Dolby')) formatSurcharge = 4.5;
        else if (format.includes('4DX')) formatSurcharge = 6.5;
        else if (format.includes('3D')) formatSurcharge = 3.5;
        else if (format.includes('70mm')) formatSurcharge = 5.0;

        const basePrice = Math.max(
          11.0,
          Number((movie.lowestPrice + formatSurcharge - slot.discount).toFixed(2))
        );

        // Chain primary provider
        const isAmc = cinema.chain.includes('AMC');
        const isRegal = cinema.chain.includes('Regal');
        const isCinemark = cinema.chain.includes('Cinemark');

        const primaryProvider = isAmc
          ? 'AMC Direct'
          : isRegal
          ? 'Regal Cinemas'
          : isCinemark
          ? 'Cinemark'
          : 'Fandango';

        const primaryDirectUrl = isAmc
          ? `https://www.amctheatres.com/movies/${movie.slug}`
          : isRegal
          ? `https://www.regmovies.com/search?query=${encodeURIComponent(movie.title)}`
          : isCinemark
          ? `https://www.cinemark.com/search?search=${encodeURIComponent(movie.title)}`
          : `https://www.fandango.com/search?q=${encodeURIComponent(movie.title)}`;

        // Provider quotes with verified fee transparency
        const quotes: ProviderQuote[] = [
          {
            provider: primaryProvider,
            basePrice,
            fee: 1.89,
            total: Number((basePrice + 1.89).toFixed(2)),
            isLowest: true,
            directUrl: primaryDirectUrl,
            badge: 'Lowest Face Value',
          },
          {
            provider: 'Fandango',
            basePrice,
            fee: 2.79,
            total: Number((basePrice + 2.79).toFixed(2)),
            isLowest: false,
            directUrl: `https://www.fandango.com/search?q=${encodeURIComponent(movie.title)}`,
            badge: 'VIP Points Eligible',
          },
          {
            provider: 'Atom Tickets',
            basePrice: Number((basePrice + 0.3).toFixed(2)),
            fee: 2.49,
            total: Number((basePrice + 2.79).toFixed(2)),
            isLowest: false,
            directUrl: `https://www.atomtickets.com/search?q=${encodeURIComponent(movie.title)}`,
          },
        ];

        // Dynamic seat availability
        const totalSeatCount = format.includes('IMAX') ? 320 : 180;
        let availableSeatCount = Math.floor(rand * (totalSeatCount * 0.7)) + 12;

        // Prime evening shows fill faster
        if (slot.period === 'prime_evening') {
          availableSeatCount = Math.min(availableSeatCount, Math.floor(totalSeatCount * 0.25));
        }

        let seatAvailability: Showtime['seatAvailability'] = 'plenty_available';
        const occupancyRate = 1 - availableSeatCount / totalSeatCount;
        if (occupancyRate > 0.85) {
          seatAvailability = 'almost_sold_out';
        } else if (occupancyRate > 0.6) {
          seatAvailability = 'filling_fast';
        } else if (occupancyRate > 0.35) {
          seatAvailability = 'good_seats_left';
        }

        showtimes.push({
          id: `${movie.id}-${cinema.id}-${targetDate}-${slot.time}-${formatIdx}`,
          movieId: movie.id,
          cinemaId: cinema.id,
          time: slot.time,
          date: targetDate,
          format,
          screenName: `${cinema.name} - Auditorium ${formatIdx + 1} (${format})`,
          quotes,
          seatAvailability,
          availableSeatCount,
          totalSeatCount,
        });
      });
    });
  });

  return showtimes.sort((a, b) => a.time.localeCompare(b.time));
}

/**
 * Returns showtimes for a specific movie, dynamically generating for any date
 */
export function getDynamicMovieShowtimes(movieId: string, date?: string, city?: string): Showtime[] {
  return generateDynamicShowtimes({ movieId, date, city });
}
