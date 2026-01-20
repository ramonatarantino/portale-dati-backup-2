import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DataRecord, FilterState, DatasetType, createMonthYearKey } from '@/types/data';
import { 
  filterData, 
  aggregateByProvince, 
  aggregateByAge, 
  aggregateByAdmin,
  getUniqueValues,
  getTotalStats
} from '@/utils/dataParser';
import { sampleData } from '@/data/sampleData';
import { getDataForPeriod } from '@/data/mockData2025';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/layout/HeroSection';
import { CalendarPicker } from '@/components/dashboard/CalendarPicker';
import { DatasetTabs } from '@/components/dashboard/DatasetTabs';

import { DistribuzioneDashboard } from '@/components/dashboards/DistribuzioneDashboard';
import { AccessiDashboard } from '@/components/dashboards/AccessiDashboard';
import { AttivazioniDashboard } from '@/components/dashboards/AttivazioniDashboard';
import { SpesaDashboard } from '@/components/dashboards/SpesaDashboard';

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    province: [],
    amministrazioni: [],
    sesso: [],
    fasce: [],
    anno: 2025,
    mese: 1,
  });
  const [activeDataset, setActiveDataset] = useState<DatasetType>('distribuzione');

  // Available years
  const availableYears = [2024, 2025];
  const availableMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Handle calendar selection
  const handleCalendarSelect = useCallback((year: number, month: number) => {
    setFilters(prev => ({ ...prev, anno: year, mese: month }));
  }, []);

  // Get mock data for current period
  const mockData = useMemo(() => {
    return getDataForPeriod(filters.anno || 2025, filters.mese || 1);
  }, [filters.anno, filters.mese]);

  // Generate DataRecord from province data for compatibility with existing components
  const rawData = useMemo(() => {
    // Convert province data to DataRecord format
    const records: DataRecord[] = [];
    const adminList = [
      'Ministero Istruzione',
      'Ministero Interno',
      'Agenzia Entrate',
      'INPS',
      'Ministero Giustizia',
      'Ministero Difesa',
      'Ministero Salute',
      'Guardia di Finanza',
      'Regione',
      'Comune',
      'Università'
    ];

    const ageBrackets = [
      { min: 18, max: 25 },
      { min: 26, max: 35 },
      { min: 36, max: 45 },
      { min: 46, max: 55 },
      { min: 56, max: 65 },
      { min: 66, max: 75 }
    ];

    mockData.distribuzione.forEach((prov, provIndex) => {
      // Distribute people across different administrations and age brackets
      adminList.forEach((admin, adminIndex) => {
        ageBrackets.forEach((bracket, ageIndex) => {
          // Use seeded random for consistency across renders
          const seed = provIndex * 1000 + adminIndex * 100 + ageIndex * 10 + (filters.mese || 1);
          const seededRandom1 = Math.abs(Math.sin(seed) * 10000) % 1;
          const seededRandom2 = Math.abs(Math.sin(seed * 2) * 10000) % 1;

          // Calculate portion for this admin/age combination
          const adminFactor = 0.5 + seededRandom1; // Vary by admin
          const ageFactor = seededRandom2 * 0.8 + 0.6; // Vary by age

          const maleCount = Math.round((prov.maschi / (adminList.length * ageBrackets.length)) * adminFactor * ageFactor);
          const femaleCount = Math.round((prov.femmine / (adminList.length * ageBrackets.length)) * adminFactor * ageFactor);

          if (maleCount > 0) {
            records.push({
              provincia_di_residenza: prov.provincia,
              amministrazione: admin,
              eta_min: bracket.min,
              eta_max: bracket.max,
              sesso: 'M',
              numero: maleCount,
              anno: filters.anno || 2025,
              mese: filters.mese || 1,
            });
          }

          if (femaleCount > 0) {
            records.push({
              provincia_di_residenza: prov.provincia,
              amministrazione: admin,
              eta_min: bracket.min,
              eta_max: bracket.max,
              sesso: 'F',
              numero: femaleCount,
              anno: filters.anno || 2025,
              mese: filters.mese || 1,
            });
          }
        });
      });
    });
    return records;
  }, [mockData]);

  // Create dataByMonthYear for calendar indicator (all months have data)
  const dataByMonthYear = useMemo(() => {
    const data: Record<string, boolean> = {};
    availableYears.forEach(year => {
      availableMonths.forEach(month => {
        data[createMonthYearKey(year, month)] = true;
      });
    });
    return data;
  }, []);

  const filteredData = useMemo(() => filterData(rawData, filters), [rawData, filters]);
  const stats = useMemo(() => getTotalStats(filteredData), [filteredData]);
  const provinceData = useMemo(() => aggregateByProvince(filteredData), [filteredData]);
  const ageData = useMemo(() => aggregateByAge(filteredData), [filteredData]);
  const adminData = useMemo(() => aggregateByAdmin(filteredData), [filteredData]);
  const availableOptions = useMemo(() => getUniqueValues(rawData), [rawData]);

  const renderDashboard = () => {
    switch (activeDataset) {
      case 'distribuzione':
        return (
          <DistribuzioneDashboard
            data={rawData}
            filteredData={filteredData}
            filters={filters}
            onFiltersChange={setFilters}
            availableOptions={availableOptions}
            stats={stats}
            provinceData={mockData.distribuzione}
            ageData={ageData}
            adminData={adminData}
            selectedYear={filters.anno}
            selectedMonth={filters.mese}
          />
        );
      case 'accessi':
        return (
          <AccessiDashboard
            selectedYear={filters.anno}
            selectedMonth={filters.mese}
            data={mockData.accessi}
          />
        );
      case 'attivazioni':
        return (
          <AttivazioniDashboard
            selectedYear={filters.anno}
            selectedMonth={filters.mese}
            data={mockData.attivazioni}
          />
        );
      case 'spesa':
        return (
          <SpesaDashboard
            selectedYear={filters.anno}
            selectedMonth={filters.mese}
            data={mockData.spesa}
          />
        );
      default:
        return null;
    }
  };

  const MONTH_NAMES = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <main className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-8">
        {/* Dataset Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="apple-card p-6"
        >
          <DatasetTabs 
            activeDataset={activeDataset} 
            onDatasetChange={setActiveDataset} 
          />
        </motion.div>

        {/* Calendar Picker - Above filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="apple-card p-6 border-gold/20 bg-gradient-to-br from-gold/5 to-gold/10"
        >
          <CalendarPicker
            selectedYear={filters.anno}
            selectedMonth={filters.mese}
            availableYears={availableYears}
            availableMonths={availableMonths}
            onSelect={handleCalendarSelect}
            dataByMonthYear={dataByMonthYear}
          />
        </motion.div>

        {/* Period Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="apple-card p-8"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">Periodo Selezionato</h3>
            <p className="text-sm text-muted-foreground">
              Visualizzazione dati per <span className="font-medium text-primary">{MONTH_NAMES[(filters.mese || 1) - 1]} {filters.anno}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 bg-secondary/50 rounded-xl">
              <p className="text-sm text-muted-foreground">Dataset</p>
              <p className="text-lg font-semibold text-foreground mt-1">
                {activeDataset === 'distribuzione' && 'Distribuzione'}
                {activeDataset === 'accessi' && 'Accessi'}
                {activeDataset === 'attivazioni' && 'Attivazioni'}
                {activeDataset === 'spesa' && 'Spesa'}
              </p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-xl">
              <p className="text-sm text-muted-foreground">Anno</p>
              <p className="text-lg font-semibold text-foreground mt-1">{filters.anno}</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-xl">
              <p className="text-sm text-muted-foreground">Mese</p>
              <p className="text-lg font-semibold text-foreground mt-1">{MONTH_NAMES[(filters.mese || 1) - 1]}</p>
            </div>
            <div className="p-4 bg-gold/10 rounded-xl border border-gold/20">
              <p className="text-sm text-muted-foreground">Province</p>
              <p className="text-lg font-semibold text-gold-dark mt-1">{mockData.distribuzione.length}</p>
            </div>
          </div>
        </motion.div>

        {/* Dataset Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="apple-card p-6"
        >
          <DatasetTabs 
            activeDataset={activeDataset} 
            onDatasetChange={setActiveDataset} 
          />
        </motion.div>

        {/* Dashboard Content */}
        <section id="visualizations">
          {renderDashboard()}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
