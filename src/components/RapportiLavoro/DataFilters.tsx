import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Calendar, Users, Building2, Briefcase, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DataMode } from './DataModeToggle';

export interface FilterState {
  fasciaEta: string | null;
  sesso: string | null;
  comparto: string | null;
  provincia: string | null;
}

interface DataFiltersProps {
  dataMode: DataMode;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableComparti?: string[];
  availableProvinces?: string[];
  selectedRegion?: string | null;
  onResetGeo?: () => void;
}

const fascieEta = [
  { value: '18-24', label: '18-24 anni' },
  { value: '25-34', label: '25-34 anni' },
  { value: '35-44', label: '35-44 anni' },
  { value: '45-54', label: '45-54 anni' },
  { value: '55-64', label: '55-64 anni' },
  { value: '65+', label: '65+ anni' },
];

const sessoOptions = [
  { value: 'M', label: 'Uomini' },
  { value: 'F', label: 'Donne' },
];

const DataFilters: React.FC<DataFiltersProps> = ({ 
  dataMode, 
  filters, 
  onFilterChange,
  availableComparti = [],
  availableProvinces = [],
  selectedRegion,
  onResetGeo
}) => {
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const handleReset = () => {
    onFilterChange({
      fasciaEta: null,
      sesso: null,
      comparto: null,
      provincia: null,
    });
  };

  const handleFilterChange = (key: keyof FilterState, value: string | null) => {
    // If province is being reset to null (all provinces), also reset geo selection
    if (key === 'provincia' && value === null && onResetGeo) {
      onResetGeo();
    }
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  // Show different filters based on mode
  const showCompartoFilter = dataMode === 'inquadramento' || dataMode === 'inquadramento_eta';
  const showAgeGenderFilters = dataMode !== 'inquadramento'; // Basic inquadramento doesn't have age/gender

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
      {/* Age Filter */}
        {showAgeGenderFilters && (
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              Fascia d'età
            </label>
            <Select
              value={filters.fasciaEta || '__all__'}
              onValueChange={(value) => handleFilterChange('fasciaEta', value === '__all__' ? null : value)}
            >
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Tutte le età" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="__all__">Tutte le età</SelectItem>
                {fascieEta.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Gender Filter */}
        {showAgeGenderFilters && (
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <Users className="h-4 w-4" />
              Genere
            </label>
            <Select
              value={filters.sesso || '__all__'}
              onValueChange={(value) => handleFilterChange('sesso', value === '__all__' ? null : value)}
            >
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Tutti i generi" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="__all__">Tutti i generi</SelectItem>
                {sessoOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Comparto Filter */}
        {showCompartoFilter && availableComparti.length > 0 && (
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <Building2 className="h-4 w-4" />
              Comparto
            </label>
            <Select
              value={filters.comparto || '__all__'}
              onValueChange={(value) => handleFilterChange('comparto', value === '__all__' ? null : value)}
            >
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Tutti i comparti" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="__all__">Tutti i comparti</SelectItem>
                {availableComparti.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c.length > 30 ? c.substring(0, 28) + '...' : c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Province Filter */}
        {availableProvinces.length > 0 && (
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              Provincia {selectedRegion && <span className="text-primary">({selectedRegion})</span>}
            </label>
            <Select
              value={filters.provincia || '__all__'}
              onValueChange={(value) => handleFilterChange('provincia', value === '__all__' ? null : value)}
            >
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Tutte le province" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="__all__">Tutte le province</SelectItem>
                {availableProvinces.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p.length > 25 ? p.substring(0, 22) + '...' : p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Active Filters Tags & Reset */}
      <AnimatePresence>
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-border"
          >
            <span className="text-xs text-muted-foreground font-medium">Filtri attivi:</span>
            
            {filters.fasciaEta && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                layout
              >
                <Badge 
                  variant="outline" 
                  className="text-xs gap-1 pr-1 cursor-pointer hover:bg-destructive/10"
                  onClick={() => handleFilterChange('fasciaEta', null)}
                >
                  {filters.fasciaEta}
                  <X className="h-3 w-3" />
                </Badge>
              </motion.div>
            )}
            
            {filters.sesso && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                layout
              >
                <Badge 
                  variant="outline" 
                  className="text-xs gap-1 pr-1 cursor-pointer hover:bg-destructive/10"
                  onClick={() => handleFilterChange('sesso', null)}
                >
                  {filters.sesso === 'M' ? 'Uomini' : 'Donne'}
                  <X className="h-3 w-3" />
                </Badge>
              </motion.div>
            )}
            
            {filters.comparto && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                layout
              >
                <Badge 
                  variant="outline" 
                  className="text-xs gap-1 pr-1 cursor-pointer hover:bg-destructive/10"
                  onClick={() => handleFilterChange('comparto', null)}
                >
                {filters.comparto.length > 15 ? filters.comparto.substring(0, 13) + '...' : filters.comparto}
                  <X className="h-3 w-3" />
                </Badge>
              </motion.div>
            )}

            {filters.provincia && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                layout
              >
                <Badge 
                  variant="outline" 
                  className="text-xs gap-1 pr-1 cursor-pointer hover:bg-destructive/10"
                  onClick={() => handleFilterChange('provincia', null)}
                >
                  <MapPin className="h-3 w-3" />
                  {filters.provincia.length > 15 ? filters.provincia.substring(0, 13) + '...' : filters.provincia}
                  <X className="h-3 w-3" />
                </Badge>
              </motion.div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-muted-foreground hover:text-destructive ml-2"
              onClick={handleReset}
            >
              Rimuovi tutti
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DataFilters;