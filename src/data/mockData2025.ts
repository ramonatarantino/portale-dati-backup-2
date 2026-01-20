import { AggregatedByProvince, DataRecord, createMonthYearKey, AmministrazioniRecord } from '@/types/data';
import { sampleProvinceData } from './sampleProvinceData';

// Capoluoghi regionali (una provincia per regione)
export const regionalCapitals: Record<string, string> = {
  'PIEMONTE': 'TORINO',
  'VALLE D\'AOSTA': 'AOSTA',
  'LOMBARDIA': 'MILANO',
  'TRENTINO-ALTO ADIGE': 'TRENTO',
  'VENETO': 'VENEZIA',
  'FRIULI-VENEZIA GIULIA': 'TRIESTE',
  'LIGURIA': 'GENOVA',
  'EMILIA-ROMAGNA': 'BOLOGNA',
  'TOSCANA': 'FIRENZE',
  'UMBRIA': 'PERUGIA',
  'MARCHE': 'ANCONA',
  'LAZIO': 'ROMA',
  'ABRUZZO': 'L\'AQUILA',
  'MOLISE': 'CAMPOBASSO',
  'CAMPANIA': 'NAPOLI',
  'PUGLIA': 'BARI',
  'BASILICATA': 'POTENZA',
  'CALABRIA': 'CATANZARO',
  'SICILIA': 'PALERMO',
  'SARDEGNA': 'CAGLIARI',
};

// Generate variation for mock data
function applyVariation(base: number, month: number): number {
  const seasonalFactor = 1 + Math.sin((month - 1) * Math.PI / 6) * 0.08;
  const randomFactor = 0.95 + Math.random() * 0.1;
  return Math.round(base * seasonalFactor * randomFactor);
}

// Generate province data for a specific month in 2025
export function getProvinceDataForMonth(year: number, month: number): AggregatedByProvince[] {
  return sampleProvinceData.map(p => ({
    ...p,
    totale: applyVariation(p.totale, month),
    maschi: applyVariation(p.maschi, month),
    femmine: applyVariation(p.femmine, month),
  }));
}

// Mock data for all datasets by month for 2025
export interface MockMonthData {
  distribuzione: AggregatedByProvince[];
  accessi: AccessiMockData;
  attivazioni: AttivazioniMockData;
  spesa: SpesaMockData;
  amministrazioni: AmministrazioniRecord[];
}

export interface AccessiMockData {
  totaleAccessi: number;
  mediaGiornaliera: number;
  entiAttivi: number;
  credenzialiUsate: number;
  trendMensile: { mese: string; accessi: number }[];
  perCredenziale: { credenziale: string; numero: number }[];
  topEnti: { ente: string; accessi: number }[];
}

export interface AttivazioniMockData {
  totaleAttivazioni: number;
  totaleCessazioni: number;
  saldo: number;
  trendMensile: { mese: string; attivazioni: number; cessazioni: number }[];
  perRegione: { regione: string; attivazioni: number; cessazioni: number }[];
  // Nuovi dati basati sui 4 dataset forniti
  perCategoria: { categoria: string; numero: number }[];
  perEtaSesso: { fascia_eta: string; maschi: number; femmine: number }[];
  perMotivoAssunzione: { motivo: string; numero: number }[];
  perMotivoCessazione: { motivo: string; numero: number }[];
  perProvincia: { provincia: string; attivazioni: number; cessazioni: number }[];
}

export interface SpesaMockData {
  spesaTotale: number;
  mediaMensile: number;
  dipendenti: number;
  spesaProCapite: number;
  trendMensile: { mese: string; spesa: number }[];
  perCategoria: { categoria: string; spesa: number }[];
  topAmministrazioni: { amministrazione: string; spesa: number }[];
}

const MONTH_NAMES = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

function generateAccessiData(month: number): AccessiMockData {
  const baseAccessi = 850000 + month * 15000;
  const variation = () => 0.9 + Math.random() * 0.2;
  
  return {
    totaleAccessi: Math.round(baseAccessi * variation()),
    mediaGiornaliera: Math.round((baseAccessi / 30) * variation()),
    entiAttivi: Math.round(1250 * variation()),
    credenzialiUsate: Math.round(4 + Math.random() * 2),
    trendMensile: MONTH_NAMES.slice(0, month).map((mese, i) => ({
      mese,
      accessi: Math.round((750000 + i * 20000) * variation())
    })),
    perCredenziale: [
      { credenziale: 'SPID', numero: Math.round(450000 * variation()) },
      { credenziale: 'CIE', numero: Math.round(280000 * variation()) },
      { credenziale: 'CNS', numero: Math.round(85000 * variation()) },
      { credenziale: 'Credenziali Interne', numero: Math.round(35000 * variation()) },
    ],
    topEnti: [
      { ente: 'Ministero Istruzione', accessi: Math.round(125000 * variation()) },
      { ente: 'Ministero Interno', accessi: Math.round(98000 * variation()) },
      { ente: 'Agenzia Entrate', accessi: Math.round(87000 * variation()) },
      { ente: 'INPS', accessi: Math.round(76000 * variation()) },
      { ente: 'Ministero Giustizia', accessi: Math.round(65000 * variation()) },
    ]
  };
}

function generateAttivazioniData(month: number): AttivazioniMockData {
  const baseAttivazioni = 12000 + month * 800;
  const baseCessazioni = 8500 + month * 400;
  const variation = () => 0.85 + Math.random() * 0.3;

  // Province italiane principali
  const province = [
    'AGRIGENTO', 'ALESSANDRIA', 'ANCONA', 'AOSTA', 'AREZZO', 'ASCOLI PICENO',
    'ASTI', 'AVELLINO', 'BARI', 'BARLETTA-ANDRIA-TRANI', 'BELLUNO', 'BENEVENTO',
    'BERGAMO', 'BIELLA', 'BOLOGNA', 'BOLZANO', 'BRESCIA', 'BRINDISI',
    'CAGLIARI', 'CAL TANISSETTA', 'CAMPOBASSO', 'CARBONIA-IGLESIAS',
    'CASERTA', 'CATANIA', 'CATANZARO', 'CHIETI', 'COMO', 'COSENZA',
    'CREMONA', 'CROTONE', 'CUNEO', 'ENNA', 'FERMO', 'FERRARA', 'FIRENZE',
    'FOGGIA', 'FORLÌ-CESENA', 'FROSINONE', 'GENOVA', 'GORIZIA', 'GROSSETO',
    'IMPERIA', 'ISERNIA', 'LA SPEZIA', 'LATINA', 'LECCE', 'LECCO', 'LIVORNO',
    'LODI', 'LUCCA', 'MACERATA', 'MANTOVA', 'MASSA-CARRARA', 'MATERA',
    'MESSINA', 'MILANO', 'MODENA', 'MONZA E BRIANZA', 'NAPOLI', 'NOVARA',
    'NUORO', 'OGLIASTRA', 'OLBIA-TEMPIO', 'ORISTANO', 'PADOVA', 'PALERMO',
    'PARMA', 'PAVIA', 'PERUGIA', 'PESARO E URBINO', 'PESCARA', 'PIACENZA',
    'PISA', 'PISTOIA', 'PORDENONE', 'POTENZA', 'PRATO', 'RAGUSA', 'RAVENNA',
    'REGGIO CALABRIA', 'REGGIO EMILIA', 'RIETI', 'RIMINI', 'ROMA', 'ROVIGO',
    'SALERNO', 'SASSARI', 'SAVONA', 'SIENA', 'SIRACUSA', 'SONDRIO', 'TARANTO',
    'TERAMO', 'TERNI', 'TORINO', 'TRAPANI', 'TRENTO', 'TREVISO', 'TRIESTE',
    'UDINE', 'VARESE', 'VENEZIA', 'VERBANIA', 'VERCELLI', 'VERONA', 'VIBO VALENTIA',
    'VICENZA', 'VITERBO'
  ];

  // Mappatura province a regioni
  const provinceToRegione: Record<string, string> = {
    'AGRIGENTO': 'SICILIA', 'ALESSANDRIA': 'PIEMONTE', 'ANCONA': 'MARCHE',
    'AOSTA': 'VALLE D\'AOSTA', 'AREZZO': 'TOSCANA', 'ASCOLI PICENO': 'MARCHE',
    'ASTI': 'PIEMONTE', 'AVELLINO': 'CAMPANIA', 'BARI': 'PUGLIA',
    'BARLETTA-ANDRIA-TRANI': 'PUGLIA', 'BELLUNO': 'VENETO', 'BENEVENTO': 'CAMPANIA',
    'BERGAMO': 'LOMBARDIA', 'BIELLA': 'PIEMONTE', 'BOLOGNA': 'EMILIA-ROMAGNA',
    'BOLZANO': 'TRENTINO-ALTO ADIGE', 'BRESCIA': 'LOMBARDIA', 'BRINDISI': 'PUGLIA',
    'CAGLIARI': 'SARDEGNA', 'CAL TANISSETTA': 'SICILIA', 'CAMPOBASSO': 'MOLISE',
    'CARBONIA-IGLESIAS': 'SARDEGNA', 'CASERTA': 'CAMPANIA', 'CATANIA': 'SICILIA',
    'CATANZARO': 'CALABRIA', 'CHIETI': 'ABRUZZO', 'COMO': 'LOMBARDIA',
    'COSENZA': 'CALABRIA', 'CREMONA': 'LOMBARDIA', 'CROTONE': 'CALABRIA',
    'CUNEO': 'PIEMONTE', 'ENNA': 'SICILIA', 'FERMO': 'MARCHE', 'FERRARA': 'EMILIA-ROMAGNA',
    'FIRENZE': 'TOSCANA', 'FOGGIA': 'PUGLIA', 'FORLÌ-CESENA': 'EMILIA-ROMAGNA',
    'FROSINONE': 'LAZIO', 'GENOVA': 'LIGURIA', 'GORIZIA': 'FRIULI-VENEZIA GIULIA',
    'GROSSETO': 'TOSCANA', 'IMPERIA': 'LIGURIA', 'ISERNIA': 'MOLISE',
    'LA SPEZIA': 'LIGURIA', 'LATINA': 'LAZIO', 'LECCE': 'PUGLIA', 'LECCO': 'LOMBARDIA',
    'LIVORNO': 'TOSCANA', 'LODI': 'LOMBARDIA', 'LUCCA': 'TOSCANA',
    'MACERATA': 'MARCHE', 'MANTOVA': 'LOMBARDIA', 'MASSA-CARRARA': 'TOSCANA',
    'MATERA': 'BASILICATA', 'MESSINA': 'SICILIA', 'MILANO': 'LOMBARDIA',
    'MODENA': 'EMILIA-ROMAGNA', 'MONZA E BRIANZA': 'LOMBARDIA', 'NAPOLI': 'CAMPANIA',
    'NOVARA': 'PIEMONTE', 'NUORO': 'SARDEGNA', 'OGLIASTRA': 'SARDEGNA',
    'OLBIA-TEMPIO': 'SARDEGNA', 'ORISTANO': 'SARDEGNA', 'PADOVA': 'VENETO',
    'PALERMO': 'SICILIA', 'PARMA': 'EMILIA-ROMAGNA', 'PAVIA': 'LOMBARDIA',
    'PERUGIA': 'UMBRIA', 'PESARO E URBINO': 'MARCHE', 'PESCARA': 'ABRUZZO',
    'PIACENZA': 'EMILIA-ROMAGNA', 'PISA': 'TOSCANA', 'PISTOIA': 'TOSCANA',
    'PORDENONE': 'FRIULI-VENEZIA GIULIA', 'POTENZA': 'BASILICATA', 'PRATO': 'TOSCANA',
    'RAGUSA': 'SICILIA', 'RAVENNA': 'EMILIA-ROMAGNA', 'REGGIO CALABRIA': 'CALABRIA',
    'REGGIO EMILIA': 'EMILIA-ROMAGNA', 'RIETI': 'LAZIO', 'RIMINI': 'EMILIA-ROMAGNA',
    'ROMA': 'LAZIO', 'ROVIGO': 'VENETO', 'SALERNO': 'CAMPANIA', 'SASSARI': 'SARDEGNA',
    'SAVONA': 'LIGURIA', 'SIENA': 'TOSCANA', 'SIRACUSA': 'SICILIA', 'SONDRIO': 'LOMBARDIA',
    'TARANTO': 'PUGLIA', 'TERAMO': 'ABRUZZO', 'TERNI': 'UMBRIA', 'TORINO': 'PIEMONTE',
    'TRAPANI': 'SICILIA', 'TRENTO': 'TRENTINO-ALTO ADIGE', 'TREVISO': 'VENETO',
    'TRIESTE': 'FRIULI-VENEZIA GIULIA', 'UDINE': 'FRIULI-VENEZIA GIULIA',
    'VARESE': 'LOMBARDIA', 'VENEZIA': 'VENETO', 'VERBANIA': 'PIEMONTE',
    'VERCELLI': 'PIEMONTE', 'VERONA': 'VENETO', 'VIBO VALENTIA': 'CALABRIA',
    'VICENZA': 'VENETO', 'VITERBO': 'LAZIO'
  };

  return {
    totaleAttivazioni: Math.round(baseAttivazioni * variation()),
    totaleCessazioni: Math.round(baseCessazioni * variation()),
    saldo: Math.round((baseAttivazioni - baseCessazioni) * variation()),

    trendMensile: MONTH_NAMES.slice(0, month).map((mese, i) => ({
      mese,
      attivazioni: Math.round((10000 + i * 500) * variation()),
      cessazioni: Math.round((7000 + i * 300) * variation())
    })),

    perRegione: [
      { regione: 'Lombardia', attivazioni: Math.round(2500 * variation()), cessazioni: Math.round(1800 * variation()) },
      { regione: 'Lazio', attivazioni: Math.round(2200 * variation()), cessazioni: Math.round(1600 * variation()) },
      { regione: 'Campania', attivazioni: Math.round(1800 * variation()), cessazioni: Math.round(1200 * variation()) },
      { regione: 'Sicilia', attivazioni: Math.round(1500 * variation()), cessazioni: Math.round(1100 * variation()) },
      { regione: 'Veneto', attivazioni: Math.round(1400 * variation()), cessazioni: Math.round(950 * variation()) },
      { regione: 'Piemonte', attivazioni: Math.round(1200 * variation()), cessazioni: Math.round(850 * variation()) },
      { regione: 'Emilia-Romagna', attivazioni: Math.round(1100 * variation()), cessazioni: Math.round(780 * variation()) },
      { regione: 'Toscana', attivazioni: Math.round(950 * variation()), cessazioni: Math.round(680 * variation()) },
    ],

    // Dataset 1: Attivazioni per categoria (inquadramento)
    perCategoria: [
      { categoria: 'QUALIFICA: ASSISTENTI-DOGANE-EX II F 4', numero: Math.round(450 * variation()) },
      { categoria: 'QUALIFICA: FUNZIONARI-DOGANE-EX III F 2', numero: Math.round(380 * variation()) },
      { categoria: 'QUALIFICA: FUNZIONARI-DOGANE-EX III F 3', numero: Math.round(520 * variation()) },
      { categoria: 'QUALIFICA: ASSISTENTI-ENTRATE-EX II F 3', numero: Math.round(680 * variation()) },
      { categoria: 'QUALIFICA: ASSISTENTI-ENTRATE-EX II F 4', numero: Math.round(720 * variation()) },
      { categoria: 'QUALIFICA: ASSISTENTI-ENTRATE-EX II F 5', numero: Math.round(590 * variation()) },
      { categoria: 'QUALIFICA: ASSISTENTI-ENTRATE-EX II F 6', numero: Math.round(850 * variation()) },
      { categoria: 'QUALIFICA: FUNZ AG FISC CCNL 2019-2021', numero: Math.round(920 * variation()) },
      { categoria: 'QUALIFICA: FUNZIONARI-ENTRATE-EX III F 1', numero: Math.round(480 * variation()) },
      { categoria: 'QUALIFICA: FUNZIONARI-ENTRATE-EX III F 3', numero: Math.round(1100 * variation()) },
    ],

    // Dataset 2: Attivazioni per età e sesso
    perEtaSesso: [
      { fascia_eta: '25-34', maschi: Math.round(1200 * variation()), femmine: Math.round(980 * variation()) },
      { fascia_eta: '35-44', maschi: Math.round(1450 * variation()), femmine: Math.round(1250 * variation()) },
      { fascia_eta: '45-54', maschi: Math.round(1680 * variation()), femmine: Math.round(1420 * variation()) },
      { fascia_eta: '55-64', maschi: Math.round(1350 * variation()), femmine: Math.round(1180 * variation()) },
      { fascia_eta: '65+', maschi: Math.round(420 * variation()), femmine: Math.round(380 * variation()) },
    ],

    // Dataset 3: Assunzioni per motivo
    perMotivoAssunzione: [
      { motivo: 'CONCORSO', numero: Math.round(2850 * variation()) },
      { motivo: 'MOBILITA\'', numero: Math.round(890 * variation()) },
      { motivo: 'NOMINA', numero: Math.round(450 * variation()) },
      { motivo: 'ALTRO MOTIVO', numero: Math.round(320 * variation()) },
    ],

    // Dataset 4: Cessazioni per motivo
    perMotivoCessazione: [
      { motivo: 'FINE INCARICO', numero: Math.round(2100 * variation()) },
      { motivo: 'PENSIONAMENTO', numero: Math.round(1650 * variation()) },
      { motivo: 'DIMISSIONI', numero: Math.round(890 * variation()) },
      { motivo: 'ALTRO MOTIVO', numero: Math.round(580 * variation()) },
    ],

    // Dati per provincia (campione rappresentativo)
    perProvincia: province.slice(0, 15).map(provincia => ({
      provincia,
      attivazioni: Math.round((800 + Math.random() * 400) * variation()),
      cessazioni: Math.round((600 + Math.random() * 300) * variation())
    }))
  };
}

function generateSpesaData(month: number): SpesaMockData {
  const baseSpesa = 4200000000 + month * 150000000;
  const variation = () => 0.92 + Math.random() * 0.16;
  
  return {
    spesaTotale: Math.round(baseSpesa * variation()),
    mediaMensile: Math.round((baseSpesa / month) * variation()),
    dipendenti: Math.round(3250000 * variation()),
    spesaProCapite: Math.round(1290 * variation()),
    trendMensile: MONTH_NAMES.slice(0, month).map((mese, i) => ({
      mese,
      spesa: Math.round((380000000 + i * 12000000) * variation())
    })),
    perCategoria: [
      { categoria: 'Stipendi Base', spesa: Math.round(2800000000 * variation()) },
      { categoria: 'Indennità', spesa: Math.round(650000000 * variation()) },
      { categoria: 'Straordinari', spesa: Math.round(280000000 * variation()) },
      { categoria: 'TFR', spesa: Math.round(320000000 * variation()) },
      { categoria: 'Contributi', spesa: Math.round(150000000 * variation()) },
    ],
    topAmministrazioni: [
      { amministrazione: 'Ministero Istruzione', spesa: Math.round(1200000000 * variation()) },
      { amministrazione: 'Ministero Interno', spesa: Math.round(850000000 * variation()) },
      { amministrazione: 'Ministero Difesa', spesa: Math.round(720000000 * variation()) },
      { amministrazione: 'Ministero Giustizia', spesa: Math.round(580000000 * variation()) },
      { amministrazione: 'Agenzia Entrate', spesa: Math.round(450000000 * variation()) },
    ]
  };
}

// Generate mock data for Amministrazioni
function generateAmministrazioniData(month: number): AmministrazioniRecord[] {
  const comuni = [
    'ABANO TERME', 'ABBADIA SAN SALVATORE', 'ABBASANTA', 'ABBIATEGRASSO',
    'ROMA', 'MILANO', 'NAPOLI', 'TORINO', 'FIRENZE', 'BOLOGNA'
  ];
  const amministrazioni = [
    'MINISTERO DELL\'ISTRUZIONE E DEL MERITO',
    'MINISTERO DELL\'INTERNO',
    'AGENZIA DELLE ENTRATE',
    'INPS',
    'MINISTERO DELLA GIUSTIZIA'
  ];
  const regioni: Record<string, string> = {
    'ABANO TERME': 'VENETO',
    'ABBADIA SAN SALVATORE': 'TOSCANA',
    'ABBASANTA': 'SARDEGNA',
    'ABBIATEGRASSO': 'LOMBARDIA',
    'ROMA': 'LAZIO',
    'MILANO': 'LOMBARDIA',
    'NAPOLI': 'CAMPANIA',
    'TORINO': 'PIEMONTE',
    'FIRENZE': 'TOSCANA',
    'BOLOGNA': 'EMILIA-ROMAGNA'
  };

  const data: AmministrazioniRecord[] = [];

  comuni.forEach(comune => {
    amministrazioni.forEach(admin => {
      // Genera dati per fasce d'età
      const fasce = [
        { min: 18, max: 24 }, { min: 25, max: 34 }, { min: 35, max: 44 },
        { min: 45, max: 54 }, { min: 55, max: 64 }, { min: 65, max: null }
      ];

      fasce.forEach(fascia => {
        ['M', 'F'].forEach(sesso => {
          const baseRapporti = Math.floor(Math.random() * 100) + 10;
          const rapporti = Math.floor(baseRapporti * (1 + Math.sin(month) * 0.2));

          data.push({
            comune_della_sede: comune,
            amministrazione: admin,
            eta_min: fascia.min,
            eta_max: fascia.max,
            sesso: sesso as 'M' | 'F',
            numero_unita_organizzative: Math.floor(Math.random() * 5) + 1,
            numero_rapporti_lavoro: rapporti,
            regione: regioni[comune]
          });
        });
      });
    });
  });

  return data;
}

// Generate complete mock data for a month
export function getMockDataForMonth(year: number, month: number): MockMonthData {
  return {
    distribuzione: getProvinceDataForMonth(year, month),
    accessi: generateAccessiData(month),
    attivazioni: generateAttivazioniData(month),
    spesa: generateSpesaData(month),
    amministrazioni: generateAmministrazioniData(month),
  };
}

// Pre-generated data for all months of 2025
export const mockData2025: Record<string, MockMonthData> = {};

for (let month = 1; month <= 12; month++) {
  const key = createMonthYearKey(2025, month);
  mockData2025[key] = getMockDataForMonth(2025, month);
}

// Also add some 2024 data for comparison
for (let month = 1; month <= 12; month++) {
  const key = createMonthYearKey(2024, month);
  mockData2025[key] = getMockDataForMonth(2024, month);
}

// Export a function to get data for any month/year
export function getDataForPeriod(year: number, month: number): MockMonthData {
  const key = createMonthYearKey(year, month);
  if (mockData2025[key]) {
    return mockData2025[key];
  }
  // Generate on-the-fly if not pre-cached
  return getMockDataForMonth(year, month);
}
