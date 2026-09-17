import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Cinema & Ticketing Guides | BookByShow Editorial',
  description: 'Expert consumer guides on IMAX 70mm vs Dolby Cinema, avoiding convenience fees, and maximizing cinema loyalty club rewards.',
};

export default function GuidesPage() {
  const articles = [
    {
      slug: 'imax-70mm-vs-dolby-cinema',
      title: 'IMAX 70mm vs. Dolby Cinema vs. Prime 3D: The Definitive 2026 Format Guide',
      category: 'Auditorium Technology',
      readTime: '6 min read',
      date: 'September 2026',
      excerpt: 'Understand true 1.43:1 film projection versus dual 4K Christie laser, 128-channel spatial Dolby Atmos, and when paying a $7 to $11 premium surcharge is truly justified.',
      highlights: ['Aspect ratio comparisons', 'Film vs Laser contrast ratios', 'Best seat geometry recommendations'],
    },
    {
      slug: 'how-to-avoid-movie-ticket-convenience-fees',
      title: 'The Ultimate Guide to Avoiding Movie Ticket Convenience Fees in 2026',
      category: 'Consumer Savings',
      readTime: '5 min read',
      date: 'September 2026',
      excerpt: 'Online booking fees average $2.25 per seat across major chains. Discover proven methods to legally waive or eliminate these surcharges across AMC, Regal, and Cinemark.',
      highlights: ['Free loyalty tier loopholes', 'In-person box office rules', 'Credit card entertainment statement credits'],
    },
    {
      slug: 'movie-loyalty-clubs-compared',
      title: '2026 US Cinema Subscription Showdown: AMC Stubs A-List vs. Regal Unlimited vs. Cinemark Club',
      category: 'Subscription Analysis',
      readTime: '8 min read',
      date: 'September 2026',
      excerpt: 'A comprehensive feature-by-feature cost analysis of America\'s top three cinema subscription plans. Find out which club offers the best return on investment for frequent moviegoers.',
      highlights: ['Break-even ticket counts', 'Premium format surcharge policies', 'Concession discount stacking'],
    },
    {
      slug: 'primary-vs-secondary-ticketing',
      title: 'Primary Box Offices vs. Resale Exchanges: Protecting Fans from Counterfeits',
      category: 'Ticket Security',
      readTime: '4 min read',
      date: 'September 2026',
      excerpt: 'How to distinguish authorized primary box offices (AMC, Ticketmaster, AXS) from unregulated secondary marketplaces. Why dynamic barcoding is critical for guaranteed admission.',
      highlights: ['Dynamic barcode protocols', 'Speculative ticket listing dangers', 'Official box office refund policies'],
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#060709] text-neutral-300">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[#e51821] text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Editorial & Cinema Research</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            The BookByShow Cinema Guides
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Independent, research-backed advice to help you pick the best auditorium format, dodge convenience fees, and extract maximum value from US cinema programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {articles.map((art, idx) => (
            <article
              key={idx}
              className="p-7 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-[#e51821]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 font-semibold uppercase text-[10px] tracking-wider">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1 text-neutral-500">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#e51821] transition-colors leading-snug mb-3">
                  {art.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                  {art.excerpt}
                </p>

                <div className="space-y-1.5 mb-6 pt-4 border-t border-neutral-800/80">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Key Takeaways:</p>
                  {art.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e51821]" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-500">{art.date}</span>
                <span className="font-bold text-[#e51821] group-hover:underline flex items-center gap-1">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="p-6 rounded-xl bg-neutral-900/40 border border-neutral-800 text-xs text-neutral-400 text-center leading-relaxed">
          <p>
            <strong>Editorial Policy:</strong> All BookByShow articles and consumer guides are created independently by our cinema research team. We do not accept sponsored placements or paid endorsements for auditorium reviews. Learn more in our <Link href="/about" className="text-white underline">About Us</Link> and <Link href="/affiliate-disclosure" className="text-[#e51821] underline">Affiliate Disclosure</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
