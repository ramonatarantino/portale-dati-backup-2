import { useState, useEffect } from 'react';
import { useBarChartRace } from '@/hooks/useBarChartRace';
import { useTimelineData } from '@/hooks/useTimelineData';
import { TimeDisplay } from './TimeDisplay';
import { AnimatedBar } from './AnimatedBar';
import { TimelineChart } from './TimelineChart';
import { amministrazioni, anni, tipiSpesa, spesaColorMap } from '@/data/barChartData';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const BAR_HEIGHT = 28;
const BAR_GAP = 3;
const MAX_VISIBLE_BARS = 15;

export function BarChartRace() {
  const [selectedAnni, setSelectedAnni] = useState<number[]>([]);
  const [selectedAmministrazioni, setSelectedAmministrazioni] = useState<string[]>(
    amministrazioni.map(a => a.id)
  );
  const [selectedTipiSpesa, setSelectedTipiSpesa] = useState<string[]>([...tipiSpesa]);
  const [activeFilter, setActiveFilter] = useState<'anni' | 'tipi' | 'amm' | null>(null);

  const {
    progress,
    play,
    seekTo,
  } = useBarChartRace({ duration: 30000, initialSpeed: 1 });

  const { bars, currentTime, maxValue, data } = useTimelineData(progress, {
    selectedAnni,
    selectedAmministrazioni,
    selectedTipiSpesa,
  });

  // Only show top N bars
  const visibleBars = bars.slice(0, MAX_VISIBLE_BARS);

  // Toggle year (multi-select mode)
  const toggleAnno = (anno: number) => {
    setSelectedAnni(prev => {
      const isSelected = prev.includes(anno);
      if (isSelected) {
        return prev.filter(a => a !== anno);
      }
      return [...prev, anno].sort((a, b) => a - b);
    });
  };

  // Toggle tipo spesa (multi-select mode)
  const toggleTipoSpesa = (spesa: string) => {
    setSelectedTipiSpesa(prev => {
      const isSelected = prev.includes(spesa);
      if (isSelected) {
        // Don't allow deselecting if it's the last one
        if (prev.length === 1) return prev;
        return prev.filter(s => s !== spesa);
      }
      return [...prev, spesa];
    });
  };

  // Toggle amministrazione (multi-select mode)
  const toggleAmministrazione = (id: string) => {
    setSelectedAmministrazioni(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        // Don't allow deselecting if it's the last one
        if (prev.length === 1) return prev;
        return prev.filter(a => a !== id);
      }
      return [...prev, id];
    });
  };

  // Auto-play on mount
  useEffect(() => {
    play();
  }, [play]);

  // Loop when finished
  useEffect(() => {
    if (progress >= 1) {
      const timeout = setTimeout(() => {
        seekTo(0);
        play();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [progress, seekTo, play]);

  // Reset animation when filters change
  useEffect(() => {
    seekTo(0);
    play();
  }, [selectedAnni, selectedAmministrazioni, selectedTipiSpesa, seekTo, play]);

  const chartHeight = Math.max(visibleBars.length * (BAR_HEIGHT + BAR_GAP), 100);

  // Summary labels
  const anniLabel = selectedAnni.length === 0 
    ? 'Tutti gli anni' 
    : selectedAnni.join(', ');
  
  const tipiSpesaLabel = selectedTipiSpesa.length === tipiSpesa.length 
    ? 'Tutte le tipologie' 
    : `${selectedTipiSpesa.length} selezionate`;
  
  const ammLabel = selectedAmministrazioni.length === amministrazioni.length 
    ? 'Tutte le amministrazioni' 
    : `${selectedAmministrazioni.length} selezionate`;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
      {/* Filters row */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Year selector dropdown */}
        <Collapsible className="relative" open={activeFilter === 'anni'} onOpenChange={() => {}}>
          <CollapsibleTrigger asChild>
            <button 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border rounded-md hover:bg-muted/50 transition-colors text-sm"
              onClick={() => setActiveFilter(activeFilter === 'anni' ? null : 'anni')}
            >
              <span className="font-medium">Anni:</span>
              <span className="text-muted-foreground">{anniLabel}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="absolute top-full left-0 mt-1 z-50 bg-card border border-border rounded-md shadow-lg p-3 min-w-64">
            <div className="flex flex-wrap gap-3">
              {anni.map((anno) => {
                const isSelected = selectedAnni.includes(anno);
                const allSelected = selectedAnni.length === 0;
                return (
                  <label
                    key={anno}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                      isSelected || allSelected
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <Checkbox
                      checked={isSelected || allSelected}
                      onCheckedChange={() => toggleAnno(anno)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm font-medium">{anno}</span>
                  </label>
                );
              })}
            </div>
            {selectedAnni.length > 0 && (
              <button
                onClick={() => setSelectedAnni([])}
                className="text-xs text-muted-foreground hover:text-foreground underline mt-3"
              >
                Tutti gli anni
              </button>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Expense type selector dropdown */}
        <Collapsible className="relative" open={activeFilter === 'tipi'} onOpenChange={() => {}}>
          <CollapsibleTrigger asChild>
            <button 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border rounded-md hover:bg-muted/50 transition-colors text-sm"
              onClick={() => setActiveFilter(activeFilter === 'tipi' ? null : 'tipi')}
            >
              <span className="font-medium">Tipologie:</span>
              <span className="text-muted-foreground">{tipiSpesaLabel}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="absolute top-full left-0 mt-1 z-50 bg-card border border-border rounded-md shadow-lg p-3 min-w-80">
            <div className="flex flex-wrap gap-2">
              {tipiSpesa.map((spesa) => {
                const isSelected = selectedTipiSpesa.includes(spesa);
                const color = spesaColorMap[spesa];
                return (
                  <label
                    key={spesa}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-all ${
                      isSelected
                        ? 'ring-2 ring-offset-1 ring-foreground/20'
                        : 'opacity-50 hover:opacity-75'
                    }`}
                    style={{
                      backgroundColor: isSelected ? color : `${color}50`,
                    }}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleTipoSpesa(spesa)}
                      className="h-4 w-4 border-gray-600"
                    />
                    <span className="text-xs font-medium text-gray-800">{spesa}</span>
                  </label>
                );
              })}
            </div>
            {selectedTipiSpesa.length < tipiSpesa.length && (
              <button
                onClick={() => setSelectedTipiSpesa([...tipiSpesa])}
                className="text-xs text-muted-foreground hover:text-foreground underline mt-3"
              >
                Seleziona tutte
              </button>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Amministrazioni selector dropdown */}
        <Collapsible className="relative" open={activeFilter === 'amm'} onOpenChange={() => {}}>
          <CollapsibleTrigger asChild>
            <button 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border rounded-md hover:bg-muted/50 transition-colors text-sm"
              onClick={() => setActiveFilter(activeFilter === 'amm' ? null : 'amm')}
            >
              <span className="font-medium">Amministrazioni:</span>
              <span className="text-muted-foreground">{ammLabel}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="absolute top-full left-0 mt-1 z-50 bg-card border border-border rounded-md shadow-lg p-3 min-w-80">
            <div className="flex flex-wrap gap-2">
              {amministrazioni.map((amm) => {
                const isSelected = selectedAmministrazioni.includes(amm.id);
                return (
                  <button
                    key={amm.id}
                    onClick={() => toggleAmministrazione(amm.id)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                      transition-all duration-200 border-2
                      ${isSelected 
                        ? 'opacity-100 shadow-md' 
                        : 'opacity-50 border-transparent hover:opacity-75'
                      }
                    `}
                    style={{
                      backgroundColor: isSelected ? amm.color : 'transparent',
                      borderColor: amm.color,
                      color: isSelected ? '#ffffff' : amm.color,
                    }}
                  >
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: amm.color }}
                    />
                    <span className="truncate max-w-40">{amm.label}</span>
                  </button>
                );
              })}
            </div>
            {selectedAmministrazioni.length < amministrazioni.length && (
              <button
                onClick={() => setSelectedAmministrazioni(amministrazioni.map(a => a.id))}
                className="text-xs text-muted-foreground hover:text-foreground underline mt-3"
              >
                Seleziona tutte
              </button>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Bar Chart */}
      <div
        className="relative bg-card rounded-lg border border-border p-4 md:p-6 mb-6 overflow-hidden"
        style={{ height: `${chartHeight + 100}px` }}
      >
        {visibleBars.map((bar) => (
          <AnimatedBar
            key={bar.id}
            label={bar.label}
            value={bar.value}
            color={bar.color}
            rank={bar.rank}
            maxValue={maxValue}
            barHeight={BAR_HEIGHT}
            gap={BAR_GAP}
            sigla={bar.sigla}
            siglaColor={bar.siglaColor}
          />
        ))}
        
        <TimeDisplay
          month={currentTime.month}
          year={currentTime.year}
        />
      </div>

      {/* Timeline Chart */}
      <TimelineChart
        data={data}
        selectedAmministrazioni={selectedAmministrazioni}
        progress={progress}
        onSeek={seekTo}
      />
    </div>
  );
}
