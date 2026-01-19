// Province and region coordinates for the interactive map

export interface ProvinceCoords {
  name: string;
  coordinates: [number, number];
  zoom: number;
  region: string;
}

export const italyCenter: [number, number] = [12.4964, 42.3454];
export const italyDefaultZoom = 5.5;

// Regional capitals mapping - using same case as provinceToRegion in assunzioniData
export const regionalCapitals: Record<string, string> = {
  'Piemonte': 'TORINO',
  "Valle d'Aosta": 'AOSTA',
  'Lombardia': 'MILANO',
  'Trentino-Alto Adige': 'TRENTO',
  'Veneto': 'VENEZIA',
  'Friuli-Venezia Giulia': 'TRIESTE',
  'Liguria': 'GENOVA',
  'Emilia-Romagna': 'BOLOGNA',
  'Toscana': 'FIRENZE',
  'Umbria': 'PERUGIA',
  'Marche': 'ANCONA',
  'Lazio': 'ROMA',
  'Abruzzo': "L'AQUILA",
  'Molise': 'CAMPOBASSO',
  'Campania': 'NAPOLI',
  'Puglia': 'BARI',
  'Basilicata': 'POTENZA',
  'Calabria': 'CATANZARO',
  'Sicilia': 'PALERMO',
  'Sardegna': 'CAGLIARI'
};

// Region coordinates for map centering - using same case as provinceToRegion
export const regionCoordinates: Record<string, { coordinates: [number, number]; zoom: number }> = {
  'Piemonte': { coordinates: [7.8, 45.0], zoom: 7.5 },
  "Valle d'Aosta": { coordinates: [7.35, 45.73], zoom: 9 },
  'Lombardia': { coordinates: [9.9, 45.5], zoom: 7.5 },
  'Trentino-Alto Adige': { coordinates: [11.35, 46.5], zoom: 8 },
  'Veneto': { coordinates: [11.8, 45.5], zoom: 7.5 },
  'Friuli-Venezia Giulia': { coordinates: [13.2, 46.0], zoom: 8 },
  'Liguria': { coordinates: [8.7, 44.3], zoom: 8 },
  'Emilia-Romagna': { coordinates: [11.0, 44.5], zoom: 7.5 },
  'Toscana': { coordinates: [11.2, 43.2], zoom: 7.5 },
  'Umbria': { coordinates: [12.6, 42.9], zoom: 8 },
  'Marche': { coordinates: [13.2, 43.4], zoom: 8 },
  'Lazio': { coordinates: [12.7, 42.0], zoom: 7.5 },
  'Abruzzo': { coordinates: [13.7, 42.2], zoom: 8 },
  'Molise': { coordinates: [14.5, 41.6], zoom: 9 },
  'Campania': { coordinates: [14.7, 40.8], zoom: 8 },
  'Puglia': { coordinates: [16.5, 41.0], zoom: 7.5 },
  'Basilicata': { coordinates: [16.0, 40.5], zoom: 8 },
  'Calabria': { coordinates: [16.3, 39.0], zoom: 8 },
  'Sicilia': { coordinates: [14.0, 37.5], zoom: 7.5 },
  'Sardegna': { coordinates: [9.0, 40.0], zoom: 7.5 }
};

// Province coordinates - regions match provinceToRegion mapping
export const provinceCoordinates: Record<string, ProvinceCoords> = {
  // Piemonte
  'TORINO': { name: 'Torino', coordinates: [7.6869, 45.0703], zoom: 9, region: 'Piemonte' },
  'ALESSANDRIA': { name: 'Alessandria', coordinates: [8.6150, 44.9122], zoom: 9, region: 'Piemonte' },
  'ASTI': { name: 'Asti', coordinates: [8.2066, 44.9005], zoom: 9, region: 'Piemonte' },
  'BIELLA': { name: 'Biella', coordinates: [8.0545, 45.5633], zoom: 9, region: 'Piemonte' },
  'CUNEO': { name: 'Cuneo', coordinates: [7.5447, 44.3843], zoom: 9, region: 'Piemonte' },
  'NOVARA': { name: 'Novara', coordinates: [8.6181, 45.4465], zoom: 9, region: 'Piemonte' },
  'VERBANO-CUSIO-OSSOLA': { name: 'Verbano-Cusio-Ossola', coordinates: [8.5525, 46.1419], zoom: 9, region: 'Piemonte' },
  'VERCELLI': { name: 'Vercelli', coordinates: [8.4234, 45.3227], zoom: 9, region: 'Piemonte' },
  
  // Valle d'Aosta
  'AOSTA': { name: 'Aosta', coordinates: [7.3153, 45.7350], zoom: 9, region: "Valle d'Aosta" },
  
  // Lombardia
  'MILANO': { name: 'Milano', coordinates: [9.1900, 45.4642], zoom: 9, region: 'Lombardia' },
  'BERGAMO': { name: 'Bergamo', coordinates: [9.6773, 45.6983], zoom: 9, region: 'Lombardia' },
  'BRESCIA': { name: 'Brescia', coordinates: [10.2118, 45.5416], zoom: 9, region: 'Lombardia' },
  'COMO': { name: 'Como', coordinates: [9.0852, 45.8081], zoom: 9, region: 'Lombardia' },
  'CREMONA': { name: 'Cremona', coordinates: [10.0227, 45.1335], zoom: 9, region: 'Lombardia' },
  'LECCO': { name: 'Lecco', coordinates: [9.3999, 45.8566], zoom: 9, region: 'Lombardia' },
  'LODI': { name: 'Lodi', coordinates: [9.5013, 45.3097], zoom: 9, region: 'Lombardia' },
  'MANTOVA': { name: 'Mantova', coordinates: [10.7916, 45.1564], zoom: 9, region: 'Lombardia' },
  'MONZA E BRIANZA': { name: 'Monza e Brianza', coordinates: [9.2743, 45.5847], zoom: 9, region: 'Lombardia' },
  'PAVIA': { name: 'Pavia', coordinates: [9.1592, 45.1847], zoom: 9, region: 'Lombardia' },
  'SONDRIO': { name: 'Sondrio', coordinates: [9.8690, 46.1699], zoom: 9, region: 'Lombardia' },
  'VARESE': { name: 'Varese', coordinates: [8.8259, 45.8206], zoom: 9, region: 'Lombardia' },
  
  // Trentino-Alto Adige
  'TRENTO': { name: 'Trento', coordinates: [11.1217, 46.0748], zoom: 9, region: 'Trentino-Alto Adige' },
  'BOLZANO': { name: 'Bolzano', coordinates: [11.3548, 46.4983], zoom: 9, region: 'Trentino-Alto Adige' },
  
  // Veneto
  'VENEZIA': { name: 'Venezia', coordinates: [12.3155, 45.4408], zoom: 9, region: 'Veneto' },
  'BELLUNO': { name: 'Belluno', coordinates: [12.2174, 46.1403], zoom: 9, region: 'Veneto' },
  'PADOVA': { name: 'Padova', coordinates: [11.8768, 45.4064], zoom: 9, region: 'Veneto' },
  'ROVIGO': { name: 'Rovigo', coordinates: [11.7900, 45.0693], zoom: 9, region: 'Veneto' },
  'TREVISO': { name: 'Treviso', coordinates: [12.2431, 45.6670], zoom: 9, region: 'Veneto' },
  'VERONA': { name: 'Verona', coordinates: [10.9916, 45.4384], zoom: 9, region: 'Veneto' },
  'VICENZA': { name: 'Vicenza', coordinates: [11.5450, 45.5455], zoom: 9, region: 'Veneto' },
  
  // Friuli-Venezia Giulia
  'TRIESTE': { name: 'Trieste', coordinates: [13.7768, 45.6495], zoom: 9, region: 'Friuli-Venezia Giulia' },
  'GORIZIA': { name: 'Gorizia', coordinates: [13.6218, 45.9414], zoom: 9, region: 'Friuli-Venezia Giulia' },
  'PORDENONE': { name: 'Pordenone', coordinates: [12.6605, 45.9635], zoom: 9, region: 'Friuli-Venezia Giulia' },
  'UDINE': { name: 'Udine', coordinates: [13.2346, 46.0711], zoom: 9, region: 'Friuli-Venezia Giulia' },
  
  // Liguria
  'GENOVA': { name: 'Genova', coordinates: [8.9463, 44.4056], zoom: 9, region: 'Liguria' },
  'IMPERIA': { name: 'Imperia', coordinates: [8.0277, 43.8857], zoom: 9, region: 'Liguria' },
  'LA SPEZIA': { name: 'La Spezia', coordinates: [9.8241, 44.1024], zoom: 9, region: 'Liguria' },
  'SAVONA': { name: 'Savona', coordinates: [8.4819, 44.3091], zoom: 9, region: 'Liguria' },
  
  // Emilia-Romagna
  'BOLOGNA': { name: 'Bologna', coordinates: [11.3426, 44.4949], zoom: 9, region: 'Emilia-Romagna' },
  'FERRARA': { name: 'Ferrara', coordinates: [11.6200, 44.8381], zoom: 9, region: 'Emilia-Romagna' },
  'FORLI-CESENA': { name: 'Forlì-Cesena', coordinates: [12.0401, 44.2225], zoom: 9, region: 'Emilia-Romagna' },
  'MODENA': { name: 'Modena', coordinates: [10.9252, 44.6471], zoom: 9, region: 'Emilia-Romagna' },
  'PARMA': { name: 'Parma', coordinates: [10.3279, 44.8015], zoom: 9, region: 'Emilia-Romagna' },
  'PIACENZA': { name: 'Piacenza', coordinates: [9.6937, 45.0526], zoom: 9, region: 'Emilia-Romagna' },
  'RAVENNA': { name: 'Ravenna', coordinates: [12.2014, 44.4184], zoom: 9, region: 'Emilia-Romagna' },
  'REGGIO EMILIA': { name: 'Reggio Emilia', coordinates: [10.6300, 44.6978], zoom: 9, region: 'Emilia-Romagna' },
  'RIMINI': { name: 'Rimini', coordinates: [12.5674, 44.0678], zoom: 9, region: 'Emilia-Romagna' },
  
  // Toscana
  'FIRENZE': { name: 'Firenze', coordinates: [11.2558, 43.7696], zoom: 9, region: 'Toscana' },
  'AREZZO': { name: 'Arezzo', coordinates: [11.8823, 43.4633], zoom: 9, region: 'Toscana' },
  'GROSSETO': { name: 'Grosseto', coordinates: [11.1136, 42.7635], zoom: 9, region: 'Toscana' },
  'LIVORNO': { name: 'Livorno', coordinates: [10.3106, 43.5486], zoom: 9, region: 'Toscana' },
  'LUCCA': { name: 'Lucca', coordinates: [10.5027, 43.8429], zoom: 9, region: 'Toscana' },
  'MASSA-CARRARA': { name: 'Massa-Carrara', coordinates: [10.1395, 44.0357], zoom: 9, region: 'Toscana' },
  'PISA': { name: 'Pisa', coordinates: [10.3944, 43.7228], zoom: 9, region: 'Toscana' },
  'PISTOIA': { name: 'Pistoia', coordinates: [10.9152, 43.9336], zoom: 9, region: 'Toscana' },
  'PRATO': { name: 'Prato', coordinates: [11.0969, 43.8777], zoom: 9, region: 'Toscana' },
  'SIENA': { name: 'Siena', coordinates: [11.3315, 43.3188], zoom: 9, region: 'Toscana' },
  
  // Umbria
  'PERUGIA': { name: 'Perugia', coordinates: [12.3889, 43.1107], zoom: 9, region: 'Umbria' },
  'TERNI': { name: 'Terni', coordinates: [12.6426, 42.5636], zoom: 9, region: 'Umbria' },
  
  // Marche
  'ANCONA': { name: 'Ancona', coordinates: [13.5188, 43.6158], zoom: 9, region: 'Marche' },
  'ASCOLI PICENO': { name: 'Ascoli Piceno', coordinates: [13.5754, 42.8537], zoom: 9, region: 'Marche' },
  'FERMO': { name: 'Fermo', coordinates: [13.7186, 43.1608], zoom: 9, region: 'Marche' },
  'MACERATA': { name: 'Macerata', coordinates: [13.4522, 43.3002], zoom: 9, region: 'Marche' },
  'PESARO E URBINO': { name: 'Pesaro e Urbino', coordinates: [12.9134, 43.9106], zoom: 9, region: 'Marche' },
  
  // Lazio
  'ROMA': { name: 'Roma', coordinates: [12.4964, 41.9028], zoom: 9, region: 'Lazio' },
  'FROSINONE': { name: 'Frosinone', coordinates: [13.3503, 41.6397], zoom: 9, region: 'Lazio' },
  'LATINA': { name: 'Latina', coordinates: [12.9068, 41.4676], zoom: 9, region: 'Lazio' },
  'RIETI': { name: 'Rieti', coordinates: [12.8567, 42.4037], zoom: 9, region: 'Lazio' },
  'VITERBO': { name: 'Viterbo', coordinates: [11.9869, 42.4206], zoom: 9, region: 'Lazio' },
  
  // Abruzzo
  "L'AQUILA": { name: "L'Aquila", coordinates: [13.3995, 42.3498], zoom: 9, region: 'Abruzzo' },
  'CHIETI': { name: 'Chieti', coordinates: [14.1688, 42.3510], zoom: 9, region: 'Abruzzo' },
  'PESCARA': { name: 'Pescara', coordinates: [14.2105, 42.4617], zoom: 9, region: 'Abruzzo' },
  'TERAMO': { name: 'Teramo', coordinates: [13.7042, 42.6589], zoom: 9, region: 'Abruzzo' },
  
  // Molise
  'CAMPOBASSO': { name: 'Campobasso', coordinates: [14.6560, 41.5603], zoom: 9, region: 'Molise' },
  'ISERNIA': { name: 'Isernia', coordinates: [14.2333, 41.5963], zoom: 9, region: 'Molise' },
  
  // Campania
  'NAPOLI': { name: 'Napoli', coordinates: [14.2681, 40.8518], zoom: 9, region: 'Campania' },
  'AVELLINO': { name: 'Avellino', coordinates: [14.7919, 40.9159], zoom: 9, region: 'Campania' },
  'BENEVENTO': { name: 'Benevento', coordinates: [14.7814, 41.1297], zoom: 9, region: 'Campania' },
  'CASERTA': { name: 'Caserta', coordinates: [14.3329, 41.0742], zoom: 9, region: 'Campania' },
  'SALERNO': { name: 'Salerno', coordinates: [14.7681, 40.6824], zoom: 9, region: 'Campania' },
  
  // Puglia
  'BARI': { name: 'Bari', coordinates: [16.8719, 41.1171], zoom: 9, region: 'Puglia' },
  'BARLETTA-ANDRIA-TRANI': { name: 'Barletta-Andria-Trani', coordinates: [16.2919, 41.2268], zoom: 9, region: 'Puglia' },
  'BRINDISI': { name: 'Brindisi', coordinates: [17.9382, 40.6327], zoom: 9, region: 'Puglia' },
  'FOGGIA': { name: 'Foggia', coordinates: [15.5448, 41.4621], zoom: 9, region: 'Puglia' },
  'LECCE': { name: 'Lecce', coordinates: [18.1710, 40.3516], zoom: 9, region: 'Puglia' },
  'TARANTO': { name: 'Taranto', coordinates: [17.2299, 40.4761], zoom: 9, region: 'Puglia' },
  
  // Basilicata
  'POTENZA': { name: 'Potenza', coordinates: [15.8086, 40.6404], zoom: 9, region: 'Basilicata' },
  'MATERA': { name: 'Matera', coordinates: [16.6043, 40.6664], zoom: 9, region: 'Basilicata' },
  
  // Calabria
  'CATANZARO': { name: 'Catanzaro', coordinates: [16.5875, 38.9097], zoom: 9, region: 'Calabria' },
  'COSENZA': { name: 'Cosenza', coordinates: [16.2510, 39.2983], zoom: 9, region: 'Calabria' },
  'CROTONE': { name: 'Crotone', coordinates: [17.1278, 39.0809], zoom: 9, region: 'Calabria' },
  'REGGIO CALABRIA': { name: 'Reggio Calabria', coordinates: [15.6513, 38.1113], zoom: 9, region: 'Calabria' },
  'VIBO VALENTIA': { name: 'Vibo Valentia', coordinates: [16.1000, 38.6761], zoom: 9, region: 'Calabria' },
  
  // Sicilia
  'PALERMO': { name: 'Palermo', coordinates: [13.3614, 38.1157], zoom: 9, region: 'Sicilia' },
  'AGRIGENTO': { name: 'Agrigento', coordinates: [13.5765, 37.3111], zoom: 9, region: 'Sicilia' },
  'CALTANISSETTA': { name: 'Caltanissetta', coordinates: [14.0624, 37.4901], zoom: 9, region: 'Sicilia' },
  'CATANIA': { name: 'Catania', coordinates: [15.0873, 37.5024], zoom: 9, region: 'Sicilia' },
  'ENNA': { name: 'Enna', coordinates: [14.2756, 37.5670], zoom: 9, region: 'Sicilia' },
  'MESSINA': { name: 'Messina', coordinates: [15.5540, 38.1938], zoom: 9, region: 'Sicilia' },
  'RAGUSA': { name: 'Ragusa', coordinates: [14.7173, 36.9269], zoom: 9, region: 'Sicilia' },
  'SIRACUSA': { name: 'Siracusa', coordinates: [15.2866, 37.0755], zoom: 9, region: 'Sicilia' },
  'TRAPANI': { name: 'Trapani', coordinates: [12.5148, 38.0180], zoom: 9, region: 'Sicilia' },
  
  // Sardegna
  'CAGLIARI': { name: 'Cagliari', coordinates: [9.1217, 39.2238], zoom: 9, region: 'Sardegna' },
  'CARBONIA-IGLESIAS': { name: 'Carbonia-Iglesias', coordinates: [8.5208, 39.1663], zoom: 9, region: 'Sardegna' },
  'MEDIO CAMPIDANO': { name: 'Medio Campidano', coordinates: [8.7478, 39.5305], zoom: 9, region: 'Sardegna' },
  'NUORO': { name: 'Nuoro', coordinates: [9.3290, 40.3209], zoom: 9, region: 'Sardegna' },
  'OGLIASTRA': { name: 'Ogliastra', coordinates: [9.4515, 39.8420], zoom: 9, region: 'Sardegna' },
  'OLBIA-TEMPIO': { name: 'Olbia-Tempio', coordinates: [9.4893, 40.9229], zoom: 9, region: 'Sardegna' },
  'ORISTANO': { name: 'Oristano', coordinates: [8.5910, 39.9062], zoom: 9, region: 'Sardegna' },
  'SASSARI': { name: 'Sassari', coordinates: [8.5555, 40.7259], zoom: 9, region: 'Sardegna' },
  'SUD SARDEGNA': { name: 'Sud Sardegna', coordinates: [8.9000, 39.4000], zoom: 9, region: 'Sardegna' },
};

// Get provinces by region
export function getProvincesByRegion(regionName: string): ProvinceCoords[] {
  return Object.values(provinceCoordinates).filter(
    p => p.region.toUpperCase() === regionName.toUpperCase()
  );
}
