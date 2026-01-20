import { DataRecord } from '@/types/data';

// Sample data for demonstration
export const sampleData: DataRecord[] = [
  { provincia_di_residenza: "ROMA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 25, eta_max: 34, sesso: "F", numero: 15234 },
  { provincia_di_residenza: "ROMA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 25, eta_max: 34, sesso: "M", numero: 12456 },
  { provincia_di_residenza: "ROMA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 35, eta_max: 44, sesso: "F", numero: 18932 },
  { provincia_di_residenza: "ROMA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 35, eta_max: 44, sesso: "M", numero: 16234 },
  { provincia_di_residenza: "ROMA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 45, eta_max: 54, sesso: "F", numero: 22456 },
  { provincia_di_residenza: "ROMA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 45, eta_max: 54, sesso: "M", numero: 19876 },
  { provincia_di_residenza: "ROMA", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 18, eta_max: 24, sesso: "F", numero: 3456 },
  { provincia_di_residenza: "ROMA", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 18, eta_max: 24, sesso: "M", numero: 5678 },
  { provincia_di_residenza: "ROMA", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 25, eta_max: 34, sesso: "F", numero: 8765 },
  { provincia_di_residenza: "ROMA", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 25, eta_max: 34, sesso: "M", numero: 12345 },
  { provincia_di_residenza: "ROMA", amministrazione: "AGENZIA DELLE ENTRATE", eta_min: 35, eta_max: 44, sesso: "F", numero: 9876 },
  { provincia_di_residenza: "ROMA", amministrazione: "AGENZIA DELLE ENTRATE", eta_min: 35, eta_max: 44, sesso: "M", numero: 8765 },
  
  { provincia_di_residenza: "MILANO", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 25, eta_max: 34, sesso: "F", numero: 8934 },
  { provincia_di_residenza: "MILANO", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 25, eta_max: 34, sesso: "M", numero: 7823 },
  { provincia_di_residenza: "MILANO", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 35, eta_max: 44, sesso: "F", numero: 11234 },
  { provincia_di_residenza: "MILANO", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 35, eta_max: 44, sesso: "M", numero: 9876 },
  { provincia_di_residenza: "MILANO", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 45, eta_max: 54, sesso: "F", numero: 5678 },
  { provincia_di_residenza: "MILANO", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 45, eta_max: 54, sesso: "M", numero: 6789 },
  
  { provincia_di_residenza: "NAPOLI", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 25, eta_max: 34, sesso: "F", numero: 6543 },
  { provincia_di_residenza: "NAPOLI", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 25, eta_max: 34, sesso: "M", numero: 7654 },
  { provincia_di_residenza: "NAPOLI", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 35, eta_max: 44, sesso: "F", numero: 8765 },
  { provincia_di_residenza: "NAPOLI", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 35, eta_max: 44, sesso: "M", numero: 7654 },
  { provincia_di_residenza: "NAPOLI", amministrazione: "AGENZIA DELLE ENTRATE", eta_min: 45, eta_max: 54, sesso: "F", numero: 4567 },
  { provincia_di_residenza: "NAPOLI", amministrazione: "AGENZIA DELLE ENTRATE", eta_min: 45, eta_max: 54, sesso: "M", numero: 5432 },
  
  { provincia_di_residenza: "TORINO", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 18, eta_max: 24, sesso: "F", numero: 2345 },
  { provincia_di_residenza: "TORINO", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 18, eta_max: 24, sesso: "M", numero: 3456 },
  { provincia_di_residenza: "TORINO", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 25, eta_max: 34, sesso: "F", numero: 5678 },
  { provincia_di_residenza: "TORINO", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 25, eta_max: 34, sesso: "M", numero: 6789 },
  { provincia_di_residenza: "TORINO", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 35, eta_max: 44, sesso: "F", numero: 4321 },
  { provincia_di_residenza: "TORINO", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 35, eta_max: 44, sesso: "M", numero: 5432 },
  
  { provincia_di_residenza: "PALERMO", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 25, eta_max: 34, sesso: "F", numero: 4567 },
  { provincia_di_residenza: "PALERMO", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 25, eta_max: 34, sesso: "M", numero: 3456 },
  { provincia_di_residenza: "PALERMO", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: "F", numero: 5678 },
  { provincia_di_residenza: "PALERMO", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: "M", numero: 4567 },
  
  { provincia_di_residenza: "BOLOGNA", amministrazione: "AGENZIA DELLE ENTRATE", eta_min: 25, eta_max: 34, sesso: "F", numero: 3456 },
  { provincia_di_residenza: "BOLOGNA", amministrazione: "AGENZIA DELLE ENTRATE", eta_min: 25, eta_max: 34, sesso: "M", numero: 4567 },
  { provincia_di_residenza: "BOLOGNA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 35, eta_max: 44, sesso: "F", numero: 5678 },
  { provincia_di_residenza: "BOLOGNA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 35, eta_max: 44, sesso: "M", numero: 4567 },
  { provincia_di_residenza: "BOLOGNA", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 45, eta_max: 54, sesso: "F", numero: 6789 },
  { provincia_di_residenza: "BOLOGNA", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 45, eta_max: 54, sesso: "M", numero: 5678 },
  
  { provincia_di_residenza: "FIRENZE", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 35, eta_max: 44, sesso: "F", numero: 4567 },
  { provincia_di_residenza: "FIRENZE", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 35, eta_max: 44, sesso: "M", numero: 3456 },
  { provincia_di_residenza: "FIRENZE", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 45, eta_max: 54, sesso: "F", numero: 2345 },
  { provincia_di_residenza: "FIRENZE", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 45, eta_max: 54, sesso: "M", numero: 3456 },
  
  { provincia_di_residenza: "BARI", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 25, eta_max: 34, sesso: "F", numero: 3456 },
  { provincia_di_residenza: "BARI", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 25, eta_max: 34, sesso: "M", numero: 4567 },
  { provincia_di_residenza: "BARI", amministrazione: "AGENZIA DELLE ENTRATE", eta_min: 35, eta_max: 44, sesso: "F", numero: 2345 },
  { provincia_di_residenza: "BARI", amministrazione: "AGENZIA DELLE ENTRATE", eta_min: 35, eta_max: 44, sesso: "M", numero: 3456 },
  
  { provincia_di_residenza: "CATANIA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 25, eta_max: 34, sesso: "F", numero: 2345 },
  { provincia_di_residenza: "CATANIA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 25, eta_max: 34, sesso: "M", numero: 3456 },
  { provincia_di_residenza: "CATANIA", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: "F", numero: 4567 },
  { provincia_di_residenza: "CATANIA", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: "M", numero: 3456 },
  
  { provincia_di_residenza: "VENEZIA", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 25, eta_max: 34, sesso: "F", numero: 2345 },
  { provincia_di_residenza: "VENEZIA", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 25, eta_max: 34, sesso: "M", numero: 2345 },
  { provincia_di_residenza: "VENEZIA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 35, eta_max: 44, sesso: "F", numero: 3456 },
  { provincia_di_residenza: "VENEZIA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 35, eta_max: 44, sesso: "M", numero: 2345 },
  
  { provincia_di_residenza: "AGRIGENTO", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 25, eta_max: 34, sesso: "F", numero: 28932 },
  { provincia_di_residenza: "AGRIGENTO", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 25, eta_max: 34, sesso: "M", numero: 323 },
  { provincia_di_residenza: "AGRIGENTO", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 35, eta_max: 44, sesso: "F", numero: 2 },
  { provincia_di_residenza: "AGRIGENTO", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 35, eta_max: 44, sesso: "M", numero: 443 },
  { provincia_di_residenza: "AGRIGENTO", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 18, eta_max: 24, sesso: "F", numero: 14 },
  { provincia_di_residenza: "AGRIGENTO", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 18, eta_max: 24, sesso: "M", numero: 63 },
  { provincia_di_residenza: "AGRIGENTO", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 18, eta_max: 24, sesso: "F", numero: 34 },
  
  { provincia_di_residenza: "GENOVA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 45, eta_max: 54, sesso: "F", numero: 3456 },
  { provincia_di_residenza: "GENOVA", amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 45, eta_max: 54, sesso: "M", numero: 2345 },
  { provincia_di_residenza: "GENOVA", amministrazione: "AGENZIA DELLE ENTRATE", eta_min: 55, eta_max: 64, sesso: "F", numero: 2345 },
  { provincia_di_residenza: "GENOVA", amministrazione: "AGENZIA DELLE ENTRATE", eta_min: 55, eta_max: 64, sesso: "M", numero: 1234 },
  
  { provincia_di_residenza: "VERONA", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: "F", numero: 2345 },
  { provincia_di_residenza: "VERONA", amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: "M", numero: 3456 },
  { provincia_di_residenza: "VERONA", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 45, eta_max: 54, sesso: "F", numero: 1234 },
  { provincia_di_residenza: "VERONA", amministrazione: "AGENZIA DELLE DOGANE", eta_min: 45, eta_max: 54, sesso: "M", numero: 2345 },
];
