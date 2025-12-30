export interface CategoryData {
  id: string;
  label: string;
  color: string;
}

export interface TimePoint {
  month: string;
  year: number;
  values: Record<string, number>;
}

// Palette blu-oro alternata
export const categories: CategoryData[] = [
  { id: 'totale', label: 'Totale', color: '#D4AA1F' },          // Oro
  { id: 'netto', label: 'Netto', color: '#082B6F' },            // Blu scuro
  { id: 'previdenziali_datore', label: 'Previdenziali datore', color: '#E1B823' },  // Oro
  { id: 'irpef', label: 'IRPEF', color: '#123C88' },            // Blu
  { id: 'previdenziali_lavoratore', label: 'Previdenziali lavoratore', color: '#EAC63A' },  // Oro
  { id: 'irap', label: 'IRAP', color: '#1E55A5' },              // Blu
  { id: 'prestiti', label: 'Prestiti', color: '#F1D45B' },      // Oro chiaro
  { id: 'addizionali_regionali', label: 'Addizionali Regionali', color: '#2F69BC' },  // Blu
  { id: 'addizionali_comunali', label: 'Addizionali Comunali', color: '#F6E085' },    // Oro chiaro
  { id: 'altre_voci', label: 'Altre voci', color: '#4A80D8' },  // Blu chiaro
];

export const months = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

// Sample data simulating 12 months of financial data
export const timelineData: TimePoint[] = [
  {
    month: 'Gennaio',
    year: 2024,
    values: {
      totale: 1073814716,
      netto: 608850866,
      previdenziali_datore: 186842788,
      irpef: 176449718,
      previdenziali_lavoratore: 40409258,
      irap: 35680329,
      prestiti: 19595455,
      addizionali_regionali: 8700762,
      addizionali_comunali: 3103096,
      altre_voci: 1711663,
    },
  },
  {
    month: 'Febbraio',
    year: 2024,
    values: {
      totale: 1095432100,
      netto: 620150200,
      previdenziali_datore: 190542000,
      irpef: 180123500,
      previdenziali_lavoratore: 41200100,
      irap: 36400000,
      prestiti: 20100000,
      addizionali_regionali: 8900500,
      addizionali_comunali: 3200100,
      altre_voci: 1750000,
    },
  },
  {
    month: 'Marzo',
    year: 2024,
    values: {
      totale: 2157120018,
      netto: 1220500000,
      previdenziali_datore: 375000000,
      irpef: 355000000,
      previdenziali_lavoratore: 81000000,
      irap: 71500000,
      prestiti: 39200000,
      addizionali_regionali: 17400000,
      addizionali_comunali: 6200000,
      altre_voci: 3500000,
    },
  },
  {
    month: 'Aprile',
    year: 2024,
    values: {
      totale: 1150000000,
      netto: 650000000,
      previdenziali_datore: 200000000,
      irpef: 189000000,
      previdenziali_lavoratore: 43000000,
      irap: 38000000,
      prestiti: 21000000,
      addizionali_regionali: 9300000,
      addizionali_comunali: 3400000,
      altre_voci: 1800000,
    },
  },
  {
    month: 'Maggio',
    year: 2024,
    values: {
      totale: 1180000000,
      netto: 668000000,
      previdenziali_datore: 205000000,
      irpef: 194000000,
      previdenziali_lavoratore: 44200000,
      irap: 39000000,
      prestiti: 21500000,
      addizionali_regionali: 9500000,
      addizionali_comunali: 3500000,
      altre_voci: 1850000,
    },
  },
  {
    month: 'Giugno',
    year: 2024,
    values: {
      totale: 1220000000,
      netto: 690000000,
      previdenziali_datore: 212000000,
      irpef: 200000000,
      previdenziali_lavoratore: 45600000,
      irap: 40300000,
      prestiti: 22200000,
      addizionali_regionali: 9800000,
      addizionali_comunali: 3600000,
      altre_voci: 1900000,
    },
  },
  {
    month: 'Luglio',
    year: 2024,
    values: {
      totale: 1350000000,
      netto: 765000000,
      previdenziali_datore: 235000000,
      irpef: 222000000,
      previdenziali_lavoratore: 50500000,
      irap: 44700000,
      prestiti: 24600000,
      addizionali_regionali: 10900000,
      addizionali_comunali: 4000000,
      altre_voci: 2100000,
    },
  },
  {
    month: 'Agosto',
    year: 2024,
    values: {
      totale: 1100000000,
      netto: 622000000,
      previdenziali_datore: 191000000,
      irpef: 180500000,
      previdenziali_lavoratore: 41100000,
      irap: 36400000,
      prestiti: 20000000,
      addizionali_regionali: 8900000,
      addizionali_comunali: 3200000,
      altre_voci: 1700000,
    },
  },
  {
    month: 'Settembre',
    year: 2024,
    values: {
      totale: 1200000000,
      netto: 679000000,
      previdenziali_datore: 208000000,
      irpef: 197000000,
      previdenziali_lavoratore: 44900000,
      irap: 39700000,
      prestiti: 21800000,
      addizionali_regionali: 9700000,
      addizionali_comunali: 3500000,
      altre_voci: 1880000,
    },
  },
  {
    month: 'Ottobre',
    year: 2024,
    values: {
      totale: 1170000000,
      netto: 662000000,
      previdenziali_datore: 203000000,
      irpef: 192000000,
      previdenziali_lavoratore: 43800000,
      irap: 38700000,
      prestiti: 21300000,
      addizionali_regionali: 9400000,
      addizionali_comunali: 3450000,
      altre_voci: 1830000,
    },
  },
  {
    month: 'Novembre',
    year: 2024,
    values: {
      totale: 1250000000,
      netto: 708000000,
      previdenziali_datore: 217000000,
      irpef: 205000000,
      previdenziali_lavoratore: 46800000,
      irap: 41300000,
      prestiti: 22700000,
      addizionali_regionali: 10100000,
      addizionali_comunali: 3700000,
      altre_voci: 1950000,
    },
  },
  {
    month: 'Dicembre',
    year: 2024,
    values: {
      totale: 1400000000,
      netto: 793000000,
      previdenziali_datore: 243000000,
      irpef: 230000000,
      previdenziali_lavoratore: 52400000,
      irap: 46300000,
      prestiti: 25500000,
      addizionali_regionali: 11300000,
      addizionali_comunali: 4100000,
      altre_voci: 2200000,
    },
  },
];
