/**
 * Centralized Affiliate Network Configuration for BookByShow.com
 *
 * Supported Networks for US Ticketing:
 * - Fandango (Impact.com / CJ)
 * - Ticketmaster (Impact.com / Partnerize)
 * - AMC Theatres (Direct / Impact)
 * - Regal Cinemas (Direct / Flex)
 * - Cinemark (Direct / CJ)
 * - StubHub (Partnerize / Awin)
 * - SeatGeek (Impact.com)
 * - Atom Tickets (Rakuten / Impact)
 */

export interface AffiliateOutboundOptions {
  showtimeId?: string;
  eventId?: string;
  medium?: string;
  campaign?: string;
  subId?: string;
}

export interface AffiliatePartnerConfig {
  name: string;
  network: 'Impact' | 'Partnerize' | 'CJ' | 'Rakuten' | 'Direct';
  affiliateId: string;
  defaultBaseUrl: string;
  buildUrl: (targetUrl: string, options?: AffiliateOutboundOptions) => string;
}

export const AFFILIATE_CONFIG: Record<string, AffiliatePartnerConfig> = {
  'AMC Direct': {
    name: 'AMC Theatres',
    network: 'Impact',
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_AMC_ID || 'bookbyshow-amc',
    defaultBaseUrl: 'https://www.amctheatres.com',
    buildUrl: (targetUrl) => {
      const url = new URL(targetUrl || 'https://www.amctheatres.com');
      url.searchParams.set('utm_source', 'bookbyshow');
      url.searchParams.set('utm_medium', 'affiliate');
      url.searchParams.set('utm_campaign', 'ticket_aggregator');
      return url.toString();
    },
  },
  Fandango: {
    name: 'Fandango',
    network: 'Impact',
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_FANDANGO_ID || 'bookbyshow-fnd',
    defaultBaseUrl: 'https://www.fandango.com',
    buildUrl: (targetUrl) => {
      const url = new URL(targetUrl || 'https://www.fandango.com');
      url.searchParams.set('source', 'bookbyshow_aggregator');
      url.searchParams.set('utm_source', 'bookbyshow');
      url.searchParams.set('utm_medium', 'affiliate');
      return url.toString();
    },
  },
  'Regal Cinemas': {
    name: 'Regal Cinemas',
    network: 'Direct',
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_REGAL_ID || 'bookbyshow-regal',
    defaultBaseUrl: 'https://www.regmovies.com',
    buildUrl: (targetUrl) => {
      const url = new URL(targetUrl || 'https://www.regmovies.com');
      url.searchParams.set('utm_source', 'bookbyshow');
      url.searchParams.set('utm_medium', 'aggregator');
      return url.toString();
    },
  },
  Cinemark: {
    name: 'Cinemark',
    network: 'CJ',
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_CINEMARK_ID || 'bookbyshow-cnk',
    defaultBaseUrl: 'https://www.cinemark.com',
    buildUrl: (targetUrl) => {
      const url = new URL(targetUrl || 'https://www.cinemark.com');
      url.searchParams.set('utm_source', 'bookbyshow');
      return url.toString();
    },
  },
  Ticketmaster: {
    name: 'Ticketmaster',
    network: 'Impact',
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_TICKETMASTER_ID || '7792432',
    defaultBaseUrl: 'https://ticketmaster.evyy.net/c/7792432/264167/4272',
    buildUrl: (targetUrl, options) => {
      let destUrl = targetUrl || 'https://www.ticketmaster.com';

      // Defensive auto-correction: Legacy or dead artist slugs (e.g. /artist/123) 404 on Ticketmaster US.
      // Automatically convert them to guaranteed-live Ticketmaster search URLs.
      if (destUrl.includes('/artist/')) {
        const match = destUrl.match(/ticketmaster\.com\/([^\/]+)-tickets\/artist\//i);
        if (match && match[1]) {
          const artistQuery = match[1].replace(/-/g, ' ');
          destUrl = `https://www.ticketmaster.com/search?q=${encodeURIComponent(artistQuery)}`;
        }
      }

      const impactBase =
        process.env.NEXT_PUBLIC_IMPACT_TICKETMASTER_URL ||
        'https://ticketmaster.evyy.net/c/7792432/264167/4272';

      try {
        const tracker = new URL(impactBase);
        tracker.searchParams.set('u', destUrl);
        const subId =
          options?.subId ||
          (options?.eventId ? `event_${options.eventId}` : 'bookbyshow_web');
        tracker.searchParams.set('subId1', subId);
        if (options?.campaign) tracker.searchParams.set('subId2', options.campaign);
        return tracker.toString();
      } catch {
        return `https://ticketmaster.evyy.net/c/7792432/264167/4272?u=${encodeURIComponent(destUrl)}`;
      }
    },
  },
  StubHub: {
    name: 'StubHub',
    network: 'Partnerize',
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_STUBHUB_ID || 'bookbyshow-sh',
    defaultBaseUrl: 'https://www.stubhub.com',
    buildUrl: (targetUrl, options) => {
      const destUrl = targetUrl || 'https://www.stubhub.com';
      const partnerizeBase = process.env.NEXT_PUBLIC_PARTNERIZE_STUBHUB_URL;

      if (partnerizeBase) {
        try {
          const cleanedBase = partnerizeBase.replace(/\/destination:.*$/, '');
          return `${cleanedBase}/destination:${encodeURIComponent(destUrl)}`;
        } catch {
          return `${partnerizeBase}?destination=${encodeURIComponent(destUrl)}`;
        }
      }

      try {
        const url = new URL(destUrl);
        url.searchParams.set('utm_source', 'bookbyshow');
        url.searchParams.set('utm_medium', 'affiliate');
        if (options?.eventId) url.searchParams.set('utm_campaign', options.eventId);
        return url.toString();
      } catch {
        return destUrl;
      }
    },
  },
  SeatGeek: {
    name: 'SeatGeek',
    network: 'Impact',
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_SEATGEEK_ID || '7792432',
    defaultBaseUrl: 'https://seatgeek.com',
    buildUrl: (targetUrl, options) => {
      const destUrl = targetUrl || 'https://seatgeek.com';
      const impactBase = process.env.NEXT_PUBLIC_IMPACT_SEATGEEK_URL;

      if (impactBase) {
        try {
          const tracker = new URL(impactBase);
          tracker.searchParams.set('u', destUrl);
          const subId =
            options?.subId ||
            (options?.eventId ? `event_${options.eventId}` : 'bookbyshow_web');
          tracker.searchParams.set('subId1', subId);
          if (options?.campaign) tracker.searchParams.set('subId2', options.campaign);
          return tracker.toString();
        } catch {
          return `${impactBase}?u=${encodeURIComponent(destUrl)}`;
        }
      }

      try {
        const url = new URL(destUrl);
        url.searchParams.set('aid', process.env.NEXT_PUBLIC_AFFILIATE_SEATGEEK_ID || 'bookbyshow');
        url.searchParams.set('utm_source', 'bookbyshow');
        url.searchParams.set('utm_medium', 'affiliate');
        if (options?.eventId) url.searchParams.set('utm_campaign', options.eventId);
        return url.toString();
      } catch {
        return destUrl;
      }
    },
  },
  'Atom Tickets': {
    name: 'Atom Tickets',
    network: 'Rakuten',
    affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_ATOM_ID || 'bookbyshow-atm',
    defaultBaseUrl: 'https://www.atomtickets.com',
    buildUrl: (targetUrl) => {
      const url = new URL(targetUrl || 'https://www.atomtickets.com');
      url.searchParams.set('utm_source', 'bookbyshow');
      return url.toString();
    },
  },
};

/**
 * Returns an affiliate-tagged URL with tracking parameters and fallback protection
 */
export function buildAffiliateOutboundUrl(
  providerName: string,
  rawUrl: string,
  options?: AffiliateOutboundOptions
): string {
  const config = AFFILIATE_CONFIG[providerName];
  if (!config) {
    try {
      const url = new URL(rawUrl);
      url.searchParams.set('utm_source', 'bookbyshow');
      if (options?.medium) url.searchParams.set('utm_medium', options.medium);
      if (options?.campaign) url.searchParams.set('utm_campaign', options.campaign);
      return url.toString();
    } catch {
      return rawUrl;
    }
  }

  try {
    return config.buildUrl(rawUrl, options);
  } catch {
    return rawUrl;
  }
}
