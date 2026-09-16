export type MovieFormat = 'IMAX 70mm' | 'IMAX with Laser' | 'Dolby Cinema' | 'RealD 3D' | 'Digital Standard' | '4DX' | 'ScreenX';

export type EventCategory = 'concert' | 'comedy' | 'sports' | 'theatre' | 'festival';

export type TicketProviderName =
  | 'AMC Direct'
  | 'Fandango'
  | 'Regal Cinemas'
  | 'Cinemark'
  | 'Ticketmaster'
  | 'Atom Tickets'
  | 'SeatGeek'
  | 'StubHub'
  | 'AXS'
  | 'BookMyShow';

export interface ProviderQuote {
  provider: TicketProviderName;
  basePrice: number;
  fee: number;
  total: number;
  isLowest: boolean;
  directUrl: string;
  badge?: string;
  affiliateCode?: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  time: string;
  date: string; // YYYY-MM-DD
  format: MovieFormat;
  screenName: string;
  quotes: ProviderQuote[];
  seatAvailability: 'filling_fast' | 'almost_sold_out' | 'plenty_available' | 'good_seats_left';
  availableSeatCount: number;
  totalSeatCount: number;
}

export interface Movie {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  synopsis: string;
  runtimeMinutes: number;
  genre: string[];
  certificateRating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17' | 'U/A';
  releaseDate: string;
  posterUrl: string;
  backdropUrl: string;
  trailerYoutubeId: string;
  director: string;
  cast: string[];
  imdbScore: number;
  rtScore: number; // Rotten Tomatoes %
  userRating: number; // out of 5
  ratingCount: number;
  formats: MovieFormat[];
  lowestPrice: number;
  isTrending: boolean;
  isSpotlight: boolean;
  languages: string[];
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  category: EventCategory;
  artistOrHost: string;
  venueName: string;
  venueCity: string;
  date: string; // YYYY-MM-DD
  time: string;
  bannerUrl: string;
  posterUrl: string;
  minPrice: number;
  maxPrice: number;
  quotes: ProviderQuote[];
  lineup: string[];
  description: string;
  isTrending: boolean;
  isSpotlight: boolean;
  tags: string[];
  ticketTiers: {
    name: string;
    description: string;
    lowestPrice: number;
    availability: 'low' | 'medium' | 'high' | 'almost_sold_out';
  }[];
}

export interface Cinema {
  id: string;
  name: string;
  chain: 'AMC' | 'Regal' | 'Cinemark' | 'Alamo Drafthouse' | 'PVR INOX' | 'Odeon' | 'Independent';
  address: string;
  city: string;
  distanceMiles: number;
  amenities: string[];
  screens: MovieFormat[];
  rating: number;
  reviewCount: number;
  phone: string;
  parkingAvailable: boolean;
  photoUrl: string;
}

export interface City {
  id: string;
  name: string;
  stateOrRegion: string;
  country: string;
  popularVenues: string[];
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  tier: 'Standard' | 'Prime Center' | 'Luxury Recliner' | 'VIP Balcony' | 'Wheelchair';
  price: number;
  status: 'available' | 'reserved' | 'selected';
}

export interface WatchlistItem {
  id: string;
  type: 'movie' | 'event';
  title: string;
  posterUrl: string;
  dateOrRuntime: string;
  lowestPrice: number;
  addedAt: number;
}
