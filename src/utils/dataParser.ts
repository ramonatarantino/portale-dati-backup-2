import { DataRecord, AggregatedByProvince, AggregatedByAge, AggregatedByAdmin, FilterState } from '@/types/data';
import { provinceCoordinates } from '@/data/provinceCoordinates';

export function parseCSV(csvText: string): DataRecord[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  // Create a map of header names to indices
  const headerMap: Record<string, number> = {};
  headers.forEach((h, i) => {
    headerMap[h] = i;
  });
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    
    const record: DataRecord = {
      provincia_di_residenza: values[headerMap['provincia_di_residenza'] || headerMap['provincia'] || 0] || '',
      amministrazione: values[headerMap['amministrazione'] || headerMap['ente'] || 1] || '',
      eta_min: parseInt(values[headerMap['eta_min'] || 2]) || 0,
      eta_max: parseInt(values[headerMap['eta_max'] || 3]) || 0,
      sesso: (values[headerMap['sesso'] || 4] as 'M' | 'F') || 'M',
      numero: parseInt(values[headerMap['numero'] || 5]) || 0,
    };
    
    // Parse optional temporal fields
    if (headerMap['anno']) record.anno = parseInt(values[headerMap['anno']]) || undefined;
    if (headerMap['mese']) record.mese = parseInt(values[headerMap['mese']]) || undefined;
    if (headerMap['regione']) record.regione = values[headerMap['regione']] || undefined;
    if (headerMap['ente']) record.ente = values[headerMap['ente']] || undefined;
    if (headerMap['credenziale_usata']) record.credenziale_usata = values[headerMap['credenziale_usata']] || undefined;
    if (headerMap['numero_accessi']) record.numero_accessi = parseInt(values[headerMap['numero_accessi']]) || undefined;
    
    return record;
  }).filter(r => r.provincia_di_residenza && r.numero > 0);
}

export function getAgeFascia(etaMin: number, etaMax: number): string {
  return `${etaMin}-${etaMax}`;
}

export function filterData(data: DataRecord[], filters: FilterState): DataRecord[] {
  return data.filter(record => {
    const provinciaMatch = filters.province.length === 0 || filters.province.includes(record.provincia_di_residenza);
    const adminMatch = filters.amministrazioni.length === 0 || filters.amministrazioni.includes(record.amministrazione);
    // Map visual filter values ('D'|'U') to data values ('F'|'M') for matching
    const sessoFilterMapped: ('M' | 'F')[] = (filters.sesso || []).map((g) => (g === 'U' ? 'M' : 'F'));
    const sessoMatch = filters.sesso.length === 0 || sessoFilterMapped.includes(record.sesso);
    const fasciaMatch = filters.fasce.length === 0 || filters.fasce.includes(getAgeFascia(record.eta_min, record.eta_max));
    const annoMatch = filters.anno === null || !record.anno || record.anno === filters.anno;
    const meseMatch = filters.mese === null || !record.mese || record.mese === filters.mese;

    return provinciaMatch && adminMatch && sessoMatch && fasciaMatch && annoMatch && meseMatch;
  });
}

export function aggregateByProvince(data: DataRecord[]): AggregatedByProvince[] {
  const map = new Map<string, { totale: number; maschi: number; femmine: number; regione?: string }>();
  
  data.forEach(record => {
    const existing = map.get(record.provincia_di_residenza) || { totale: 0, maschi: 0, femmine: 0 };
    
    // Aggiungi regione se non presente
    if (!existing.regione) {
      const provinceInfo = provinceCoordinates[record.provincia_di_residenza.toUpperCase()];
      existing.regione = provinceInfo?.region;
    }
    
    existing.totale += record.numero;
    if (record.sesso === 'M') {
      existing.maschi += record.numero;
    } else {
      existing.femmine += record.numero;
    }
    map.set(record.provincia_di_residenza, existing);
  });
  
  return Array.from(map.entries())
    .map(([provincia, stats]) => ({ provincia, ...stats }))
    .sort((a, b) => b.totale - a.totale);
}

export function aggregateByAge(data: DataRecord[]): AggregatedByAge[] {
  const map = new Map<string, { totale: number; maschi: number; femmine: number }>();
  
  data.forEach(record => {
    const fascia = getAgeFascia(record.eta_min, record.eta_max);
    const existing = map.get(fascia) || { totale: 0, maschi: 0, femmine: 0 };
    existing.totale += record.numero;
    if (record.sesso === 'M') {
      existing.maschi += record.numero;
    } else {
      existing.femmine += record.numero;
    }
    map.set(fascia, existing);
  });
  
  return Array.from(map.entries())
    .map(([fascia, stats]) => ({ fascia, ...stats }))
    .sort((a, b) => {
      const aMin = parseInt(a.fascia.split('-')[0]);
      const bMin = parseInt(b.fascia.split('-')[0]);
      return aMin - bMin;
    });
}

export function aggregateByAdmin(data: DataRecord[]): AggregatedByAdmin[] {
  const map = new Map<string, number>();
  
  data.forEach(record => {
    const existing = map.get(record.amministrazione) || 0;
    map.set(record.amministrazione, existing + record.numero);
  });
  
  return Array.from(map.entries())
    .map(([amministrazione, totale]) => ({ amministrazione, totale }))
    .sort((a, b) => b.totale - a.totale);
}

export function getUniqueValues(data: DataRecord[]) {
  const province = [...new Set(data.map(d => d.provincia_di_residenza))].sort();
  const amministrazioni = [...new Set(data.map(d => d.amministrazione))].sort();
  const sesso = [...new Set(data.map(d => d.sesso))] as ('M' | 'F')[];
  const fasce = [...new Set(data.map(d => getAgeFascia(d.eta_min, d.eta_max)))].sort((a, b) => {
    const aMin = parseInt(a.split('-')[0]);
    const bMin = parseInt(b.split('-')[0]);
    return aMin - bMin;
  });
  const anni = [...new Set(data.map(d => d.anno).filter(Boolean) as number[])].sort((a, b) => b - a);
  const mesi = [...new Set(data.map(d => d.mese).filter(Boolean) as number[])].sort((a, b) => a - b);
  
  return { province, amministrazioni, sesso, fasce, anni, mesi };
}

export function getTotalStats(data: DataRecord[]) {
  const totale = data.reduce((sum, r) => sum + r.numero, 0);
  const maschi = data.filter(r => r.sesso === 'M').reduce((sum, r) => sum + r.numero, 0);
  const femmine = data.filter(r => r.sesso === 'F').reduce((sum, r) => sum + r.numero, 0);
  const province = new Set(data.map(r => r.provincia_di_residenza)).size;
  const amministrazioni = new Set(data.map(r => r.amministrazione)).size;
  
  return { totale, maschi, femmine, province, amministrazioni };
}
