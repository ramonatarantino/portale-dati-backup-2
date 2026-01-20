export interface DemographicRecord {
  comune_della_sede: string;
  amministrazione: string;
  eta_min: number;
  eta_max: number | null;
  sesso: 'F' | 'M';
  numero_unita_organizzative: number;
  numero_rapporti_lavoro: number;
  anno: number;
  mese: number;
}

export interface AgeGroup {
  label: string;
  eta_min: number;
  eta_max: number | null;
}

export const AGE_GROUPS: AgeGroup[] = [
  { label: '18-24', eta_min: 18, eta_max: 24 },
  { label: '25-34', eta_min: 25, eta_max: 34 },
  { label: '35-44', eta_min: 35, eta_max: 44 },
  { label: '45-54', eta_min: 45, eta_max: 54 },
  { label: '55-64', eta_min: 55, eta_max: 64 },
  { label: '65+', eta_min: 65, eta_max: null },
];

// Generate sample data with temporal dimension
function generateTemporalData(): DemographicRecord[] {
  const comuni = [
    'ABANO TERME',
    'ABBADIA SAN SALVATORE', 
    'ABBASANTA',
    'ROMA',
    'MILANO',
    'NAPOLI',
  ];
  
  const amministrazioni = [
    'MINISTERO DELL\'ISTRUZIONE E DEL MERITO',
    'MINISTERO DELL\'INTERNO',
    'MINISTERO DELLA SALUTE',
    'MINISTERO DELL\'ECONOMIA E DELLE FINANZE',
  ];

  const data: DemographicRecord[] = [];
  
  // Generate data for 2024-2025
  for (let anno = 2024; anno <= 2025; anno++) {
    const maxMese = anno === 2025 ? 6 : 12;
    for (let mese = 1; mese <= maxMese; mese++) {
      comuni.forEach(comune => {
        const numAmm = comune === 'ROMA' ? 4 : comune === 'MILANO' ? 3 : 2;
        amministrazioni.slice(0, numAmm).forEach(amm => {
          AGE_GROUPS.forEach(ag => {
            // Base values with some variation
            const baseM = Math.floor(Math.random() * 50) + 10;
            const baseF = Math.floor(Math.random() * 80) + 20;
            
            // Add temporal trend (slight growth)
            const monthIndex = (anno - 2024) * 12 + mese;
            const trendFactor = 1 + (monthIndex * 0.01);
            
            // Age distribution bias
            let ageFactor = 1;
            if (ag.eta_min >= 45) ageFactor = 1.5;
            if (ag.eta_min >= 55) ageFactor = 1.8;
            if (ag.eta_min <= 24) ageFactor = 0.5;

            // Male
            data.push({
              comune_della_sede: comune,
              amministrazione: amm,
              eta_min: ag.eta_min,
              eta_max: ag.eta_max,
              sesso: 'M',
              numero_unita_organizzative: Math.floor(Math.random() * 5) + 1,
              numero_rapporti_lavoro: Math.floor(baseM * trendFactor * ageFactor),
              anno,
              mese,
            });

            // Female
            data.push({
              comune_della_sede: comune,
              amministrazione: amm,
              eta_min: ag.eta_min,
              eta_max: ag.eta_max,
              sesso: 'F',
              numero_unita_organizzative: Math.floor(Math.random() * 5) + 1,
              numero_rapporti_lavoro: Math.floor(baseF * trendFactor * ageFactor),
              anno,
              mese,
            });
          });
        });
      });
    }
  }

  return data;
}

export const demographicData = generateTemporalData();

export const getUniqueComuni = () => [...new Set(demographicData.map(d => d.comune_della_sede))].sort();
export const getUniqueAmministrazioni = () => [...new Set(demographicData.map(d => d.amministrazione))].sort();

export const getTimePoints = () => {
  const points = new Set<string>();
  demographicData.forEach(d => {
    points.add(`${d.anno}-${String(d.mese).padStart(2, '0')}`);
  });
  return [...points].sort();
};

export interface PyramidData {
  ageGroup: string;
  male: number;
  female: number;
  eta_min: number;
}

export interface TrendData {
  period: string;
  total: number;
  under35: number;
  over55: number;
  percentUnder35: number;
  percentOver55: number;
}

export function filterData(
  data: DemographicRecord[],
  filters: {
    comune?: string;
    amministrazione?: string;
    anno: number;
    mese: number;
  }
): DemographicRecord[] {
  return data.filter(d => {
    if (filters.comune && filters.comune !== 'ALL' && d.comune_della_sede !== filters.comune) return false;
    if (filters.amministrazione && filters.amministrazione !== 'ALL' && d.amministrazione !== filters.amministrazione) return false;
    if (d.anno !== filters.anno || d.mese !== filters.mese) return false;
    return true;
  });
}

export function aggregateToPyramid(data: DemographicRecord[]): PyramidData[] {
  const grouped: Record<string, { male: number; female: number; eta_min: number }> = {};

  AGE_GROUPS.forEach(ag => {
    grouped[ag.label] = { male: 0, female: 0, eta_min: ag.eta_min };
  });

  data.forEach(record => {
    const ageGroup = AGE_GROUPS.find(
      ag => ag.eta_min === record.eta_min
    );
    if (ageGroup) {
      if (record.sesso === 'M') {
        grouped[ageGroup.label].male += record.numero_rapporti_lavoro;
      } else {
        grouped[ageGroup.label].female += record.numero_rapporti_lavoro;
      }
    }
  });

  return AGE_GROUPS.map(ag => ({
    ageGroup: ag.label,
    male: grouped[ag.label].male,
    female: grouped[ag.label].female,
    eta_min: ag.eta_min,
  }));
}

export function calculateTrends(
  data: DemographicRecord[],
  filters: { comune?: string; amministrazione?: string }
): TrendData[] {
  const timePoints = getTimePoints();
  
  return timePoints.map(period => {
    const [anno, mese] = period.split('-').map(Number);
    const filtered = data.filter(d => {
      if (filters.comune && filters.comune !== 'ALL' && d.comune_della_sede !== filters.comune) return false;
      if (filters.amministrazione && filters.amministrazione !== 'ALL' && d.amministrazione !== filters.amministrazione) return false;
      return d.anno === anno && d.mese === mese;
    });

    const total = filtered.reduce((sum, d) => sum + d.numero_rapporti_lavoro, 0);
    const under35 = filtered
      .filter(d => d.eta_min < 35)
      .reduce((sum, d) => sum + d.numero_rapporti_lavoro, 0);
    const over55 = filtered
      .filter(d => d.eta_min >= 55)
      .reduce((sum, d) => sum + d.numero_rapporti_lavoro, 0);

    return {
      period,
      total,
      under35,
      over55,
      percentUnder35: total > 0 ? (under35 / total) * 100 : 0,
      percentOver55: total > 0 ? (over55 / total) * 100 : 0,
    };
  });
}