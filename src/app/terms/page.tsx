import React from 'react';
import Link from 'next/link';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | BookByShow.com',
  description: 'Terms and Conditions for using BookByShow.com movie and live entertainment price aggregator.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#09090b]">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <FileText className="w-4 h-4" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs text-neutral-400">
            Effective Date: September 2026 • Last Updated: September 16, 2026
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-xl bg-[#121215] border border-neutral-800 space-y-6 text-sm text-neutral-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-neutral-400" />
              1. Acceptance of Terms
            </h2>
            <p className="text-xs sm:text-sm">
              By accessing or using BookByShow.com (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-neutral-400" />
              2. Independent Aggregator Disclaimer
            </h2>
            <p className="text-xs sm:text-sm">
              BookByShow is an independent price comparison and entertainment discovery engine. We are not a direct ticket broker, box office, or primary ticket issuer. 
            </p>
            <p className="text-xs sm:text-sm text-neutral-400">
              Ticket prices, seating availability, and service fees displayed on BookByShow are aggregated from third-party ticket providers in real time and are subject to dynamic surge pricing and change without notice. The final price and terms of sale are determined by the respective ticketing merchant at the moment of checkout.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Third-Party Purchases & Refunds</h2>
            <p className="text-xs sm:text-sm">
              Any ticket purchases, cancellations, seat exchanges, or refund requests must be directed to the third-party provider where the transaction was finalized (such as AMC Theatres, Fandango, Ticketmaster, or StubHub). BookByShow holds no liability for disputes, event cancellations, or ticketing platform errors.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Intellectual Property</h2>
            <p className="text-xs sm:text-sm">
              All promotional poster art, movie trailers, logos, and artist names are copyrighted property of their respective film studios, artists, and ticketing platforms. BookByShow displays them strictly for nominative identification and comparison purposes.
            </p>
          </section>
        </div>

        <div className="text-center pt-4 text-xs text-neutral-500 flex items-center justify-center gap-4">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link>
        </div>
      </div>
    </div>
  );
}
