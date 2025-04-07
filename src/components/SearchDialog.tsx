
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptocurrencies } from '../services/cryptoService';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchDialog = ({ open, setOpen }: SearchDialogProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: cryptocurrencies } = useQuery({
    queryKey: ['cryptocurrencies'],
    queryFn: fetchCryptocurrencies,
  });
  
  const filteredTokens = cryptocurrencies?.filter((crypto) => {
    if (!searchQuery) return false;
    
    const query = searchQuery.toLowerCase();
    return (
      crypto.name.toLowerCase().includes(query) ||
      crypto.symbol.toLowerCase().includes(query) ||
      crypto.slug.toLowerCase().includes(query)
    );
  }) || [];
  
  const handleSelectToken = (slug: string) => {
    setOpen(false);
    navigate(`/token/${slug}`);
  };
  
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Search for tokens..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
        className="border-none focus:ring-0 outline-none bg-space/60"
      />
      <CommandList className="bg-space/90 backdrop-blur-md">
        <CommandEmpty className="py-6 text-center text-white/50">
          No tokens found.
        </CommandEmpty>
        {filteredTokens.length > 0 && (
          <CommandGroup heading="Tokens">
            {filteredTokens.map((token) => (
              <CommandItem
                key={token.id}
                className="flex items-center gap-2 px-4 py-3 text-white cursor-pointer hover:bg-space-light"
                onSelect={() => handleSelectToken(token.slug)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-glow-cyan to-glow-purple flex items-center justify-center text-white font-bold text-sm">
                    {token.symbol.substring(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium">{token.name}</p>
                    <p className="text-sm text-white/60">{token.symbol}</p>
                  </div>
                  <p className="ml-auto font-medium">
                    ${token.price.toFixed(2)}
                  </p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;
