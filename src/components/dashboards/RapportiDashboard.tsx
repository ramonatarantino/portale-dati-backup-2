import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveItalyMap from '@/components/RapportiLavoro/InteractiveItalyMap';
import PointChart from '@/components/RapportiLavoro/PointChart';
import { DataMode } from '@/components/RapportiLavoro/DataModeToggle';
import DataFilters, { FilterState } from '@/components/RapportiLavoro/DataFilters';
import EnhancedPieChart from '@/components/RapportiLavoro/EnhancedPieChart';
import EnhancedBarChart from '@/components/RapportiLavoro/EnhancedBarChart';
import AdministrationChart from '@/components/RapportiLavoro/AdministrationChart';
import { CalendarPicker } from '@/components/RapportiLavoro/CalendarPicker';
import { StatCard } from '@/components/dashboard/StatCard';
import { Users, MapPin, TrendingUp, Briefcase } from 'lucide-react';
import { 
  getRegionProvinceDataByGender, 
  getRegions, 
  getProvinciaAggregates,
  getProvinciaAggregatesFiltered,
  provinceToRegion,
  getRegionalAggregatesWithGender
} from '@/data/assunzioniData';
import {
  getCessazioniProvinciaAggregates,
  getCessazioniProvinciaAggregatesFiltered,
  getCessazioniRegionProvinceDataByGender,
  getCessazioniRegionalAggregatesWithGender
} from '@/data/cessazioniData';
import {
  getInquadramentoProvinciaAggregates,
  getInquadramentoProvinciaAggregatesFiltered,
  getInquadramentoRegionProvinceDataByGender,
  getInquadramentoRegionProvinceDataByGenderFiltered,
  getCompartoDistribution,
  getCompartoDistributionByRegion,
  getCompartoDistributionByProvince,
  getInquadramentoDistribution,
  getInquadramentoDistributionByRegion,
  getInquadramentoDistributionByProvince,
  getAmministrazioneDistribution,
  getAmministrazioneDistributionByRegion,
  getAmministrazioneDistributionByProvince,
  getAvailableComparti,
  getInquadramentoRegionalAggregatesWithGender,
  getAllProvinces,
  getProvincesByRegionForFilter
} from '@/data/inquadramentoData';
import {
  getDataMultiplier,
  applyMultiplier,
  availableYears,
  getAvailableMonthsForYear,
  getDataAvailabilityMap,
  formatPeriod
} from '@/data/monthlyDataUtils';
import { 
  regionCoordinates, 
  provinceCoordinates 
} from '@/data/provinceCoordinates';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [dataMode, setDataMode] = useState<DataMode>('assunzioni');
  const [selectedYear, setSelectedYear] = useState<number | null>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(9); // September by default
  const [filters, setFilters] = useState<FilterState>({
    fasciaEta: null,
    sesso: null,
    comparto: null,
    provincia: null,
  });

  // Internal tabs data
  const internalTabs = [
    { id: 'assunzioni' as DataMode, name: 'Assunzioni', icon: TrendingUp },
    { id: 'cessazioni' as DataMode, name: 'Cessazioni', icon: TrendingUp },
    { id: 'inquadramento_eta' as DataMode, name: 'Inquadramento Contrattuale', icon: Users },
    { id: 'inquadramento' as DataMode, name: 'Inquadramento Amministrati', icon: Briefcase },
  ];
 
  // Get multiplier for current period
  const periodMultiplier = useMemo(() => {
    if (!selectedYear || !selectedMonth) return 1.0;
    return getDataMultiplier(dataMode, selectedYear, selectedMonth);
  }, [dataMode, selectedYear, selectedMonth]);

  // Helper function to apply multiplier to gender data arrays
  const transformGenderData = (data: { provincia: string; maschi: number; femmine: number; totale: number }[]) => {
    return data.map((item, i) => ({
      ...item,
      maschi: applyMultiplier(item.maschi, periodMultiplier, i + 2000),
      femmine: applyMultiplier(item.femmine, periodMultiplier, i + 3000),
      totale: applyMultiplier(item.maschi, periodMultiplier, i + 2000) + applyMultiplier(item.femmine, periodMultiplier, i + 3000)
    }));
  };

  // Helper function to apply multiplier to count data arrays
  const transformCountData = <T extends { count: number }>(data: T[]) => {
    return data.map((item, i) => ({
      ...item,
      count: applyMultiplier(item.count, periodMultiplier, i + 1000)
    }));
  };

  // Apply multiplier to aggregates object
  const applyMultiplierToAggregates = useCallback((
    aggregates: Record<string, number>
  ): Record<string, number> => {
    const result: Record<string, number> = {};
    Object.entries(aggregates).forEach(([key, value], i) => {
      result[key] = applyMultiplier(value, periodMultiplier, i);
    });
    return result;
  }, [periodMultiplier]);

  // Handle calendar selection
  const handleCalendarSelect = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  // Data availability map for calendar
  const dataAvailabilityMap = useMemo(() => getDataAvailabilityMap(), []);
  
  // Available months for current year view
  const availableMonths = useMemo(() => 
    selectedYear ? getAvailableMonthsForYear(selectedYear) : [],
  [selectedYear]);

  // Get available comparti for filter dropdown
  const availableComparti = useMemo(() => getAvailableComparti(), []);
  
  // Get available provinces for filter dropdown based on selected region
  const availableProvinces = useMemo(() => {
    if (selectedRegion) {
      return getProvincesByRegionForFilter(selectedRegion);
    }
    return getAllProvinces();
  }, [selectedRegion]);

  // Sync province filter with map selection
  useEffect(() => {
    if (filters.provincia) {
      // If province is selected in filter, also update the map selection
      const region = provinceToRegion[filters.provincia];
      if (region && region !== selectedRegion) {
        setSelectedRegion(region);
      }
      if (filters.provincia !== selectedProvince) {
        setSelectedProvince(filters.provincia);
      }
    }
  }, [filters.provincia]);

  // When region changes, reset province filter if it's not in the new region
  useEffect(() => {
    if (filters.provincia && selectedRegion) {
      const provinceRegion = provinceToRegion[filters.provincia];
      if (provinceRegion !== selectedRegion) {
        setFilters(prev => ({ ...prev, provincia: null }));
      }
    }
  }, [selectedRegion]);

  // Calculate region totals for map coloring based on mode and filters
  const regionData = useMemo(() => {
    let provinciaAggregates: Record<string, number>;
    const hasFilters = filters.fasciaEta || filters.sesso || filters.comparto;
    
    switch (dataMode) {
      case 'assunzioni':
        provinciaAggregates = hasFilters 
          ? getProvinciaAggregatesFiltered({ fasciaEta: filters.fasciaEta, sesso: filters.sesso })
          : getProvinciaAggregates();
        break;
      case 'cessazioni':
        provinciaAggregates = hasFilters
          ? getCessazioniProvinciaAggregatesFiltered({ fasciaEta: filters.fasciaEta, sesso: filters.sesso })
          : getCessazioniProvinciaAggregates();
        break;
      case 'inquadramento_eta':
      case 'inquadramento':
        provinciaAggregates = hasFilters
          ? getInquadramentoProvinciaAggregatesFiltered({ fasciaEta: filters.fasciaEta, sesso: filters.sesso, comparto: filters.comparto })
          : getInquadramentoProvinciaAggregates();
        break;
    }
    
    // Apply period multiplier
    provinciaAggregates = applyMultiplierToAggregates(provinciaAggregates);
    
    const regionTotals: Record<string, number> = {};
    Object.entries(provinciaAggregates).forEach(([prov, total]) => {
      const region = provinceToRegion[prov];
      if (region) {
        regionTotals[region] = (regionTotals[region] || 0) + total;
      }
    });
    
    return regionTotals;
  }, [dataMode, filters, applyMultiplierToAggregates]);
  
  // Get province data with gender breakdown for selected region
  const provinceData = useMemo(() => {
    if (!selectedRegion) return [];
    
    const hasFilters = filters.fasciaEta || filters.sesso || filters.comparto;
    let data: { provincia: string; maschi: number; femmine: number; totale: number }[];
    
    switch (dataMode) {
      case 'assunzioni':
        data = getRegionProvinceDataByGender(selectedRegion, { fasciaEta: filters.fasciaEta, sesso: filters.sesso });
        break;
      case 'cessazioni':
        data = getCessazioniRegionProvinceDataByGender(selectedRegion, { fasciaEta: filters.fasciaEta, sesso: filters.sesso });
        break;
      case 'inquadramento_eta':
        data = hasFilters
          ? getInquadramentoRegionProvinceDataByGenderFiltered(selectedRegion, { fasciaEta: filters.fasciaEta, sesso: filters.sesso, comparto: filters.comparto })
          : getInquadramentoRegionProvinceDataByGender(selectedRegion);
        break;
      case 'inquadramento':
        data = hasFilters
          ? getInquadramentoRegionProvinceDataByGenderFiltered(selectedRegion, { fasciaEta: filters.fasciaEta, sesso: filters.sesso, comparto: filters.comparto })
          : getInquadramentoRegionProvinceDataByGender(selectedRegion);
        break;
    }
    return transformGenderData(data);
  }, [selectedRegion, dataMode, filters, periodMultiplier]);

  // Get regional aggregates for bubble chart when no region selected
  const regionalData = useMemo(() => {
    let data: { provincia: string; maschi: number; femmine: number; totale: number }[];
    switch (dataMode) {
      case 'assunzioni':
        data = getRegionalAggregatesWithGender({ fasciaEta: filters.fasciaEta, sesso: filters.sesso });
        break;
      case 'cessazioni':
        data = getCessazioniRegionalAggregatesWithGender({ fasciaEta: filters.fasciaEta, sesso: filters.sesso });
        break;
      case 'inquadramento_eta':
      case 'inquadramento':
        data = getInquadramentoRegionalAggregatesWithGender({ fasciaEta: filters.fasciaEta, sesso: filters.sesso, comparto: filters.comparto });
        break;
    }
    return transformGenderData(data);
  }, [dataMode, filters, periodMultiplier]);

  // Get province aggregates for map markers when zoomed into a region
  const provinceAggregates = useMemo(() => {
    const hasFilters = filters.fasciaEta || filters.sesso || filters.comparto;
    let aggregates;
    switch (dataMode) {
      case 'assunzioni':
        aggregates = hasFilters ? getProvinciaAggregatesFiltered({ fasciaEta: filters.fasciaEta, sesso: filters.sesso }) : getProvinciaAggregates();
        break;
      case 'cessazioni':
        aggregates = hasFilters ? getCessazioniProvinciaAggregatesFiltered({ fasciaEta: filters.fasciaEta, sesso: filters.sesso }) : getCessazioniProvinciaAggregates();
        break;
      case 'inquadramento_eta':
      case 'inquadramento':
        aggregates = hasFilters ? getInquadramentoProvinciaAggregatesFiltered({ fasciaEta: filters.fasciaEta, sesso: filters.sesso, comparto: filters.comparto }) : getInquadramentoProvinciaAggregates();
        break;
    }
    return applyMultiplierToAggregates(aggregates);
  }, [dataMode, filters, applyMultiplierToAggregates]);
  
  const handleRegionClick = (region: string) => {
    if (region === '') {
      setSelectedRegion(null);
      setSelectedProvince(null);
    } else {
      setSelectedRegion(prev => {
        if (prev === region) {
          setSelectedProvince(null);
          return null;
        }
        setSelectedProvince(null);
        return region;
      });
    }
  };

  // Handle province selection from map
  const handleProvinceClick = (province: string) => {
    setSelectedProvince(prev => prev === province ? null : province);
  };

  // Handle location click from PointChart to navigate map (with toggle support)
  const handleChartLocationClick = useCallback((location: string, isRegion: boolean, isAlreadySelected: boolean) => {
    if (isRegion) {
      if (isAlreadySelected) {
        // Double click on region → go back to national view
        setSelectedRegion(null);
        setSelectedProvince(null);
      } else {
        // Single click on region → select it and zoom
        setSelectedRegion(location);
        setSelectedProvince(null);
      }
    } else {
      if (isAlreadySelected) {
        // Double click on province → go back to region view
        setSelectedProvince(null);
      } else {
        // Single click on province → find its region and navigate
        const provinceUpper = location.toUpperCase();
        const region = provinceToRegion[provinceUpper];
        if (region) {
          setSelectedRegion(region);
          setSelectedProvince(provinceUpper);
        }
      }
    }
  }, []);

  const totalCount = useMemo(() => {
    const hasFilters = filters.fasciaEta || filters.sesso || filters.comparto;
    let aggregates: Record<string, number>;
    
    switch (dataMode) {
      case 'assunzioni':
        aggregates = hasFilters 
          ? getProvinciaAggregatesFiltered({ fasciaEta: filters.fasciaEta, sesso: filters.sesso })
          : getProvinciaAggregates();
        break;
      case 'cessazioni':
        aggregates = hasFilters
          ? getCessazioniProvinciaAggregatesFiltered({ fasciaEta: filters.fasciaEta, sesso: filters.sesso })
          : getCessazioniProvinciaAggregates();
        break;
      case 'inquadramento_eta':
      case 'inquadramento':
        aggregates = hasFilters
          ? getInquadramentoProvinciaAggregatesFiltered({ fasciaEta: filters.fasciaEta, sesso: filters.sesso, comparto: filters.comparto })
          : getInquadramentoProvinciaAggregates();
        break;
    }
    const baseTotal = Object.values(aggregates).reduce((a, b) => a + b, 0);
    return applyMultiplier(baseTotal, periodMultiplier, 9999);
  }, [dataMode, filters, periodMultiplier]);

  const provincesCount = useMemo(() => {
    const hasFilters = filters.fasciaEta || filters.sesso || filters.comparto;
    let aggregates: Record<string, number>;
    
    switch (dataMode) {
      case 'assunzioni':
        aggregates = hasFilters 
          ? getProvinciaAggregatesFiltered({ fasciaEta: filters.fasciaEta, sesso: filters.sesso })
          : getProvinciaAggregates();
        break;
      case 'cessazioni':
        aggregates = hasFilters
          ? getCessazioniProvinciaAggregatesFiltered({ fasciaEta: filters.fasciaEta, sesso: filters.sesso })
          : getCessazioniProvinciaAggregates();
        break;
      case 'inquadramento_eta':
      case 'inquadramento':
        aggregates = hasFilters
          ? getInquadramentoProvinciaAggregatesFiltered({ fasciaEta: filters.fasciaEta, sesso: filters.sesso, comparto: filters.comparto })
          : getInquadramentoProvinciaAggregates();
        break;
    }
    return Object.keys(aggregates).length;
  }, [dataMode, filters]);

  // Reset filters when mode changes
  const handleModeChange = (newMode: DataMode) => {
    setDataMode(newMode);
    // Reset comparto filter when switching to non-inquadramento modes
    if (newMode === 'assunzioni' || newMode === 'cessazioni') {
      setFilters(prev => ({ ...prev, comparto: null }));
    }
  };

  // Mode-specific labels and colors
  const getModeConfig = () => {
    switch (dataMode) {
      case 'assunzioni':
        return {
          label: 'Assunzioni',
          title: 'Assunzioni nella Pubblica Amministrazione',
          subtitle: 'Distribuzione geografica delle assunzioni per regione e provincia italiana',
          color: 'hsl(220, 70%, 45%)',
          secondaryColor: 'hsl(48, 90%, 55%)'
        };
      case 'cessazioni':
        return {
          label: 'Cessazioni',
          title: 'Cessazioni nella Pubblica Amministrazione',
          subtitle: 'Distribuzione geografica delle cessazioni per regione e provincia italiana',
          color: 'hsl(0, 55%, 45%)',
          secondaryColor: 'hsl(25, 85%, 55%)'
        };
      case 'inquadramento_eta':
        return {
          label: 'Personale',
          title: 'Inquadramento per Età e Genere',
          subtitle: 'Distribuzione del personale per fascia d\'età e genere',
          color: 'hsl(280, 55%, 45%)',
          secondaryColor: 'hsl(280, 40%, 60%)'
        };
      case 'inquadramento':
        return {
          label: 'Personale',
          title: 'Inquadramento del Personale PA',
          subtitle: 'Distribuzione per qualifica, comparto e amministrazione',
          color: 'hsl(160, 55%, 35%)',
          secondaryColor: 'hsl(160, 40%, 50%)'
        };
    }
  };

  const modeConfig = getModeConfig();

  // Get distribution data for charts - DYNAMIC based on selection level
  // For inquadramento_eta mode - now dynamic based on selection (like inquadramento mode)
  const effectiveProvinceEta = filters.provincia || selectedProvince;
  
  const compartoDataEta = useMemo(() => {
    if (dataMode !== 'inquadramento_eta') return [];
    if (effectiveProvinceEta) {
      return getCompartoDistributionByProvince(effectiveProvinceEta).slice(0, 5);
    }
    if (selectedRegion) {
      return getCompartoDistributionByRegion(selectedRegion).slice(0, 5);
    }
    return getCompartoDistribution().slice(0, 5);
  }, [dataMode, selectedRegion, effectiveProvinceEta]);

  const inquadramentoDistDataEta = useMemo(() => {
    if (dataMode !== 'inquadramento_eta') return [];
    if (effectiveProvinceEta) {
      return getInquadramentoDistributionByProvince(effectiveProvinceEta).slice(0, 8);
    }
    if (selectedRegion) {
      return getInquadramentoDistributionByRegion(selectedRegion).slice(0, 8);
    }
    return getInquadramentoDistribution().slice(0, 8);
  }, [dataMode, selectedRegion, effectiveProvinceEta]);

  // For inquadramento mode - dynamic based on selection (nacional -> regional -> provincial)
  const compartoData = useMemo(() => {
    if (dataMode !== 'inquadramento') return [];
    if (selectedProvince) {
      return getCompartoDistributionByProvince(selectedProvince).slice(0, 5);
    }
    if (selectedRegion) {
      return getCompartoDistributionByRegion(selectedRegion).slice(0, 5);
    }
    return getCompartoDistribution().slice(0, 5);
  }, [dataMode, selectedRegion, selectedProvince]);

  const inquadramentoDistData = useMemo(() => {
    if (dataMode !== 'inquadramento') return [];
    if (selectedProvince) {
      return getInquadramentoDistributionByProvince(selectedProvince).slice(0, 8);
    }
    if (selectedRegion) {
      return getInquadramentoDistributionByRegion(selectedRegion).slice(0, 8);
    }
    return getInquadramentoDistribution().slice(0, 8);
  }, [dataMode, selectedRegion, selectedProvince]);

  const amministrazioneData = useMemo(() => {
    if (dataMode !== 'inquadramento') return [];
    if (selectedProvince) {
      return getAmministrazioneDistributionByProvince(selectedProvince).slice(0, 6);
    }
    if (selectedRegion) {
      return getAmministrazioneDistributionByRegion(selectedRegion).slice(0, 6);
    }
    return getAmministrazioneDistribution().slice(0, 6);
  }, [dataMode, selectedRegion, selectedProvince]);

  // Get treemap data for inquadramento mode
  // Get the current scope label for inquadramento mode
  const inquadramentoScopeLabel = useMemo(() => {
    const effectiveProvince = filters.provincia || selectedProvince;
    if (effectiveProvince) return effectiveProvince;
    if (selectedRegion) return selectedRegion;
    return 'Italia';
  }, [selectedRegion, selectedProvince, filters.provincia]);


  // Animation variants for staggered children - enhanced for smooth transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Chart transition variants for smooth data updates
  const chartTransitionVariants = {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.98, 
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const isInquadramentoMode = dataMode === 'inquadramento' || dataMode === 'inquadramento_eta';

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
            dataByMonthYear={dataAvailabilityMap}
          />
        </div>

        {/* Contenuto principale */}
        <div className="flex-1 space-y-8">
        {/* Internal Tabs */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 p-1.5 bg-secondary/50 rounded-2xl overflow-x-auto">
            {internalTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = dataMode === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleModeChange(tab.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap min-w-fit",
                    isActive 
                      ? "text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeInternalTab"
                      className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.name}</span>
                    <span className="sm:hidden">{tab.name.split('/')[0]}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
        
        {/* Mobile Calendar - only visible on smaller screens */}
        <div className="lg:hidden mb-4">
          <CalendarPicker
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            availableYears={availableYears}
            availableMonths={availableMonths}
            onSelect={handleCalendarSelect}
            dataByMonthYear={dataAvailabilityMap}
          />
        </div>
      
      {/* Breadcrumb Navigation */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 text-sm">
          <button 
            onClick={() => { setSelectedRegion(null); setSelectedProvince(null); }}
            className={`hover:underline transition-colors ${
              !selectedRegion ? 'text-foreground font-semibold' : 'text-primary cursor-pointer'
            }`}
            disabled={!selectedRegion}
          >
            Italia
          </button>
          {selectedRegion && (
            <>
              <span className="text-muted-foreground">&gt;</span>
              <button 
                onClick={() => { setSelectedProvince(null); }}
                className={`hover:underline transition-colors ${
                  !(filters.provincia || selectedProvince) ? 'text-foreground font-semibold' : 'text-primary cursor-pointer'
                }`}
                disabled={!(filters.provincia || selectedProvince)}
              >
                {selectedRegion}
              </button>
            </>
          )}
          {(filters.provincia || selectedProvince) && (
            <>
              <span className="text-muted-foreground">&gt;</span>
              <span className="text-foreground font-semibold">
                {filters.provincia || selectedProvince}
              </span>
            </>
          )}
        </div>
      </motion.div>

      {/* Filters */}
      <DataFilters 
        dataMode={dataMode}
        filters={filters}
        onFilterChange={setFilters}
        availableComparti={availableComparti}
        availableProvinces={availableProvinces}
        selectedRegion={selectedRegion}
        onResetGeo={() => { setSelectedRegion(null); setSelectedProvince(null); }}
      />

      {/* KPI Stats */}
      <motion.div 
        className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StatCard
          title="Regioni"
          value={getRegions().length}
          icon={MapPin}
          description="Regioni italiane"
          delay={0}
        />
        <StatCard
          title="Province"
          value={provincesCount}
          icon={MapPin}
          description="Province attive"
          delay={1}
        />
        <StatCard
          title={modeConfig.label}
          value={totalCount}
          icon={TrendingUp}
          description={`Totale ${modeConfig.label.toLowerCase()}`}
          delay={2}
        />
        <StatCard
          title="Selezionate"
          value={(filters.provincia || selectedProvince) ? 1 : selectedRegion ? provinceData.length : '-'}
          icon={Users}
          description="Province selezionate"
          delay={3}
        />
      </motion.div>

      {/* Main content - Different layout based on mode */}
      {dataMode === 'inquadramento' ? (
        /* Inquadramento mode: BarChart + Map side by side, then Treemap + Pie + Administration charts below */
        <>
          <motion.div 
            className="grid gap-6 grid-cols-1 lg:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Bar Chart Card - LEFT - Dynamic based on selection */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <motion.span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: 'hsl(45, 85%, 55%)' }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={inquadramentoScopeLabel}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        Top Qualifiche
                        <span className="text-sm font-normal text-muted-foreground">
                          ({inquadramentoScopeLabel})
                        </span>
                      </motion.span>
                    </AnimatePresence>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`bar-${inquadramentoScopeLabel}`}
                      className="h-[500px] md:h-[600px]"
                      variants={chartTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <EnhancedBarChart data={inquadramentoDistData} />
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map Card - RIGHT */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <motion.span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: modeConfig.color }}
                    />
                    Mappa delle Regioni
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[500px] md:h-[600px]">
                    <InteractiveItalyMap
                      selectedRegion={selectedRegion}
                      onRegionClick={handleRegionClick}
                      onProvinceClick={handleProvinceClick}
                      selectedProvince={filters.provincia || selectedProvince}
                      regionData={regionData}
                      provinceData={provinceAggregates}
                      dataMode={dataMode}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Second row: Pie Chart + Administration Chart */}
          <motion.div 
            className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Comparto Distribution Pie Chart */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <motion.span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: 'hsl(180, 55%, 40%)' }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`comparto-${inquadramentoScopeLabel}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        Distribuzione per Comparto
                        <span className="text-sm font-normal text-muted-foreground">
                          ({inquadramentoScopeLabel})
                        </span>
                      </motion.span>
                    </AnimatePresence>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`pie-${inquadramentoScopeLabel}`}
                      className="h-[350px]"
                      variants={chartTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <EnhancedPieChart data={compartoData} />
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Administration Chart */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <motion.span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: 'hsl(220, 70%, 50%)' }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`admin-${inquadramentoScopeLabel}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        Top Amministrazioni
                        <span className="text-sm font-normal text-muted-foreground">
                          ({inquadramentoScopeLabel})
                        </span>
                      </motion.span>
                    </AnimatePresence>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`admin-chart-${inquadramentoScopeLabel}`}
                      className="h-[350px]"
                      variants={chartTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <AdministrationChart data={amministrazioneData} title="" />
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </>
      ) : (
        /* Other modes: PointChart + Map side by side */
        <>
          <motion.div 
            className="grid gap-6 grid-cols-1 lg:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Point Chart Card - LEFT */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <motion.span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: modeConfig.secondaryColor }}
                      layoutId="chart-indicator"
                      transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={dataMode}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        Dettaglio Province
                      </motion.span>
                    </AnimatePresence>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[500px] md:h-[600px]">
                    <PointChart
                      data={provinceData}
                      selectedRegion={selectedRegion}
                      selectedProvince={filters.provincia || selectedProvince}
                      dataMode={dataMode}
                      regionalData={regionalData}
                      genderFilter={filters.sesso as 'M' | 'F' | null}
                      onLocationClick={handleChartLocationClick}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map Card - RIGHT */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <motion.span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: modeConfig.color }}
                      layoutId="map-indicator"
                      transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={dataMode}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        Mappa delle Regioni
                      </motion.span>
                    </AnimatePresence>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[500px] md:h-[600px]">
                    <InteractiveItalyMap
                      selectedRegion={selectedRegion}
                      onRegionClick={handleRegionClick}
                      onProvinceClick={handleProvinceClick}
                      selectedProvince={filters.provincia || selectedProvince}
                      regionData={regionData}
                      provinceData={provinceAggregates}
                      dataMode={dataMode}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Additional charts for inquadramento_eta mode */}
          {dataMode === 'inquadramento_eta' && (
            <motion.div 
              className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Comparto Distribution Pie Chart */}
              <motion.div variants={itemVariants}>
                <Card className="overflow-hidden h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <motion.span 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: 'hsl(180, 55%, 40%)' }}
                      />
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`comparto-eta-${inquadramentoScopeLabel}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-2"
                        >
                          Distribuzione per Comparto
                          <span className="text-sm font-normal text-muted-foreground">
                            ({inquadramentoScopeLabel})
                          </span>
                        </motion.span>
                      </AnimatePresence>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={`pie-eta-${inquadramentoScopeLabel}`}
                        className="h-[350px]"
                        variants={chartTransitionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <EnhancedPieChart data={compartoDataEta} />
                      </motion.div>
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Inquadramento Bar Chart */}
              <motion.div variants={itemVariants}>
                <Card className="overflow-hidden h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <motion.span 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: 'hsl(45, 85%, 55%)' }}
                      />
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`qualifiche-eta-${inquadramentoScopeLabel}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-2"
                        >
                          Top Qualifiche
                          <span className="text-sm font-normal text-muted-foreground">
                            ({inquadramentoScopeLabel})
                          </span>
                        </motion.span>
                      </AnimatePresence>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={`bar-eta-${inquadramentoScopeLabel}`}
                        className="h-[350px]"
                        variants={chartTransitionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <EnhancedBarChart data={inquadramentoDistDataEta} />
                      </motion.div>
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
      </div>
    </motion.div>
    </div>
  );
};

export default Index;
