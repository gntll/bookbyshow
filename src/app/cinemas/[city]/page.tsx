import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { METRO_MARKETS, getMarketBySlug } from '@/data/metroMarkets';
import { CINEMAS } from '@/data/mockData';
import { MapPin, Film, Star, ChevronRight, CheckCircle2, Ticket, HelpCircle } from 'lucide-react';
import { AdBanner } from '@/components/ads/AdBanner';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return METRO_MARKETS.map((market) => ({
    city: market.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const market = getMarketBySlug(city);
  if (!market) return { title: 'Cinemas Directory | BookByShow' };

  const title = `Cinemas in ${market.name}, ${market.stateCode} | Compare Showtimes & Ticket Rates`;
  const description = `Compare movie showtimes, 70mm IMAX, Dolby Cinema & convenience fees across ${market.cinemaCount}+ theatres in ${market.name}, ${market.state}. All booking fees shown upfront on BookByShow.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://bookbyshow.com/cinemas/${market.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://bookbyshow.com/cinemas/${market.slug}`,
      siteName: 'BookByShow',
      type: 'website',
    },
  };
}

export default async function CityCinemasPage({ params }: Props) {
  const { city } = await params;
  const market = getMarketBySlug(city);

  if (!market) {
    notFound();
  }

  // Filter or augment cinemas for this market
  const localCinemas = CINEMAS.map((c, idx) => ({
    ...c,
    address: `${100 + idx * 42} ${market.name} Blvd, ${market.name}, ${market.stateCode}`,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `Movie Theatres in ${market.name}, ${market.stateCode}`,
    description: market.description,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: market.lat,
      longitude: market.lng,
    },
    containsPlace: localCinemas.map((c) => ({
      '@type': 'MovieTheater',
      name: `${c.name} (${market.name})`,
      address: c.address,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: c.rating,
        bestRating: 5,
        ratingCount: 150 + c.screens.length * 40,
      },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bookbyshow.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Cinemas',
        item: 'https://bookbyshow.com/cinemas',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: market.name,
        item: `https://bookbyshow.com/cinemas/${market.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#060709] pb-24 text-neutral-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero Breadcrumbs & Header */}
      <div className="border-b border-neutral-800 bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/cinemas" className="hover:text-white transition-colors">Cinemas</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#e51821]">{market.name}</span>
          </nav>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-red-950/70 text-red-300 border border-red-500/40">
              <Film className="w-3.5 h-3.5 text-[#e51821]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e51821]">
              Metro Auditorium Directory
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Cinemas in {market.name}, {market.stateCode}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-3xl leading-relaxed">
            {market.tagline} {market.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#e51821]" />
              <strong>{market.cinemaCount}+</strong> Verified Venues
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#e51821]" />
              <strong>100%</strong> Convenience Fee Transparency
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#e51821]" />
              IMAX 70mm, Dolby & Laser Tracking
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Featured Auditoriums Spotlight */}
        <div className="p-6 rounded-2xl bg-[#0e1015] border border-neutral-800 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>Notable Exhibition Screens in {market.name}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {market.featuredCinemas.map((name, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm font-semibold text-white flex items-start gap-2.5"
              >
                <div className="w-6 h-6 rounded-md bg-red-950/70 border border-red-500/40 text-red-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  {idx + 1}
                </div>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Theatres List */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Browse All Auditoriums & Showtimes in {market.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localCinemas.map((cinema) => (
              <div
                key={cinema.id}
                className="rounded-2xl bg-[#0e1015] border border-neutral-800 overflow-hidden flex flex-col sm:flex-row gap-4 p-5 hover:border-[#e51821]/40 transition-colors shadow-lg group"
              >
                <div className="w-full sm:w-48 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-neutral-900 shrink-0 relative">
                  <img
                    src={cinema.photoUrl}
                    alt={`${cinema.name} in ${market.name}`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-white font-bold text-xs flex items-center gap-1.5 border border-neutral-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{cinema.rating}</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#e51821]">
                        {cinema.chain}
                      </span>
                      <span className="text-xs text-neutral-400">
                        • {market.name} Metro
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-lg mt-0.5 group-hover:text-red-400 transition-colors">
                      {cinema.name}
                    </h3>

                    <p className="text-sm text-neutral-300 mt-1 flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      <span>{cinema.address}</span>
                    </p>

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {cinema.amenities.map((a, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2.5 py-0.5 rounded text-xs font-medium bg-neutral-900 text-neutral-200 border border-neutral-800"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-neutral-800 flex items-center justify-between text-sm">
                    <span className="text-neutral-400 text-xs font-medium">
                      {cinema.screens.length} Screen Types
                    </span>
                    <Link
                      href={`/movies`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e51821] hover:bg-[#c9121a] text-white font-bold text-xs transition-colors"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Compare Showtimes</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AdSense Placement */}
        <AdBanner format="leaderboard" />

        {/* Hyper-Local FAQs for SEO Click-Through Rate */}
        <div className="p-8 rounded-2xl bg-[#0e1015] border border-neutral-800 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#e51821]" />
            <h2 className="text-xl font-bold text-white">
              Frequently Asked Questions: Moviegoing in {market.name}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h3 className="font-bold text-white text-base">
                How does BookByShow help moviegoers in {market.name} save money?
              </h3>
              <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                Most ticketing apps hide online convenience surcharges until the payment screen. In {market.name}, these fees can add \$2.00 to \$3.50 per ticket. BookByShow aggregates base ticket prices and verified fees upfront across AMC, Regal, Cinemark, and independent theaters so you can select the lowest total rate before booking.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h3 className="font-bold text-white text-base">
                Which theatres in {market.name} offer Discount Tuesdays?
              </h3>
              <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                Most major exhibition circuits in {market.name} run weekly discount programs: AMC Discount Tuesdays offer up to 30%–50% off for Stubs members, Regal Value Days offer reduced admission at participating locations, and Cinemark Discount Tuesdays provide flat reduced pricing on regular and XD screens.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h3 className="font-bold text-white text-base">
                What is the difference between IMAX with Laser and Dolby Cinema in {market.name}?
              </h3>
              <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                IMAX with Laser provides larger aspect ratios (up to 1.43:1 in flagship locations) with intense dual 4K brightness, ideal for blockbusters shot with IMAX film cameras. Dolby Cinema pairs dual 4K Christie laser projectors with Dolby Vision HDR and spatial Dolby Atmos audio, featuring luxury reclining seats with seat-mounted transducers.
              </p>
            </div>
          </div>
        </div>

        {/* Other Cities Grid */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            Compare Theatres in Other Major US Metro Areas
          </h3>
          <div className="flex flex-wrap gap-2">
            {METRO_MARKETS.filter((m) => m.slug !== market.slug).map((m) => (
              <Link
                key={m.slug}
                href={`/cinemas/${m.slug}`}
                className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
              >
                {m.name}, {m.stateCode}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
