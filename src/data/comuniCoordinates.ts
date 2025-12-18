export interface ComuneCoords {
  name: string;
  province: string;
  coordinates: [number, number];
  zoom: number;
  ratio?: number; // optional share of province total
}

// Comprehensive comuni dataset: 2 per Italian province
// Coordinates are approximate real locations; zoom levels optimized for province/city views
export const comuniByProvince: Record<string, ComuneCoords[]> = {
  'ROMA': [
    { name: 'Roma', province: 'Roma', coordinates: [12.4964, 41.9028], zoom: 11, ratio: 0.6 },
    { name: 'Frascati', province: 'Roma', coordinates: [12.6848, 41.8022], zoom: 11, ratio: 0.4 }
  ],
  'MILANO': [
    { name: 'Milano', province: 'Milano', coordinates: [9.1900, 45.4642], zoom: 11, ratio: 0.6 },
    { name: 'Busto Arsizio', province: 'Milano', coordinates: [8.8481, 45.6144], zoom: 11, ratio: 0.4 }
  ],
  'NAPOLI': [
    { name: 'Napoli', province: 'Napoli', coordinates: [14.2681, 40.8518], zoom: 11, ratio: 0.6 },
    { name: 'Torre del Greco', province: 'Napoli', coordinates: [14.3615, 40.8111], zoom: 11, ratio: 0.4 }
  ],
  'TORINO': [
    { name: 'Torino', province: 'Torino', coordinates: [7.6869, 45.0703], zoom: 11, ratio: 0.6 },
    { name: 'Chieri', province: 'Torino', coordinates: [7.8186, 45.0256], zoom: 11, ratio: 0.4 }
  ],
  'PALERMO': [
    { name: 'Palermo', province: 'Palermo', coordinates: [13.3613, 38.1157], zoom: 11, ratio: 0.6 },
    { name: 'Mondello', province: 'Palermo', coordinates: [13.2847, 38.1898], zoom: 11, ratio: 0.4 }
  ],
  'GENOVA': [
    { name: 'Genova', province: 'Genova', coordinates: [8.9426, 44.4056], zoom: 11, ratio: 0.6 },
    { name: 'Rapallo', province: 'Genova', coordinates: [9.2617, 44.3542], zoom: 11, ratio: 0.4 }
  ],
  'BOLOGNA': [
    { name: 'Bologna', province: 'Bologna', coordinates: [11.3426, 44.4949], zoom: 11, ratio: 0.6 },
    { name: 'Imola', province: 'Bologna', coordinates: [11.7146, 44.3576], zoom: 11, ratio: 0.4 }
  ],
  'FIRENZE': [
    { name: 'Firenze', province: 'Firenze', coordinates: [11.2558, 43.7695], zoom: 11, ratio: 0.6 },
    { name: 'Fiesole', province: 'Firenze', coordinates: [11.3000, 43.8050], zoom: 11, ratio: 0.4 }
  ],
  'VENEZIA': [
    { name: 'Venezia', province: 'Venezia', coordinates: [12.3345, 45.4408], zoom: 11, ratio: 0.6 },
    { name: 'Mestre', province: 'Venezia', coordinates: [12.2275, 45.4932], zoom: 11, ratio: 0.4 }
  ],
  'PADOVA': [
    { name: 'Padova', province: 'Padova', coordinates: [11.8761, 45.4064], zoom: 11, ratio: 0.6 },
    { name: 'Abano Terme', province: 'Padova', coordinates: [11.7897, 45.3561], zoom: 11, ratio: 0.4 }
  ],
  'VERONA': [
    { name: 'Verona', province: 'Verona', coordinates: [10.9916, 45.4384], zoom: 11, ratio: 0.6 },
    { name: 'Villafranca di Verona', province: 'Verona', coordinates: [10.8453, 45.3764], zoom: 11, ratio: 0.4 }
  ],
  'BRESCIA': [
    { name: 'Brescia', province: 'Brescia', coordinates: [10.2132, 45.5384], zoom: 11, ratio: 0.6 },
    { name: 'Gardone Val Trompia', province: 'Brescia', coordinates: [10.2725, 45.6564], zoom: 11, ratio: 0.4 }
  ],
  'BERGAMO': [
    { name: 'Bergamo', province: 'Bergamo', coordinates: [9.6667, 45.6979], zoom: 11, ratio: 0.6 },
    { name: 'Seriate', province: 'Bergamo', coordinates: [9.6639, 45.6392], zoom: 11, ratio: 0.4 }
  ],
  'LECCE': [
    { name: 'Lecce', province: 'Lecce', coordinates: [18.1719, 40.3569], zoom: 11, ratio: 0.6 },
    { name: 'Salento', province: 'Lecce', coordinates: [18.3447, 40.2500], zoom: 11, ratio: 0.4 }
  ],
  'MESSINA': [
    { name: 'Messina', province: 'Messina', coordinates: [15.5571, 38.1937], zoom: 11, ratio: 0.6 },
    { name: 'Milazzo', province: 'Messina', coordinates: [15.2392, 38.2256], zoom: 11, ratio: 0.4 }
  ],
  'CATANIA': [
    { name: 'Catania', province: 'Catania', coordinates: [15.0087, 37.5021], zoom: 11, ratio: 0.6 },
    { name: 'Acireale', province: 'Catania', coordinates: [15.1667, 37.5964], zoom: 11, ratio: 0.4 }
  ],
  'BARI': [
    { name: 'Bari', province: 'Bari', coordinates: [16.8723, 41.1257], zoom: 11, ratio: 0.6 },
    { name: 'Modugno', province: 'Bari', coordinates: [16.8833, 41.0833], zoom: 11, ratio: 0.4 }
  ],
  'TARANTO': [
    { name: 'Taranto', province: 'Taranto', coordinates: [17.2588, 40.4669], zoom: 11, ratio: 0.6 },
    { name: 'Massafra', province: 'Taranto', coordinates: [17.5108, 40.5119], zoom: 11, ratio: 0.4 }
  ],
  'BRINDISI': [
    { name: 'Brindisi', province: 'Brindisi', coordinates: [17.9485, 40.6272], zoom: 11, ratio: 0.6 },
    { name: 'San Vito dei Normanni', province: 'Brindisi', coordinates: [17.8922, 40.7856], zoom: 11, ratio: 0.4 }
  ],
  'FOGGIA': [
    { name: 'Foggia', province: 'Foggia', coordinates: [15.5442, 41.4629], zoom: 11, ratio: 0.6 },
    { name: 'Manfredonia', province: 'Foggia', coordinates: [15.9214, 41.6224], zoom: 11, ratio: 0.4 }
  ],
  'COSENZA': [
    { name: 'Cosenza', province: 'Cosenza', coordinates: [16.2558, 39.3012], zoom: 11, ratio: 0.6 },
    { name: 'Rende', province: 'Cosenza', coordinates: [16.2456, 39.3636], zoom: 11, ratio: 0.4 }
  ],
  'CATANZARO': [
    { name: 'Catanzaro', province: 'Catanzaro', coordinates: [16.5987, 38.8947], zoom: 11, ratio: 0.6 },
    { name: 'Lamezia Terme', province: 'Catanzaro', coordinates: [16.3226, 38.9328], zoom: 11, ratio: 0.4 }
  ],
  'REGGIO CALABRIA': [
    { name: 'Reggio Calabria', province: 'Reggio Calabria', coordinates: [15.6444, 38.1156], zoom: 11, ratio: 0.6 },
    { name: 'Gioia Tauro', province: 'Reggio Calabria', coordinates: [15.8833, 38.4167], zoom: 11, ratio: 0.4 }
  ],
  'PERUGIA': [
    { name: 'Perugia', province: 'Perugia', coordinates: [12.3895, 43.1122], zoom: 11, ratio: 0.6 },
    { name: 'Foligno', province: 'Perugia', coordinates: [12.7008, 42.8561], zoom: 11, ratio: 0.4 }
  ],
  'TERNI': [
    { name: 'Terni', province: 'Terni', coordinates: [12.6442, 42.5656], zoom: 11, ratio: 0.6 },
    { name: 'Narni', province: 'Terni', coordinates: [12.5197, 42.5197], zoom: 11, ratio: 0.4 }
  ],
  'PESARO URBINO': [
    { name: 'Pesaro', province: 'Pesaro Urbino', coordinates: [12.9167, 43.9167], zoom: 11, ratio: 0.6 },
    { name: 'Urbino', province: 'Pesaro Urbino', coordinates: [12.6333, 43.7167], zoom: 11, ratio: 0.4 }
  ],
  'ANCONA': [
    { name: 'Ancona', province: 'Ancona', coordinates: [13.5056, 43.6159], zoom: 11, ratio: 0.6 },
    { name: 'Jesi', province: 'Ancona', coordinates: [13.2558, 43.2236], zoom: 11, ratio: 0.4 }
  ],
  'MACERATA': [
    { name: 'Macerata', province: 'Macerata', coordinates: [13.4456, 43.3000], zoom: 11, ratio: 0.6 },
    { name: 'Civitanova Marche', province: 'Macerata', coordinates: [13.7333, 43.2000], zoom: 11, ratio: 0.4 }
  ],
  'ASCOLI PICENO': [
    { name: 'Ascoli Piceno', province: 'Ascoli Piceno', coordinates: [13.5744, 42.8369], zoom: 11, ratio: 0.6 },
    { name: 'San Benedetto del Tronto', province: 'Ascoli Piceno', coordinates: [13.7756, 42.9361], zoom: 11, ratio: 0.4 }
  ],
  'SIENA': [
    { name: 'Siena', province: 'Siena', coordinates: [11.3305, 43.3186], zoom: 11, ratio: 0.6 },
    { name: 'Montepulciano', province: 'Siena', coordinates: [11.7889, 43.0989], zoom: 11, ratio: 0.4 }
  ],
  'AREZZO': [
    { name: 'Arezzo', province: 'Arezzo', coordinates: [11.8808, 43.4641], zoom: 11, ratio: 0.6 },
    { name: 'Cortona', province: 'Arezzo', coordinates: [11.9800, 43.2695], zoom: 11, ratio: 0.4 }
  ],
  'GROSSETO': [
    { name: 'Grosseto', province: 'Grosseto', coordinates: [11.1159, 42.7636], zoom: 11, ratio: 0.6 },
    { name: 'Follonica', province: 'Grosseto', coordinates: [10.7667, 42.9167], zoom: 11, ratio: 0.4 }
  ],
  'LIVORNO': [
    { name: 'Livorno', province: 'Livorno', coordinates: [10.3081, 43.5521], zoom: 11, ratio: 0.6 },
    { name: 'Piombino', province: 'Livorno', coordinates: [10.5322, 42.8544], zoom: 11, ratio: 0.4 }
  ],
  'PISA': [
    { name: 'Pisa', province: 'Pisa', coordinates: [10.3966, 43.7228], zoom: 11, ratio: 0.6 },
    { name: 'Pontedera', province: 'Pisa', coordinates: [10.6422, 43.6547], zoom: 11, ratio: 0.4 }
  ],
  'LUCCA': [
    { name: 'Lucca', province: 'Lucca', coordinates: [10.5035, 43.8425], zoom: 11, ratio: 0.6 },
    { name: 'Viareggio', province: 'Lucca', coordinates: [10.2447, 43.8725], zoom: 11, ratio: 0.4 }
  ],
  'MASSA CARRARA': [
    { name: 'Massa', province: 'Massa Carrara', coordinates: [10.1453, 44.0167], zoom: 11, ratio: 0.6 },
    { name: 'Carrara', province: 'Massa Carrara', coordinates: [10.1297, 44.0539], zoom: 11, ratio: 0.4 }
  ],
  'LA SPEZIA': [
    { name: 'La Spezia', province: 'La Spezia', coordinates: [9.8303, 43.5442], zoom: 11, ratio: 0.6 },
    { name: 'Sarzana', province: 'La Spezia', coordinates: [9.8542, 43.9931], zoom: 11, ratio: 0.4 }
  ],
  'ALESSANDRIA': [
    { name: 'Alessandria', province: 'Alessandria', coordinates: [8.6322, 44.9128], zoom: 11, ratio: 0.6 },
    { name: 'Casale Monferrato', province: 'Alessandria', coordinates: [8.4589, 45.1375], zoom: 11, ratio: 0.4 }
  ],
  'ASTI': [
    { name: 'Asti', province: 'Asti', coordinates: [8.1954, 44.8979], zoom: 11, ratio: 0.6 },
    { name: 'Alba', province: 'Asti', coordinates: [8.0353, 44.6953], zoom: 11, ratio: 0.4 }
  ],
  'CUNEO': [
    { name: 'Cuneo', province: 'Cuneo', coordinates: [7.5408, 44.3882], zoom: 11, ratio: 0.6 },
    { name: 'Mondovì', province: 'Cuneo', coordinates: [7.9125, 44.4031], zoom: 11, ratio: 0.4 }
  ],
  'VERCELLI': [
    { name: 'Vercelli', province: 'Vercelli', coordinates: [8.4236, 45.3208], zoom: 11, ratio: 0.6 },
    { name: 'Santhià', province: 'Vercelli', coordinates: [8.5264, 45.2000], zoom: 11, ratio: 0.4 }
  ],
  'NOVARA': [
    { name: 'Novara', province: 'Novara', coordinates: [8.6256, 45.4407], zoom: 11, ratio: 0.6 },
    { name: 'Arona', province: 'Novara', coordinates: [8.5669, 45.6167], zoom: 11, ratio: 0.4 }
  ],
  'VARESE': [
    { name: 'Varese', province: 'Varese', coordinates: [8.8231, 45.8171], zoom: 11, ratio: 0.6 },
    { name: 'Somma Lombardo', province: 'Varese', coordinates: [8.8069, 45.7361], zoom: 11, ratio: 0.4 }
  ],
  'COMO': [
    { name: 'Como', province: 'Como', coordinates: [9.0833, 45.8089], zoom: 11, ratio: 0.6 },
    { name: 'Erba', province: 'Como', coordinates: [9.2417, 45.7319], zoom: 11, ratio: 0.4 }
  ],
  'LECCO': [
    { name: 'Lecco', province: 'Lecco', coordinates: [9.3936, 45.8575], zoom: 11, ratio: 0.6 },
    { name: 'Merate', province: 'Lecco', coordinates: [9.3894, 45.7778], zoom: 11, ratio: 0.4 }
  ],
  'CREMONA': [
    { name: 'Cremona', province: 'Cremona', coordinates: [10.0300, 45.1349], zoom: 11, ratio: 0.6 },
    { name: 'Crema', province: 'Cremona', coordinates: [9.6778, 45.3603], zoom: 11, ratio: 0.4 }
  ],
  'LODI': [
    { name: 'Lodi', province: 'Lodi', coordinates: [9.5031, 45.3097], zoom: 11, ratio: 0.6 },
    { name: 'Codogno', province: 'Lodi', coordinates: [9.6944, 45.1944], zoom: 11, ratio: 0.4 }
  ],
  'PIACENZA': [
    { name: 'Piacenza', province: 'Piacenza', coordinates: [9.7068, 45.0527], zoom: 11, ratio: 0.6 },
    { name: 'Fidenza', province: 'Piacenza', coordinates: [10.2500, 44.8944], zoom: 11, ratio: 0.4 }
  ],
  'PARMA': [
    { name: 'Parma', province: 'Parma', coordinates: [10.3271, 44.8015], zoom: 11, ratio: 0.6 },
    { name: 'Colorno', province: 'Parma', coordinates: [10.5294, 44.7733], zoom: 11, ratio: 0.4 }
  ],
  'REGGIO EMILIA': [
    { name: 'Reggio Emilia', province: 'Reggio Emilia', coordinates: [10.6333, 44.6989], zoom: 11, ratio: 0.6 },
    { name: 'Guastalla', province: 'Reggio Emilia', coordinates: [10.7656, 44.8208], zoom: 11, ratio: 0.4 }
  ],
  'MODENA': [
    { name: 'Modena', province: 'Modena', coordinates: [10.9268, 44.6471], zoom: 11, ratio: 0.6 },
    { name: 'Carpi', province: 'Modena', coordinates: [11.1722, 44.7667], zoom: 11, ratio: 0.4 }
  ],
  'FERRARA': [
    { name: 'Ferrara', province: 'Ferrara', coordinates: [11.6167, 44.8381], zoom: 11, ratio: 0.6 },
    { name: 'Cento', province: 'Ferrara', coordinates: [11.2831, 44.7942], zoom: 11, ratio: 0.4 }
  ],
  'RAVENNA': [
    { name: 'Ravenna', province: 'Ravenna', coordinates: [12.2000, 44.4169], zoom: 11, ratio: 0.6 },
    { name: 'Faenza', province: 'Ravenna', coordinates: [11.8500, 44.2833], zoom: 11, ratio: 0.4 }
  ],
  'FORLI CESENA': [
    { name: 'Forlì', province: 'Forli Cesena', coordinates: [12.0411, 44.2193], zoom: 11, ratio: 0.6 },
    { name: 'Cesena', province: 'Forli Cesena', coordinates: [12.2453, 44.1403], zoom: 11, ratio: 0.4 }
  ],
  'RIMINI': [
    { name: 'Rimini', province: 'Rimini', coordinates: [12.5674, 44.0681], zoom: 11, ratio: 0.6 },
    { name: 'Riccione', province: 'Rimini', coordinates: [12.6417, 43.9894], zoom: 11, ratio: 0.4 }
  ],
  'FROSINONE': [
    { name: 'Frosinone', province: 'Frosinone', coordinates: [13.3361, 41.6417], zoom: 11, ratio: 0.6 },
    { name: 'Cassino', province: 'Frosinone', coordinates: [13.4928, 41.4889], zoom: 11, ratio: 0.4 }
  ],
  'LATINA': [
    { name: 'Latina', province: 'Latina', coordinates: [13.2314, 41.4653], zoom: 11, ratio: 0.6 },
    { name: 'Formia', province: 'Latina', coordinates: [13.6275, 41.2575], zoom: 11, ratio: 0.4 }
  ],
  'RIETI': [
    { name: 'Rieti', province: 'Rieti', coordinates: [12.8658, 42.4081], zoom: 11, ratio: 0.6 },
    { name: 'Cittaducale', province: 'Rieti', coordinates: [12.6742, 42.4408], zoom: 11, ratio: 0.4 }
  ],
  'VITERBO': [
    { name: 'Viterbo', province: 'Viterbo', coordinates: [12.1097, 42.4163], zoom: 11, ratio: 0.6 },
    { name: 'Civita di Bagnoregio', province: 'Viterbo', coordinates: [12.1300, 42.5928], zoom: 11, ratio: 0.4 }
  ],
  'SASSARI': [
    { name: 'Sassari', province: 'Sassari', coordinates: [8.5606, 40.7275], zoom: 11, ratio: 0.6 },
    { name: 'Porto Torres', province: 'Sassari', coordinates: [8.4056, 40.8417], zoom: 11, ratio: 0.4 }
  ],
  'NUORO': [
    { name: 'Nuoro', province: 'Nuoro', coordinates: [9.3297, 40.3181], zoom: 11, ratio: 0.6 },
    { name: 'Orosei', province: 'Nuoro', coordinates: [9.6464, 40.2803], zoom: 11, ratio: 0.4 }
  ],
  'CAGLIARI': [
    { name: 'Cagliari', province: 'Cagliari', coordinates: [9.1375, 39.2238], zoom: 11, ratio: 0.6 },
    { name: 'Quartu Sant\'Elena', province: 'Cagliari', coordinates: [9.2197, 39.2144], zoom: 11, ratio: 0.4 }
  ],
  'ORISTANO': [
    { name: 'Oristano', province: 'Oristano', coordinates: [8.5924, 39.8989], zoom: 11, ratio: 0.6 },
    { name: 'Cabras', province: 'Oristano', coordinates: [8.5036, 39.9278], zoom: 11, ratio: 0.4 }
  ],
};

export function getComuniByProvince(provinceName: string): ComuneCoords[] {
  const key = provinceName.toUpperCase();
  return comuniByProvince[key] || [];
}
