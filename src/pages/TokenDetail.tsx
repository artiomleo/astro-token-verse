
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  fetchCryptocurrencyBySlug, 
  fetchHistoricalPriceData, 
  formatCurrency, 
  formatNumber 
} from '../services/cryptoService';
import Header from '../components/Header';
import PriceChart from '../components/PriceChart';
import TokenStat from '../components/TokenStat';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Clock, 
  Activity, 
  Layers, 
  Star, 
  Share2 
} from 'lucide-react';

const TokenDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: token, isLoading: isLoadingToken } = useQuery({
    queryKey: ['cryptocurrency', slug],
    queryFn: () => fetchCryptocurrencyBySlug(slug || ''),
    enabled: !!slug,
  });
  
  const { data: priceData, isLoading: isLoadingPriceData } = useQuery({
    queryKey: ['historicalPriceData', slug],
    queryFn: () => fetchHistoricalPriceData(slug || ''),
    enabled: !!slug,
  });
  
  const isLoading = isLoadingToken || isLoadingPriceData;
  
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4">
          <div className="glass-panel p-6 mb-8">
            <Skeleton className="h-8 w-48 bg-space-light mb-4" />
            <Skeleton className="h-6 w-32 bg-space-light" />
          </div>
          
          <div className="glass-panel p-6">
            <Skeleton className="h-64 w-full bg-space-light mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full bg-space-light" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!token) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4">
          <div className="glass-panel p-8 text-center">
            <h2 className="text-2xl text-red-500 mb-4">Token not found</h2>
            <Link to="/" className="futuristic-button">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const isPositiveChange = token.percentChange24h >= 0;
  
  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="container mx-auto px-4">
        <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all tokens</span>
        </Link>
        
        <div className="glass-panel p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-glow-cyan to-glow-purple flex items-center justify-center text-white font-bold text-xl">
                {token.symbol.substring(0, 2)}
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-white">{token.name}</h1>
                  <span className="text-lg text-white/60">{token.symbol}</span>
                </div>
                <p className="text-white/60">Rank #{token.rank} • {token.slug}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="text-3xl font-bold text-white">{formatCurrency(token.price)}</div>
              <div className="flex items-center text-lg">
                <span className={`${isPositiveChange ? 'text-glow-cyan' : 'text-red-500'} mr-2`}>
                  {isPositiveChange ? '+' : ''}{token.percentChange24h.toFixed(2)}%
                </span>
                {isPositiveChange ? (
                  <TrendingUp className="h-5 w-5 text-glow-cyan" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-panel p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-glow-purple" />
            Price Chart (30 Days)
          </h2>
          
          {priceData && <PriceChart data={priceData} color={isPositiveChange ? "#0BFFCF" : "#ef4444"} />}
          
          <div className="flex flex-wrap gap-2 mt-4 justify-end">
            <button className="px-3 py-1 bg-space-light rounded-full text-white/70 text-sm hover:bg-glow-cyan/20 transition-colors">
              1D
            </button>
            <button className="px-3 py-1 bg-space-light rounded-full text-white/70 text-sm hover:bg-glow-cyan/20 transition-colors">
              7D
            </button>
            <button className="px-3 py-1 bg-glow-cyan/20 rounded-full text-glow-cyan text-sm">
              30D
            </button>
            <button className="px-3 py-1 bg-space-light rounded-full text-white/70 text-sm hover:bg-glow-cyan/20 transition-colors">
              90D
            </button>
            <button className="px-3 py-1 bg-space-light rounded-full text-white/70 text-sm hover:bg-glow-cyan/20 transition-colors">
              1Y
            </button>
            <button className="px-3 py-1 bg-space-light rounded-full text-white/70 text-sm hover:bg-glow-cyan/20 transition-colors">
              ALL
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-panel p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-glow-purple" />
                Market Stats
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <TokenStat 
                  label="Market Cap" 
                  value={formatCurrency(token.marketCap)} 
                  icon={<DollarSign className="h-4 w-4" />}
                  highlight={true}
                />
                <TokenStat 
                  label="24h Volume" 
                  value={formatCurrency(token.volume24h)} 
                  icon={<BarChart3 className="h-4 w-4" />}
                />
                <TokenStat 
                  label="Circulating Supply" 
                  value={`${formatNumber(token.circulatingSupply)} ${token.symbol}`} 
                  icon={<Layers className="h-4 w-4" />}
                />
                <TokenStat 
                  label="Total Supply" 
                  value={`${formatNumber(token.totalSupply)} ${token.symbol}`} 
                  icon={<Layers className="h-4 w-4" />}
                />
                {token.maxSupply && (
                  <TokenStat 
                    label="Max Supply" 
                    value={`${formatNumber(token.maxSupply)} ${token.symbol}`} 
                    icon={<Layers className="h-4 w-4" />}
                  />
                )}
                <TokenStat 
                  label="Last Updated" 
                  value={new Date(token.lastUpdated).toLocaleString()} 
                  icon={<Clock className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="glass-panel p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-glow-pink" />
                Actions
              </h2>
              
              <div className="flex flex-col gap-4">
                <button className="futuristic-button w-full py-3 flex items-center justify-center gap-2">
                  <Star className="h-5 w-5" />
                  Add to Watchlist
                </button>
                
                <button className="w-full py-3 bg-space-light rounded-lg text-white hover:bg-space hover:shadow-glow-purple transition-all flex items-center justify-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>
            </div>
            
            <div className="glass-panel p-6">
              <h2 className="text-xl font-bold text-white mb-4">Price Change</h2>
              
              <div className="space-y-2">
                <TokenStat 
                  label="24h Change" 
                  value={`${isPositiveChange ? '+' : ''}${token.percentChange24h.toFixed(2)}%`} 
                  highlight={isPositiveChange}
                />
                <TokenStat 
                  label="7d Change" 
                  value={`${token.percentChange7d >= 0 ? '+' : ''}${token.percentChange7d.toFixed(2)}%`} 
                  highlight={token.percentChange7d >= 0}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TokenDetail;
