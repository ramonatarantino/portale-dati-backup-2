import { motion } from 'framer-motion';
import { Users, MapPin, Building2, UserPlus } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

import {
  DataRecord,
  FilterState,
  AggregatedByProvince,
  AggregatedByAge,
  AggregatedByAdmin
} from '@/types/data';

import { StatCard } from '@/components/dashboard/StatCard';
import { FilterPanel } from '@/components/dashboard/FilterPanel';
import { ProvinceBarChart } from '@/components/charts/ProvinceBarChart';
import { InteractiveItalyMap } from '@/components/map/InteractiveItalyMap';
import { GenderPieChart } from '@/components/charts/GenderPieChart';
import { AgeStackedChart } from '@/components/charts/AgeStackedChart';
import { AdminTreemap } from '@/components/charts/AdminTreemap';
import { DataTable } from '@/components/dashboard/DataTable';
import { CalendarPicker } from '@/components/dashboard/CalendarPicker';

interface DistribuzioneDashboardProps {
  data: DataRecord[];
  filteredData: DataRecord[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableOptions: any;
  stats: {
    totale: number;
    province: number;
    amministrazioni: number;
    maschi: number;
  };
  provinceData: AggregatedByProvince[];
  ageData: AggregatedByAge[];
  adminData: AggregatedByAdmin[];
  selectedYear: number | null;
  selectedMonth: number | null;
  availableYears: number[];
  availableMonths: number[];
  onCalendarSelect: (year: number, month: number) => void;
  dataByMonthYear?: Record<string, unknown>;
}

export function DistribuzioneDashboard(props: DistribuzioneDashboardProps) {
  const {
    data,
    filteredData,
    filters,
    onFiltersChange,
    availableOptions,
    stats,
    provinceData,
    ageData,
    adminData,
    selectedYear,
    selectedMonth,
    availableYears,
    availableMonths,
    onCalendarSelect,
    dataByMonthYear = {}
  } = props;

  /** 🔥 SINGLE SOURCE OF TRUTH */
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Quando cambia la provincia, resetta automaticamente la selezione del comune
  useEffect(() => {
    setSelectedCity(null);
  }, [selectedProvince]);

  /** 🔥 KPI nuove assunzioni */
  const amministratiMeseCorrente = useMemo(() => {
    if (!selectedYear || !selectedMonth) return 0;
    return data.filter(d => d.anno === selectedYear && d.mese === selectedMonth).length;
  }, [data, selectedYear, selectedMonth]);

  const amministratiMesePrecedente = useMemo(() => {
    if (!selectedYear || !selectedMonth) return 0;
    const pm = selectedMonth === 1 ? 12 : selectedMonth - 1;
    const py = selectedMonth === 1 ? selectedYear - 1 : selectedYear;
    return data.filter(d => d.anno === py && d.mese === pm).length;
  }, [data, selectedYear, selectedMonth]);

  const nuoveAssunzioni = Math.max(amministratiMeseCorrente - amministratiMesePrecedente, 0);
  const crescitaAssunzioni =
    amministratiMesePrecedente > 0
      ? (nuoveAssunzioni / amministratiMesePrecedente) * 100
      : 0;

  /** 🔥 DATI BARCHART (TOP15 vs REGIONE) */
  const barChartData = useMemo(() => {
    if (!selectedRegion) {
      return [...provinceData].sort((a, b) => b.totale - a.totale).slice(0, 15);
    }
    return provinceData.filter(
      p => p.regione?.toUpperCase() === selectedRegion.toUpperCase()
    );
  }, [provinceData, selectedRegion]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row gap-6"
      >
        {/* Calendario sticky */}
        <div className="xl:sticky xl:top-6 xl:h-fit xl:w-50 xl:flex-shrink-0">
          <CalendarPicker
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            availableYears={availableYears}
            availableMonths={availableMonths}
            onSelect={onCalendarSelect}
            dataByMonthYear={dataByMonthYear}
          />
        </div>

        {/* Contenuto principale */}
        <div className="flex-1 space-y-8">
          {/* Filters */}
          <FilterPanel
            filters={filters}
            onFiltersChange={onFiltersChange}
            availableOptions={availableOptions}
          />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Totale Amministrati" value={stats.totale} icon={Users} />
            <StatCard title="Province" value={stats.province} icon={MapPin} />
            <StatCard title="Amministrazioni" value={stats.amministrazioni} icon={Building2} />
            <StatCard
              title="Nuove assunzioni"
              value={nuoveAssunzioni}
              icon={UserPlus}
              trend={crescitaAssunzioni}
            />
          </div>

          {/* Grafici principali */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-12">
            <ProvinceBarChart
              data={provinceData}
              selectedProvince={selectedProvince}
              selectedRegion={selectedRegion}
              selectedCity={selectedCity}
              onRegionSelect={(region) => {
                setSelectedRegion(region);
                setSelectedProvince(null);
                setSelectedCity(null);
              }}
              onProvinceClick={(province) => {
                setSelectedProvince(province);
                setSelectedCity(null);
              }}
              onCitySelect={(city) => {
                setSelectedCity(city);
              }}
            />

            <InteractiveItalyMap
              data={provinceData}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              selectedProvince={selectedProvince}
              regionToZoom={selectedRegion}
              cityToZoom={selectedCity}
              onProvinceSelect={setSelectedProvince}
              onRegionSelect={(region) => {
                setSelectedRegion(region);
                setSelectedProvince(null);
                setSelectedCity(null);
              }}
              onResetRegion={() => {
                setSelectedRegion(null);
                setSelectedProvince(null);
                setSelectedCity(null);
              }}
              onCitySelect={setSelectedCity}
            />
          </div>

          {/* Altri grafici */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GenderPieChart data={filteredData} />
            <AgeStackedChart data={ageData} />
          </div>

          <AdminTreemap data={adminData} />
          <DataTable data={filteredData} />
        </div>
      </motion.div>
    </div>
  );
}
