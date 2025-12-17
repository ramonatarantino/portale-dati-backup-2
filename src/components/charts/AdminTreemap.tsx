import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { AggregatedByAdmin } from '@/types/data';
import { cn } from '@/lib/utils';

interface AdminTreemapProps {
  data: AggregatedByAdmin[];
  maxItems?: number;
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
];

export function AdminTreemap({ data, maxItems = 10 }: AdminTreemapProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const processedData = useMemo(() => {
    const total = data.reduce((acc, item) => acc + item.totale, 0);
    return data.slice(0, maxItems).map((item, index) => ({
      ...item,
      percentage: ((item.totale / total) * 100).toFixed(1),
      color: COLORS[index % COLORS.length],
    }));
  }, [data, maxItems]);

  const totalSum = useMemo(() => 
    processedData.reduce((acc, item) => acc + item.totale, 0),
    [processedData]
  );

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Top Amministrazioni</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Distribuzione per ente ({maxItems} principali)
        </p>
      </div>

      {/* Treemap visualization */}
      <div className="grid grid-cols-4 gap-1 h-[200px] mb-6 rounded-lg overflow-hidden">
        {processedData.slice(0, 8).map((item, index) => {
          const widthRatio = Math.max(item.totale / totalSum, 0.08);
          const isLarge = widthRatio > 0.15;
          
          return (
            <motion.div
              key={item.amministrazione}
              className={cn(
                'relative cursor-pointer transition-all duration-300 rounded-sm overflow-hidden',
                index < 2 ? 'col-span-2 row-span-2' : index < 4 ? 'col-span-2' : 'col-span-1'
              )}
              style={{ backgroundColor: item.color }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="absolute inset-0 p-2 flex flex-col justify-between text-white">
                <span className={cn(
                  'font-medium leading-tight',
                  isLarge ? 'text-xs' : 'text-[10px]'
                )}>
                  {item.amministrazione.length > (isLarge ? 40 : 20) 
                    ? item.amministrazione.substring(0, isLarge ? 40 : 20) + '...'
                    : item.amministrazione}
                </span>
                <span className={cn(
                  'font-bold',
                  isLarge ? 'text-lg' : 'text-sm'
                )}>
                  {item.percentage}%
                </span>
              </div>
              
              {/* Hover overlay */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-black/20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="bg-card text-card-foreground rounded-lg p-3 shadow-lg text-center max-w-[90%]">
                      <p className="text-xs font-medium truncate">{item.amministrazione}</p>
                      <p className="text-lg font-bold">{new Intl.NumberFormat('it-IT').format(item.totale)}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Legend list */}
      <div className="space-y-2 max-h-[180px] overflow-y-auto custom-scrollbar">
        {processedData.map((item, index) => (
          <motion.div
            key={item.amministrazione}
            className={cn(
              'flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer',
              hoveredIndex === index ? 'bg-muted' : 'hover:bg-muted/50'
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div 
                className="w-3 h-3 rounded-sm flex-shrink-0" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm truncate">{item.amministrazione}</span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs text-muted-foreground">
                {new Intl.NumberFormat('it-IT').format(item.totale)}
              </span>
              <span className="text-xs font-medium w-12 text-right">
                {item.percentage}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {data.length > maxItems && (
        <p className="text-xs text-muted-foreground text-center mt-4">
          + altre {data.length - maxItems} amministrazioni
        </p>
      )}
    </div>
  );
}