'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ShowScoutResult } from '@/services/ai';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Ticket,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Flame,
  Calendar,
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  data?: ShowScoutResult;
}

const DEFAULT_SUGGESTIONS = [
  'Tickets for movies in IMAX tonight',
  'Coldplay stadium tour tickets',
  'Date night showtimes under $20',
  'Best showtimes for Dune: Part Two',
];

export function ShowScoutModal() {
  const { isShowScoutOpen, closeShowScout, openComparisonModal } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello! I am ShowScout, your AI cinema and live entertainment concierge. Ask me for movie showtimes, IMAX seating, or live concert ticket rates across Ticketmaster, SeatGeek, and AMC.',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isShowScoutOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isShowScoutOpen]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isShowScoutOpen) return null;

  const handleSend = async (userPrompt?: string) => {
    const prompt = (userPrompt || inputValue).trim();
    if (!prompt || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: userMessageId, sender: 'user', text: prompt },
    ]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });
      const data: ShowScoutResult = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: data.reply || 'Here is what I found for you:',
          data,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: "I'm having a brief issue connecting to the live showtimes engine. Please try picking one of the suggested categories below!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ShowScout AI Concierge"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0b0d13] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col h-[680px] max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-[#e51821] text-white flex items-center justify-center shadow-lg shadow-red-950/50">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">ShowScout AI</h2>
                <span className="px-2 py-0.5 rounded-full bg-red-950/70 border border-red-500/40 text-[10px] font-bold text-red-300 uppercase tracking-wider">
                  Concierge
                </span>
              </div>
              <p className="text-sm text-neutral-400">
                Live movie showtimes, concert tickets & optimal seat guidance
              </p>
            </div>
          </div>

          <button
            onClick={closeShowScout}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close ShowScout AI"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-neutral-800">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#e51821] text-white rounded-br-none shadow-md shadow-red-950/30 font-medium'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>

                {/* Rich Matched Movies */}
                {msg.data?.matchedMovies && msg.data.matchedMovies.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-neutral-800/80 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Recommended Movies
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.data.matchedMovies.map((movie) => (
                        <Link
                          key={movie.id}
                          href={`/movie/${movie.slug}`}
                          onClick={closeShowScout}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-950/70 border border-neutral-800 hover:border-[#e51821]/50 transition-colors group"
                        >
                          <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="w-10 h-14 rounded object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-bold text-white group-hover:text-red-400 truncate">
                              {movie.title}
                            </h4>
                            <p className="text-xs text-neutral-300 truncate mt-0.5">
                              From ${movie.lowestPrice.toFixed(2)} • {movie.certificateRating}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rich Matched Events */}
                {msg.data?.matchedEvents && msg.data.matchedEvents.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-neutral-800/80 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Live Stadium & Tour Dates
                    </p>
                    <div className="space-y-2">
                      {msg.data.matchedEvents.map((event) => (
                        <Link
                          key={event.id}
                          href={`/event/${event.slug}`}
                          onClick={closeShowScout}
                          className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 hover:border-[#e51821]/50 transition-colors group"
                        >
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-white group-hover:text-red-400 truncate">
                              {event.title}
                            </h4>
                            <p className="text-xs text-neutral-300 flex items-center gap-1.5 mt-0.5">
                              <Calendar className="w-3.5 h-3.5 text-[#e51821]" />
                              <span>{event.date} • {event.venueCity}</span>
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs text-neutral-400 block">From</span>
                            <span className="text-sm font-bold text-white">${event.minPrice.toFixed(2)}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Showtimes Pills */}
                {msg.data?.matchedShowtimes && msg.data.matchedShowtimes.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-neutral-800/80 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Upcoming Showtimes
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {msg.data.matchedShowtimes.map((st, idx) => (
                        <Link
                          key={idx}
                          href={st.bookingUrl}
                          onClick={closeShowScout}
                          className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-[#e51821] text-xs sm:text-sm font-medium text-neutral-200 hover:text-white transition-colors"
                        >
                          <strong className="text-white font-bold">{st.time}</strong> ({st.format}) — ${st.lowestPrice.toFixed(2)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Followups */}
                {msg.data?.suggestedActions && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {msg.data.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(action)}
                        className="px-2.5 py-1.5 rounded-md bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-neutral-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl rounded-bl-none bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse delay-100" />
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse delay-200" />
                <span className="text-sm ml-1 text-neutral-300">Searching live entertainment feeds...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 border-t border-neutral-800/60 bg-neutral-950/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold shrink-0">
            Suggested:
          </span>
          {DEFAULT_SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs sm:text-sm font-medium shrink-0 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask for showtimes, formats, or live concert prices..."
            className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-[#e51821] rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-400 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-[#e51821] hover:bg-[#c9121a] disabled:opacity-50 text-white font-bold text-sm flex items-center gap-1.5 shadow-md shadow-red-950/40 transition-colors shrink-0"
            aria-label="Send message"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
