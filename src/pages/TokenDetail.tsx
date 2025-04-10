
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  fetchCryptocurrencyBySlug, 
  fetchHistoricalPriceData, 
  formatCurrency, 
  formatNumber 
} from '../services/cryptoService';
import { useWatchlist } from '../contexts/WatchlistContext';
import Header from '../components/Header';
import PriceChart from '../components/PriceChart';
import TokenStat from '../components/TokenStat';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from '@/components/ui/toggle';
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
  Share2,
  BookmarkPlus,
  BookmarkCheck,
  BookmarkX
} from 'lucide-react';

type ChartPeriod = '1D' | '7D' | '30D' | '90D' | '1Y' | 'ALL';

const TokenDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('30D');
  
  const { data: token, isLoading: isLoadingToken } = useQuery({
    queryKey: ['cryptocurrency', slug],
    queryFn: () => fetchCryptocurrencyBySlug(slug || ''),
    enabled: !!slug,
  });
  
  const { data: priceData, isLoading: isLoadingPriceData } = useQuery({
    queryKey: ['historicalPriceData', slug, chartPeriod],
    queryFn: () => fetchHistoricalPriceData(slug || '', chartPeriod),
    enabled: !!slug,
  });
  
  const isLoading = isLoadingToken || isLoadingPriceData;
  
  const handleWatchlistToggle = () => {
    if (!slug) return;
    
    if (isInWatchlist(slug)) {
      removeFromWatchlist(slug);
      toast({
        title: "Removed from watchlist",
        description: `${token?.name || 'Token'} has been removed from your watchlist`,
        variant: "default",
      });
    } else {
      addToWatchlist(slug);
      toast({
        title: "Added to watchlist",
        description: `${token?.name || 'Token'} has been added to your watchlist`,
        variant: "default",
      });
    }
  };

  const handleShare = () => {
    if (!token) return;
    
    if (navigator.share) {
      navigator.share({
        title: `${token.name} (${token.symbol}) - AstroToken Verse`,
        text: `Check out ${token.name} price: ${formatCurrency(token.price)} | 24h change: ${token.percentChange24h.toFixed(2)}%`,
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Shared successfully",
          description: `You've shared ${token.name} with others`,
          variant: "default",
        });
      })
      .catch((error) => {
        console.error('Error sharing:', error);
        handleFallbackShare();
      });
    } else {
      handleFallbackShare();
    }
  };
  
  const handleFallbackShare = () => {
    if (!token) return;
    
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast({
          title: "Link copied to clipboard",
          description: `Share this link with others to view ${token.name}`,
          variant: "default",
        });
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        toast({
          title: "Unable to copy link",
          description: "Please manually copy the URL from your browser",
          variant: "destructive",
        });
      });
  };
  
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
  
  const isPositiveChange = token?.percentChange24h >= 0;
  const isTokenInWatchlist = slug ? isInWatchlist(slug) : false;
  
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
            Price Chart ({chartPeriod})
          </h2>
          
          {priceData && 
            <PriceChart 
              data={priceData} 
              color={isPositiveChange ? "#0BFFCF" : "#ef4444"} 
              period={chartPeriod}
            />
          }
          
          <div className="flex flex-wrap gap-2 mt-4 justify-end">
            {(['1D', '7D', '30D', '90D', '1Y', 'ALL'] as ChartPeriod[]).map((period) => (
              <Toggle
                key={period}
                pressed={chartPeriod === period}
                onPressedChange={() => setChartPeriod(period)}
                className={`px-3 py-1 rounded-full text-sm ${
                  chartPeriod === period
                    ? 'bg-glow-cyan/20 text-glow-cyan'
                    : 'bg-space-light text-white/70 hover:bg-glow-cyan/20'
                } transition-colors`}
              >
                {period}
              </Toggle>
            ))}
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
                <Button 
                  onClick={handleWatchlistToggle}
                  className={`w-full py-3 flex items-center justify-center gap-2 ${
                    isTokenInWatchlist ? 'bg-glow-purple hover:bg-glow-purple/80' : 'futuristic-button'
                  }`}
                >
                  {isTokenInWatchlist ? (
                    <>
                      <BookmarkCheck className="h-5 w-5" />
                      Remove from Watchlist
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="h-5 w-5" />
                      Add to Watchlist
                    </>
                  )}
                </Button>
                
                <button 
                  className="w-full py-3 bg-space-light rounded-lg text-white hover:bg-space hover:shadow-glow-purple transition-all flex items-center justify-center gap-2"
                  onClick={handleShare}
                >
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
