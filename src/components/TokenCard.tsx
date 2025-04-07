
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Cryptocurrency, formatCurrency } from '../services/cryptoService';

interface TokenCardProps {
  token: Cryptocurrency;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  const isPositiveChange = token.percentChange24h >= 0;
  
  return (
    <Link to={`/token/${token.slug}`} className="token-card block">
      <div className="token-card-header">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-glow-cyan to-glow-purple flex items-center justify-center text-white font-bold text-xs">
            {token.symbol.substring(0, 2)}
          </div>
          <div>
            <h3 className="font-bold text-white">{token.name}</h3>
            <span className="text-sm text-white/60">{token.symbol}</span>
          </div>
        </div>
        <div className="text-right">
          <div className={`token-price ${isPositiveChange ? 'token-price-up' : 'token-price-down'}`}>
            {formatCurrency(token.price)}
          </div>
          <div className="flex items-center justify-end text-sm">
            <span className={`${isPositiveChange ? 'text-glow-cyan' : 'text-red-500'} mr-1`}>
              {isPositiveChange ? '+' : ''}{token.percentChange24h.toFixed(2)}%
            </span>
            {isPositiveChange ? (
              <TrendingUp className="h-4 w-4 text-glow-cyan" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 pt-2 border-t border-white/10">
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/60">Rank #{token.rank}</span>
          <span className="text-xs bg-space-light px-2 py-1 rounded-full text-white/80">
            Market Cap: {formatCurrency(token.marketCap)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TokenCard;
