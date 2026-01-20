import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EnhancedBarChartProps {
  data: { inquadramento: string; count: number }[];
}

const GRADIENT_COLORS = [
  { start: 'hsl(210, 70%, 55%)', end: 'hsl(210, 60%, 45%)' },
  { start: 'hsl(180, 60%, 45%)', end: 'hsl(180, 50%, 35%)' },
  { start: 'hsl(45, 85%, 55%)', end: 'hsl(45, 75%, 45%)' },
  { start: 'hsl(280, 55%, 50%)', end: 'hsl(280, 45%, 40%)' },
  { start: 'hsl(160, 55%, 40%)', end: 'hsl(160, 45%, 30%)' },
  { start: 'hsl(350, 65%, 55%)', end: 'hsl(350, 55%, 45%)' },
  { start: 'hsl(25, 75%, 55%)', end: 'hsl(25, 65%, 45%)' },
  { start: 'hsl(120, 45%, 45%)', end: 'hsl(120, 35%, 35%)' },
];

const EnhancedBarChart: React.FC<EnhancedBarChartProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.map(d => d.count));
  const totalValue = data.reduce((sum, item) => sum + item.count, 0);

  const formatLabel = (value: string) => {
    if (value.length > 18) {
      return value.substring(0, 16) + '...';
    }
    return value;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Custom bar chart with animations */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto py-1 pb-2">
        {data.map((item, index) => {
          const percentage = (item.count / maxValue) * 100;
          const percentOfTotal = ((item.count / totalValue) * 100).toFixed(1);
          const isActive = activeIndex === index;
          const colors = GRADIENT_COLORS[index % GRADIENT_COLORS.length];

          return (
            <TooltipProvider key={item.inquadramento} delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className={`flex items-center gap-2 p-1.5 rounded-lg transition-all cursor-pointer ${
                      isActive ? 'bg-accent/40 scale-[1.01]' : 'hover:bg-accent/20'
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {/* Rank badge */}
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${colors.start}, ${colors.end})`,
                        boxShadow: isActive ? `0 0 12px ${colors.start}60` : 'none'
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Label and bar */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-xs text-muted-foreground truncate"
                          title={item.inquadramento}
                        >
                          {formatLabel(item.inquadramento)}
                        </span>
                        <span className="text-xs font-semibold text-foreground ml-2 flex-shrink-0">
                          {formatNumber(item.count)}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full relative"
                          style={{
                            background: `linear-gradient(90deg, ${colors.start}, ${colors.end})`
                          }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${percentage}%`,
                            boxShadow: isActive ? `0 0 8px ${colors.start}80` : 'none'
                          }}
                          transition={{
                            width: { delay: index * 0.05 + 0.2, duration: 0.6, ease: 'easeOut' },
                            boxShadow: { duration: 0.2 }
                          }}
                        >
                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 opacity-30"
                            style={{
                              background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)'
                            }}
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{
                              delay: index * 0.05 + 0.6,
                              duration: 0.8,
                              ease: 'easeOut'
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[250px]">
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">{item.inquadramento}</p>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p>Posizione: #{index + 1}</p>
                      <p>Totale: {item.count.toLocaleString()}</p>
                      <p>% sul totale: {percentOfTotal}%</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {/* Footer summary */}
      <motion.div
        className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-muted-foreground">
          {data.length} qualifiche visualizzate
        </span>
        <span className="font-medium text-foreground">
          Totale: {formatNumber(totalValue)}
        </span>
      </motion.div>
    </div>
  );
};

export default EnhancedBarChart;
