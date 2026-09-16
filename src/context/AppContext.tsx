'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { City, Showtime, Movie, WatchlistItem } from '@/types';
import { CITIES, CINEMAS } from '@/data/mockData';

interface AppContextType {
  currentCity: City;
  setCity: (city: City) => void;
  isCityModalOpen: boolean;
  setIsCityModalOpen: (open: boolean) => void;

  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  // Price comparison modal state
  comparisonShowtime: { showtime: Showtime; movie?: Movie; cinemaName: string } | null;
  openComparisonModal: (showtime: Showtime, movie?: Movie) => void;
  closeComparisonModal: () => void;

  // Seat map modal state
  seatMapShowtime: { showtime: Showtime; movie?: Movie; cinemaName: string } | null;
  openSeatMapModal: (showtime: Showtime, movie?: Movie) => void;
  closeSeatMapModal: () => void;

  // Trailer modal state
  activeTrailer: { youtubeId: string; title: string } | null;
  openTrailerModal: (youtubeId: string, title: string) => void;
  closeTrailerModal: () => void;

  // Price alert modal state
  alertTarget: { title: string; currentLowest: number } | null;
  openAlertModal: (title: string, currentLowest: number) => void;
  closeAlertModal: () => void;

  // Watchlist
  watchlist: WatchlistItem[];
  toggleWatchlist: (item: Omit<WatchlistItem, 'addedAt'>) => void;
  isItemInWatchlist: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentCity, setCurrentCity] = useState<City>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCityId = localStorage.getItem('bbs_city');
        if (savedCityId) {
          const found = CITIES.find((c) => c.id === savedCityId);
          if (found) return found;
        }
      } catch {}
    }
    return CITIES[0];
  });

  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [comparisonShowtime, setComparisonShowtime] = useState<{
    showtime: Showtime;
    movie?: Movie;
    cinemaName: string;
  } | null>(null);

  const [seatMapShowtime, setSeatMapShowtime] = useState<{
    showtime: Showtime;
    movie?: Movie;
    cinemaName: string;
  } | null>(null);

  const [activeTrailer, setActiveTrailer] = useState<{ youtubeId: string; title: string } | null>(null);
  const [alertTarget, setAlertTarget] = useState<{ title: string; currentLowest: number } | null>(null);

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedWatchlist = localStorage.getItem('bbs_watchlist');
        if (savedWatchlist) {
          return JSON.parse(savedWatchlist);
        }
      } catch {}
    }
    return [];
  });

  const setCity = (city: City) => {
    setCurrentCity(city);
    try {
      localStorage.setItem('bbs_city', city.id);
    } catch {}
    setIsCityModalOpen(false);
  };

  const openComparisonModal = (showtime: Showtime, movie?: Movie) => {
    const cinema = CINEMAS.find((c) => c.id === showtime.cinemaId);
    setComparisonShowtime({
      showtime,
      movie,
      cinemaName: cinema ? cinema.name : 'Selected Cinema',
    });
  };

  const closeComparisonModal = () => {
    setComparisonShowtime(null);
  };

  const openSeatMapModal = (showtime: Showtime, movie?: Movie) => {
    const cinema = CINEMAS.find((c) => c.id === showtime.cinemaId);
    setSeatMapShowtime({
      showtime,
      movie,
      cinemaName: cinema ? cinema.name : 'Selected Cinema',
    });
  };

  const closeSeatMapModal = () => {
    setSeatMapShowtime(null);
  };

  const openTrailerModal = (youtubeId: string, title: string) => {
    setActiveTrailer({ youtubeId, title });
  };

  const closeTrailerModal = () => {
    setActiveTrailer(null);
  };

  const openAlertModal = (title: string, currentLowest: number) => {
    setAlertTarget({ title, currentLowest });
  };

  const closeAlertModal = () => {
    setAlertTarget(null);
  };

  const toggleWatchlist = (item: Omit<WatchlistItem, 'addedAt'>) => {
    setWatchlist((prev) => {
      const exists = prev.some((w) => w.id === item.id);
      let updated: WatchlistItem[];
      if (exists) {
        updated = prev.filter((w) => w.id !== item.id);
      } else {
        updated = [...prev, { ...item, addedAt: Date.now() }];
      }
      try {
        localStorage.setItem('bbs_watchlist', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isItemInWatchlist = (id: string) => {
    return watchlist.some((w) => w.id === id);
  };

  // Keyboard shortcut Cmd/Ctrl + K for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        setComparisonShowtime(null);
        setSeatMapShowtime(null);
        setActiveTrailer(null);
        setAlertTarget(null);
        setIsCityModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentCity,
        setCity,
        isCityModalOpen,
        setIsCityModalOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        comparisonShowtime,
        openComparisonModal,
        closeComparisonModal,
        seatMapShowtime,
        openSeatMapModal,
        closeSeatMapModal,
        activeTrailer,
        openTrailerModal,
        closeTrailerModal,
        alertTarget,
        openAlertModal,
        closeAlertModal,
        watchlist,
        toggleWatchlist,
        isItemInWatchlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
