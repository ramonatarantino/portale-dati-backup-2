import { motion } from 'framer-motion';
import { Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TemporalFilterProps {
  selectedYear: number | null;
  selectedMonth: number | null;
  availableYears: number[];
  availableMonths: number[];
  onYearChange: (year: number | null) => void;
  onMonthChange: (month: number | null) => void;
}

const MONTH_NAMES = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

export function TemporalFilter({
  selectedYear,
  selectedMonth,
  availableYears,
  availableMonths,
  onYearChange,
  onMonthChange,
}: TemporalFilterProps) {
  const hasTemporalFilters = selectedYear !== null || selectedMonth !== null;

  const clearTemporalFilters = () => {
    onYearChange(null);
    onMonthChange(null);
  };

  if (availableYears.length === 0 && availableMonths.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="apple-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Filtri Temporali</h3>
        </div>
        {hasTemporalFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearTemporalFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {availableYears.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Anno</label>
            <Select
              value={selectedYear?.toString() || 'all'}
              onValueChange={(value) => onYearChange(value === 'all' ? null : parseInt(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tutti gli anni" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti gli anni</SelectItem>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {availableMonths.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Mese</label>
            <Select
              value={selectedMonth?.toString() || 'all'}
              onValueChange={(value) => onMonthChange(value === 'all' ? null : parseInt(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tutti i mesi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i mesi</SelectItem>
                {availableMonths.map((month) => (
                  <SelectItem key={month} value={month.toString()}>
                    {MONTH_NAMES[month - 1]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {hasTemporalFilters && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 px-4 py-3 rounded-2xl bg-primary/5 border border-primary/20"
        >
          <p className="text-sm text-foreground">
            <span className="font-medium">Periodo selezionato:</span>{' '}
            {selectedMonth && <span>{MONTH_NAMES[selectedMonth - 1]} </span>}
            {selectedYear && <span>{selectedYear}</span>}
            {!selectedMonth && !selectedYear && 'Tutti i periodi'}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
