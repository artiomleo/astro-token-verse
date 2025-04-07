
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptocurrencies } from '../services/cryptoService';
import { useWatchlist } from '../contexts/WatchlistContext';
import Header from '../components/Header';
import TokenCard from '../components/TokenCard';
import { Skeleton } from '@/components/ui/skeleton';
import { BookmarkCheck, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Watchlist = () => {
  const { watchlist } = useWatchlist();
  const { data: allCryptocurrencies, isLoading, error } = useQuery({
    queryKey: ['cryptocurrencies'],
    queryFn: fetchCryptocurrencies,
  });

  // Filter cryptocurrencies to only include those in the watchlist
  const watchlistTokens = allCryptocurrencies?.filter(crypto => 
    watchlist.includes(crypto.slug)
  ) || [];

  const LoadingState = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="glass-panel p-4">
          <Skeleton className="h-24 w-full bg-space-light" />
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4">
          <div className="glass-panel p-8 text-center">
            <h2 className="text-2xl text-red-500 mb-4">Error loading watchlist data</h2>
            <p className="text-white/70">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="container mx-auto px-4">
        <div className="glass-panel p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookmarkCheck className="h-6 w-6 text-glow-pink animate-pulse-glow" />
            <h1 className="text-2xl font-bold text-white">Your Watchlist</h1>
          </div>
          <p className="text-white/70">Keep track of your favorite tokens</p>
        </div>
        
        {isLoading ? (
          <LoadingState />
        ) : watchlistTokens.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlistTokens.map((crypto) => (
              <TokenCard key={crypto.id} token={crypto} />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Your watchlist is empty</h2>
            <p className="text-white/70 mb-6">
              Add tokens to your watchlist to keep track of your favorites
            </p>
            <Link to="/" className="futuristic-button inline-flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Browse Tokens
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Watchlist;
