import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AdministrationChartProps {
  data: { amministrazione: string; count: number }[];
  title?: string;
}

const GRADIENT_COLORS = [
  { start: 'hsl(220, 70%, 50%)', end: 'hsl(220, 60%, 40%)' },
  { start: 'hsl(200, 65%, 45%)', end: 'hsl(200, 55%, 35%)' },
  { start: 'hsl(180, 55%, 40%)', end: 'hsl(180, 45%, 30%)' },
  { start: 'hsl(160, 50%, 38%)', end: 'hsl(160, 40%, 28%)' },
  { start: 'hsl(140, 45%, 35%)', end: 'hsl(140, 35%, 25%)' },
  { start: 'hsl(260, 50%, 50%)', end: 'hsl(260, 40%, 40%)' },
  { start: 'hsl(280, 45%, 48%)', end: 'hsl(280, 35%, 38%)' },
  { start: 'hsl(300, 40%, 45%)', end: 'hsl(300, 30%, 35%)' },
];

const AdministrationChart: React.FC<AdministrationChartProps> = ({ data, title = "Top Amministrazioni" }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const maxValue = Math.max(...data.map(d => d.count));
  const totalValue = data.reduce((sum, item) => sum + item.count, 0);

  const formatLabel = (value: string) => {
    // Abbreviate long names
    const abbreviations: Record<string, string> = {
      'AGENZIA DELLE ENTRATE': 'Ag. Entrate',
      'AGENZIA DELLE DOGANE': 'Ag. Dogane',
      "MINISTERO DELL'INTERNO": 'Min. Interno',
      "MINISTERO DELL'ECONOMIA E FINANZE": 'Min. Economia',
      'MINISTERO DELLA GIUSTIZIA': 'Min. Giustizia',
      'MINISTERO DELLA DIFESA': 'Min. Difesa',
      'MINISTERO DELLA SALUTE': 'Min. Salute',
    };
    
    if (abbreviations[value]) return abbreviations[value];
    if (value.length > 20) return value.substring(0, 18) + '...';
    return value;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with icon */}
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Building2 className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-medium text-foreground">{title}</span>
      </div>

      {/* Horizontal bar chart */}
      <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto pb-2">
        {data.slice(0, 6).map((item, index) => {
          const percentage = (item.count / maxValue) * 100;
          const percentOfTotal = ((item.count / totalValue) * 100).toFixed(1);
          const isActive = activeIndex === index;
          const colors = GRADIENT_COLORS[index % GRADIENT_COLORS.length];

          return (
            <TooltipProvider key={item.amministrazione} delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-all cursor-pointer ${
                      isActive ? 'bg-accent/50 scale-[1.01]' : 'hover:bg-accent/30'
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {/* Rank number */}
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${colors.start}, ${colors.end})`,
                        boxShadow: isActive ? `0 0 12px ${colors.start}60` : 'none'
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Label and bar container */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="text-xs font-medium text-foreground truncate"
                          title={item.amministrazione}
                        >
                          {formatLabel(item.amministrazione)}
                        </span>
                        <motion.span 
                          className="text-xs font-bold ml-2 flex-shrink-0"
                          style={{ color: colors.start }}
                          animate={{ scale: isActive ? 1.1 : 1 }}
                        >
                          {formatNumber(item.count)}
                        </motion.span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-2.5 bg-muted/40 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full relative"
                          style={{
                            background: `linear-gradient(90deg, ${colors.start}, ${colors.end})`
                          }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${percentage}%`,
                            boxShadow: isActive ? `0 0 10px ${colors.start}70` : 'none'
                          }}
                          transition={{
                            width: { delay: index * 0.08 + 0.2, duration: 0.6, ease: 'easeOut' },
                            boxShadow: { duration: 0.2 }
                          }}
                        >
                          {/* Animated shine */}
                          <motion.div
                            className="absolute inset-0 opacity-40"
                            style={{
                              background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)'
                            }}
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{
                              delay: index * 0.08 + 0.7,
                              duration: 0.6,
                              ease: 'easeOut'
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[280px]">
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">{item.amministrazione}</p>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p>Posizione: #{index + 1}</p>
                      <p>Personale: {item.count.toLocaleString()}</p>
                      <p>% sul totale: {percentOfTotal}%</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {/* Footer with total */}
      <motion.div
        className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span className="text-muted-foreground">
          {data.length} amministrazioni totali
        </span>
        <span className="font-semibold text-foreground">
          Totale: {formatNumber(totalValue)}
        </span>
      </motion.div>
    </div>
  );
};

export default AdministrationChart;
