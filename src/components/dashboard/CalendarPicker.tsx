import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarPickerProps {
  selectedYear: number | null;
  selectedMonth: number | null;
  availableYears: number[];
  availableMonths: number[];
  onSelect: (year: number, month: number) => void;
  dataByMonthYear?: Record<string, unknown>;
}

const MONTHS = [
  'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu',
  'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'
];

const MONTH_NAMES = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

export function CalendarPicker({
  selectedYear,
  selectedMonth,
  availableYears,
  availableMonths,
  onSelect,
  dataByMonthYear = {}
}: CalendarPickerProps) {
  const currentDate = new Date();
  const [viewYear, setViewYear] = useState(selectedYear || currentDate.getFullYear());
  
  const sortedYears = useMemo(() => 
    [...availableYears].sort((a, b) => b - a), 
    [availableYears]
  );

  const minYear = sortedYears.length > 0 ? Math.min(...sortedYears) : currentDate.getFullYear() - 5;
  const maxYear = sortedYears.length > 0 ? Math.max(...sortedYears) : currentDate.getFullYear();

  const isMonthAvailable = (month: number) => {
    if (availableMonths.length === 0) return true;
    return availableMonths.includes(month);
  };

  const hasDataForMonth = (year: number, month: number) => {
    const key = `${year}-${month.toString().padStart(2, '0')}`;
    return !!dataByMonthYear[key];
  };

  const handlePrevYear = () => {
    if (viewYear > minYear) {
      setViewYear(viewYear - 1);
    }
  };

  const handleNextYear = () => {
    if (viewYear < maxYear) {
      setViewYear(viewYear + 1);
    }
  };

  const handleMonthClick = (monthIndex: number) => {
    if (isMonthAvailable(monthIndex + 1)) {
      onSelect(viewYear, monthIndex + 1);
    }
  };

  const isSelected = (monthIndex: number) => {
    return selectedYear === viewYear && selectedMonth === monthIndex + 1;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="apple-card p-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-gold/10 border border-gold/20">
          <Calendar className="w-4 h-4 text-gold-dark" />
        </div>
        <div>
          <h3 className="font-semibold text-base text-gold-dark">Navigazione Temporale</h3>
          <p className="text-xs text-muted-foreground">
            {selectedYear && selectedMonth 
              ? `${MONTH_NAMES[selectedMonth - 1]} ${selectedYear}`
              : 'Seleziona un periodo'
            }
          </p>
        </div>
      </div>

      {/* Year Navigation */}
      <div className="flex items-center justify-between mb-4 px-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevYear}
          disabled={viewYear <= minYear}
          className={cn(
            "p-2 rounded-xl transition-colors",
            viewYear <= minYear 
              ? "text-muted-foreground/30 cursor-not-allowed" 
              : "hover:bg-gold/10 text-foreground"
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.span
            key={viewYear}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-xl font-bold tabular-nums text-gold-dark"
          >
            {viewYear}
          </motion.span>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextYear}
          disabled={viewYear >= maxYear}
          className={cn(
            "p-2 rounded-xl transition-colors",
            viewYear >= maxYear 
              ? "text-muted-foreground/30 cursor-not-allowed" 
              : "hover:bg-gold/10 text-foreground"
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-4 gap-2">
        {MONTHS.map((month, index) => {
          const available = isMonthAvailable(index + 1);
          const selected = isSelected(index);
          const hasData = hasDataForMonth(viewYear, index + 1);
          
          return (
            <motion.button
              key={month}
              whileHover={available ? { scale: 1.05 } : {}}
              whileTap={available ? { scale: 0.95 } : {}}
              onClick={() => handleMonthClick(index)}
              disabled={!available}
              className={cn(
                "relative py-3 px-2 rounded-xl text-sm font-medium transition-all duration-300",
                selected && "bg-primary text-primary-foreground shadow-lg shadow-primary/25",
                !selected && hasData && "bg-accent/20 text-foreground border border-accent/40 hover:bg-accent/30",
                !selected && available && !hasData && "hover:bg-secondary text-foreground",
                !available && "text-muted-foreground/30 cursor-not-allowed"
              )}
            >
              {selected && (
                <motion.div
                  layoutId="selectedMonth"
                  className="absolute inset-0 bg-gold rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={cn("relative z-10", selected && "text-white font-semibold")}>{month}</span>
              {hasData && !selected && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Quick Year Selection */}
      {sortedYears.length > 1 && (
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">Anni disponibili</p>
          <div className="flex flex-wrap gap-2">
            {sortedYears.slice(0, 6).map(year => (
              <motion.button
                key={year}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewYear(year)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  viewYear === year 
                    ? "bg-gold/10 text-gold-dark border border-gold/20" 
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}