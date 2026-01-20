// Inquadramento data - staffing classification data
import { provinceToRegion, getProvinceByRegion } from './assunzioniData';

// Basic inquadramento record (without age/gender)
export interface InquadramentoRecord {
  provincia: string;
  amministrazione: string;
  comparto: string;
  inquadramento: string;
  numero: number;
}

// Detailed inquadramento record (with age/gender)
export interface InquadramentoDetailRecord {
  provincia: string;
  amministrazione: string;
  eta_min: number;
  eta_max: number;
  sesso: 'M' | 'F';
  comparto: string;
  inquadramento: string;
  numero: number;
}

// Helper function to generate standardized inquadramento data for a province
function generateProvinceData(provincia: string, multiplier: number): InquadramentoRecord[] {
  const baseData: Omit<InquadramentoRecord, 'provincia'>[] = [
    { amministrazione: 'AGENZIA DELLE ENTRATE', comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : FUNZIONARI-ENTRATE-EX III F 4', numero: Math.round(85 * multiplier) },
    { amministrazione: 'AGENZIA DELLE ENTRATE', comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : FUNZIONARI-ENTRATE-EX III F 3', numero: Math.round(62 * multiplier) },
    { amministrazione: 'AGENZIA DELLE ENTRATE', comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : ASSISTENTI-ENTRATE- EX II F 6', numero: Math.round(45 * multiplier) },
    { amministrazione: 'AGENZIA DELLE ENTRATE', comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : FUNZIONARI-ENTRATE-EX III F 5', numero: Math.round(38 * multiplier) },
    { amministrazione: 'AGENZIA DELLE DOGANE', comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : FUNZIONARI-DOGANE- EX III F 3', numero: Math.round(28 * multiplier) },
    { amministrazione: 'AGENZIA DELLE DOGANE', comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : ASSISTENTI-DOGANE- EX II F 4', numero: Math.round(22 * multiplier) },
    { amministrazione: "MINISTERO DELL'INTERNO", comparto: 'PERSONALE DIFESA SICUREZZA E SOCCORSO PUBBLICO', inquadramento: 'QUALIFICA : ISPETTORE', numero: Math.round(95 * multiplier) },
    { amministrazione: "MINISTERO DELL'INTERNO", comparto: 'PERSONALE DIFESA SICUREZZA E SOCCORSO PUBBLICO', inquadramento: 'QUALIFICA : AGENTE SCELTO', numero: Math.round(120 * multiplier) },
    { amministrazione: "MINISTERO DELL'INTERNO", comparto: 'PERSONALE DIFESA SICUREZZA E SOCCORSO PUBBLICO', inquadramento: 'QUALIFICA : COMMISSARIO', numero: Math.round(35 * multiplier) },
    { amministrazione: "MINISTERO DELL'INTERNO", comparto: 'PERSONALE DIFESA SICUREZZA E SOCCORSO PUBBLICO', inquadramento: 'QUALIFICA : AGENTE', numero: Math.round(88 * multiplier) },
    { amministrazione: 'MINISTERO DELLA GIUSTIZIA', comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : FUNZIONARIO GIUDIZIARIO', numero: Math.round(55 * multiplier) },
    { amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : FUNZIONARIO', numero: Math.round(42 * multiplier) },
    { amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : DIRIGENTE', numero: Math.round(8 * multiplier) },
    { amministrazione: 'MINISTERO DELLA DIFESA', comparto: 'PERSONALE DIFESA SICUREZZA E SOCCORSO PUBBLICO', inquadramento: 'QUALIFICA : UFFICIALE', numero: Math.round(25 * multiplier) },
    { amministrazione: 'MINISTERO DELLA DIFESA', comparto: 'PERSONALE DIFESA SICUREZZA E SOCCORSO PUBBLICO', inquadramento: 'QUALIFICA : SOTTUFFICIALE', numero: Math.round(65 * multiplier) },
    { amministrazione: 'MINISTERO DELLA SALUTE', comparto: 'COMPARTO SANITA', inquadramento: 'QUALIFICA : DIRIGENTE MEDICO', numero: Math.round(18 * multiplier) },
    { amministrazione: 'MINISTERO DELLA SALUTE', comparto: 'COMPARTO SANITA', inquadramento: 'QUALIFICA : INFERMIERE', numero: Math.round(45 * multiplier) },
  ];
  
  return baseData.map(d => ({ ...d, provincia }));
}

// Helper function to generate detailed data with age/gender breakdown
function generateProvinceDetailData(provincia: string, multiplier: number): InquadramentoDetailRecord[] {
  const ageGroups: [number, number][] = [[25, 34], [35, 44], [45, 54], [55, 64], [65, 70]];
  const genders: ('M' | 'F')[] = ['M', 'F'];
  
  const baseEntries: Omit<InquadramentoDetailRecord, 'provincia' | 'eta_min' | 'eta_max' | 'sesso' | 'numero'>[] = [
    { amministrazione: 'AGENZIA DELLE ENTRATE', comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : FUNZIONARI-ENTRATE-EX III F 4' },
    { amministrazione: 'AGENZIA DELLE ENTRATE', comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : FUNZIONARI-ENTRATE-EX III F 3' },
    { amministrazione: 'AGENZIA DELLE ENTRATE', comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : ASSISTENTI-ENTRATE- EX II F 6' },
    { amministrazione: "MINISTERO DELL'INTERNO", comparto: 'PERSONALE DIFESA SICUREZZA E SOCCORSO PUBBLICO', inquadramento: 'QUALIFICA : ISPETTORE' },
    { amministrazione: "MINISTERO DELL'INTERNO", comparto: 'PERSONALE DIFESA SICUREZZA E SOCCORSO PUBBLICO', inquadramento: 'QUALIFICA : AGENTE SCELTO' },
    { amministrazione: "MINISTERO DELL'INTERNO", comparto: 'PERSONALE DIFESA SICUREZZA E SOCCORSO PUBBLICO', inquadramento: 'QUALIFICA : COMMISSARIO' },
    { amministrazione: 'MINISTERO DELLA GIUSTIZIA', comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : FUNZIONARIO GIUDIZIARIO' },
    { amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", comparto: 'COMPARTO FUNZIONI CENTRALI', inquadramento: 'QUALIFICA : FUNZIONARIO' },
    { amministrazione: 'MINISTERO DELLA DIFESA', comparto: 'PERSONALE DIFESA SICUREZZA E SOCCORSO PUBBLICO', inquadramento: 'QUALIFICA : SOTTUFFICIALE' },
    { amministrazione: 'MINISTERO DELLA SALUTE', comparto: 'COMPARTO SANITA', inquadramento: 'QUALIFICA : INFERMIERE' },
  ];
  
  const results: InquadramentoDetailRecord[] = [];
  
  baseEntries.forEach((entry, entryIndex) => {
    // Distribute across age groups with realistic weights
    const ageWeights = [0.12, 0.28, 0.32, 0.22, 0.06]; // More in 35-54 range
    
    ageGroups.forEach(([eta_min, eta_max], ageIndex) => {
      genders.forEach(sesso => {
        // Male/female ratio varies by department
        const genderRatio = entry.comparto.includes('DIFESA') ? (sesso === 'M' ? 0.75 : 0.25) : (sesso === 'M' ? 0.52 : 0.48);
        const baseValue = 15 + (entryIndex * 3);
        const numero = Math.round(baseValue * multiplier * ageWeights[ageIndex] * genderRatio * (0.8 + Math.random() * 0.4));
        
        if (numero > 0) {
          results.push({
            ...entry,
            provincia,
            eta_min,
            eta_max,
            sesso,
            numero
          });
        }
      });
    });
  });
  
  return results;
}

// Province multipliers based on population/importance
const provinceMultipliers: Record<string, number> = {
  // Major cities
  'ROMA': 10.0,
  'MILANO': 7.5,
  'NAPOLI': 5.5,
  'TORINO': 4.0,
  'PALERMO': 3.5,
  'GENOVA': 3.0,
  'BOLOGNA': 2.8,
  'FIRENZE': 2.8,
  'BARI': 2.5,
  'CATANIA': 2.5,
  'VENEZIA': 2.2,
  'VERONA': 2.0,
  'MESSINA': 1.8,
  'PADOVA': 1.8,
  'TRIESTE': 1.6,
  'BRESCIA': 1.8,
  'TARANTO': 1.5,
  'REGGIO CALABRIA': 1.5,
  'MODENA': 1.4,
  'PARMA': 1.3,
  'CAGLIARI': 1.5,
  'LIVORNO': 1.2,
  'PERUGIA': 1.3,
  'SALERNO': 1.6,
  'RAVENNA': 1.1,
  'FERRARA': 1.0,
  'RIMINI': 1.0,
  'SASSARI': 1.2,
  'SIRACUSA': 1.1,
  'PESCARA': 1.1,
  'MONZA E DELLA BRIANZA': 1.4,
  'BERGAMO': 1.5,
  'ANCONA': 1.2,
  'TRENTO': 1.0,
  'BOLZANO': 1.0,
  'LECCE': 1.3,
  'FOGGIA': 1.2,
  'PISA': 1.1,
  'LUCCA': 1.0,
  'AREZZO': 0.9,
  'UDINE': 1.0,
  'LATINA': 1.2,
  'COMO': 1.0,
  'PRATO': 0.9,
  'LA SPEZIA': 0.8,
  'TREVISO': 1.1,
  'VARESE': 1.2,
  'VICENZA': 1.1,
  'COSENZA': 1.0,
  'CATANZARO': 0.9,
  'REGGIO EMILIA': 1.0,
  "L'AQUILA": 0.9,
  'TERAMO': 0.8,
  'CHIETI': 0.8,
  'FROSINONE': 0.9,
  'CASERTA': 1.3,
  'AVELLINO': 0.7,
  'BENEVENTO': 0.6,
  'BRINDISI': 0.8,
  'POTENZA': 0.7,
  'MATERA': 0.5,
  'CROTONE': 0.5,
  'VIBO VALENTIA': 0.4,
  'TRAPANI': 0.8,
  'AGRIGENTO': 0.7,
  'CALTANISSETTA': 0.5,
  'ENNA': 0.4,
  'RAGUSA': 0.6,
  'NUORO': 0.5,
  'ORISTANO': 0.4,
  'SUD SARDEGNA': 0.5,
  'CAMPOBASSO': 0.5,
  'ISERNIA': 0.3,
  'RIETI': 0.4,
  'VITERBO': 0.6,
  'TERNI': 0.5,
  'MACERATA': 0.6,
  'ASCOLI PICENO': 0.5,
  'FERMO': 0.4,
  'PESARO E URBINO': 0.7,
  'GROSSETO': 0.5,
  'SIENA': 0.6,
  'PISTOIA': 0.6,
  'MASSA-CARRARA': 0.4,
  'PIACENZA': 0.6,
  'FORLI-CESENA': 0.7,
  "FORLI'-CESENA": 0.7,
  'ROVIGO': 0.4,
  'BELLUNO': 0.4,
  'PORDENONE': 0.6,
  'GORIZIA': 0.4,
  'SAVONA': 0.5,
  'IMPERIA': 0.4,
  'SONDRIO': 0.4,
  'LODI': 0.5,
  'CREMONA': 0.6,
  'MANTOVA': 0.6,
  'LECCO': 0.6,
  'PAVIA': 0.8,
  'ASTI': 0.4,
  'ALESSANDRIA': 0.7,
  'NOVARA': 0.6,
  'CUNEO': 0.8,
  'VERCELLI': 0.4,
  'BIELLA': 0.4,
  'VERBANO-CUSIO-OSSOLA': 0.3,
  'AOSTA': 0.3,
};

// Generate all province data
const allProvinces = Object.keys(provinceToRegion);

export const inquadramentoData: InquadramentoRecord[] = allProvinces.flatMap(provincia => {
  const multiplier = provinceMultipliers[provincia] || 0.5;
  return generateProvinceData(provincia, multiplier);
});

export const inquadramentoDetailData: InquadramentoDetailRecord[] = allProvinces.flatMap(provincia => {
  const multiplier = provinceMultipliers[provincia] || 0.5;
  return generateProvinceDetailData(provincia, multiplier);
});

// Aggregate data by province
export function getInquadramentoProvinciaAggregates(): Record<string, number> {
  const aggregates: Record<string, number> = {};
  
  inquadramentoData.forEach(record => {
    if (!aggregates[record.provincia]) {
      aggregates[record.provincia] = 0;
    }
    aggregates[record.provincia] += record.numero;
  });
  
  return aggregates;
}

// Get province data for a region (without gender - use single count)
export function getInquadramentoRegionProvinceData(region: string): { provincia: string; totale: number }[] {
  const aggregates = getInquadramentoProvinciaAggregates();
  const result: { provincia: string; totale: number }[] = [];
  
  Object.entries(aggregates).forEach(([prov, total]) => {
    if (provinceToRegion[prov] === region) {
      result.push({ provincia: prov, totale: total });
    }
  });
  
  return result.sort((a, b) => b.totale - a.totale);
}

// Get province data with gender breakdown from detailed data
export function getInquadramentoRegionProvinceDataByGender(region: string): { provincia: string; maschi: number; femmine: number; totale: number }[] {
  const genderData: Record<string, { maschi: number; femmine: number }> = {};
  
  inquadramentoDetailData.forEach(record => {
    if (provinceToRegion[record.provincia] === region) {
      if (!genderData[record.provincia]) {
        genderData[record.provincia] = { maschi: 0, femmine: 0 };
      }
      if (record.sesso === 'M') {
        genderData[record.provincia].maschi += record.numero;
      } else {
        genderData[record.provincia].femmine += record.numero;
      }
    }
  });
  
  return Object.entries(genderData)
    .map(([provincia, data]) => ({
      provincia,
      maschi: data.maschi,
      femmine: data.femmine,
      totale: data.maschi + data.femmine
    }))
    .sort((a, b) => b.totale - a.totale);
}

// Get detailed province information for drill-down
export function getInquadramentoProvinceDetails(provincia: string, sesso: 'M' | 'F' | null) {
  const filtered = sesso 
    ? inquadramentoDetailData.filter(r => r.provincia === provincia && r.sesso === sesso)
    : inquadramentoDetailData.filter(r => r.provincia === provincia);
  
  // By age group
  const byEta: Record<string, number> = {};
  filtered.forEach(record => {
    const etaKey = `${record.eta_min}-${record.eta_max}`;
    byEta[etaKey] = (byEta[etaKey] || 0) + record.numero;
  });
  
  // By comparto (instead of motivo)
  const byComparto: Record<string, number> = {};
  filtered.forEach(record => {
    const key = record.comparto.replace('COMPARTO ', '').replace('PERSONALE ', '');
    byComparto[key] = (byComparto[key] || 0) + record.numero;
  });
  
  // By inquadramento
  const byInquadramento: Record<string, number> = {};
  filtered.forEach(record => {
    const key = record.inquadramento.replace('QUALIFICA : ', '');
    byInquadramento[key] = (byInquadramento[key] || 0) + record.numero;
  });
  
  // Top amministrazioni
  const ammTotals: Record<string, number> = {};
  filtered.forEach(record => {
    ammTotals[record.amministrazione] = (ammTotals[record.amministrazione] || 0) + record.numero;
  });
  
  const topAmministrazioni = Object.entries(ammTotals)
    .map(([nome, totale]) => ({ nome, totale }))
    .sort((a, b) => b.totale - a.totale);
  
  return {
    totale: filtered.reduce((sum, r) => sum + r.numero, 0),
    byEta,
    byComparto,
    byInquadramento,
    topAmministrazioni
  };
}

// Get detailed region information for drill-down (aggregated from all provinces)
export function getInquadramentoRegionDetails(region: string, sesso: 'M' | 'F' | null) {
  const filtered = sesso 
    ? inquadramentoDetailData.filter(r => provinceToRegion[r.provincia] === region && r.sesso === sesso)
    : inquadramentoDetailData.filter(r => provinceToRegion[r.provincia] === region);
  
  // By age group
  const byEta: Record<string, number> = {};
  filtered.forEach(record => {
    const etaKey = `${record.eta_min}-${record.eta_max}`;
    byEta[etaKey] = (byEta[etaKey] || 0) + record.numero;
  });
  
  // By comparto (instead of motivo)
  const byComparto: Record<string, number> = {};
  filtered.forEach(record => {
    const key = record.comparto.replace('COMPARTO ', '').replace('PERSONALE ', '');
    byComparto[key] = (byComparto[key] || 0) + record.numero;
  });
  
  // By inquadramento
  const byInquadramento: Record<string, number> = {};
  filtered.forEach(record => {
    const key = record.inquadramento.replace('QUALIFICA : ', '');
    byInquadramento[key] = (byInquadramento[key] || 0) + record.numero;
  });
  
  // Top amministrazioni
  const ammTotals: Record<string, number> = {};
  filtered.forEach(record => {
    ammTotals[record.amministrazione] = (ammTotals[record.amministrazione] || 0) + record.numero;
  });
  
  const topAmministrazioni = Object.entries(ammTotals)
    .map(([nome, totale]) => ({ nome, totale }))
    .sort((a, b) => b.totale - a.totale);
  
  return {
    totale: filtered.reduce((sum, r) => sum + r.numero, 0),
    byEta,
    byComparto,
    byInquadramento,
    topAmministrazioni
  };
}

export interface InquadramentoFilterOptions {
  fasciaEta?: string | null;
  sesso?: string | null;
  comparto?: string | null;
}

// Get unique comparti from the data
export function getAvailableComparti(): string[] {
  const comparti = new Set<string>();
  inquadramentoData.forEach(record => {
    comparti.add(record.comparto);
  });
  return Array.from(comparti).sort();
}

// Helper to check if record matches age filter
const matchesInqAgeFilter = (record: { eta_min: number; eta_max: number }, fasciaEta: string | null): boolean => {
  if (!fasciaEta) return true;
  
  if (fasciaEta === '65+') {
    return record.eta_min >= 65;
  }
  
  const [min, max] = fasciaEta.split('-').map(Number);
  return record.eta_min === min || record.eta_max === max;
};

// Get filtered inquadramento detail data
export function getFilteredInquadramentoDetailData(filters: InquadramentoFilterOptions = {}): InquadramentoDetailRecord[] {
  return inquadramentoDetailData.filter(record => {
    if (filters.sesso && record.sesso !== filters.sesso) return false;
    if (filters.fasciaEta && !matchesInqAgeFilter(record, filters.fasciaEta)) return false;
    if (filters.comparto && record.comparto !== filters.comparto) return false;
    return true;
  });
}

// Get provincia aggregates with filters
export function getInquadramentoProvinciaAggregatesFiltered(filters: InquadramentoFilterOptions = {}): Record<string, number> {
  // If no filters, use basic data
  if (!filters.fasciaEta && !filters.sesso && !filters.comparto) {
    return getInquadramentoProvinciaAggregates();
  }
  
  // Otherwise use filtered detailed data
  const filteredData = getFilteredInquadramentoDetailData(filters);
  const aggregates: Record<string, number> = {};
  
  filteredData.forEach(record => {
    aggregates[record.provincia] = (aggregates[record.provincia] || 0) + record.numero;
  });
  
  return aggregates;
}

// Get province data by gender with filters
export function getInquadramentoRegionProvinceDataByGenderFiltered(region: string, filters: InquadramentoFilterOptions = {}) {
  const provinces = getProvinceByRegion(region);
  const filteredData = getFilteredInquadramentoDetailData(filters);
  
  const genderData: Record<string, { maschi: number; femmine: number }> = {};
  
  filteredData.forEach(record => {
    if (provinces.includes(record.provincia)) {
      if (!genderData[record.provincia]) {
        genderData[record.provincia] = { maschi: 0, femmine: 0 };
      }
      if (record.sesso === 'M') {
        genderData[record.provincia].maschi += record.numero;
      } else {
        genderData[record.provincia].femmine += record.numero;
      }
    }
  });
  
  return Object.entries(genderData)
    .map(([provincia, data]) => ({
      provincia,
      maschi: data.maschi,
      femmine: data.femmine,
      totale: data.maschi + data.femmine
    }))
    .filter(d => d.totale > 0)
    .sort((a, b) => b.totale - a.totale);
}

// Get comparto distribution for the entire dataset
export function getCompartoDistribution(): { comparto: string; count: number }[] {
  const distribution: Record<string, number> = {};
  
  inquadramentoData.forEach(record => {
    const key = record.comparto.replace('COMPARTO ', '').replace('PERSONALE ', '');
    distribution[key] = (distribution[key] || 0) + record.numero;
  });
  
  return Object.entries(distribution)
    .map(([comparto, count]) => ({ comparto, count }))
    .sort((a, b) => b.count - a.count);
}

// Get inquadramento distribution for the entire dataset
export function getInquadramentoDistribution(): { inquadramento: string; count: number }[] {
  const distribution: Record<string, number> = {};
  
  inquadramentoData.forEach(record => {
    const key = record.inquadramento.replace('QUALIFICA : ', '');
    distribution[key] = (distribution[key] || 0) + record.numero;
  });
  
  return Object.entries(distribution)
    .map(([inquadramento, count]) => ({ inquadramento, count }))
    .sort((a, b) => b.count - a.count);
}

// Get inquadramento distribution for a specific region
export function getInquadramentoDistributionByRegion(region: string): { inquadramento: string; count: number }[] {
  const distribution: Record<string, number> = {};
  
  inquadramentoData.forEach(record => {
    if (provinceToRegion[record.provincia] === region) {
      const key = record.inquadramento.replace('QUALIFICA : ', '');
      distribution[key] = (distribution[key] || 0) + record.numero;
    }
  });
  
  return Object.entries(distribution)
    .map(([inquadramento, count]) => ({ inquadramento, count }))
    .sort((a, b) => b.count - a.count);
}

// Get inquadramento distribution for a specific province
export function getInquadramentoDistributionByProvince(provincia: string): { inquadramento: string; count: number }[] {
  const distribution: Record<string, number> = {};
  
  inquadramentoData.forEach(record => {
    if (record.provincia === provincia) {
      const key = record.inquadramento.replace('QUALIFICA : ', '');
      distribution[key] = (distribution[key] || 0) + record.numero;
    }
  });
  
  return Object.entries(distribution)
    .map(([inquadramento, count]) => ({ inquadramento, count }))
    .sort((a, b) => b.count - a.count);
}

// Get comparto distribution for a specific region
export function getCompartoDistributionByRegion(region: string): { comparto: string; count: number }[] {
  const distribution: Record<string, number> = {};
  
  inquadramentoData.forEach(record => {
    if (provinceToRegion[record.provincia] === region) {
      const key = record.comparto.replace('COMPARTO ', '').replace('PERSONALE ', '');
      distribution[key] = (distribution[key] || 0) + record.numero;
    }
  });
  
  return Object.entries(distribution)
    .map(([comparto, count]) => ({ comparto, count }))
    .sort((a, b) => b.count - a.count);
}

// Get comparto distribution for a specific province
export function getCompartoDistributionByProvince(provincia: string): { comparto: string; count: number }[] {
  const distribution: Record<string, number> = {};
  
  inquadramentoData.forEach(record => {
    if (record.provincia === provincia) {
      const key = record.comparto.replace('COMPARTO ', '').replace('PERSONALE ', '');
      distribution[key] = (distribution[key] || 0) + record.numero;
    }
  });
  
  return Object.entries(distribution)
    .map(([comparto, count]) => ({ comparto, count }))
    .sort((a, b) => b.count - a.count);
}

// Get amministrazione distribution for the entire dataset
export function getAmministrazioneDistribution(): { amministrazione: string; count: number }[] {
  const distribution: Record<string, number> = {};
  
  inquadramentoData.forEach(record => {
    distribution[record.amministrazione] = (distribution[record.amministrazione] || 0) + record.numero;
  });
  
  return Object.entries(distribution)
    .map(([amministrazione, count]) => ({ amministrazione, count }))
    .sort((a, b) => b.count - a.count);
}

// Get amministrazione distribution for a specific region
export function getAmministrazioneDistributionByRegion(region: string): { amministrazione: string; count: number }[] {
  const distribution: Record<string, number> = {};
  
  inquadramentoData.forEach(record => {
    if (provinceToRegion[record.provincia] === region) {
      distribution[record.amministrazione] = (distribution[record.amministrazione] || 0) + record.numero;
    }
  });
  
  return Object.entries(distribution)
    .map(([amministrazione, count]) => ({ amministrazione, count }))
    .sort((a, b) => b.count - a.count);
}

// Get amministrazione distribution for a specific province
export function getAmministrazioneDistributionByProvince(provincia: string): { amministrazione: string; count: number }[] {
  const distribution: Record<string, number> = {};
  
  inquadramentoData.forEach(record => {
    if (record.provincia === provincia) {
      distribution[record.amministrazione] = (distribution[record.amministrazione] || 0) + record.numero;
    }
  });
  
  return Object.entries(distribution)
    .map(([amministrazione, count]) => ({ amministrazione, count }))
    .sort((a, b) => b.count - a.count);
}

// Get regional aggregates for bubble chart (when no region is selected)
export function getInquadramentoRegionalAggregatesWithGender(filters: InquadramentoFilterOptions = {}) {
  const filteredData = getFilteredInquadramentoDetailData(filters);
  
  const aggregates: Record<string, { maschi: number; femmine: number }> = {};
  
  filteredData.forEach(record => {
    const region = provinceToRegion[record.provincia];
    if (region) {
      if (!aggregates[region]) {
        aggregates[region] = { maschi: 0, femmine: 0 };
      }
      if (record.sesso === 'M') {
        aggregates[region].maschi += record.numero;
      } else {
        aggregates[region].femmine += record.numero;
      }
    }
  });
  
  return Object.entries(aggregates)
    .map(([provincia, data]) => ({
      provincia,
      maschi: data.maschi,
      femmine: data.femmine,
      totale: data.maschi + data.femmine,
    }))
    .filter(d => d.totale > 0)
    .sort((a, b) => b.totale - a.totale);
}

// Treemap data structure
interface TreemapNode {
  name: string;
  value: number;
  children?: TreemapNode[];
}

// Get treemap data: comparto -> inquadramento -> amministrazione hierarchy
export function getTreemapData(region?: string | null, provincia?: string | null): TreemapNode[] {
  // Filter data based on scope
  const filteredData = inquadramentoData.filter(record => {
    if (provincia) return record.provincia === provincia;
    if (region) return provinceToRegion[record.provincia] === region;
    return true;
  });

  // Build hierarchy: comparto -> inquadramento -> amministrazione
  const compartoMap = new Map<string, Map<string, Map<string, number>>>();

  filteredData.forEach(record => {
    const compartoKey = record.comparto.replace('COMPARTO ', '').replace('PERSONALE ', '');
    const inquadramentoKey = record.inquadramento.replace('QUALIFICA : ', '');
    const ammKey = record.amministrazione;

    if (!compartoMap.has(compartoKey)) {
      compartoMap.set(compartoKey, new Map());
    }
    const inquadramentoMap = compartoMap.get(compartoKey)!;

    if (!inquadramentoMap.has(inquadramentoKey)) {
      inquadramentoMap.set(inquadramentoKey, new Map());
    }
    const ammMap = inquadramentoMap.get(inquadramentoKey)!;

    ammMap.set(ammKey, (ammMap.get(ammKey) || 0) + record.numero);
  });

  // Convert to TreemapNode array
  const result: TreemapNode[] = [];

  compartoMap.forEach((inquadramentoMap, compartoName) => {
    let compartoTotal = 0;
    const inquadramentoChildren: TreemapNode[] = [];

    inquadramentoMap.forEach((ammMap, inquadramentoName) => {
      let inquadramentoTotal = 0;
      const ammChildren: TreemapNode[] = [];

      ammMap.forEach((value, ammName) => {
        ammChildren.push({ name: ammName, value });
        inquadramentoTotal += value;
      });

      inquadramentoChildren.push({
        name: inquadramentoName,
        value: inquadramentoTotal,
        children: ammChildren.sort((a, b) => b.value - a.value).slice(0, 10),
      });
      compartoTotal += inquadramentoTotal;
    });

    result.push({
      name: compartoName,
      value: compartoTotal,
      children: inquadramentoChildren.sort((a, b) => b.value - a.value).slice(0, 8),
    });
  });

  return result.sort((a, b) => b.value - a.value);
}

// Get list of all provinces for filter dropdown
export function getAllProvinces(): string[] {
  const provinces = new Set<string>();
  inquadramentoData.forEach(record => {
    provinces.add(record.provincia);
  });
  return Array.from(provinces).sort();
}

// Get provinces by region for filter dropdown
export function getProvincesByRegionForFilter(region: string): string[] {
  const provinces = new Set<string>();
  inquadramentoData.forEach(record => {
    if (provinceToRegion[record.provincia] === region) {
      provinces.add(record.provincia);
    }
  });
  return Array.from(provinces).sort();
}
