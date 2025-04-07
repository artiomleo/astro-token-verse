
import { toast } from "sonner";

// Types for our cryptocurrency data
export interface Cryptocurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  price: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
  rank: number;
  lastUpdated: string;
}

// Function to fetch all cryptocurrencies from CoinGecko
export const fetchCryptocurrencies = async (): Promise<Cryptocurrency[]> => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h,7d"
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch cryptocurrency data");
    }
    
    const data = await response.json();
    
    // Transform CoinGecko data to match our interface
    return data.map((coin: any, index: number) => ({
      id: coin.id, 
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      slug: coin.id,
      price: coin.current_price,
      percentChange24h: coin.price_change_percentage_24h || 0,
      percentChange7d: coin.price_change_percentage_7d_in_currency || 0,
      marketCap: coin.market_cap,
      volume24h: coin.total_volume,
      circulatingSupply: coin.circulating_supply,
      totalSupply: coin.total_supply || coin.circulating_supply,
      maxSupply: coin.max_supply,
      rank: index + 1,
      lastUpdated: coin.last_updated
    }));
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    toast.error("Failed to fetch cryptocurrency data. Using sample data instead.");
    // Fall back to sample data in case of error
    return sampleCryptos;
  }
};

// Function to fetch a specific cryptocurrency by slug (coingecko id)
export const fetchCryptocurrencyBySlug = async (slug: string): Promise<Cryptocurrency | undefined> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${slug}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch cryptocurrency details");
    }
    
    const coin = await response.json();
    
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      slug: coin.id,
      price: coin.market_data.current_price.usd,
      percentChange24h: coin.market_data.price_change_percentage_24h || 0,
      percentChange7d: coin.market_data.price_change_percentage_7d || 0,
      marketCap: coin.market_data.market_cap.usd,
      volume24h: coin.market_data.total_volume.usd,
      circulatingSupply: coin.market_data.circulating_supply,
      totalSupply: coin.market_data.total_supply || coin.market_data.circulating_supply,
      maxSupply: coin.market_data.max_supply,
      rank: coin.market_cap_rank,
      lastUpdated: coin.last_updated
    };
  } catch (error) {
    console.error("Error fetching cryptocurrency details:", error);
    toast.error("Failed to fetch cryptocurrency details");
    
    // Fall back to sample data in case of error
    return sampleCryptos.find(c => c.slug === slug);
  }
};

// Historical price data from CoinGecko
export const fetchHistoricalPriceData = async (slug: string): Promise<{date: string, price: number}[]> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=usd&days=30&interval=daily`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch historical price data");
    }
    
    const data = await response.json();
    
    // Transform the data format
    return data.prices.map((item: [number, number]) => {
      const [timestamp, price] = item;
      const date = new Date(timestamp).toISOString().split('T')[0];
      return { date, price };
    });
  } catch (error) {
    console.error("Error fetching historical data:", error);
    toast.error("Failed to fetch historical price data");
    
    // Fall back to mock data generation in case of error
    const basePrice = sampleCryptos.find(c => c.slug === slug)?.price || 100;
    
    const dates = Array.from({length: 30}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });
    
    return dates.map((date, i) => {
      const randomFactor = 0.9 + (Math.random() * 0.2);
      const trendFactor = 1 + (i / 100);
      const price = basePrice * randomFactor * trendFactor;
      
      return { date, price };
    });
  }
};

// Utility functions
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  } else {
    return value.toString();
  }
};

// Sample data as fallback when API fails
const sampleCryptos: Cryptocurrency[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    slug: "bitcoin",
    price: 61245.32,
    percentChange24h: 2.15,
    percentChange7d: 5.64,
    marketCap: 1203845938253,
    volume24h: 32584729353,
    circulatingSupply: 19650000,
    totalSupply: 21000000,
    maxSupply: 21000000,
    rank: 1,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 1027,
    name: "Ethereum",
    symbol: "ETH",
    slug: "ethereum",
    price: 3059.87,
    percentChange24h: -1.23,
    percentChange7d: 3.42,
    marketCap: 367892173522,
    volume24h: 18473927462,
    circulatingSupply: 120250000,
    totalSupply: 120250000,
    maxSupply: null,
    rank: 2,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 5426,
    name: "Solana",
    symbol: "SOL",
    slug: "solana",
    price: 146.32,
    percentChange24h: 3.75,
    percentChange7d: 12.89,
    marketCap: 63743298173,
    volume24h: 2734829353,
    circulatingSupply: 435623120,
    totalSupply: 555623120,
    maxSupply: null,
    rank: 3,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 52,
    name: "XRP",
    symbol: "XRP",
    slug: "xrp",
    price: 0.5487,
    percentChange24h: -0.78,
    percentChange7d: 1.23,
    marketCap: 29376284912,
    volume24h: 1324567890,
    circulatingSupply: 53500000000,
    totalSupply: 100000000000,
    maxSupply: 100000000000,
    rank: 4,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 2010,
    name: "Cardano",
    symbol: "ADA",
    slug: "cardano",
    price: 0.4231,
    percentChange24h: 1.05,
    percentChange7d: -2.43,
    marketCap: 14978342567,
    volume24h: 534678901,
    circulatingSupply: 35380000000,
    totalSupply: 45000000000,
    maxSupply: 45000000000,
    rank: 5,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 3408,
    name: "USD Coin",
    symbol: "USDC",
    slug: "usd-coin",
    price: 1.0002,
    percentChange24h: 0.01,
    percentChange7d: 0.05,
    marketCap: 32567890123,
    volume24h: 2134567890,
    circulatingSupply: 32563000000,
    totalSupply: 32563000000,
    maxSupply: null,
    rank: 6,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 1839,
    name: "Binance Coin",
    symbol: "BNB",
    slug: "binance-coin",
    price: 562.78,
    percentChange24h: 2.34,
    percentChange7d: 5.12,
    marketCap: 85432987654,
    volume24h: 1243567890,
    circulatingSupply: 151784293,
    totalSupply: 166801148,
    maxSupply: 166801148,
    rank: 7,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 3717,
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    slug: "wrapped-bitcoin",
    price: 61243.75,
    percentChange24h: 2.14,
    percentChange7d: 5.62,
    marketCap: 12584739283,
    volume24h: 243567890,
    circulatingSupply: 205482,
    totalSupply: 205482,
    maxSupply: 205482,
    rank: 8,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 5994,
    name: "Shiba Inu",
    symbol: "SHIB",
    slug: "shiba-inu",
    price: 0.00001823,
    percentChange24h: 4.56,
    percentChange7d: 15.34,
    marketCap: 10752498365,
    volume24h: 543216789,
    circulatingSupply: 589658734827385,
    totalSupply: 999982123641241,
    maxSupply: null,
    rank: 9,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 74,
    name: "Dogecoin",
    symbol: "DOGE",
    slug: "dogecoin",
    price: 0.1234,
    percentChange24h: 6.78,
    percentChange7d: 9.87,
    marketCap: 16745324897,
    volume24h: 987654321,
    circulatingSupply: 135762489652,
    totalSupply: 135762489652,
    maxSupply: null,
    rank: 10,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 3890,
    name: "Polygon",
    symbol: "MATIC",
    slug: "polygon",
    price: 0.6735,
    percentChange24h: -2.45,
    percentChange7d: -4.12,
    marketCap: 6524897634,
    volume24h: 432156789,
    circulatingSupply: 9693426981,
    totalSupply: 10000000000,
    maxSupply: 10000000000,
    rank: 11,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 5805,
    name: "Avalanche",
    symbol: "AVAX",
    slug: "avalanche",
    price: 32.56,
    percentChange24h: 3.67,
    percentChange7d: 7.89,
    marketCap: 11765432198,
    volume24h: 432156789,
    circulatingSupply: 361515108,
    totalSupply: 720000000,
    maxSupply: 720000000,
    rank: 12,
    lastUpdated: new Date().toISOString()
  }
];
