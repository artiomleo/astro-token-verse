
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Zap, BookmarkCheck } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import SearchDialog from './SearchDialog';

const Header = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <header className="glass-panel mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold mb-4 sm:mb-0">
            <Zap className="h-8 w-8 text-glow-cyan animate-pulse-glow" />
            <span className="neon-text">AstroToken Verse</span>
          </Link>
          
          <div className="flex w-full sm:w-auto gap-4 items-center">
            <NavigationMenu className="hidden sm:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={`${navigationMenuTriggerStyle()} ${location.pathname === '/' ? 'bg-accent/50' : ''}`}>
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/watchlist" className={`${navigationMenuTriggerStyle()} ${location.pathname === '/watchlist' ? 'bg-accent/50' : ''} flex items-center gap-2`}>
                    <BookmarkCheck className="h-4 w-4" />
                    Watchlist
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div 
              className="relative w-full sm:w-64 cursor-pointer" 
              onClick={() => setSearchOpen(true)}
            >
              <div className="w-full bg-space/60 rounded-lg border border-glow-purple/30 py-2 px-4 pr-10 text-white placeholder-white/50 focus:outline-none focus:border-glow-cyan focus:ring-1 focus:ring-glow-cyan flex items-center">
                <Search className="h-5 w-5 text-white/50 mr-2" />
                <span className="text-white/50">Search tokens...</span>
              </div>
            </div>
            
            <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer" className="futuristic-button hidden sm:block">
              Data: CoinGecko
            </a>
          </div>
        </div>
        
        {/* Mobile navigation */}
        <div className="sm:hidden flex justify-center mt-4 border-t border-white/10 pt-4">
          <Link to="/" className={`px-4 py-2 ${location.pathname === '/' ? 'text-glow-cyan' : 'text-white/70'}`}>
            Home
          </Link>
          <Link to="/watchlist" className={`px-4 py-2 flex items-center gap-1 ${location.pathname === '/watchlist' ? 'text-glow-cyan' : 'text-white/70'}`}>
            <BookmarkCheck className="h-4 w-4" />
            Watchlist
          </Link>
        </div>
      </div>
      
      <SearchDialog open={searchOpen} setOpen={setSearchOpen} />
    </header>
  );
};

export default Header;
