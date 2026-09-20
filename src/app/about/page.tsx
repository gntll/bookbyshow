import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Compass, Users, Award, FileText, Mail } from 'lucide-react';

export const metadata = {
  title: 'About BookByShow | Our Mission, Technology & Editorial Standards',
  description: 'Learn about BookByShow.com, the independent entertainment aggregator providing 100% price transparency, convenience fee comparison, and verified showtimes across US box offices.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#060709] text-neutral-300">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[#e51821] text-xs font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>About BookByShow</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Democratizing Entertainment Ticketing
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            BookByShow is an independent entertainment aggregator and price comparison engine built to eliminate hidden ticketing fees and help fans experience cinema and live shows at verified best prices.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e51821]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl font-bold text-white">Why We Founded BookByShow</h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              For decades, moviegoers and live event fans have faced an opaque purchasing experience: hidden convenience surcharges added at the final checkout step, fragmented seating charts across competing theater chains, and misleading discounts.
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed">
              BookByShow was created to solve this problem once and for all. We aggregate showtimes, auditorium formats (such as 70mm IMAX, Dolby Cinema, and 4DX), and primary ticket seller pricing into a unified, lightning-fast comparison dashboard. Every convenience fee is surfaced upfront so you know the exact out-of-pocket cost before you book.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-[#e51821]/40 text-[#e51821] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">100% Fee Transparency</h3>
            <p className="text-sm text-neutral-300 leading-relaxed flex-1">
              We never hide online booking fees. Our comparison tables break down base ticket price, booking surcharges, and taxes across competing box offices in real time.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-[#e51821]/40 text-[#e51821] flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Direct Primary Handoff</h3>
            <p className="text-sm text-neutral-300 leading-relaxed flex-1">
              Every checkout link on BookByShow directs users straight to official primary box offices and authorized sellers (AMC, Regal, Cinemark, Ticketmaster) with zero middlemen markups.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-[#e51821]/40 text-[#e51821] flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Editorial Independence</h3>
            <p className="text-sm text-neutral-300 leading-relaxed flex-1">
              Our guides, format comparisons, and loyalty program evaluations are written strictly for consumer benefit and are never influenced by affiliate commission rates.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-[#0e1015] border border-neutral-800 space-y-6 mb-14">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#e51821]" />
            <h2 className="text-xl font-bold text-white">Our Editorial & Research Standards</h2>
          </div>
          <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
            <p>
              At BookByShow, accuracy is our highest priority. Our cinema research team regularly audits showtime feeds, seating layouts, and loyalty perks across 20+ primary US exhibition circuits. We verify:
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-300 ml-4 list-disc">
              <li><strong>Screen Specifications:</strong> True 15/70mm film projection vs. Xenon digital vs. dual 4K laser installations to prevent &quot;LieMAX&quot; confusion for film enthusiasts.</li>
              <li><strong>Loyalty Fee Waivers:</strong> Exact qualifying criteria for waived convenience fees across AMC Stubs Premiere/A-List, Regal Unlimited, and Cinemark Movie Club.</li>
              <li><strong>Dynamic Pricing Algorithms:</strong> Real-time tracking of weekend evening peak surcharges versus weekday matinee rates.</li>
            </ul>
            <p>
              We adhere to strict FTC guidelines on affiliate marketing. For full details on our monetization model, please review our public <Link href="/affiliate-disclosure" className="text-[#e51821] underline hover:text-white">Affiliate Disclosure</Link>.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-base mb-1">Publisher & Partnership Inquiries</h3>
            <p className="text-sm text-neutral-300 max-w-lg">
              Are you an authorized cinema circuit, primary ticketing service, or affiliate network compliance manager? Reach our direct partnership desk.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-[#e51821] hover:bg-[#c9121a] text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-red-950/40 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Our Team</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
