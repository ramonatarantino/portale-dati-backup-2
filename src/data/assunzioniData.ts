// Data based on the uploaded Excel file
export interface AssunzioneRecord {
  provincia: string;
  amministrazione: string;
  eta_min: number;
  eta_max: number | null;
  sesso: 'M' | 'F';
  motivo_assunzione: string;
  numero: number;
}

// Province to Region mapping for Italy
export const provinceToRegion: Record<string, string> = {
  // Piemonte
  'TORINO': 'Piemonte',
  'VERCELLI': 'Piemonte',
  'NOVARA': 'Piemonte',
  'CUNEO': 'Piemonte',
  'ASTI': 'Piemonte',
  'ALESSANDRIA': 'Piemonte',
  'BIELLA': 'Piemonte',
  'VERBANO-CUSIO-OSSOLA': 'Piemonte',
  
  // Valle d'Aosta
  'AOSTA': "Valle d'Aosta",
  
  // Lombardia
  'MILANO': 'Lombardia',
  'BERGAMO': 'Lombardia',
  'BRESCIA': 'Lombardia',
  'COMO': 'Lombardia',
  'CREMONA': 'Lombardia',
  'LECCO': 'Lombardia',
  'LODI': 'Lombardia',
  'MANTOVA': 'Lombardia',
  'MONZA E DELLA BRIANZA': 'Lombardia',
  'PAVIA': 'Lombardia',
  'SONDRIO': 'Lombardia',
  'VARESE': 'Lombardia',
  
  // Trentino-Alto Adige
  'TRENTO': 'Trentino-Alto Adige',
  'BOLZANO': 'Trentino-Alto Adige',
  
  // Veneto
  'VENEZIA': 'Veneto',
  'VERONA': 'Veneto',
  'VICENZA': 'Veneto',
  'PADOVA': 'Veneto',
  'ROVIGO': 'Veneto',
  'TREVISO': 'Veneto',
  'BELLUNO': 'Veneto',
  
  // Friuli-Venezia Giulia
  'TRIESTE': 'Friuli-Venezia Giulia',
  'UDINE': 'Friuli-Venezia Giulia',
  'PORDENONE': 'Friuli-Venezia Giulia',
  'GORIZIA': 'Friuli-Venezia Giulia',
  
  // Liguria
  'GENOVA': 'Liguria',
  'IMPERIA': 'Liguria',
  'LA SPEZIA': 'Liguria',
  'SAVONA': 'Liguria',
  
  // Emilia-Romagna
  'BOLOGNA': 'Emilia-Romagna',
  'MODENA': 'Emilia-Romagna',
  'PARMA': 'Emilia-Romagna',
  'REGGIO EMILIA': 'Emilia-Romagna',
  'FERRARA': 'Emilia-Romagna',
  'FORLI-CESENA': 'Emilia-Romagna',
  "FORLI'-CESENA": 'Emilia-Romagna',
  'PIACENZA': 'Emilia-Romagna',
  'RAVENNA': 'Emilia-Romagna',
  'RIMINI': 'Emilia-Romagna',
  
  // Toscana
  'FIRENZE': 'Toscana',
  'AREZZO': 'Toscana',
  'GROSSETO': 'Toscana',
  'LIVORNO': 'Toscana',
  'LUCCA': 'Toscana',
  'MASSA-CARRARA': 'Toscana',
  'PISA': 'Toscana',
  'PISTOIA': 'Toscana',
  'PRATO': 'Toscana',
  'SIENA': 'Toscana',
  
  // Umbria
  'PERUGIA': 'Umbria',
  'TERNI': 'Umbria',
  
  // Marche
  'ANCONA': 'Marche',
  'ASCOLI PICENO': 'Marche',
  'FERMO': 'Marche',
  'MACERATA': 'Marche',
  'PESARO E URBINO': 'Marche',
  
  // Lazio
  'ROMA': 'Lazio',
  'FROSINONE': 'Lazio',
  'LATINA': 'Lazio',
  'RIETI': 'Lazio',
  'VITERBO': 'Lazio',
  
  // Abruzzo
  "L'AQUILA": 'Abruzzo',
  'CHIETI': 'Abruzzo',
  'PESCARA': 'Abruzzo',
  'TERAMO': 'Abruzzo',
  
  // Molise
  'CAMPOBASSO': 'Molise',
  'ISERNIA': 'Molise',
  
  // Campania
  'NAPOLI': 'Campania',
  'AVELLINO': 'Campania',
  'BENEVENTO': 'Campania',
  'CASERTA': 'Campania',
  'SALERNO': 'Campania',
  
  // Puglia
  'BARI': 'Puglia',
  'BRINDISI': 'Puglia',
  'FOGGIA': 'Puglia',
  'LECCE': 'Puglia',
  'TARANTO': 'Puglia',
  'BARLETTA-ANDRIA-TRANI': 'Puglia',
  
  // Basilicata
  'POTENZA': 'Basilicata',
  'MATERA': 'Basilicata',
  
  // Calabria
  'CATANZARO': 'Calabria',
  'COSENZA': 'Calabria',
  'CROTONE': 'Calabria',
  'REGGIO CALABRIA': 'Calabria',
  'VIBO VALENTIA': 'Calabria',
  
  // Sicilia
  'PALERMO': 'Sicilia',
  'AGRIGENTO': 'Sicilia',
  'CALTANISSETTA': 'Sicilia',
  'CATANIA': 'Sicilia',
  'ENNA': 'Sicilia',
  'MESSINA': 'Sicilia',
  'RAGUSA': 'Sicilia',
  'SIRACUSA': 'Sicilia',
  'TRAPANI': 'Sicilia',
  
  // Sardegna
  'CAGLIARI': 'Sardegna',
  'NUORO': 'Sardegna',
  'ORISTANO': 'Sardegna',
  'SASSARI': 'Sardegna',
  'SUD SARDEGNA': 'Sardegna',
};

// Sample data from the Excel file with gender breakdown
export const assunzioniData: AssunzioneRecord[] = [
  // AGRIGENTO - Sicilia
  { provincia: 'AGRIGENTO', amministrazione: 'AGENZIA DELLE DOGANE', eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 8 },
  { provincia: 'AGRIGENTO', amministrazione: 'AGENZIA DELLE DOGANE', eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 12 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 555 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2029 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2770 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 198 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 652 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1125 },
  { provincia: 'AGRIGENTO', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 25, eta_max: 34, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 73 },
  { provincia: 'AGRIGENTO', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 56 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 273 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 323 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 18 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 24 },
  
  // PALERMO - Sicilia
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 890 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 3200 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 4100 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 320 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 980 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1350 },
  { provincia: 'PALERMO', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 25, eta_max: 34, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 150 },
  { provincia: 'PALERMO', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 180 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 450 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 520 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 85 },
  
  // CATANIA - Sicilia
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 750 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2800 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 3500 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 280 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 850 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1100 },
  { provincia: 'CATANIA', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 180 },
  { provincia: 'CATANIA', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 145 },
  
  // MESSINA - Sicilia
  { provincia: 'MESSINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1800 },
  { provincia: 'MESSINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2200 },
  { provincia: 'MESSINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 580 },
  { provincia: 'MESSINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 720 },
  { provincia: 'MESSINA', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 95 },
  { provincia: 'MESSINA', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 78 },
  
  // SIRACUSA - Sicilia
  { provincia: 'SIRACUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1200 },
  { provincia: 'SIRACUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1500 },
  { provincia: 'SIRACUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 380 },
  { provincia: 'SIRACUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 480 },
  
  // TRAPANI - Sicilia
  { provincia: 'TRAPANI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 950 },
  { provincia: 'TRAPANI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1100 },
  { provincia: 'TRAPANI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 310 },
  { provincia: 'TRAPANI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 380 },
  
  // RAGUSA - Sicilia
  { provincia: 'RAGUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 680 },
  { provincia: 'RAGUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 820 },
  { provincia: 'RAGUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 220 },
  { provincia: 'RAGUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 280 },
  
  // CALTANISSETTA - Sicilia
  { provincia: 'CALTANISSETTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 520 },
  { provincia: 'CALTANISSETTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 680 },
  { provincia: 'CALTANISSETTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 170 },
  { provincia: 'CALTANISSETTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 220 },
  
  // ENNA - Sicilia
  { provincia: 'ENNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 380 },
  { provincia: 'ENNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 450 },
  { provincia: 'ENNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 125 },
  { provincia: 'ENNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 150 },
  
  // ROMA - Lazio
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 5200 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 12500 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 15800 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1800 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 4200 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 5500 },
  { provincia: 'ROMA', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 890 },
  { provincia: 'ROMA', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 720 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 2100 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 380 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1800 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1200 },
  
  // FROSINONE - Lazio
  { provincia: 'FROSINONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1200 },
  { provincia: 'FROSINONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1500 },
  { provincia: 'FROSINONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 420 },
  { provincia: 'FROSINONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 520 },
  
  // LATINA - Lazio
  { provincia: 'LATINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1400 },
  { provincia: 'LATINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1700 },
  { provincia: 'LATINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 480 },
  { provincia: 'LATINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 580 },
  
  // RIETI - Lazio
  { provincia: 'RIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 350 },
  { provincia: 'RIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 420 },
  { provincia: 'RIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 120 },
  { provincia: 'RIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 150 },
  
  // VITERBO - Lazio
  { provincia: 'VITERBO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 580 },
  { provincia: 'VITERBO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 720 },
  { provincia: 'VITERBO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 200 },
  { provincia: 'VITERBO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 250 },
  
  // MILANO - Lombardia
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 4800 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 11200 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 14500 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1650 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 3800 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 4900 },
  { provincia: 'MILANO', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 720 },
  { provincia: 'MILANO', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 580 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1800 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 320 },
  
  // BRESCIA - Lombardia
  { provincia: 'BRESCIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2800 },
  { provincia: 'BRESCIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 3500 },
  { provincia: 'BRESCIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 950 },
  { provincia: 'BRESCIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1200 },
  
  // BERGAMO - Lombardia
  { provincia: 'BERGAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2400 },
  { provincia: 'BERGAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 3000 },
  { provincia: 'BERGAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 820 },
  { provincia: 'BERGAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1050 },
  
  // COMO - Lombardia
  { provincia: 'COMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1200 },
  { provincia: 'COMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1500 },
  { provincia: 'COMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 410 },
  { provincia: 'COMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 520 },
  
  // VARESE - Lombardia
  { provincia: 'VARESE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1800 },
  { provincia: 'VARESE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2200 },
  { provincia: 'VARESE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 620 },
  { provincia: 'VARESE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 760 },
  
  // NAPOLI - Campania
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 4200 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 9800 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 12500 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1450 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 3350 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 4250 },
  { provincia: 'NAPOLI', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 650 },
  { provincia: 'NAPOLI', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 520 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1500 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 280 },
  
  // SALERNO - Campania
  { provincia: 'SALERNO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2500 },
  { provincia: 'SALERNO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 3200 },
  { provincia: 'SALERNO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 850 },
  { provincia: 'SALERNO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1100 },
  
  // CASERTA - Campania
  { provincia: 'CASERTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2100 },
  { provincia: 'CASERTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2800 },
  { provincia: 'CASERTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 720 },
  { provincia: 'CASERTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 960 },
  
  // AVELLINO - Campania
  { provincia: 'AVELLINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 980 },
  { provincia: 'AVELLINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1250 },
  { provincia: 'AVELLINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 340 },
  { provincia: 'AVELLINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 430 },
  
  // BENEVENTO - Campania
  { provincia: 'BENEVENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 680 },
  { provincia: 'BENEVENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 850 },
  { provincia: 'BENEVENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 235 },
  { provincia: 'BENEVENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 295 },
  
  // TORINO - Piemonte
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 3200 },
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 7500 },
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 9800 },
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1100 },
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 2550 },
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 3350 },
  { provincia: 'TORINO', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 480 },
  { provincia: 'TORINO', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 390 },
  
  // CUNEO - Piemonte
  { provincia: 'CUNEO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1200 },
  { provincia: 'CUNEO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1500 },
  { provincia: 'CUNEO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 420 },
  { provincia: 'CUNEO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 520 },
  
  // NOVARA - Piemonte
  { provincia: 'NOVARA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 780 },
  { provincia: 'NOVARA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 980 },
  { provincia: 'NOVARA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 270 },
  { provincia: 'NOVARA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 340 },
  
  // ALESSANDRIA - Piemonte
  { provincia: 'ALESSANDRIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 850 },
  { provincia: 'ALESSANDRIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1050 },
  { provincia: 'ALESSANDRIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 295 },
  { provincia: 'ALESSANDRIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 365 },
  
  // BARI - Puglia
  { provincia: 'BARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2800 },
  { provincia: 'BARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 6500 },
  { provincia: 'BARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 8200 },
  { provincia: 'BARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 960 },
  { provincia: 'BARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 2200 },
  { provincia: 'BARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 2800 },
  { provincia: 'BARI', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 380 },
  { provincia: 'BARI', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 310 },
  
  // LECCE - Puglia
  { provincia: 'LECCE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2200 },
  { provincia: 'LECCE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2800 },
  { provincia: 'LECCE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 750 },
  { provincia: 'LECCE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 960 },
  
  // FOGGIA - Puglia
  { provincia: 'FOGGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1700 },
  { provincia: 'FOGGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2100 },
  { provincia: 'FOGGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 580 },
  { provincia: 'FOGGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 720 },
  
  // TARANTO - Puglia
  { provincia: 'TARANTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1500 },
  { provincia: 'TARANTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1900 },
  { provincia: 'TARANTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 520 },
  { provincia: 'TARANTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 650 },
  
  // BRINDISI - Puglia
  { provincia: 'BRINDISI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 950 },
  { provincia: 'BRINDISI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1200 },
  { provincia: 'BRINDISI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 330 },
  { provincia: 'BRINDISI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 415 },
  
  // FIRENZE - Toscana
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2100 },
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 4800 },
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 6200 },
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 720 },
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1650 },
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 2150 },
  
  // PISA - Toscana
  { provincia: 'PISA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 920 },
  { provincia: 'PISA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1180 },
  { provincia: 'PISA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 320 },
  { provincia: 'PISA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 410 },
  
  // LIVORNO - Toscana
  { provincia: 'LIVORNO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 750 },
  { provincia: 'LIVORNO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 950 },
  { provincia: 'LIVORNO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 260 },
  { provincia: 'LIVORNO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 330 },
  
  // BOLOGNA - Emilia-Romagna
  { provincia: 'BOLOGNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1800 },
  { provincia: 'BOLOGNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 4200 },
  { provincia: 'BOLOGNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 5500 },
  { provincia: 'BOLOGNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 620 },
  { provincia: 'BOLOGNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1450 },
  { provincia: 'BOLOGNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 1900 },
  
  // MODENA - Emilia-Romagna
  { provincia: 'MODENA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1500 },
  { provincia: 'MODENA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1900 },
  { provincia: 'MODENA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 520 },
  { provincia: 'MODENA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 660 },
  
  // PARMA - Emilia-Romagna
  { provincia: 'PARMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 980 },
  { provincia: 'PARMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1250 },
  { provincia: 'PARMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 340 },
  { provincia: 'PARMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 430 },
  
  // GENOVA - Liguria
  { provincia: 'GENOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1900 },
  { provincia: 'GENOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2400 },
  { provincia: 'GENOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 650 },
  { provincia: 'GENOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 830 },
  
  // SAVONA - Liguria
  { provincia: 'SAVONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 620 },
  { provincia: 'SAVONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 780 },
  { provincia: 'SAVONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 215 },
  { provincia: 'SAVONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 270 },
  
  // IMPERIA - Liguria
  { provincia: 'IMPERIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 450 },
  { provincia: 'IMPERIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 570 },
  { provincia: 'IMPERIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 155 },
  { provincia: 'IMPERIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 195 },
  
  // LA SPEZIA - Liguria
  { provincia: 'LA SPEZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 480 },
  { provincia: 'LA SPEZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 610 },
  { provincia: 'LA SPEZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 165 },
  { provincia: 'LA SPEZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 210 },
  
  // VENEZIA - Veneto
  { provincia: 'VENEZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2200 },
  { provincia: 'VENEZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2800 },
  { provincia: 'VENEZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 750 },
  { provincia: 'VENEZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 960 },
  
  // VERONA - Veneto
  { provincia: 'VERONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2000 },
  { provincia: 'VERONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2500 },
  { provincia: 'VERONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 685 },
  { provincia: 'VERONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 860 },
  
  // PADOVA - Veneto
  { provincia: 'PADOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1900 },
  { provincia: 'PADOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2400 },
  { provincia: 'PADOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 650 },
  { provincia: 'PADOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 825 },
  
  // VICENZA - Veneto
  { provincia: 'VICENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1700 },
  { provincia: 'VICENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2100 },
  { provincia: 'VICENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 580 },
  { provincia: 'VICENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 720 },
  
  // TREVISO - Veneto
  { provincia: 'TREVISO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1600 },
  { provincia: 'TREVISO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2000 },
  { provincia: 'TREVISO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 550 },
  { provincia: 'TREVISO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 690 },
  
  // CAGLIARI - Sardegna
  { provincia: 'CAGLIARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1500 },
  { provincia: 'CAGLIARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1900 },
  { provincia: 'CAGLIARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 515 },
  { provincia: 'CAGLIARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 655 },
  
  // SASSARI - Sardegna
  { provincia: 'SASSARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 980 },
  { provincia: 'SASSARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1200 },
  { provincia: 'SASSARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 335 },
  { provincia: 'SASSARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 415 },
  
  // NUORO - Sardegna
  { provincia: 'NUORO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 520 },
  { provincia: 'NUORO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 650 },
  { provincia: 'NUORO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 180 },
  { provincia: 'NUORO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 225 },
  
  // ORISTANO - Sardegna
  { provincia: 'ORISTANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 380 },
  { provincia: 'ORISTANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 480 },
  { provincia: 'ORISTANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 130 },
  { provincia: 'ORISTANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 165 },
  
  // PERUGIA - Umbria
  { provincia: 'PERUGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1400 },
  { provincia: 'PERUGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1800 },
  { provincia: 'PERUGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 480 },
  { provincia: 'PERUGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 620 },
  
  // TERNI - Umbria
  { provincia: 'TERNI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 480 },
  { provincia: 'TERNI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 620 },
  { provincia: 'TERNI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 165 },
  { provincia: 'TERNI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 215 },
  
  // ANCONA - Marche
  { provincia: 'ANCONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 980 },
  { provincia: 'ANCONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1250 },
  { provincia: 'ANCONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 340 },
  { provincia: 'ANCONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 430 },
  
  // REGGIO CALABRIA - Calabria
  { provincia: 'REGGIO CALABRIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1800 },
  { provincia: 'REGGIO CALABRIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2300 },
  { provincia: 'REGGIO CALABRIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 620 },
  { provincia: 'REGGIO CALABRIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 790 },
  
  // COSENZA - Calabria
  { provincia: 'COSENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2100 },
  { provincia: 'COSENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 2700 },
  { provincia: 'COSENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 720 },
  { provincia: 'COSENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 930 },
  
  // CATANZARO - Calabria
  { provincia: 'CATANZARO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1100 },
  { provincia: 'CATANZARO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1400 },
  { provincia: 'CATANZARO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 380 },
  { provincia: 'CATANZARO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 480 },
  
  // CROTONE - Calabria
  { provincia: 'CROTONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 580 },
  { provincia: 'CROTONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 740 },
  { provincia: 'CROTONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 200 },
  { provincia: 'CROTONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 255 },
  
  // VIBO VALENTIA - Calabria
  { provincia: 'VIBO VALENTIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 480 },
  { provincia: 'VIBO VALENTIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 610 },
  { provincia: 'VIBO VALENTIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 165 },
  { provincia: 'VIBO VALENTIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 210 },
  
  // POTENZA - Basilicata
  { provincia: 'POTENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 850 },
  { provincia: 'POTENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1100 },
  { provincia: 'POTENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 295 },
  { provincia: 'POTENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 380 },
  
  // MATERA - Basilicata
  { provincia: 'MATERA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 420 },
  { provincia: 'MATERA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 540 },
  { provincia: 'MATERA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 145 },
  { provincia: 'MATERA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 185 },
  
  // CAMPOBASSO - Molise
  { provincia: 'CAMPOBASSO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 520 },
  { provincia: 'CAMPOBASSO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 680 },
  { provincia: 'CAMPOBASSO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 180 },
  { provincia: 'CAMPOBASSO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 235 },
  
  // ISERNIA - Molise
  { provincia: 'ISERNIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 280 },
  { provincia: 'ISERNIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 360 },
  { provincia: 'ISERNIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 95 },
  { provincia: 'ISERNIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 125 },
  
  // L'AQUILA - Abruzzo
  { provincia: "L'AQUILA", amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 720 },
  { provincia: "L'AQUILA", amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 920 },
  { provincia: "L'AQUILA", amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 250 },
  { provincia: "L'AQUILA", amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 320 },
  
  // PESCARA - Abruzzo
  { provincia: 'PESCARA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 780 },
  { provincia: 'PESCARA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 980 },
  { provincia: 'PESCARA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 270 },
  { provincia: 'PESCARA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 340 },
  
  // CHIETI - Abruzzo
  { provincia: 'CHIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 850 },
  { provincia: 'CHIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1050 },
  { provincia: 'CHIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 295 },
  { provincia: 'CHIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 365 },
  
  // TERAMO - Abruzzo
  { provincia: 'TERAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 620 },
  { provincia: 'TERAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 780 },
  { provincia: 'TERAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 215 },
  { provincia: 'TERAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 270 },
  
  // TRENTO - Trentino-Alto Adige
  { provincia: 'TRENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1050 },
  { provincia: 'TRENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1350 },
  { provincia: 'TRENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 360 },
  { provincia: 'TRENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 465 },
  
  // BOLZANO - Trentino-Alto Adige
  { provincia: 'BOLZANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 980 },
  { provincia: 'BOLZANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1250 },
  { provincia: 'BOLZANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 335 },
  { provincia: 'BOLZANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 430 },
  
  // TRIESTE - Friuli-Venezia Giulia
  { provincia: 'TRIESTE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 480 },
  { provincia: 'TRIESTE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 620 },
  { provincia: 'TRIESTE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 165 },
  { provincia: 'TRIESTE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 215 },
  
  // UDINE - Friuli-Venezia Giulia
  { provincia: 'UDINE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1100 },
  { provincia: 'UDINE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 1400 },
  { provincia: 'UDINE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 380 },
  { provincia: 'UDINE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 480 },
  
  // PORDENONE - Friuli-Venezia Giulia
  { provincia: 'PORDENONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 620 },
  { provincia: 'PORDENONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 780 },
  { provincia: 'PORDENONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 215 },
  { provincia: 'PORDENONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 270 },
  
  // GORIZIA - Friuli-Venezia Giulia
  { provincia: 'GORIZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 280 },
  { provincia: 'GORIZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 360 },
  { provincia: 'GORIZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 95 },
  { provincia: 'GORIZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 125 },
  
  // AOSTA - Valle d'Aosta
  { provincia: 'AOSTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 280 },
  { provincia: 'AOSTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_assunzione: 'CONCORSO', numero: 350 },
  { provincia: 'AOSTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 95 },
  { provincia: 'AOSTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_assunzione: 'CONCORSO', numero: 120 },
];

// Helper function to aggregate data by provincia
export const getProvinciaAggregates = () => {
  const aggregates: Record<string, number> = {};
  
  assunzioniData.forEach(record => {
    if (!aggregates[record.provincia]) {
      aggregates[record.provincia] = 0;
    }
    aggregates[record.provincia] += record.numero;
  });
  
  return aggregates;
};

// Helper function to get provinces by region
export const getProvinceByRegion = (region: string): string[] => {
  return Object.entries(provinceToRegion)
    .filter(([, reg]) => reg === region)
    .map(([prov]) => prov);
};

// Get all unique regions
export const getRegions = (): string[] => {
  return [...new Set(Object.values(provinceToRegion))];
};

// Filter options interface
export interface FilterOptions {
  fasciaEta?: string | null;
  sesso?: string | null;
  comparto?: string | null;
}

// Helper to check if record matches age filter
const matchesAgeFilter = (record: { eta_min: number; eta_max: number | null }, fasciaEta: string | null): boolean => {
  if (!fasciaEta) return true;
  
  if (fasciaEta === '65+') {
    return record.eta_min >= 65 || record.eta_max === null;
  }
  
  const [min, max] = fasciaEta.split('-').map(Number);
  return record.eta_min === min || (record.eta_max && record.eta_max === max);
};

// Get filtered data
export const getFilteredData = (filters: FilterOptions = {}): AssunzioneRecord[] => {
  return assunzioniData.filter(record => {
    if (filters.sesso && record.sesso !== filters.sesso) return false;
    if (filters.fasciaEta && !matchesAgeFilter(record, filters.fasciaEta)) return false;
    return true;
  });
};

// Get provincia aggregates with filters
export const getProvinciaAggregatesFiltered = (filters: FilterOptions = {}): Record<string, number> => {
  const filteredData = getFilteredData(filters);
  const aggregates: Record<string, number> = {};
  
  filteredData.forEach(record => {
    aggregates[record.provincia] = (aggregates[record.provincia] || 0) + record.numero;
  });
  
  return aggregates;
};

// Get aggregated data for provinces in a region with gender breakdown
export const getRegionProvinceDataByGender = (region: string, filters: FilterOptions = {}) => {
  const provinces = getProvinceByRegion(region);
  const filteredData = getFilteredData(filters);
  
  const aggregates: Record<string, { maschi: number; femmine: number }> = {};
  
  filteredData.forEach(record => {
    if (provinces.includes(record.provincia)) {
      if (!aggregates[record.provincia]) {
        aggregates[record.provincia] = { maschi: 0, femmine: 0 };
      }
      if (record.sesso === 'M') {
        aggregates[record.provincia].maschi += record.numero;
      } else {
        aggregates[record.provincia].femmine += record.numero;
      }
    }
  });
  
  return Object.entries(aggregates)
    .map(([provincia, data]) => ({
      provincia,
      maschi: data.maschi,
      femmine: data.femmine,
      totale: data.maschi + data.femmine,
    }))
    .filter(d => d.totale > 0)
    .sort((a, b) => b.totale - a.totale);
};

// Get aggregated data for provinces in a region (total only)
export const getRegionProvinceData = (region: string) => {
  const provinces = getProvinceByRegion(region);
  const aggregates = getProvinciaAggregates();
  
  return provinces
    .map(prov => ({
      provincia: prov,
      totale: aggregates[prov] || 0,
    }))
    .filter(d => d.totale > 0)
    .sort((a, b) => b.totale - a.totale);
};

// Get detailed drill-down data for a specific province and gender
export const getProvinceDetails = (provincia: string, sesso: 'M' | 'F' | null) => {
  const records = assunzioniData.filter(r => 
    r.provincia === provincia && (sesso === null || r.sesso === sesso)
  );
  
  // Aggregate by age range
  const byEta: Record<string, number> = {};
  records.forEach(r => {
    const etaKey = r.eta_max ? `${r.eta_min}-${r.eta_max}` : `${r.eta_min}+`;
    byEta[etaKey] = (byEta[etaKey] || 0) + r.numero;
  });
  
  // Aggregate by hiring reason
  const byMotivo: Record<string, number> = {};
  records.forEach(r => {
    byMotivo[r.motivo_assunzione] = (byMotivo[r.motivo_assunzione] || 0) + r.numero;
  });
  
  // Aggregate by amministrazione
  const byAmministrazione: Record<string, number> = {};
  records.forEach(r => {
    byAmministrazione[r.amministrazione] = (byAmministrazione[r.amministrazione] || 0) + r.numero;
  });
  
  const topAmministrazioni = Object.entries(byAmministrazione)
    .map(([nome, totale]) => ({ nome, totale }))
    .sort((a, b) => b.totale - a.totale);
  
  const totale = records.reduce((sum, r) => sum + r.numero, 0);
  
  return {
    provincia,
    sesso,
    totale,
    byEta,
    byMotivo,
    topAmministrazioni
  };
};

// Get detailed drill-down data for a region (aggregated from all provinces)
export const getRegionDetails = (region: string, sesso: 'M' | 'F' | null) => {
  const records = assunzioniData.filter(r => 
    provinceToRegion[r.provincia] === region && (sesso === null || r.sesso === sesso)
  );
  
  // Aggregate by age range
  const byEta: Record<string, number> = {};
  records.forEach(r => {
    const etaKey = r.eta_max ? `${r.eta_min}-${r.eta_max}` : `${r.eta_min}+`;
    byEta[etaKey] = (byEta[etaKey] || 0) + r.numero;
  });
  
  // Aggregate by hiring reason
  const byMotivo: Record<string, number> = {};
  records.forEach(r => {
    byMotivo[r.motivo_assunzione] = (byMotivo[r.motivo_assunzione] || 0) + r.numero;
  });
  
  // Aggregate by amministrazione
  const byAmministrazione: Record<string, number> = {};
  records.forEach(r => {
    byAmministrazione[r.amministrazione] = (byAmministrazione[r.amministrazione] || 0) + r.numero;
  });
  
  const topAmministrazioni = Object.entries(byAmministrazione)
    .map(([nome, totale]) => ({ nome, totale }))
    .sort((a, b) => b.totale - a.totale);
  
  const totale = records.reduce((sum, r) => sum + r.numero, 0);
  
  return {
    provincia: region,
    sesso,
    totale,
    byEta,
    byMotivo,
    topAmministrazioni
  };
};
export const getRegionalAggregatesWithGender = (filters: FilterOptions = {}) => {
  const filteredData = getFilteredData(filters);
  
  const aggregates: Record<string, { maschi: number; femmine: number }> = {};
  
  filteredData.forEach(record => {
    const region = provinceToRegion[record.provincia];
    if (region) {
      if (!aggregates[region]) {
        aggregates[region] = { maschi: 0, femmine: 0 };
      }
      if (record.sesso === 'M') {
        aggregates[region].maschi += record.numero;
      } else {
        aggregates[region].femmine += record.numero;
      }
    }
  });
  
  return Object.entries(aggregates)
    .map(([provincia, data]) => ({
      provincia,
      maschi: data.maschi,
      femmine: data.femmine,
      totale: data.maschi + data.femmine,
    }))
    .filter(d => d.totale > 0)
    .sort((a, b) => b.totale - a.totale);
};
