import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  DataRecord,
  FilterState,
  DatasetType,
  createMonthYearKey,
  DATASETS,
  DatasetInfo,
} from "@/types/data";

import {
  filterData,
  aggregateByProvince,
  aggregateByAge,
  aggregateByAdmin,
  getUniqueValues,
  getTotalStats,
} from "@/utils/dataParser";

import { getDataForPeriod } from "@/data/mockData2025";

import Header from "@/components/layout/Header_homepage";
import Footer from "@/components/layout/Footer_homepage";
import HeroSection from "@/components/layout/HeroSection_homepage";
import HeroSection_dashboard from "@/components/layout/HeroSection_dashboard";
import { DatasetTabs } from "@/components/dashboard/DatasetTabs";

import { DistribuzioneDashboard } from "@/components/dashboards/DistribuzioneDashboard";
import { AccessiDashboard } from "@/components/dashboards/AccessiDashboard";
import { AttivazioniDashboard } from "@/components/dashboards/AttivazioniDashboard";
import { SpesaDashboard } from "@/components/dashboards/SpesaDashboard";
import { AmministrazioniDashboard } from "@/components/dashboards/AmministrazioniDashboard";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const initialDataset = (searchParams.get("dataset") as DatasetType) || "distribuzione";

  const [filters, setFilters] = useState<FilterState>({
    province: [],
    amministrazioni: [],
    sesso: [],
    fasce: [],
    anno: 2025,
    mese: 1,
  });

  const [activeDataset, setActiveDataset] = useState<DatasetType>(initialDataset);

  const availableYears = [2024, 2025];
  const availableMonths = [1,2,3,4,5,6,7,8,9,10,11,12];

  const openDataDatasets: DatasetInfo[] = DATASETS;

  const handleCalendarSelect = useCallback((year: number, month: number) => {
    setFilters(prev => ({ ...prev, anno: year, mese: month }));
  }, []);

  const mockData = useMemo(
    () => getDataForPeriod(filters.anno!, filters.mese!),
    [filters.anno, filters.mese]
  );

  const rawData = useMemo<DataRecord[]>(() => {
    const records: DataRecord[] = [];
    const adminList = [
      "Ministero Istruzione",
      "Ministero Interno",
      "Agenzia Entrate",
      "INPS",
      "Ministero Giustizia",
    ];

    const ageBrackets = [
      { min: 18, max: 25 },
      { min: 26, max: 35 },
      { min: 36, max: 45 },
      { min: 46, max: 55 },
    ];

    mockData.distribuzione.forEach((prov, pIdx) => {
      adminList.forEach((admin, aIdx) => {
        ageBrackets.forEach((age, ageIdx) => {
          const seed = pIdx * 100 + aIdx * 10 + ageIdx;
          const factor = Math.abs(Math.sin(seed)) + 0.5;

          records.push({
            provincia_di_residenza: prov.provincia,
            amministrazione: admin,
            eta_min: age.min,
            eta_max: age.max,
            sesso: "M",
            numero: Math.round(prov.maschi * factor * 0.02),
            anno: filters.anno!,
            mese: filters.mese!,
          });

          records.push({
            provincia_di_residenza: prov.provincia,
            amministrazione: admin,
            eta_min: age.min,
            eta_max: age.max,
            sesso: "F",
            numero: Math.round(prov.femmine * factor * 0.02),
            anno: filters.anno!,
            mese: filters.mese!,
          });
        });
      });
    });

    return records;
  }, [mockData, filters.anno, filters.mese]);

  const filteredData = useMemo(() => filterData(rawData, filters), [rawData, filters]);
  const stats = useMemo(() => getTotalStats(filteredData), [filteredData]);
  const ageData = useMemo(() => aggregateByAge(filteredData), [filteredData]);
  const adminData = useMemo(() => aggregateByAdmin(filteredData), [filteredData]);
  const availableOptions = useMemo(() => getUniqueValues(rawData), [rawData]);

  const renderDashboard = () => {
    switch (activeDataset) {
      case "distribuzione":
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
            availableYears={availableYears}
            availableMonths={availableMonths}
            onCalendarSelect={handleCalendarSelect}
          />
        );
      case "accessi":
        return <AccessiDashboard data={mockData.accessi} selectedYear={filters.anno} selectedMonth={filters.mese} />;
      case "amministrazioni":
        return <AmministrazioniDashboard data={mockData.amministrazioni} selectedYear={filters.anno} selectedMonth={filters.mese} />;
      case "attivazioni":
        return <AttivazioniDashboard data={mockData.attivazioni} selectedYear={filters.anno} selectedMonth={filters.mese} />;
      case "spesa":
        return <SpesaDashboard data={mockData.spesa} selectedYear={filters.anno} selectedMonth={filters.mese} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Header />
      <HeroSection_dashboard />

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        <motion.div className="apple-card p-6 mb-8">
          <DatasetTabs
            activeDataset={activeDataset}
            onDatasetChange={setActiveDataset}
            datasets={openDataDatasets}
          />
        </motion.div>

        {/* Main Dashboard Content */}
        <section>{renderDashboard()}</section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
