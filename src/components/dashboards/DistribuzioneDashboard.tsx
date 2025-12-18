import { motion } from 'framer-motion';
import { Users, MapPin, Building2, UserPlus } from 'lucide-react';
import { useMemo, useState } from 'react';

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
    selectedMonth
  } = props;

  /** 🔥 SINGLE SOURCE OF TRUTH */
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

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
      <FilterPanel
        filters={filters}
        onFiltersChange={onFiltersChange}
        availableOptions={availableOptions}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard title="Totale Amministrati" value={stats.totale} icon={Users} />
        <StatCard title="Province" value={stats.province} icon={MapPin} />
        <StatCard title="Amministrazioni" value={stats.amministrazioni} icon={Building2} />
        <StatCard
          title="Nuove assunzioni"
          value={nuoveAssunzioni}
          icon={UserPlus}
          trend={crescitaAssunzioni}
        />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GenderPieChart data={filteredData} />
        <AgeStackedChart data={ageData} />
      </div>

      <AdminTreemap data={adminData} />
      <DataTable data={filteredData} />
    </div>
  );
}
