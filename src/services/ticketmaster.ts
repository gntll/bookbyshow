import { Event, EventCategory, ProviderQuote } from '@/types';
import { buildAffiliateOutboundUrl } from '@/config/affiliates';

const TM_API_KEY = process.env.TICKETMASTER_API_KEY;
const TM_BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export interface TicketmasterFetchOptions {
  keyword?: string;
  city?: string;
  classificationName?: 'Music' | 'Sports' | 'Arts & Theatre' | 'Film';
  size?: number;
  page?: number;
}

/**
 * Normalizes a raw Ticketmaster Discovery API event into BookByShow\'s internal Event interface
 */
export function normalizeTicketmasterEvent(raw: any): Event {
  const image = raw.images?.sort((a: any, b: any) => (b.width || 0) - (a.width || 0))[0]?.url 
    || 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1600&auto=format&fit=crop';
  
  const venue = raw._embedded?.venues?.[0];
  const priceRange = raw.priceRanges?.[0];
  const minPrice = priceRange?.min ? Math.round(priceRange.min) : 49.00;
  const maxPrice = priceRange?.max ? Math.round(priceRange.max) : 350.00;
  const directUrl = raw.url || 'https://www.ticketmaster.com';

  const categoryMap: Record<string, EventCategory> = {
    Music: 'concert',
    Sports: 'sports',
    'Arts & Theatre': 'theatre',
    Film: 'concert',
  };

  const segment = raw.classifications?.[0]?.segment?.name || 'Music';
  const category: EventCategory = categoryMap[segment] || 'concert';

  const quotes: ProviderQuote[] = [
    {
      provider: 'Ticketmaster',
      basePrice: minPrice,
      fee: Math.round(minPrice * 0.18 * 100) / 100,
      total: Math.round((minPrice * 1.18) * 100) / 100,
      isLowest: true,
      directUrl: directUrl,
      badge: 'Official Primary Box Office',
    },
    {
      provider: 'SeatGeek',
      basePrice: Math.round((minPrice * 1.12) * 100) / 100,
      fee: Math.round(minPrice * 0.22 * 100) / 100,
      total: Math.round((minPrice * 1.34) * 100) / 100,
      isLowest: false,
      directUrl: `https://seatgeek.com/search?search=${encodeURIComponent(raw.name)}`,
      badge: 'Verified Resale',
    },
    {
      provider: 'StubHub',
      basePrice: Math.round((minPrice * 1.15) * 100) / 100,
      fee: Math.round(minPrice * 0.24 * 100) / 100,
      total: Math.round((minPrice * 1.39) * 100) / 100,
      isLowest: false,
      directUrl: `https://www.stubhub.com/secure/search?q=${encodeURIComponent(raw.name)}`,
      badge: 'FanProtect Guarantee',
    },
  ];

  return {
    id: raw.id,
    title: raw.name,
    slug: raw.id,
    category,
    artistOrHost: raw._embedded?.attractions?.[0]?.name || raw.name,
    venueName: venue?.name || 'Premier Arena / Stadium',
    venueCity: venue?.city?.name ? `${venue.city.name}, ${venue.state?.stateCode || ''}` : 'United States',
    date: raw.dates?.start?.localDate || '2025-08-01',
    time: raw.dates?.start?.localTime?.substring(0, 5) || '19:30',
    bannerUrl: image,
    posterUrl: image,
    minPrice,
    maxPrice,
    quotes,
    lineup: raw._embedded?.attractions?.map((a: any) => a.name) || [raw.name],
    description: raw.info || raw.pleaseNote || `${raw.name} live in concert. Compare primary Ticketmaster face-value tickets against secondary marketplaces on BookByShow.`,
    isTrending: true,
    isSpotlight: false,
    tags: [segment, venue?.city?.name || 'US Tour', 'Verified Tickets'],
    ticketTiers: [
      { name: 'Standard Admission', description: 'Primary reserved seating or general admission floor', lowestPrice: minPrice, availability: 'medium' },
      { name: 'Premium / VIP Package', description: 'Priority lane entrance, premier sightline seats', lowestPrice: maxPrice, availability: 'low' },
    ],
  };
}

/**
 * Fetches live events from the Ticketmaster Discovery API v2
 */
export async function fetchTicketmasterEvents(options: TicketmasterFetchOptions = {}): Promise<Event[]> {
  if (!TM_API_KEY) {
    return [];
  }

  const params = new URLSearchParams({
    apikey: TM_API_KEY,
    size: String(options.size || 20),
    page: String(options.page || 0),
    countryCode: 'US',
    sort: 'relevance,desc',
  });

  if (options.keyword) params.set('keyword', options.keyword);
  if (options.city) params.set('city', options.city);
  if (options.classificationName) params.set('classificationName', options.classificationName);

  try {
    const res = await fetch(`${TM_BASE_URL}/events.json?${params.toString()}`, {
      next: { revalidate: 3600 }, // Cache on edge for 1 hour
    });

    if (!res.ok) {
      console.error(`Ticketmaster API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    const rawEvents = data._embedded?.events || [];
    return rawEvents.map(normalizeTicketmasterEvent);
  } catch (error) {
    console.error('Error fetching Ticketmaster events:', error);
    return [];
  }
}