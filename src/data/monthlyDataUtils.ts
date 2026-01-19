// Monthly data multipliers for simulating temporal variations
// Base data represents annual averages, these multipliers adjust by month

export interface MonthlyMultipliers {
  assunzioni: number[];
  cessazioni: number[];
  inquadramento: number[];
}

// Monthly patterns based on typical public administration hiring/termination cycles
// January = index 0, December = index 11
export const monthlyMultipliers: MonthlyMultipliers = {
  // Hiring peaks in September (school year) and January (new fiscal year)
  assunzioni: [
    1.15,  // Gennaio - nuovo anno fiscale
    0.85,  // Febbraio
    0.90,  // Marzo
    0.95,  // Aprile
    0.80,  // Maggio
    0.70,  // Giugno
    0.65,  // Luglio
    0.55,  // Agosto
    1.45,  // Settembre - inizio anno scolastico
    1.10,  // Ottobre
    0.95,  // Novembre
    0.95,  // Dicembre
  ],
  // Terminations peak in August/September and December/January
  cessazioni: [
    1.10,  // Gennaio
    0.80,  // Febbraio
    0.85,  // Marzo
    0.90,  // Aprile
    0.85,  // Maggio
    1.20,  // Giugno - fine anno scolastico
    1.15,  // Luglio
    1.35,  // Agosto - fine contratti estivi
    1.25,  // Settembre
    0.90,  // Ottobre
    0.85,  // Novembre
    0.80,  // Dicembre
  ],
  // Staffing relatively stable, slight variations
  inquadramento: [
    1.00,  // Gennaio
    1.00,  // Febbraio
    1.01,  // Marzo
    1.01,  // Aprile
    1.02,  // Maggio
    1.02,  // Giugno
    1.01,  // Luglio
    0.98,  // Agosto
    1.03,  // Settembre
    1.02,  // Ottobre
    1.01,  // Novembre
    1.00,  // Dicembre
  ],
};

// Year-over-year growth factors - now generates for any year
export const getYearlyGrowthFactor = (year: number): number => {
  const baseYear = 2024;
  const growthRate = 0.03; // 3% annual growth
  const yearDiff = year - baseYear;
  return Math.pow(1 + growthRate, yearDiff);
};

// All months are available for any year (synthetic data)
export const availableYears = [2024, 2025];

// Get all 12 months for any year
export const getAvailableMonthsForYear = (year: number): number[] => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
};

// Get multiplier for a specific month/year combination
// Now always returns a valid multiplier for any month/year
export const getDataMultiplier = (
  dataType: 'assunzioni' | 'cessazioni' | 'inquadramento' | 'inquadramento_eta',
  year: number,
  month: number
): number => {
  const type = dataType === 'inquadramento_eta' ? 'inquadramento' : dataType;
  const monthIndex = (month - 1) % 12; // Ensure valid index
  const monthMultiplier = monthlyMultipliers[type][monthIndex] || 1.0;
  const yearMultiplier = getYearlyGrowthFactor(year);
  
  // Add some deterministic variation based on year-month combination
  const seed = year * 100 + month;
  const variation = (Math.sin(seed * 0.1) * 0.05) + 1; // ±5% variation
  
  return monthMultiplier * yearMultiplier * variation;
};

// Apply multiplier to a numeric value with some randomization for realism
export const applyMultiplier = (value: number, multiplier: number, seed: number = 0): number => {
  // Add small deterministic variation
  const variation = 1 + (Math.sin(seed * 0.7) * 0.02); // ±2% variation
  return Math.round(value * multiplier * variation);
};

// Generate data availability map for CalendarPicker
// Now all months for all years have data
export const getDataAvailabilityMap = (): Record<string, boolean> => {
  const map: Record<string, boolean> = {};
  
  availableYears.forEach(year => {
    for (let month = 1; month <= 12; month++) {
      const key = `${year}-${month.toString().padStart(2, '0')}`;
      map[key] = true;
    }
  });
  
  return map;
};

// Check if a month/year combination has data - now always true for valid years
export const hasDataForPeriod = (year: number, month: number): boolean => {
  return availableYears.includes(year) && month >= 1 && month <= 12;
};

// Format period for display
export const formatPeriod = (year: number | null, month: number | null): string => {
  if (!year || !month) return 'Tutti i periodi';
  
  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];
  
  return `${monthNames[month - 1]} ${year}`;
};
