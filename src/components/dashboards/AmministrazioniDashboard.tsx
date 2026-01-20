import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PopulationPyramid } from '@/components/charts/PopulationPyramid';
import { TrendChart } from '@/components/charts/TrendChart';
import { CalendarPicker } from '@/components/dashboard/CalendarPicker';
import { FilterPanel } from '@/components/charts/FilterPanelAmministrazioni';
import { StatCard } from '@/components/dashboard/StatCard';
import {
  demographicData,
  getUniqueComuni,
  getUniqueAmministrazioni,
  getTimePoints,
  filterData,
  aggregateToPyramid,
  calculateTrends,
} from '@/data/demographicData';
import { BarChart3, Users, UserCheck, UserX } from 'lucide-react';

interface AmministrazioniDashboardProps {
  selectedYear: number | null;
  selectedMonth: number | null;
  data: any; // Puoi definire il tipo appropriato
  availableYears: number[];
  availableMonths: number[];
  onCalendarSelect: (year: number, month: number) => void;
}

export function AmministrazioniDashboard({
  selectedYear,
  selectedMonth,
  data,
  availableYears,
  availableMonths,
  onCalendarSelect
}: AmministrazioniDashboardProps) {
  const [selectedComune, setSelectedComune] = useState('ALL');
  const [selectedAmministrazione, setSelectedAmministrazione] = useState('ALL');

  const comuni = getUniqueComuni();
  const amministrazioni = getUniqueAmministrazioni();
  const timePoints = getTimePoints();

  // Create data availability map for calendar dots
  const dataByMonthYear = useMemo(() => {
    const map: Record<string, boolean> = {};
    timePoints.forEach(tp => {
      map[tp] = true;
    });
    return map;
  }, [timePoints]);

  const currentPeriod = selectedYear && selectedMonth 
    ? `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}`
    : timePoints[0];
  
  const anno = selectedYear || 2023;
  const mese = selectedMonth || 1;

  // Filter and aggregate data
  const filteredData = filterData(demographicData, {
    comune: selectedComune,
    amministrazione: selectedAmministrazione,
    anno,
    mese,
  });

  const pyramidData = aggregateToPyramid(filteredData);
  const trendData = calculateTrends(demographicData, {
    comune: selectedComune,
    amministrazione: selectedAmministrazione,
  });

  const currentTrend = trendData.find(t => t.period === currentPeriod) || null;
  
  // Find previous month for comparison
  const previousPeriod = useMemo(() => {
    const idx = timePoints.indexOf(currentPeriod);
    return idx > 0 ? timePoints[idx - 1] : null;
  }, [currentPeriod, timePoints]);
  
  const previousTrend = previousPeriod 
    ? trendData.find(t => t.period === previousPeriod) 
    : null;

  const handleCalendarSelect = (year: number, month: number) => {
    onCalendarSelect(year, month);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row gap-6"
      >
        {/* Calendario sticky */}
        <div className="xl:sticky xl:top-6 xl:h-fit xl:w-64 xl:flex-shrink-0">
          <CalendarPicker
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            availableYears={availableYears}
            availableMonths={availableMonths}
            onSelect={handleCalendarSelect}
            dataByMonthYear={dataByMonthYear}
          />
        </div>


        {/* Contenuto principale */}
        <div className="flex-1 space-y-8">
          {/* Filters */}
          <FilterPanel
            comuni={comuni}
            amministrazioni={amministrazioni}
            selectedComune={selectedComune}
            selectedAmministrazione={selectedAmministrazione}
            onComuneChange={setSelectedComune}
            onAmministrazioneChange={setSelectedAmministrazione}
          />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {(() => {
              const totalMale = pyramidData.reduce((sum, d) => sum + d.male, 0);
              const totalFemale = pyramidData.reduce((sum, d) => sum + d.female, 0);
              const total = totalMale + totalFemale;
              const totalChange = previousTrend && currentTrend 
                ? ((currentTrend.total - previousTrend.total) / previousTrend.total) * 100 
                : 0;
              const under35Change = previousTrend && currentTrend
                ? currentTrend.percentUnder35 - previousTrend.percentUnder35
                : 0;
              const over55Change = previousTrend && currentTrend
                ? currentTrend.percentOver55 - previousTrend.percentOver55
                : 0;

              return (
                <>
                  <StatCard
                    title="Totale Rapporti"
                    value={total}
                    icon={Users}
                    description="Nel periodo selezionato"
                    trend={totalChange}
                    delay={0}
                  />
                  <StatCard
                    title="Under 35"
                    value={`${currentTrend?.percentUnder35.toFixed(1) || '0'}%`}
                    icon={UserCheck}
                    description="Percentuale giovani"
                    trend={under35Change}
                    delay={100}
                  />
                  <StatCard
                    title="Over 55"
                    value={`${currentTrend?.percentOver55.toFixed(1) || '0'}%`}
                    icon={UserX}
                    description="Percentuale anziani"
                    trend={over55Change}
                    delay={200}
                  />
                  <StatCard
                    title="Rapporto F/M"
                    value={totalMale > 0 ? (totalFemale / totalMale).toFixed(2) : '0'}
                    icon={Users}
                    description="Femmine su maschi"
                    delay={300}
                  />
                </>
              );
            })()}
          </motion.div>

          {/* Population Pyramid */}
          <PopulationPyramid data={pyramidData} isAnimating={false} />

          {/* Trend Chart */}
          <TrendChart data={trendData} currentPeriod={currentPeriod} />

          {/* Footer info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Dati aggregati per {selectedComune === 'ALL' ? 'tutti i comuni' : selectedComune}
              {selectedAmministrazione !== 'ALL' && ` • ${selectedAmministrazione}`}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}