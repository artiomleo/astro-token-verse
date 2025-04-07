
import React from 'react';

interface TokenStatProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  highlight?: boolean;
}

const TokenStat: React.FC<TokenStatProps> = ({ label, value, icon, highlight = false }) => {
  return (
    <div className={`token-detail ${highlight ? 'border-glow-cyan/30' : 'border-white/10'}`}>
      <div className="flex items-center gap-2">
        {icon && <div className="text-glow-cyan">{icon}</div>}
        <span className="text-white/70">{label}</span>
      </div>
      <span className={`font-bold ${highlight ? 'text-glow-cyan' : 'text-white'}`}>{value}</span>
    </div>
  );
};

export default TokenStat;
