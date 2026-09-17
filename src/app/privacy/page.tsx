import React from 'react';
import Link from 'next/link';
import { Lock, Eye, Cookie, Server } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | BookByShow.com',
  description: 'BookByShow Privacy Policy: Learn how we safeguard user data, utilize cookies, and manage affiliate tracking parameters.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#09090b]">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Lock className="w-4 h-4" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-neutral-400">
            Effective Date: September 2026 • Last Updated: September 16, 2026
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-xl bg-[#121215] border border-neutral-800 space-y-6 text-sm text-neutral-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-neutral-400" />
              1. Information We Collect
            </h2>
            <p className="text-xs sm:text-sm">
              BookByShow is designed as a privacy-friendly aggregator. You can browse movie showtimes, concert dates, and cinema seating without creating an account.
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-neutral-400 ml-2">
              <li><strong>Local Storage:</strong> We store your selected metro city and saved watchlist items directly on your device via browser LocalStorage. We do not transmit or sell this personal preference data.</li>
              <li><strong>Anonymous Usage Telemetry:</strong> We collect aggregate, de-identified telemetry (such as page visits, device type, and search queries) to improve platform speed and search accuracy.</li>
              <li><strong>Email Newsletter:</strong> If you voluntarily subscribe to drop alerts, we store your email solely for sending ticket release notifications. You may unsubscribe anytime.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cookie className="w-4 h-4 text-neutral-400" />
              2. Cookies & Affiliate Tracking
            </h2>
            <p className="text-xs sm:text-sm">
              When you click on a ticket provider link (e.g. Fandango, Ticketmaster, AMC Theatres), you are redirected to the merchant&apos;s website. Outbound affiliate URLs may include tracking identifiers (such as UTM parameters or affiliate partner campaign tags) so the ticketing provider knows you were referred by BookByShow.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400">
              Ticketing partners manage their own privacy and cookie policies. We encourage you to review their respective disclosures upon arrival.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-neutral-400" />
              3. Third-Party Payment Processing
            </h2>
            <p className="text-xs sm:text-sm">
              BookByShow never processes ticket payments, holds credit card numbers, or conducts financial transactions directly. All ticket checkouts occur on the secure, encrypted servers of authorized box offices and licensed ticket vendors.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Contact Us</h2>
            <p className="text-xs sm:text-sm">
              If you have questions regarding this Privacy Policy, please reach out to{' '}
              <a href="mailto:privacy@bookbyshow.com" className="text-white hover:underline">
                privacy@bookbyshow.com
              </a>.
            </p>
          </section>
        </div>

        <div className="text-center pt-4 text-xs text-neutral-500 flex items-center justify-center gap-4">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <span>•</span>
          <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link>
        </div>
      </div>
    </div>
  );
}
