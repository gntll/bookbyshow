import React from 'react';
import { Mail, MapPin, Clock, Briefcase, MessageSquare } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact Us | BookByShow Publisher & Support Desk',
  description: 'Get in touch with BookByShow. Contact our user support desk, affiliate compliance team, and cinema partnership managers.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#060709] text-neutral-300">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[#e51821] text-xs font-semibold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Support & Publisher Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Contact BookByShow
          </h1>
          <p className="mt-3 text-sm text-neutral-400 max-w-xl mx-auto">
            Have questions about a price comparison, affiliate partnership, or cinema data listing? Our team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 space-y-4">
            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#e51821]" />
                <span>Department Inquiries</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">Affiliate & Network Reviews</p>
                  <a href="mailto:partners@bookbyshow.com" className="text-white hover:text-[#e51821] font-medium transition-colors">
                    partners@bookbyshow.com
                  </a>
                </div>

                <div>
                  <p className="text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">General Support & Feedback</p>
                  <a href="mailto:support@bookbyshow.com" className="text-white hover:text-[#e51821] font-medium transition-colors">
                    support@bookbyshow.com
                  </a>
                </div>

                <div>
                  <p className="text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">Legal & Compliance</p>
                  <a href="mailto:compliance@bookbyshow.com" className="text-white hover:text-[#e51821] font-medium transition-colors">
                    compliance@bookbyshow.com
                  </a>
                </div>

                <div>
                  <p className="text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">Press & Media Inquiries</p>
                  <a href="mailto:press@bookbyshow.com" className="text-white hover:text-[#e51821] font-medium transition-colors">
                    press@bookbyshow.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Clock className="w-4 h-4 text-[#e51821]" />
                <span>Response SLA</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                All publisher compliance verifications, affiliate account reviews, and user inquiries are reviewed within <strong>24 to 48 business hours</strong>.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-white font-semibold">
                <MapPin className="w-4 h-4 text-[#e51821]" />
                <span>Publisher Headquarters</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                BookByShow Inc.<br />
                Wilmington, DE & New York, NY<br />
                United States
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#e51821]" />
              <span>Send Us an Inquiry</span>
            </h2>
            <p className="text-xs text-neutral-400 mb-6">
              Please complete the form below. For affiliate account status inquiries, please include your network name and publisher ID.
            </p>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
