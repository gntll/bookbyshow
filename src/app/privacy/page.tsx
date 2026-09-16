import React from 'react';
import Link from 'next/link';
import { Lock, Shield, Eye, Cookie, Server } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | BookByShow.com',
  description: 'BookByShow Privacy Policy: Learn how we safeguard user data, utilize cookies, and manage affiliate tracking parameters.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Lock className="w-4 h-4" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Effective Date: September 2026 • Last Updated: September 16, 2026
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-[#0d121e] border border-[#1e2638] space-y-6 text-sm text-gray-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-rose-400" />
              1. Information We Collect
            </h2>
            <p>
              BookByShow is designed as a privacy-friendly aggregator. You can browse movie showtimes, concert dates, and cinema seating without creating an account.
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 ml-2">
              <li><strong>Local Storage:</strong> We store your selected metro city and saved watchlist items directly on your device via browser LocalStorage. We do not transmit or sell this personal preference data.</li>
              <li><strong>Anonymous Usage Analytics:</strong> We collect aggregate, de-identified telemetry (such as page visits, device type, and search queries) to improve platform speed and search accuracy.</li>
              <li><strong>Email Newsletter:</strong> If you voluntarily subscribe to drop alerts, we store your email solely for sending ticket release notifications. You may unsubscribe anytime.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Cookie className="w-5 h-5 text-cyan-400" />
              2. Cookies & Affiliate Tracking
            </h2>
            <p>
              When you click on a ticket provider link (e.g. Fandango, Ticketmaster, AMC Theatres), you are redirected to the merchant&apos;s website. Outbound affiliate URLs may include tracking identifiers (such as UTM parameters or affiliate partner campaign tags) so the ticketing provider knows you were referred by BookByShow.
            </p>
            <p className="text-gray-400">
              Ticketing partners manage their own privacy and cookie policies. We encourage you to review their respective disclosures upon arrival.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-400" />
              3. Third-Party Payment Processing
            </h2>
            <p>
              BookByShow does not collect, process, or store credit cards, billing addresses, or banking details. All financial transactions occur securely on authorized primary or secondary ticketing partners.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              4. Contact Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy or your data rights, please contact our privacy officer at{' '}
              <a href="mailto:privacy@bookbyshow.com" className="text-cyan-400 hover:underline font-semibold">
                privacy@bookbyshow.com
              </a>.
            </p>
          </section>
        </div>

        <div className="text-center text-xs text-gray-500 pt-4">
          <Link href="/terms" className="hover:underline text-gray-400">Terms of Service</Link>
          <span className="mx-2">•</span>
          <Link href="/affiliate-disclosure" className="hover:underline text-gray-400">Affiliate Disclosure</Link>
        </div>
      </div>
    </div>
  );
}
