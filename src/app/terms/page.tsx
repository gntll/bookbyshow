import React from 'react';
import Link from 'next/link';
import { FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | BookByShow.com',
  description: 'Terms and Conditions for using BookByShow.com movie and live entertainment price aggregator.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <FileText className="w-4 h-4" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Effective Date: September 2026 • Last Updated: September 16, 2026
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-[#0d121e] border border-[#1e2638] space-y-6 text-sm text-gray-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using BookByShow.com (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              2. Independent Aggregator Disclaimer
            </h2>
            <p>
              BookByShow is an independent price comparison and entertainment discovery engine. We are not a direct ticket broker, box office, or primary ticket issuer. 
            </p>
            <p className="text-gray-400">
              Ticket prices, seating availability, and service fees displayed on BookByShow are aggregated from third-party ticket providers in real time and are subject to dynamic surge pricing and change without notice. The final price and terms of sale are determined by the respective ticketing merchant at the moment of checkout.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Third-Party Purchases & Refunds</h2>
            <p>
              Any ticket purchases, cancellations, seat exchanges, or refund requests must be directed to the third-party provider where the transaction was finalized (such as AMC Theatres, Fandango, Ticketmaster, or StubHub). BookByShow holds no liability for disputes, event cancellations, or ticketing platform errors.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Intellectual Property</h2>
            <p>
              All trademarks, logos, theater brand names, and movie studio promotional artwork displayed on BookByShow are the property of their respective copyright and trademark owners. Their display does not imply endorsement by or affiliation with the trademark owners.
            </p>
          </section>
        </div>

        <div className="text-center text-xs text-gray-500 pt-4">
          <Link href="/privacy" className="hover:underline text-gray-400">Privacy Policy</Link>
          <span className="mx-2">•</span>
          <Link href="/affiliate-disclosure" className="hover:underline text-gray-400">Affiliate Disclosure</Link>
        </div>
      </div>
    </div>
  );
}
