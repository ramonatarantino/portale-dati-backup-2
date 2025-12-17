import { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { FilterState } from '@/types/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableOptions: {
    province: string[];
    amministrazioni: string[];
    fasce: string[];
    anni?: number[];
    mesi?: number[];
  };
}

export function FilterPanel({ filters, onFiltersChange, availableOptions }: FilterPanelProps) {
  const activeFiltersCount = 
    filters.province.length + 
    filters.amministrazioni.length + 
    filters.sesso.length + 
    filters.fasce.length;

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      province: [],
      amministrazioni: [],
      sesso: [],
      fasce: [],
      anno: filters.anno,
      mese: filters.mese,
    });
  };

  const toggleArrayValue = <T extends string>(array: T[], value: T): T[] => {
    return array.includes(value)
      ? array.filter(v => v !== value)
      : [...array, value];
  };

  return (
    <div className="apple-card p-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Filtri Dati</span>
        </div>

      {/* Province Filter */}
      <FilterDropdown
        label="Province"
        selectedCount={filters.province.length}
        options={availableOptions.province}
        selected={filters.province}
        onToggle={(value) => updateFilter('province', toggleArrayValue(filters.province, value))}
      />

      {/* Amministrazioni Filter */}
      <FilterDropdown
        label="Amministrazioni"
        selectedCount={filters.amministrazioni.length}
        options={availableOptions.amministrazioni}
        selected={filters.amministrazioni}
        onToggle={(value) => updateFilter('amministrazioni', toggleArrayValue(filters.amministrazioni, value))}
      />

      {/* Sesso Filter */}
      <FilterDropdown
        label="Genere"
        selectedCount={filters.sesso.length}
        options={['F', 'M']}
        selected={filters.sesso}
        onToggle={(value) => updateFilter('sesso', toggleArrayValue(filters.sesso, value as 'F' | 'M'))}
        displayMap={{ F: 'U', M: 'D' }}
      />

      {/* Fasce d'età Filter */}
      <FilterDropdown
        label="Fasce d'età"
        selectedCount={filters.fasce.length}
        options={availableOptions.fasce}
        selected={filters.fasce}
        onToggle={(value) => updateFilter('fasce', toggleArrayValue(filters.fasce, value))}
      />

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3 mr-1" />
            Rimuovi filtri ({activeFiltersCount})
          </Button>
        )}
      </div>
    </div>
  );
}

interface FilterDropdownProps {
  label: string;
  selectedCount: number;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  displayMap?: Record<string, string>;
}

function FilterDropdown({ 
  label, 
  selectedCount, 
  options, 
  selected, 
  onToggle,
  displayMap 
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-9 border-dashed",
            selectedCount > 0 && "border-primary"
          )}
        >
          {label}
          {selectedCount > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
              {selectedCount}
            </Badge>
          )}
          <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <ScrollArea className="h-64">
          <div className="p-2 space-y-1">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer transition-colors"
              >
                <Checkbox
                  checked={selected.includes(option)}
                  onCheckedChange={() => onToggle(option)}
                />
                <span className="text-sm truncate">
                  {displayMap?.[option] || option}
                </span>
              </label>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
