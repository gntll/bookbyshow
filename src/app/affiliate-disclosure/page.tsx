import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Info, ExternalLink, Award } from 'lucide-react';
import { AFFILIATE_CONFIG } from '@/config/affiliates';

export const metadata = {
  title: 'Affiliate Disclosure | BookByShow.com',
  description: 'Learn how BookByShow earns affiliate commissions from authorized US movie and live event ticketing partners at no additional cost to you.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#09090b]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>FTC & Partner Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Affiliate Disclosure & Transparency Statement
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto">
            BookByShow is committed to 100% transparency. We want you to fully understand how our free comparison platform operates and how we sustain our operations.
          </p>
        </div>

        {/* Core Statement Box */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#121215] border border-neutral-800 shadow-xl mb-10 space-y-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
            <div className="space-y-3 text-sm text-neutral-300 leading-relaxed">
              <p>
                <strong className="text-white">Federal Trade Commission (FTC) Disclosure:</strong> BookByShow.com is an independent entertainment aggregator and price comparison engine. Some of the outbound links on this website are affiliate links. This means that if you click on a partner link and complete a ticket purchase or reservation, BookByShow may receive an affiliate referral commission from the ticketing provider.
              </p>
              <p>
                <strong className="text-white">Zero Extra Cost to You:</strong> Using BookByShow is completely free. Buying through our affiliate links does not increase your ticket price or fees in any way. In fact, our price comparison engine is designed to help you find the lowest verified total (including service and processing fees) across competing ticket sources.
              </p>
            </div>
          </div>
        </div>

        {/* Partner Networks Section */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-white" />
            <span>Our US Ticketing Partners & Affiliate Networks</span>
          </h2>
          <p className="text-sm text-neutral-400">
            We partner directly with leading US box offices, authorized primary ticketing systems, and verified secondary ticket marketplaces through accredited global affiliate networks:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(AFFILIATE_CONFIG).map(([key, partner]) => (
              <div
                key={key}
                className="p-4 rounded-xl bg-[#121215] border border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">{partner.name}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-900 text-neutral-300 border border-neutral-700">
                      {partner.network}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    Official authorized ticketing provider for theaters and live entertainment venues.
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-500">Official URL:</span>
                  <a
                    href={partner.defaultBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="text-white hover:underline flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>{partner.defaultBaseUrl.replace('https://', '')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Independence */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#121215] border border-neutral-800 space-y-4 mb-12">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-white" />
            <span>Editorial & Comparison Integrity</span>
          </h2>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <li>
              <strong>Unbiased Comparison:</strong> Affiliate relationships never dictate how we sort or recommend showtimes. Our algorithm automatically highlights the provider offering the lowest verified total price for your chosen screening or event.
            </li>
            <li>
              <strong>Comprehensive Fee Transparency:</strong> Unlike ticketing sites that hide fees until checkout, BookByShow breaks down estimated service and facility fees side-by-side so you can make informed decisions.
            </li>
            <li>
              <strong>Seat Availability:</strong> We provide real-time auditorium capacity indicators and seating tier distinctions (IMAX 70mm, Dolby Cinema, 4DX, Prime Recliners) regardless of affiliate status.
            </li>
          </ul>
        </div>

        {/* Contact & Legal Navigation */}
        <div className="text-center pt-6 border-t border-neutral-800 text-xs text-neutral-400 space-y-2">
          <p>
            Have questions about our affiliate partnerships or wish to partner with BookByShow? Contact us at{' '}
            <a href="mailto:partners@bookbyshow.com" className="text-white hover:underline font-semibold">
              partners@bookbyshow.com
            </a>.
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/deals" className="hover:text-white transition-colors">Ticket Deals</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
