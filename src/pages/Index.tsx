
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptocurrencies } from '../services/cryptoService';
import Header from '../components/Header';
import TokenCard from '../components/TokenCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Rocket } from 'lucide-react';

const Index = () => {
  const { data: cryptocurrencies, isLoading, error } = useQuery({
    queryKey: ['cryptocurrencies'],
    queryFn: fetchCryptocurrencies,
  });

  const LoadingState = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="glass-panel p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full bg-space-light" />
              <div>
                <Skeleton className="h-4 w-24 bg-space-light mb-1" />
                <Skeleton className="h-3 w-12 bg-space-light" />
              </div>
            </div>
            <div className="text-right">
              <Skeleton className="h-6 w-24 bg-space-light mb-1" />
              <Skeleton className="h-4 w-16 bg-space-light" />
            </div>
          </div>
          <Skeleton className="h-4 w-full bg-space-light mt-4" />
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
            <h2 className="text-2xl text-red-500 mb-4">Error loading cryptocurrency data</h2>
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
            <Rocket className="h-6 w-6 text-glow-pink animate-pulse-glow" />
            <h1 className="text-2xl font-bold text-white">Top Cryptocurrencies</h1>
          </div>
          <p className="text-white/70">Real-time prices and stats for the top tokens by market cap</p>
        </div>
        
        {isLoading ? (
          <LoadingState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cryptocurrencies?.map((crypto) => (
              <TokenCard key={crypto.id} token={crypto} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
