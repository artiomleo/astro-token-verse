
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cryptocurrency } from '../services/cryptoService';

interface WatchlistContextType {
  watchlist: string[]; // Array of token slugs
  addToWatchlist: (slug: string) => void;
  removeFromWatchlist: (slug: string) => void;
  isInWatchlist: (slug: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem('cryptoWatchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem('cryptoWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (slug: string) => {
    if (!watchlist.includes(slug)) {
      setWatchlist([...watchlist, slug]);
    }
  };

  const removeFromWatchlist = (slug: string) => {
    setWatchlist(watchlist.filter(item => item !== slug));
  };

  const isInWatchlist = (slug: string) => {
    return watchlist.includes(slug);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
