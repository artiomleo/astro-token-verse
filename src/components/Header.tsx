
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Zap } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass-panel mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold mb-4 sm:mb-0">
            <Zap className="h-8 w-8 text-glow-cyan animate-pulse-glow" />
            <span className="neon-text">AstroToken Verse</span>
          </Link>
          
          <div className="flex w-full sm:w-auto gap-4 items-center">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search tokens..."
                className="w-full bg-space/60 rounded-lg border border-glow-purple/30 py-2 px-4 pr-10 text-white placeholder-white/50 focus:outline-none focus:border-glow-cyan focus:ring-1 focus:ring-glow-cyan"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
            </div>
            
            <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer" className="futuristic-button hidden sm:block">
              Data: CoinGecko
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
