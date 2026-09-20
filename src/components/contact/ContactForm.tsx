'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="p-8 rounded-xl bg-green-950/20 border border-green-800/40 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-green-900/40 border border-green-600/40 text-green-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">Inquiry Transmitted Successfully</h3>
        <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to BookByShow. Your inquiry has been routed to our Publisher & Support Desk. We review and respond to compliance reviews within 24 to 48 business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-[#e51821] hover:underline font-semibold pt-2"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-4 text-sm"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-neutral-300 font-medium mb-1.5">Your Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Jane Doe"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-[#e51821]"
          />
        </div>
        <div>
          <label className="block text-neutral-300 font-medium mb-1.5">Your Email Address *</label>
          <input
            type="email"
            required
            placeholder="name@domain.com"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-[#e51821]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-neutral-300 font-medium mb-1.5">Inquiry Category *</label>
          <select
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#e51821]"
          >
            <option value="affiliate">Affiliate Network & Publisher Verification</option>
            <option value="cinema">Cinema Circuit & Showtimes Integration</option>
            <option value="support">Consumer Price Comparison Support</option>
            <option value="press">Press & Media Query</option>
            <option value="legal">Legal & Compliance Notice</option>
          </select>
        </div>
        <div>
          <label className="block text-neutral-300 font-medium mb-1.5">Publisher ID / Network (Optional)</label>
          <input
            type="text"
            placeholder="e.g. FlexOffers ID, Impact SID"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-[#e51821]"
          />
        </div>
      </div>

      <div>
        <label className="block text-neutral-300 font-medium mb-1.5">Message / Inquiry Details *</label>
        <textarea
          rows={5}
          required
          placeholder="Please describe how we can assist you with your compliance review or inquiry..."
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-[#e51821]"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="px-6 py-3 bg-[#e51821] hover:bg-[#c9121a] text-white font-bold text-sm rounded-lg shadow-md shadow-red-950/40 flex items-center gap-2 transition-colors"
        >
          <Send className="w-4 h-4" />
          <span>Submit Inquiry</span>
        </button>
      </div>
    </form>
  );
}
