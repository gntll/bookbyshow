import React from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Frequently Asked Questions (FAQ) | BookByShow',
  description: 'Everything you need to know about how BookByShow compares movie showtimes, verifies convenience fees, and directs you to official box offices.',
};

export default function FAQPage() {
  const faqs = [
    {
      q: 'What is BookByShow.com?',
      a: 'BookByShow is an independent entertainment price comparison and showtime aggregation platform. We index movies, live theater, concerts, and cinema auditoriums across the United States. Fans use BookByShow to see real-time showtimes, seat maps, premium screen formats (IMAX 70mm, Dolby Cinema, 4DX), and upfront convenience fees across major box offices.',
    },
    {
      q: 'Does BookByShow sell tickets directly?',
      a: 'No. BookByShow is an aggregator, not a primary ticket broker or reseller. When you click \"Compare\" or \"Proceed to Box Office\", we redirect you directly to the official authorized primary seller (such as AMC Theatres, Regal Cinemas, Cinemark, or Ticketmaster). You complete your transaction on their verified, secure checkout systems.',
    },
    {
      q: 'Are the tickets authentic and guaranteed?',
      a: 'Yes, 100%. Because all purchases occur directly with the primary venue box office or accredited ticketing agent, your tickets, barcodes, loyalty points, and admission rights are identical to purchasing through the cinema\'s own application.',
    },
    {
      q: 'How does BookByShow calculate and compare convenience fees?',
      a: 'Most ticketing platforms add convenience surcharges ($1.50 to $6.50 per ticket) at the final checkout step. BookByShow continuously monitors and calculates these fees upfront based on cinema chain, loyalty status (e.g. AMC Stubs A-List, Regal Unlimited, Cinemark Movie Club), and showtime timing so you see the true total cost upfront.',
    },
    {
      q: 'How does BookByShow earn revenue?',
      a: 'BookByShow is 100% free for fans. We sustain our operations through affiliate referral agreements with approved ticket sellers, affiliate networks (including Impact.com and FlexOffers.com), and promotional partners. When you buy tickets through our verified partner links, we may receive a small commission at no additional cost to you.',
    },
    {
      q: 'Can I cancel or refund tickets bought through BookByShow links?',
      a: 'Because transactions are completed on the partner box office website (AMC, Regal, Cinemark, Ticketmaster), your purchase is governed by that seller\'s refund and exchange policies. You can cancel or exchange tickets through your booking confirmation email from the respective theater chain.',
    },
    {
      q: 'What makes BookByShow different from Google Showtimes or Fandango?',
      a: 'Google and single-chain apps typically show only one price or only one circuit\'s listings. BookByShow compares side-by-side total costs across competing chains, highlights true premium projection formats (differentiating 70mm film from digital laser), and surfaces verified loyalty club fee waivers in one unified interface.',
    },
    {
      q: 'How often are showtimes and seat availability refreshed?',
      a: 'Our aggregation pipelines sync showtime feeds, seating availability previews, and pricing updates multiple times throughout the day to ensure real-time accuracy for weekend drops and pre-sales.',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#060709] text-neutral-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[#e51821] text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center & FAQ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm text-neutral-400 max-w-xl mx-auto">
            Clear answers about how we compare prices, verify primary box offices, and keep BookByShow 100% free.
          </p>
        </div>

        <div className="space-y-4 mb-14">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors space-y-2.5"
            >
              <h2 className="text-base font-bold text-white flex items-start gap-3">
                <span className="text-[#e51821] font-mono text-sm shrink-0 mt-0.5">0{idx + 1}.</span>
                <span>{faq.q}</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-7">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-[#0d0f14] border border-neutral-800 text-center space-y-4">
          <h3 className="text-white font-bold text-lg">Still have questions?</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Our team is always happy to help with inquiries regarding pricing data, affiliate compliance, or cinema listings.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-[#e51821] hover:bg-[#c9121a] text-white font-bold text-xs shadow-md shadow-red-950/40 transition-colors"
            >
              Contact Support Desk
            </Link>
            <Link
              href="/affiliate-disclosure"
              className="px-5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-bold text-xs transition-colors"
            >
              Affiliate Disclosure
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
