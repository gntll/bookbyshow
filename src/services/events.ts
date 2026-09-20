import { Event, EventCategory } from '@/types';
import { EVENTS } from '@/data/mockData';
import { fetchTicketmasterEvents } from '@/services/ticketmaster';

/**
 * Returns dynamic dates relative to today's current date
 */
function getRelativeDate(daysOffset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
}

/**
 * Ensures all events are dynamically scheduled into upcoming future dates,
 * guaranteeing events never expire or show past dates without any manual intervention.
 */
export function getAutoUpdatedHeadlineEvents(): Event[] {
  // Relative upcoming offsets for headline tours
  const offsets = [7, 14, 21, 28, 45, 60];

  return EVENTS.map((event, index) => {
    const daysOffset = offsets[index % offsets.length];
    const dynamicDate = getRelativeDate(daysOffset);

    return {
      ...event,
      date: dynamicDate,
      quotes: event.quotes.map((quote) => ({
        ...quote,
        directUrl: quote.directUrl,
      })),
    };
  });
}

export const getAutoUpdatedEvents = getAutoUpdatedHeadlineEvents;

/**
 * Fetches all active events: pulls from live Ticketmaster API if key is present,
 * and merges with auto-advancing headline tours.
 */
export async function getAllEvents(): Promise<Event[]> {
  const headlineEvents = getAutoUpdatedHeadlineEvents();
  const tmEvents = await fetchTicketmasterEvents({ size: 15 });

  if (tmEvents.length === 0) {
    return headlineEvents;
  }

  // Merge live Ticketmaster events with headline stadium tours
  return [...headlineEvents, ...tmEvents];
}

/**
 * Returns events filtered by category (concert, sports, theatre, comedy)
 */
export async function getEventsByCategory(category?: string): Promise<Event[]> {
  const allEvents = await getAllEvents();
  if (!category || category === 'all') return allEvents;
  if (category === 'ticketmaster') {
    return allEvents.filter((e) => e.quotes.some((q) => q.provider === 'Ticketmaster'));
  }
  return allEvents.filter((e) => e.category === category);
}

/**
 * Finds a single event by ID or slug
 */
export async function getEventByIdOrSlug(idOrSlug: string): Promise<Event | null> {
  const allEvents = await getAllEvents();
  return allEvents.find((e) => e.id === idOrSlug || e.slug === idOrSlug) || null;
}
