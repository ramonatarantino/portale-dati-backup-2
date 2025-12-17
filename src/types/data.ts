export interface DataRecord {
  provincia_di_residenza: string;
  amministrazione: string;
  eta_min: number;
  eta_max: number;
  sesso: 'F' | 'M';
  numero: number;
  anno?: number;
  mese?: number;
  regione?: string;
  ente?: string;
  credenziale_usata?: string;
  numero_accessi?: number;
}

// Dataset per Attivazioni/Cessazioni
export interface AttivazioneCessazioneRecord {
  anno: number;
  amministrazione: string;
  regione: string;
  provincia: string;
  attivazioni: number;
  cessazioni: number;
}

// Dataset per Spesa Retribuzioni
export interface SpesaRetribuzioniRecord {
  anno: number;
  mese?: number;
  amministrazione: string;
  regione: string;
  provincia: string;
  spesa_totale: number;
  numero_dipendenti: number;
}

// Dataset per Statistiche Accessi
export interface AccessiRecord {
  regione: string;
  ente: string;
  sesso: 'F' | 'M';
  eta_min: number;
  eta_max: number;
  credenziale_usata: string;
  numero_accessi: number;
  anno?: number;
  mese?: number;
}

export interface AggregatedByProvince {
  provincia: string;
  regione?: string;
  totale: number;
  maschi: number;
  femmine: number;
}

export interface AggregatedByRegione {
  regione: string;
  totale: number;
  province: AggregatedByProvince[];
}

export interface AggregatedByAge {
  fascia: string;
  totale: number;
  maschi: number;
  femmine: number;
}

export interface AggregatedByAdmin {
  amministrazione: string;
  totale: number;
}

export interface FilterState {
  province: string[];
  amministrazioni: string[];
  sesso: ('F' | 'M')[];
  fasce: string[];
  anno: number | null;
  mese: number | null;
}

// Tipi di dataset disponibili
export type DatasetType = 
  | 'distribuzione' 
  | 'accessi' 
  | 'attivazioni' 
  | 'spesa';

export interface DatasetInfo {
  id: DatasetType;
  name: string;
  description: string;
  icon: string;
}

export const DATASETS: DatasetInfo[] = [
  {
    id: 'distribuzione',
    name: 'Distribuzione Amministrati',
    description: 'Distribuzione per provincia, età e sesso',
    icon: 'Users'
  },
  {
    id: 'accessi',
    name: 'Statistiche Accessi',
    description: 'Accessi per regione, ente e credenziali',
    icon: 'Key'
  },
  {
    id: 'attivazioni',
    name: 'Attivazioni / Cessazioni',
    description: 'Rapporti di lavoro attivati e cessati',
    icon: 'TrendingUp'
  },
  {
    id: 'spesa',
    name: 'Spesa Retribuzioni',
    description: 'Spesa per retribuzioni del personale',
    icon: 'Euro'
  }
];

// Helper function for month/year keys
export function createMonthYearKey(year: number, month: number): string {
  return `${year}-${month.toString().padStart(2, '0')}`;
}