import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Filter } from 'lucide-react';
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

const FILTER_OPTIONS = [
  { value: 5, label: 'Top 5' },
  { value: 10, label: 'Top 10' },
  { value: 15, label: 'Top 15' },
  { value: -1, label: 'Tutte' },
];

export function AdminTreemap({ data, maxItems = 10 }: AdminTreemapProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<number>(5);

  const processedData = useMemo(() => {
    const filteredData = selectedFilter === -1 ? data : data.slice(0, selectedFilter);
    const total = filteredData.reduce((acc, item) => acc + item.totale, 0);
    return filteredData.map((item, index) => ({
      ...item,
      percentage: ((item.totale / total) * 100).toFixed(1),
      color: COLORS[index % COLORS.length],
    }));
  }, [data, selectedFilter]);

  const totalSum = useMemo(() => 
    processedData.reduce((acc, item) => acc + item.totale, 0),
    [processedData]
  );

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Top Amministrazioni</h3>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(Number(e.target.value))}
              className="text-sm bg-background border border-border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {FILTER_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Distribuzione per amministrazione ({processedData.length} amministrazioni)
        </p>
      </div>

      {/* Treemap visualization */}
      <div className="grid grid-cols-3 gap-2 h-[240px] mb-6 rounded-lg overflow-hidden">
        {processedData.map((item, index) => (
          <motion.div
            key={item.amministrazione}
            className="relative cursor-pointer transition-all duration-300 rounded-md overflow-hidden"
            style={{ backgroundColor: item.color }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index }}
          >
            <div className="absolute inset-0 p-3 flex flex-col justify-between text-white h-full">
              <span className="font-medium text-xs leading-tight overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {item.amministrazione.length > 25 
                  ? item.amministrazione.substring(0, 25) + '...'
                  : item.amministrazione}
              </span>
              <div className="flex flex-col items-end">
                <span className="font-bold text-sm">
                  {item.percentage}%
                </span>
                <span className="text-xs opacity-90">
                  {new Intl.NumberFormat('it-IT').format(item.totale)}
                </span>
              </div>
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
                    <p className="text-sm font-bold">{new Intl.NumberFormat('it-IT').format(item.totale)}</p>
                    <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
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
            transition={{ delay: 0.02 * index }}
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
    </div>
  );
}