import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EnhancedPieChartProps {
  data: { comparto: string; count: number }[];
  colors?: string[];
}

const COLORS = [
  'hsl(180, 55%, 40%)',
  'hsl(45, 85%, 55%)',
  'hsl(210, 60%, 50%)',
  'hsl(280, 55%, 45%)',
  'hsl(160, 55%, 35%)',
  'hsl(350, 65%, 50%)',
  'hsl(25, 75%, 50%)',
];

const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={outerRadius + 12}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))',
          transition: 'all 0.3s ease'
        }}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 8}
        outerRadius={innerRadius - 4}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.4}
      />
      <text
        x={cx}
        y={cy - 12}
        textAnchor="middle"
        fill="hsl(var(--foreground))"
        fontSize="14"
        fontWeight="bold"
      >
        {value.toLocaleString()}
      </text>
      <text
        x={cx}
        y={cy + 8}
        textAnchor="middle"
        fill="hsl(var(--muted-foreground))"
        fontSize="11"
      >
        {(percent * 100).toFixed(1)}%
      </text>
    </g>
  );
};

const EnhancedPieChart: React.FC<EnhancedPieChartProps> = ({ data, colors = COLORS }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const totalValue = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {colors.map((color, index) => (
                <linearGradient key={`gradient-${index}`} id={`pieGradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="count"
              nameKey="comparto"
              activeIndex={activeIndex ?? undefined}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#pieGradient-${index % colors.length})`}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center total */}
        {activeIndex === null && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
              className="text-center"
            >
              <div className="text-xl font-bold text-foreground">
                {totalValue.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Totale</div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Legend */}
      <motion.div 
        className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } }
        }}
      >
        {data.map((item, i) => {
          const percentage = ((item.count / totalValue) * 100).toFixed(1);
          return (
            <TooltipProvider key={item.comparto} delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className={`flex items-center gap-2 text-xs p-1.5 rounded-md transition-all cursor-pointer ${
                      activeIndex === i ? 'bg-accent/50 scale-[1.02]' : 'hover:bg-accent/30'
                    }`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${colors[i % colors.length]}, ${colors[i % colors.length]}90)`,
                        boxShadow: activeIndex === i ? `0 0 8px ${colors[i % colors.length]}80` : 'none'
                      }}
                    />
                    <span className="text-muted-foreground truncate flex-1" title={item.comparto}>
                      {item.comparto.length > 16 ? item.comparto.substring(0, 14) + '...' : item.comparto}
                    </span>
                    <span className="font-medium text-foreground">{percentage}%</span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[250px]">
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">{item.comparto}</p>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p>Totale: {item.count.toLocaleString()}</p>
                      <p>Percentuale: {percentage}%</p>
                      <p>Rank: #{i + 1} di {data.length}</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </motion.div>
    </div>
  );
};

export default EnhancedPieChart;
