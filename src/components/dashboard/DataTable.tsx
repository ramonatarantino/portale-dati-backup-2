import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search, Download, ExternalLink, Info } from 'lucide-react';
import { DataRecord } from '@/types/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableProps {
  data: DataRecord[];
}

type SortKey = keyof DataRecord;
type SortDirection = 'asc' | 'desc';

const DATASET_OPTIONS = [
  { value: 'province-residenza', label: 'Amministrati per provincia di residenza' },
  { value: 'comune-unita', label: "Amministrati per comune dell'unità organizzativa dell'Amministrazione" },
  { value: 'modalita-accredito', label: 'Modalità di accredito degli stipendi' },
  { value: 'attivazioni-cessazioni', label: 'Attivazioni e Cessazioni' },
  { value: 'spesa-retribuzioni', label: 'Spesa Retribuzioni' },
  { value: 'accessi', label: 'Statistiche Accessi' },
];

export function DataTable({ data }: DataTableProps) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('numero');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedDataset, setSelectedDataset] = useState('province-residenza');

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.provincia_di_residenza.toLowerCase().includes(searchLower) ||
          item.amministrazione.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    result.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return result.slice(0, 100); // Limit for performance
  }, [data, search, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: '700ms' }}>
      {/* Dataset selector and info */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 pb-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Seleziona Dataset
            </label>
            <Select value={selectedDataset} onValueChange={setSelectedDataset}>
              <SelectTrigger className="w-full sm:w-[400px]">
                <SelectValue placeholder="Seleziona un dataset" />
              </SelectTrigger>
              <SelectContent>
                {DATASET_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Download buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              RDF
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              CSV
            </Button>
          </div>

          {/* LodLive button */}
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            LodLive
          </Button>

          {/* Info about excluded administrators */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Amministrati non considerati <span className="font-medium text-orange-600">1.41%</span></span>
            <span className="text-xs">(*)</span>
          </div>
        </div>
      </div>

      {/* Note about excluded administrators */}
      <div className="mb-4 p-3 bg-muted/30 rounded-lg border border-orange-200">
        <p className="text-xs text-muted-foreground">
          (*) La percentuale fa riferimento agli amministrati non considerati per motivi di Privacy
        </p>
      </div>

      {/* Table header with search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold">Dettaglio Dati</h3>
          <p className="text-sm text-muted-foreground">
            {filteredAndSortedData.length} di {data.length} record
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca provincia o ente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort('provincia_di_residenza')}
                >
                  <div className="flex items-center gap-1">
                    Provincia
                    <SortIcon columnKey="provincia_di_residenza" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort('amministrazione')}
                >
                  <div className="flex items-center gap-1">
                    Amministrazione
                    <SortIcon columnKey="amministrazione" />
                  </div>
                </TableHead>
                <TableHead className="text-center">Fascia Età</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted transition-colors text-center"
                  onClick={() => handleSort('sesso')}
                >
                  <div className="flex items-center justify-center gap-1">
                    Genere
                    <SortIcon columnKey="sesso" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted transition-colors text-right"
                  onClick={() => handleSort('numero')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Numero
                    <SortIcon columnKey="numero" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((item, index) => (
                <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{item.provincia_di_residenza}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={item.amministrazione}>
                    {item.amministrazione}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.eta_min}-{item.eta_max}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
                        item.sesso === 'M' 
                          ? "bg-blue-500/20 text-blue-600" 
                          : "bg-pink-500/20 text-pink-600"
                      )}
                    >
                      {item.sesso === 'M' ? 'U' : 'D'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {new Intl.NumberFormat('it-IT').format(item.numero)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
