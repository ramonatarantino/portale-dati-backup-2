// Geographic coordinates for all Italian provinces (lon, lat)
export interface ProvinceCoords {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  zoom: number;
  region: string;
}

export const provinceCoordinates: Record<string, ProvinceCoords> = {
  // PIEMONTE
  "TORINO": { name: "Torino", coordinates: [7.6869, 45.0703], zoom: 9, region: "PIEMONTE" },
  "ALESSANDRIA": { name: "Alessandria", coordinates: [8.6150, 44.9122], zoom: 10, region: "PIEMONTE" },
  "ASTI": { name: "Asti", coordinates: [8.2035, 44.9008], zoom: 10, region: "PIEMONTE" },
  "BIELLA": { name: "Biella", coordinates: [8.0500, 45.5667], zoom: 10, region: "PIEMONTE" },
  "CUNEO": { name: "Cuneo", coordinates: [7.5500, 44.3833], zoom: 9, region: "PIEMONTE" },
  "NOVARA": { name: "Novara", coordinates: [8.6167, 45.4500], zoom: 10, region: "PIEMONTE" },
  "VERBANO-CUSIO-OSSOLA": { name: "Verbano-Cusio-Ossola", coordinates: [8.5500, 46.1333], zoom: 10, region: "PIEMONTE" },
  "VERCELLI": { name: "Vercelli", coordinates: [8.4167, 45.3333], zoom: 10, region: "PIEMONTE" },

  // VALLE D'AOSTA
  "AOSTA": { name: "Aosta", coordinates: [7.3155, 45.7372], zoom: 10, region: "VALLE D'AOSTA" },

  // LOMBARDIA
  "MILANO": { name: "Milano", coordinates: [9.1900, 45.4642], zoom: 10, region: "LOMBARDIA" },
  "BERGAMO": { name: "Bergamo", coordinates: [9.6698, 45.6983], zoom: 10, region: "LOMBARDIA" },
  "BRESCIA": { name: "Brescia", coordinates: [10.2118, 45.5416], zoom: 9, region: "LOMBARDIA" },
  "COMO": { name: "Como", coordinates: [9.0852, 45.8080], zoom: 10, region: "LOMBARDIA" },
  "CREMONA": { name: "Cremona", coordinates: [10.0227, 45.1336], zoom: 10, region: "LOMBARDIA" },
  "LECCO": { name: "Lecco", coordinates: [9.3901, 45.8556], zoom: 10, region: "LOMBARDIA" },
  "LODI": { name: "Lodi", coordinates: [9.5033, 45.3140], zoom: 10, region: "LOMBARDIA" },
  "MANTOVA": { name: "Mantova", coordinates: [10.7925, 45.1564], zoom: 10, region: "LOMBARDIA" },
  "MONZA E DELLA BRIANZA": { name: "Monza e della Brianza", coordinates: [9.2744, 45.5845], zoom: 11, region: "LOMBARDIA" },
  "PAVIA": { name: "Pavia", coordinates: [9.1590, 45.1847], zoom: 10, region: "LOMBARDIA" },
  "SONDRIO": { name: "Sondrio", coordinates: [9.8711, 46.1699], zoom: 10, region: "LOMBARDIA" },
  "VARESE": { name: "Varese", coordinates: [8.8251, 45.8206], zoom: 10, region: "LOMBARDIA" },

  // TRENTINO-ALTO ADIGE
  "TRENTO": { name: "Trento", coordinates: [11.1217, 46.0748], zoom: 9, region: "TRENTINO-ALTO ADIGE" },
  "BOLZANO": { name: "Bolzano", coordinates: [11.3548, 46.4983], zoom: 9, region: "TRENTINO-ALTO ADIGE" },

  // VENETO
  "VENEZIA": { name: "Venezia", coordinates: [12.3155, 45.4408], zoom: 10, region: "VENETO" },
  "VERONA": { name: "Verona", coordinates: [10.9916, 45.4384], zoom: 10, region: "VENETO" },
  "PADOVA": { name: "Padova", coordinates: [11.8768, 45.4064], zoom: 10, region: "VENETO" },
  "TREVISO": { name: "Treviso", coordinates: [12.2450, 45.6669], zoom: 10, region: "VENETO" },
  "VICENZA": { name: "Vicenza", coordinates: [11.5459, 45.5455], zoom: 10, region: "VENETO" },
  "BELLUNO": { name: "Belluno", coordinates: [12.2162, 46.1421], zoom: 10, region: "VENETO" },
  "ROVIGO": { name: "Rovigo", coordinates: [11.7900, 45.0700], zoom: 10, region: "VENETO" },

  // FRIULI-VENEZIA GIULIA
  "TRIESTE": { name: "Trieste", coordinates: [13.7768, 45.6495], zoom: 11, region: "FRIULI-VENEZIA GIULIA" },
  "UDINE": { name: "Udine", coordinates: [13.2358, 46.0711], zoom: 10, region: "FRIULI-VENEZIA GIULIA" },
  "GORIZIA": { name: "Gorizia", coordinates: [13.6220, 45.9407], zoom: 10, region: "FRIULI-VENEZIA GIULIA" },
  "PORDENONE": { name: "Pordenone", coordinates: [12.6600, 45.9564], zoom: 10, region: "FRIULI-VENEZIA GIULIA" },

  // LIGURIA
  "GENOVA": { name: "Genova", coordinates: [8.9463, 44.4056], zoom: 10, region: "LIGURIA" },
  "IMPERIA": { name: "Imperia", coordinates: [8.0357, 43.8889], zoom: 10, region: "LIGURIA" },
  "LA SPEZIA": { name: "La Spezia", coordinates: [9.8244, 44.1025], zoom: 10, region: "LIGURIA" },
  "SAVONA": { name: "Savona", coordinates: [8.4771, 44.3091], zoom: 10, region: "LIGURIA" },

  // EMILIA-ROMAGNA
  "BOLOGNA": { name: "Bologna", coordinates: [11.3426, 44.4949], zoom: 10, region: "EMILIA-ROMAGNA" },
  "MODENA": { name: "Modena", coordinates: [10.9254, 44.6471], zoom: 10, region: "EMILIA-ROMAGNA" },
  "PARMA": { name: "Parma", coordinates: [10.3279, 44.8015], zoom: 10, region: "EMILIA-ROMAGNA" },
  "REGGIO EMILIA": { name: "Reggio Emilia", coordinates: [10.6310, 44.6989], zoom: 10, region: "EMILIA-ROMAGNA" },
  "REGGIO NELL'EMILIA": { name: "Reggio nell'Emilia", coordinates: [10.6310, 44.6989], zoom: 10, region: "EMILIA-ROMAGNA" },
  "FERRARA": { name: "Ferrara", coordinates: [11.6191, 44.8381], zoom: 10, region: "EMILIA-ROMAGNA" },
  "RAVENNA": { name: "Ravenna", coordinates: [12.2035, 44.4184], zoom: 10, region: "EMILIA-ROMAGNA" },
  "FORLI'-CESENA": { name: "Forlì-Cesena", coordinates: [12.0489, 44.2225], zoom: 10, region: "EMILIA-ROMAGNA" },
  "FORLÌ-CESENA": { name: "Forlì-Cesena", coordinates: [12.0489, 44.2225], zoom: 10, region: "EMILIA-ROMAGNA" },
  "RIMINI": { name: "Rimini", coordinates: [12.5681, 44.0593], zoom: 10, region: "EMILIA-ROMAGNA" },
  "PIACENZA": { name: "Piacenza", coordinates: [9.6933, 45.0526], zoom: 10, region: "EMILIA-ROMAGNA" },

  // TOSCANA
  "FIRENZE": { name: "Firenze", coordinates: [11.2558, 43.7696], zoom: 10, region: "TOSCANA" },
  "PISA": { name: "Pisa", coordinates: [10.4017, 43.7228], zoom: 10, region: "TOSCANA" },
  "LIVORNO": { name: "Livorno", coordinates: [10.3106, 43.5485], zoom: 10, region: "TOSCANA" },
  "SIENA": { name: "Siena", coordinates: [11.3308, 43.3188], zoom: 10, region: "TOSCANA" },
  "AREZZO": { name: "Arezzo", coordinates: [11.8823, 43.4636], zoom: 10, region: "TOSCANA" },
  "LUCCA": { name: "Lucca", coordinates: [10.5027, 43.8429], zoom: 10, region: "TOSCANA" },
  "MASSA-CARRARA": { name: "Massa-Carrara", coordinates: [10.1300, 44.0333], zoom: 10, region: "TOSCANA" },
  "PISTOIA": { name: "Pistoia", coordinates: [10.9238, 43.9303], zoom: 10, region: "TOSCANA" },
  "PRATO": { name: "Prato", coordinates: [11.0975, 43.8777], zoom: 11, region: "TOSCANA" },
  "GROSSETO": { name: "Grosseto", coordinates: [11.1097, 42.7635], zoom: 9, region: "TOSCANA" },

  // UMBRIA
  "PERUGIA": { name: "Perugia", coordinates: [12.3880, 43.1107], zoom: 9, region: "UMBRIA" },
  "TERNI": { name: "Terni", coordinates: [12.6427, 42.5636], zoom: 10, region: "UMBRIA" },

  // MARCHE
  "ANCONA": { name: "Ancona", coordinates: [13.5188, 43.6158], zoom: 10, region: "MARCHE" },
  "PESARO E URBINO": { name: "Pesaro e Urbino", coordinates: [12.9057, 43.9098], zoom: 10, region: "MARCHE" },
  "MACERATA": { name: "Macerata", coordinates: [13.4530, 43.2988], zoom: 10, region: "MARCHE" },
  "FERMO": { name: "Fermo", coordinates: [13.7176, 43.1607], zoom: 10, region: "MARCHE" },
  "ASCOLI PICENO": { name: "Ascoli Piceno", coordinates: [13.5739, 42.8538], zoom: 10, region: "MARCHE" },

  // LAZIO
  "ROMA": { name: "Roma", coordinates: [12.4964, 41.9028], zoom: 9, region: "LAZIO" },
  "LATINA": { name: "Latina", coordinates: [12.9088, 41.4676], zoom: 10, region: "LAZIO" },
  "FROSINONE": { name: "Frosinone", coordinates: [13.3500, 41.6400], zoom: 10, region: "LAZIO" },
  "VITERBO": { name: "Viterbo", coordinates: [12.1081, 42.4173], zoom: 10, region: "LAZIO" },
  "RIETI": { name: "Rieti", coordinates: [12.8558, 42.4044], zoom: 10, region: "LAZIO" },

  // ABRUZZO
  "L'AQUILA": { name: "L'Aquila", coordinates: [13.3988, 42.3505], zoom: 9, region: "ABRUZZO" },
  "PESCARA": { name: "Pescara", coordinates: [14.2139, 42.4618], zoom: 10, region: "ABRUZZO" },
  "CHIETI": { name: "Chieti", coordinates: [14.1681, 42.3498], zoom: 10, region: "ABRUZZO" },
  "TERAMO": { name: "Teramo", coordinates: [13.7031, 42.6589], zoom: 10, region: "ABRUZZO" },

  // MOLISE
  "CAMPOBASSO": { name: "Campobasso", coordinates: [14.6560, 41.5603], zoom: 10, region: "MOLISE" },
  "ISERNIA": { name: "Isernia", coordinates: [14.2336, 41.5961], zoom: 10, region: "MOLISE" },

  // CAMPANIA
  "NAPOLI": { name: "Napoli", coordinates: [14.2681, 40.8518], zoom: 10, region: "CAMPANIA" },
  "SALERNO": { name: "Salerno", coordinates: [14.7681, 40.6824], zoom: 10, region: "CAMPANIA" },
  "CASERTA": { name: "Caserta", coordinates: [14.3329, 41.0728], zoom: 10, region: "CAMPANIA" },
  "AVELLINO": { name: "Avellino", coordinates: [14.7954, 40.9141], zoom: 10, region: "CAMPANIA" },
  "BENEVENTO": { name: "Benevento", coordinates: [14.7769, 41.1297], zoom: 10, region: "CAMPANIA" },

  // PUGLIA
  "BARI": { name: "Bari", coordinates: [16.8719, 41.1171], zoom: 10, region: "PUGLIA" },
  "LECCE": { name: "Lecce", coordinates: [18.1718, 40.3516], zoom: 10, region: "PUGLIA" },
  "TARANTO": { name: "Taranto", coordinates: [17.2295, 40.4644], zoom: 10, region: "PUGLIA" },
  "FOGGIA": { name: "Foggia", coordinates: [15.5518, 41.4621], zoom: 10, region: "PUGLIA" },
  "BRINDISI": { name: "Brindisi", coordinates: [17.9441, 40.6327], zoom: 10, region: "PUGLIA" },
  "BARLETTA-ANDRIA-TRANI": { name: "Barletta-Andria-Trani", coordinates: [16.2862, 41.2269], zoom: 10, region: "PUGLIA" },

  // BASILICATA
  "POTENZA": { name: "Potenza", coordinates: [15.8086, 40.6404], zoom: 9, region: "BASILICATA" },
  "MATERA": { name: "Matera", coordinates: [16.6044, 40.6664], zoom: 10, region: "BASILICATA" },

  // CALABRIA
  "COSENZA": { name: "Cosenza", coordinates: [16.2509, 39.3088], zoom: 9, region: "CALABRIA" },
  "REGGIO CALABRIA": { name: "Reggio Calabria", coordinates: [15.6509, 38.1113], zoom: 10, region: "CALABRIA" },
  "REGGIO DI CALABRIA": { name: "Reggio di Calabria", coordinates: [15.6509, 38.1113], zoom: 10, region: "CALABRIA" },
  "CATANZARO": { name: "Catanzaro", coordinates: [16.5875, 38.9098], zoom: 10, region: "CALABRIA" },
  "CROTONE": { name: "Crotone", coordinates: [17.1266, 39.0812], zoom: 10, region: "CALABRIA" },
  "VIBO VALENTIA": { name: "Vibo Valentia", coordinates: [16.0992, 38.6728], zoom: 10, region: "CALABRIA" },

  // SICILIA
  "PALERMO": { name: "Palermo", coordinates: [13.3615, 38.1157], zoom: 10, region: "SICILIA" },
  "CATANIA": { name: "Catania", coordinates: [15.0866, 37.5024], zoom: 10, region: "SICILIA" },
  "MESSINA": { name: "Messina", coordinates: [15.5540, 38.1938], zoom: 10, region: "SICILIA" },
  "SIRACUSA": { name: "Siracusa", coordinates: [15.2866, 37.0755], zoom: 10, region: "SICILIA" },
  "TRAPANI": { name: "Trapani", coordinates: [12.5141, 38.0176], zoom: 10, region: "SICILIA" },
  "AGRIGENTO": { name: "Agrigento", coordinates: [13.5833, 37.3111], zoom: 10, region: "SICILIA" },
  "CALTANISSETTA": { name: "Caltanissetta", coordinates: [14.0624, 37.4879], zoom: 10, region: "SICILIA" },
  "ENNA": { name: "Enna", coordinates: [14.2697, 37.5675], zoom: 10, region: "SICILIA" },
  "RAGUSA": { name: "Ragusa", coordinates: [14.7244, 36.9269], zoom: 10, region: "SICILIA" },

  // SARDEGNA
  "CAGLIARI": { name: "Cagliari", coordinates: [9.1217, 39.2238], zoom: 10, region: "SARDEGNA" },
  "SASSARI": { name: "Sassari", coordinates: [8.5600, 40.7259], zoom: 10, region: "SARDEGNA" },
  "NUORO": { name: "Nuoro", coordinates: [9.3311, 40.3210], zoom: 10, region: "SARDEGNA" },
  "ORISTANO": { name: "Oristano", coordinates: [8.5917, 39.9035], zoom: 10, region: "SARDEGNA" },
  "SUD SARDEGNA": { name: "Sud Sardegna", coordinates: [8.8500, 39.4500], zoom: 10, region: "SARDEGNA" },
};

// Region coordinates
export const regionCoordinates: Record<string, { coordinates: [number, number]; zoom: number }> = {
  'PIEMONTE': { coordinates: [7.9, 45.0], zoom: 7.5 },
  'VALLE D\'AOSTA': { coordinates: [7.3, 45.7], zoom: 9 },
  'LOMBARDIA': { coordinates: [9.5, 45.6], zoom: 7.5 },
  'TRENTINO-ALTO ADIGE': { coordinates: [11.3, 46.5], zoom: 8 },
  'VENETO': { coordinates: [11.8, 45.5], zoom: 7.5 },
  'FRIULI-VENEZIA GIULIA': { coordinates: [13.2, 46.0], zoom: 8 },
  'LIGURIA': { coordinates: [8.9, 44.3], zoom: 8.5 },
  'EMILIA-ROMAGNA': { coordinates: [11.3, 44.5], zoom: 7.5 },
  'TOSCANA': { coordinates: [11.2, 43.3], zoom: 7.5 },
  'UMBRIA': { coordinates: [12.6, 42.8], zoom: 8.5 },
  'MARCHE': { coordinates: [13.2, 43.3], zoom: 8 },
  'LAZIO': { coordinates: [12.5, 41.9], zoom: 7.5 },
  'ABRUZZO': { coordinates: [13.7, 42.2], zoom: 8 },
  'MOLISE': { coordinates: [14.6, 41.6], zoom: 9 },
  'CAMPANIA': { coordinates: [14.8, 40.8], zoom: 8 },
  'PUGLIA': { coordinates: [16.5, 41.0], zoom: 7.5 },
  'BASILICATA': { coordinates: [16.0, 40.5], zoom: 8.5 },
  'CALABRIA': { coordinates: [16.3, 39.0], zoom: 7.5 },
  'SICILIA': { coordinates: [14.2, 37.5], zoom: 7 },
  'SARDEGNA': { coordinates: [9.0, 40.0], zoom: 7 },
};

// Get provinces by region
export function getProvincesByRegion(region: string): ProvinceCoords[] {
  return Object.values(provinceCoordinates).filter(
    p => p.region.toUpperCase() === region.toUpperCase()
  );
}

// Default Italy center and zoom
export const italyCenter: [number, number] = [12.5674, 41.8719];
export const italyDefaultZoom = 5.5;
