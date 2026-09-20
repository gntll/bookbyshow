import { Metadata } from 'next';
import { MOVIES } from '@/data/mockData';

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
  const movie = MOVIES.find((m) => m.slug === id || m.id === id);

  if (!movie) {
    return {
      title: 'Movie Showtimes & Ticket Rates | BookByShow',
      description: 'Compare showtimes and ticket rates across AMC, Regal, Cinemark, and Fandango.',
    };
  }

  const title = `${movie.title} Showtimes & Tickets | Compare AMC, Regal & Cinemark`;
  const description = `Compare showtimes, seat maps, and ticket prices for ${movie.title} across all major cinemas. Guaranteed lowest rate from $${movie.lowestPrice.toFixed(2)} with zero surprise fees.`;
  const ogImageUrl = `/api/og?title=${encodeURIComponent(movie.title)}&price=${encodeURIComponent(
    `$${movie.lowestPrice.toFixed(2)}`
  )}&badge=${encodeURIComponent(movie.formats[0] || 'Now Showing')}&type=movie`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://bookbyshow.com/movie/${movie.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://bookbyshow.com/movie/${movie.slug}`,
      siteName: 'BookByShow',
      type: 'video.movie',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${movie.title} Showtimes & Ticket Price Comparison`,
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

export default function MovieDetailLayout({ children }: Props) {
  return <>{children}</>;
}
