import { Metadata } from 'next';
import { EVENTS } from '@/data/mockData';

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = EVENTS.find((e) => e.slug === id || e.id === id);

  if (!event) {
    return {
      title: 'Concert & Live Event Tickets | BookByShow',
      description: 'Compare ticket rates across Ticketmaster, StubHub, and SeatGeek with 100% fee transparency.',
    };
  }

  const title = `${event.title} Tickets | Compare Ticketmaster, StubHub & SeatGeek`;
  const description = `Compare verified ticket prices, seating, and resale fees for ${event.title} at ${event.venueName} in ${event.venueCity}. Guaranteed lowest rate from $${event.minPrice.toFixed(2)}.`;
  const ogImageUrl = `/api/og?title=${encodeURIComponent(event.title)}&price=${encodeURIComponent(
    `$${event.minPrice.toFixed(2)}`
  )}&badge=${encodeURIComponent(event.category.toUpperCase())}&type=event`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://bookbyshow.com/event/${event.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://bookbyshow.com/event/${event.slug}`,
      siteName: 'BookByShow',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${event.title} Ticket Rates & Availability`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function EventDetailLayout({ children }: Props) {
  return <>{children}</>;
}
