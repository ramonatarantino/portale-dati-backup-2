import { AggregatedByProvince } from '@/types/data';

// Sample data for all Italian provinces
export const sampleProvinceData: AggregatedByProvince[] = [
  // PIEMONTE
  { provincia: "TORINO", regione: "PIEMONTE", totale: 125000, maschi: 62500, femmine: 62500 },
  { provincia: "ALESSANDRIA", regione: "PIEMONTE", totale: 18500, maschi: 9200, femmine: 9300 },
  { provincia: "ASTI", regione: "PIEMONTE", totale: 8500, maschi: 4300, femmine: 4200 },
  { provincia: "BIELLA", regione: "PIEMONTE", totale: 7200, maschi: 3600, femmine: 3600 },
  { provincia: "CUNEO", regione: "PIEMONTE", totale: 22000, maschi: 11100, femmine: 10900 },
  { provincia: "NOVARA", regione: "PIEMONTE", totale: 15800, maschi: 7900, femmine: 7900 },
  { provincia: "VERBANO-CUSIO-OSSOLA", regione: "PIEMONTE", totale: 6800, maschi: 3400, femmine: 3400 },
  { provincia: "VERCELLI", regione: "PIEMONTE", totale: 7500, maschi: 3750, femmine: 3750 },

  // VALLE D'AOSTA
  { provincia: "AOSTA", regione: "VALLE D'AOSTA", totale: 5200, maschi: 2600, femmine: 2600 },

  // LOMBARDIA
  { provincia: "MILANO", regione: "LOMBARDIA", totale: 185000, maschi: 92500, femmine: 92500 },
  { provincia: "BERGAMO", regione: "LOMBARDIA", totale: 42000, maschi: 21000, femmine: 21000 },
  { provincia: "BRESCIA", regione: "LOMBARDIA", totale: 48000, maschi: 24000, femmine: 24000 },
  { provincia: "COMO", regione: "LOMBARDIA", totale: 22500, maschi: 11250, femmine: 11250 },
  { provincia: "CREMONA", regione: "LOMBARDIA", totale: 12800, maschi: 6400, femmine: 6400 },
  { provincia: "LECCO", regione: "LOMBARDIA", totale: 13200, maschi: 6600, femmine: 6600 },
  { provincia: "LODI", regione: "LOMBARDIA", totale: 8900, maschi: 4450, femmine: 4450 },
  { provincia: "MANTOVA", regione: "LOMBARDIA", totale: 15600, maschi: 7800, femmine: 7800 },
  { provincia: "MONZA E DELLA BRIANZA", regione: "LOMBARDIA", totale: 32000, maschi: 16000, femmine: 16000 },
  { provincia: "PAVIA", regione: "LOMBARDIA", totale: 19500, maschi: 9750, femmine: 9750 },
  { provincia: "SONDRIO", regione: "LOMBARDIA", totale: 6800, maschi: 3400, femmine: 3400 },
  { provincia: "VARESE", regione: "LOMBARDIA", totale: 28500, maschi: 14250, femmine: 14250 },

  // TRENTINO-ALTO ADIGE
  { provincia: "TRENTO", regione: "TRENTINO-ALTO ADIGE", totale: 21000, maschi: 10500, femmine: 10500 },
  { provincia: "BOLZANO", regione: "TRENTINO-ALTO ADIGE", totale: 19500, maschi: 9750, femmine: 9750 },

  // VENETO
  { provincia: "VENEZIA", regione: "VENETO", totale: 32000, maschi: 16000, femmine: 16000 },
  { provincia: "VERONA", regione: "VENETO", totale: 35500, maschi: 17750, femmine: 17750 },
  { provincia: "PADOVA", regione: "VENETO", totale: 36200, maschi: 18100, femmine: 18100 },
  { provincia: "TREVISO", regione: "VENETO", totale: 28900, maschi: 14450, femmine: 14450 },
  { provincia: "VICENZA", regione: "VENETO", totale: 31200, maschi: 15600, femmine: 15600 },
  { provincia: "BELLUNO", regione: "VENETO", totale: 7800, maschi: 3900, femmine: 3900 },
  { provincia: "ROVIGO", regione: "VENETO", totale: 9200, maschi: 4600, femmine: 4600 },

  // FRIULI-VENEZIA GIULIA
  { provincia: "TRIESTE", regione: "FRIULI-VENEZIA GIULIA", totale: 12500, maschi: 6250, femmine: 6250 },
  { provincia: "UDINE", regione: "FRIULI-VENEZIA GIULIA", totale: 21800, maschi: 10900, femmine: 10900 },
  { provincia: "GORIZIA", regione: "FRIULI-VENEZIA GIULIA", totale: 5600, maschi: 2800, femmine: 2800 },
  { provincia: "PORDENONE", regione: "FRIULI-VENEZIA GIULIA", totale: 12200, maschi: 6100, femmine: 6100 },

  // LIGURIA
  { provincia: "GENOVA", regione: "LIGURIA", totale: 42500, maschi: 21250, femmine: 21250 },
  { provincia: "IMPERIA", regione: "LIGURIA", totale: 8200, maschi: 4100, femmine: 4100 },
  { provincia: "LA SPEZIA", regione: "LIGURIA", totale: 9800, maschi: 4900, femmine: 4900 },
  { provincia: "SAVONA", regione: "LIGURIA", totale: 11500, maschi: 5750, femmine: 5750 },

  // EMILIA-ROMAGNA
  { provincia: "BOLOGNA", regione: "EMILIA-ROMAGNA", totale: 52000, maschi: 26000, femmine: 26000 },
  { provincia: "MODENA", regione: "EMILIA-ROMAGNA", totale: 28500, maschi: 14250, femmine: 14250 },
  { provincia: "PARMA", regione: "EMILIA-ROMAGNA", totale: 18200, maschi: 9100, femmine: 9100 },
  { provincia: "REGGIO EMILIA", regione: "EMILIA-ROMAGNA", totale: 21500, maschi: 10750, femmine: 10750 },
  { provincia: "FERRARA", regione: "EMILIA-ROMAGNA", totale: 13800, maschi: 6900, femmine: 6900 },
  { provincia: "RAVENNA", regione: "EMILIA-ROMAGNA", totale: 15200, maschi: 7600, femmine: 7600 },
  { provincia: "FORLÌ-CESENA", regione: "EMILIA-ROMAGNA", totale: 15800, maschi: 7900, femmine: 7900 },
  { provincia: "RIMINI", regione: "EMILIA-ROMAGNA", totale: 12500, maschi: 6250, femmine: 6250 },
  { provincia: "PIACENZA", regione: "EMILIA-ROMAGNA", totale: 11200, maschi: 5600, femmine: 5600 },

  // TOSCANA
  { provincia: "FIRENZE", regione: "TOSCANA", totale: 52000, maschi: 26000, femmine: 26000 },
  { provincia: "PISA", regione: "TOSCANA", totale: 18500, maschi: 9250, femmine: 9250 },
  { provincia: "LIVORNO", regione: "TOSCANA", totale: 13800, maschi: 6900, femmine: 6900 },
  { provincia: "SIENA", regione: "TOSCANA", totale: 11200, maschi: 5600, femmine: 5600 },
  { provincia: "AREZZO", regione: "TOSCANA", totale: 13500, maschi: 6750, femmine: 6750 },
  { provincia: "LUCCA", regione: "TOSCANA", totale: 15200, maschi: 7600, femmine: 7600 },
  { provincia: "MASSA-CARRARA", regione: "TOSCANA", totale: 7800, maschi: 3900, femmine: 3900 },
  { provincia: "PISTOIA", regione: "TOSCANA", totale: 11500, maschi: 5750, femmine: 5750 },
  { provincia: "PRATO", regione: "TOSCANA", totale: 9800, maschi: 4900, femmine: 4900 },
  { provincia: "GROSSETO", regione: "TOSCANA", totale: 8900, maschi: 4450, femmine: 4450 },

  // UMBRIA
  { provincia: "PERUGIA", regione: "UMBRIA", totale: 28500, maschi: 14250, femmine: 14250 },
  { provincia: "TERNI", regione: "UMBRIA", totale: 9200, maschi: 4600, femmine: 4600 },

  // MARCHE
  { provincia: "ANCONA", regione: "MARCHE", totale: 19500, maschi: 9750, femmine: 9750 },
  { provincia: "PESARO E URBINO", regione: "MARCHE", totale: 14200, maschi: 7100, femmine: 7100 },
  { provincia: "MACERATA", regione: "MARCHE", totale: 12500, maschi: 6250, femmine: 6250 },
  { provincia: "FERMO", regione: "MARCHE", totale: 6800, maschi: 3400, femmine: 3400 },
  { provincia: "ASCOLI PICENO", regione: "MARCHE", totale: 8500, maschi: 4250, femmine: 4250 },

  // LAZIO
  { provincia: "ROMA", regione: "LAZIO", totale: 285000, maschi: 142500, femmine: 142500 },
  { provincia: "LATINA", regione: "LAZIO", totale: 21500, maschi: 10750, femmine: 10750 },
  { provincia: "FROSINONE", regione: "LAZIO", totale: 18200, maschi: 9100, femmine: 9100 },
  { provincia: "VITERBO", regione: "LAZIO", totale: 12500, maschi: 6250, femmine: 6250 },
  { provincia: "RIETI", regione: "LAZIO", totale: 6200, maschi: 3100, femmine: 3100 },

  // ABRUZZO
  { provincia: "L'AQUILA", regione: "ABRUZZO", totale: 12500, maschi: 6250, femmine: 6250 },
  { provincia: "PESCARA", regione: "ABRUZZO", totale: 13200, maschi: 6600, femmine: 6600 },
  { provincia: "CHIETI", regione: "ABRUZZO", totale: 15800, maschi: 7900, femmine: 7900 },
  { provincia: "TERAMO", regione: "ABRUZZO", totale: 12200, maschi: 6100, femmine: 6100 },

  // MOLISE
  { provincia: "CAMPOBASSO", regione: "MOLISE", totale: 9200, maschi: 4600, femmine: 4600 },
  { provincia: "ISERNIA", regione: "MOLISE", totale: 3500, maschi: 1750, femmine: 1750 },

  // CAMPANIA
  { provincia: "NAPOLI", regione: "CAMPANIA", totale: 125000, maschi: 62500, femmine: 62500 },
  { provincia: "SALERNO", regione: "CAMPANIA", totale: 42500, maschi: 21250, femmine: 21250 },
  { provincia: "CASERTA", regione: "CAMPANIA", totale: 35200, maschi: 17600, femmine: 17600 },
  { provincia: "AVELLINO", regione: "CAMPANIA", totale: 16500, maschi: 8250, femmine: 8250 },
  { provincia: "BENEVENTO", regione: "CAMPANIA", totale: 11200, maschi: 5600, femmine: 5600 },

  // PUGLIA
  { provincia: "BARI", regione: "PUGLIA", totale: 52000, maschi: 26000, femmine: 26000 },
  { provincia: "LECCE", regione: "PUGLIA", totale: 32500, maschi: 16250, femmine: 16250 },
  { provincia: "TARANTO", regione: "PUGLIA", totale: 22500, maschi: 11250, femmine: 11250 },
  { provincia: "FOGGIA", regione: "PUGLIA", totale: 24200, maschi: 12100, femmine: 12100 },
  { provincia: "BRINDISI", regione: "PUGLIA", totale: 15200, maschi: 7600, femmine: 7600 },
  { provincia: "BARLETTA-ANDRIA-TRANI", regione: "PUGLIA", totale: 15500, maschi: 7750, femmine: 7750 },

  // BASILICATA
  { provincia: "POTENZA", regione: "BASILICATA", totale: 15200, maschi: 7600, femmine: 7600 },
  { provincia: "MATERA", regione: "BASILICATA", totale: 8200, maschi: 4100, femmine: 4100 },

  // CALABRIA
  { provincia: "COSENZA", regione: "CALABRIA", totale: 28500, maschi: 14250, femmine: 14250 },
  { provincia: "REGGIO CALABRIA", regione: "CALABRIA", totale: 22500, maschi: 11250, femmine: 11250 },
  { provincia: "CATANZARO", regione: "CALABRIA", totale: 14500, maschi: 7250, femmine: 7250 },
  { provincia: "CROTONE", regione: "CALABRIA", totale: 6800, maschi: 3400, femmine: 3400 },
  { provincia: "VIBO VALENTIA", regione: "CALABRIA", totale: 6200, maschi: 3100, femmine: 3100 },

  // SICILIA
  { provincia: "PALERMO", regione: "SICILIA", totale: 52000, maschi: 26000, femmine: 26000 },
  { provincia: "CATANIA", regione: "SICILIA", totale: 45500, maschi: 22750, femmine: 22750 },
  { provincia: "MESSINA", regione: "SICILIA", totale: 26500, maschi: 13250, femmine: 13250 },
  { provincia: "SIRACUSA", regione: "SICILIA", totale: 16200, maschi: 8100, femmine: 8100 },
  { provincia: "TRAPANI", regione: "SICILIA", totale: 17500, maschi: 8750, femmine: 8750 },
  { provincia: "AGRIGENTO", regione: "SICILIA", totale: 17200, maschi: 8600, femmine: 8600 },
  { provincia: "CALTANISSETTA", regione: "SICILIA", totale: 10500, maschi: 5250, femmine: 5250 },
  { provincia: "ENNA", regione: "SICILIA", totale: 6800, maschi: 3400, femmine: 3400 },
  { provincia: "RAGUSA", regione: "SICILIA", totale: 12500, maschi: 6250, femmine: 6250 },

  // SARDEGNA
  { provincia: "CAGLIARI", regione: "SARDEGNA", totale: 22500, maschi: 11250, femmine: 11250 },
  { provincia: "SASSARI", regione: "SARDEGNA", totale: 21200, maschi: 10600, femmine: 10600 },
  { provincia: "NUORO", regione: "SARDEGNA", totale: 8500, maschi: 4250, femmine: 4250 },
  { provincia: "ORISTANO", regione: "SARDEGNA", totale: 6200, maschi: 3100, femmine: 3100 },
  { provincia: "SUD SARDEGNA", regione: "SARDEGNA", totale: 14200, maschi: 7100, femmine: 7100 },
];

// Get data varying by month to simulate changes
export function getSampleDataForMonth(year: number, month: number): AggregatedByProvince[] {
  const variation = (year - 2023) * 0.02 + month * 0.005;
  return sampleProvinceData.map(p => ({
    ...p,
    totale: Math.round(p.totale * (1 + variation + Math.random() * 0.1 - 0.05)),
    maschi: Math.round(p.maschi * (1 + variation + Math.random() * 0.1 - 0.05)),
    femmine: Math.round(p.femmine * (1 + variation + Math.random() * 0.1 - 0.05)),
  }));
}
