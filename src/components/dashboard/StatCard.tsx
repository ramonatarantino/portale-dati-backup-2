import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;

  /** Crescita percentuale MoM */
  trend?: number;

  delay?: number;
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const steps = 60;
          const stepValue = value / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            setDisplayValue(Math.min(Math.round(stepValue * step), value));
            if (step >= steps) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {new Intl.NumberFormat('it-IT').format(displayValue)}
    </span>
  );
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  delay = 0
}: StatCardProps) {
  const numericValue = typeof value === 'number' ? value : null;

  return (
    <motion.div
      className="apple-card p-6 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ y: -4 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>

          {/* TREND INDICATOR */}
          {trend !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full',
                trend > 0
                  ? 'bg-green-500/10 text-green-600'
                  : trend < 0
                  ? 'bg-red-500/10 text-red-600'
                  : 'bg-gray-500/10 text-gray-600'
              )}
            >
              {trend > 0 ? (
                <>
                  <ArrowUp className="w-3.5 h-3.5" />
                  +{trend.toFixed(1)}%
                </>
              ) : trend < 0 ? (
                <>
                  <ArrowDown className="w-3.5 h-3.5" />
                  {trend.toFixed(1)}%
                </>
              ) : (
                <span className="text-sm font-bold">=</span>
              )}
            </motion.div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <p className="text-4xl font-bold text-foreground tracking-tight">
            {numericValue !== null ? <AnimatedNumber value={numericValue} /> : value}
          </p>

          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}

          {trend !== undefined && (
            <p className="text-[11px] text-muted-foreground">
              rispetto al mese precedente
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
