
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  data: { date: string; price: number }[];
  color?: string;
  period?: '1D' | '7D' | '30D' | '90D' | '1Y' | 'ALL';
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3">
        <p className="text-glow-cyan">{`Date: ${label}`}</p>
        <p className="text-white">{`Price: $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};

const PriceChart: React.FC<PriceChartProps> = ({ 
  data, 
  color = "#0BFFCF",
  period = '30D'
}) => {
  const minPrice = Math.min(...data.map(item => item.price)) * 0.95;
  const maxPrice = Math.max(...data.map(item => item.price)) * 1.05;

  // Customize X-axis tick formatting based on the period
  const getTickFormatter = () => {
    switch(period) {
      case '1D':
        // For 1 day, show hours
        return (tick: string) => {
          const date = new Date(tick);
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };
      case '7D':
      case '30D':
        // For 7 and 30 days, show month/day
        return (tick: string) => tick.substring(5);
      case '90D':
      case '1Y':
      case 'ALL':
        // For longer periods, show just month/year
        return (tick: string) => {
          const parts = tick.split('-');
          return `${parts[1]}/${parts[0].substring(2)}`;
        };
      default:
        return (tick: string) => tick.substring(5);
    }
  };

  return (
    <div className="w-full h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.5)"
            tickFormatter={getTickFormatter()}
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
          />
          <YAxis 
            domain={[minPrice, maxPrice]}
            stroke="rgba(255,255,255,0.5)"
            tickFormatter={(tick) => `$${tick.toFixed(0)}`}
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
