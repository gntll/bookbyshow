import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BookByShow — Movie & Event Aggregator',
    short_name: 'BookByShow',
    description: 'Compare showtimes, seat availability, and ticket prices across all major cinemas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#06080e',
    theme_color: '#e11d48',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
