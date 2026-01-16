// Amministrazioni con i colori specifici
export interface Amministrazione {
  id: string;
  label: string;
  sigla: string;
  color: string;
}

export const amministrazioni: Amministrazione[] = [
  { id: 'istruzione', label: "Ministero dell'Istruzione e del Merito", sigla: 'MIM', color: '#082B6F' },
  { id: 'difesa', label: 'Ministero della Difesa', sigla: 'DIF', color: '#123C88' },
  { id: 'interno', label: "Ministero dell'Interno", sigla: 'INT', color: '#1E55A5' },
  { id: 'giustizia', label: 'Ministero della Giustizia', sigla: 'GIU', color: '#2F69BC' },
  { id: 'economia', label: "Ministero dell'Economia e Finanze", sigla: 'MEF', color: '#4A80D8' },
];

// Palette estesa blu + oro per le spese
export const spesaColors = [
  // Blu
  '#082B6F',
  '#123C88',
  '#1E55A5',
  '#2F69BC',
  '#4A80D8',
  // Oro
  '#a67c00',
  '#bf9b30',
  '#ffbf00',
  '#ffcf40',
  '#ffdc73',
];

// Le tipologie di spesa (comuni a tutte le amministrazioni)
export const tipiSpesa = [
  'Netto',
  'IRPEF',
  'IRAP',
  'Addizionali Regionali',
  'Addizionali Comunali',
  'Previdenziali datore',
  'Previdenziali lavoratore',
  'Riscatti',
  'Ritenute Sindacali',
  'Prestiti',
  'Altre voci',
] as const;

export type TipoSpesa = (typeof tipiSpesa)[number];

// Mappa colore per ogni tipo di spesa
export const spesaColorMap: Record<string, string> = {
  'Netto': '#082B6F',
  'IRPEF': '#123C88',
  'IRAP': '#1E55A5',
  'Addizionali Regionali': '#2F69BC',
  'Addizionali Comunali': '#4A80D8',
  'Previdenziali datore': '#5A8FD8',
  'Previdenziali lavoratore': '#6A9ED8',
  'Riscatti': '#7AADD8',
  'Ritenute Sindacali': '#8ABCD8',
  'Prestiti': '#9ACBD8',
  'Altre voci': '#AADAD8',
};

export const months = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

export const anni = [2023, 2024] as const;

export interface TimePoint {
  month: string;
  year: number;
  values: Record<string, Record<string, number>>;
}

// Generazione dati per ogni amministrazione
function generateAmministrazioneData(baseMultiplier: number): Record<string, number> {
  return {
    'Netto': Math.round(580000000 * baseMultiplier),
    'IRPEF': Math.round(168000000 * baseMultiplier),
    'IRAP': Math.round(34000000 * baseMultiplier),
    'Addizionali Regionali': Math.round(8200000 * baseMultiplier),
    'Addizionali Comunali': Math.round(2950000 * baseMultiplier),
    'Previdenziali datore': Math.round(178000000 * baseMultiplier),
    'Previdenziali lavoratore': Math.round(38500000 * baseMultiplier),
    'Riscatti': Math.round(12000000 * baseMultiplier),
    'Ritenute Sindacali': Math.round(5500000 * baseMultiplier),
    'Prestiti': Math.round(18600000 * baseMultiplier),
    'Altre voci': Math.round(1620000 * baseMultiplier),
  };
}

const monthlyMultipliers = [1.0, 1.02, 2.0, 1.06, 1.09, 1.13, 1.25, 1.02, 1.11, 1.08, 1.16, 1.30];
const ammMultipliers: Record<string, number> = {
  istruzione: 1.0,
  difesa: 0.75,
  interno: 0.85,
  giustizia: 0.55,
  economia: 1.2,
};

export const timelineData: TimePoint[] = [];

[2023, 2024].forEach((year) => {
  months.forEach((month, monthIndex) => {
    const yearBoost = year === 2024 ? 1.05 : 1.0;
    const monthMultiplier = monthlyMultipliers[monthIndex] * yearBoost;
    
    const values: Record<string, Record<string, number>> = {};
    
    amministrazioni.forEach((amm) => {
      const baseData = generateAmministrazioneData(ammMultipliers[amm.id] * monthMultiplier);
      const randomVariation = 0.9 + Math.random() * 0.2;
      values[amm.id] = {};
      Object.entries(baseData).forEach(([spesa, val]) => {
        values[amm.id][spesa] = Math.round(val * randomVariation);
      });
    });
    
    timelineData.push({ month, year, values });
  });
});
