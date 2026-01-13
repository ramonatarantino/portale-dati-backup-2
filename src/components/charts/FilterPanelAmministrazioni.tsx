import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, MapPin } from 'lucide-react';

interface FilterPanelProps {
  comuni: string[];
  amministrazioni: string[];
  selectedComune: string;
  selectedAmministrazione: string;
  onComuneChange: (value: string) => void;
  onAmministrazioneChange: (value: string) => void;
}

export function FilterPanel({
  comuni,
  amministrazioni,
  selectedComune,
  selectedAmministrazione,
  onComuneChange,
  onAmministrazioneChange,
}: FilterPanelProps) {
  return (
    <div className="dashboard-card p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            Comune
          </label>
          <Select value={selectedComune} onValueChange={onComuneChange}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Tutti i comuni" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="ALL">Tutti i comuni</SelectItem>
              {comuni.map(comune => (
                <SelectItem key={comune} value={comune}>
                  {comune}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <Building2 className="h-4 w-4" />
            Amministrazione
          </label>
          <Select value={selectedAmministrazione} onValueChange={onAmministrazioneChange}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Tutte le amministrazioni" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="ALL">Tutte le amministrazioni</SelectItem>
              {amministrazioni.map(amm => (
                <SelectItem key={amm} value={amm}>
                  {amm.length > 50 ? `${amm.substring(0, 50)}...` : amm}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}