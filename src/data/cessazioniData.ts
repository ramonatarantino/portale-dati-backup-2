// Data based on the motivicessazione.xlsx file
export interface CessazioneRecord {
  provincia: string;
  amministrazione: string;
  eta_min: number;
  eta_max: number | null;
  sesso: 'M' | 'F';
  motivo_cessazione: string;
  numero: number;
}

// Sample data from the Excel file with termination breakdown
export const cessazioniData: CessazioneRecord[] = [
  // AGRIGENTO - Sicilia
  { provincia: 'AGRIGENTO', amministrazione: 'AGENZIA DELLE ENTRATE', eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 6 },
  { provincia: 'AGRIGENTO', amministrazione: 'AGENZIA DELLE ENTRATE', eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 12 },
  { provincia: 'AGRIGENTO', amministrazione: 'AGENZIA DELLE ENTRATE', eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 19 },
  { provincia: 'AGRIGENTO', amministrazione: 'AGENZIA DELLE ENTRATE', eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 38 },
  { provincia: 'AGRIGENTO', amministrazione: 'AGENZIA DELLE ENTRATE', eta_min: 65, eta_max: null, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 12 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 7 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 25, eta_max: 34, sesso: 'M', motivo_cessazione: 'ALTRO MOTIVO', numero: 8 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'ALTRO MOTIVO', numero: 140 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 10 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'ALTRO MOTIVO', numero: 17 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'ALTRO MOTIVO', numero: 222 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 9 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'ALTRO MOTIVO', numero: 9 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'ALTRO MOTIVO', numero: 76 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 7 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 18, eta_max: 24, sesso: 'F', motivo_cessazione: 'ALTRO MOTIVO', numero: 6 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 25, eta_max: 34, sesso: 'F', motivo_cessazione: 'ALTRO MOTIVO', numero: 343 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 25, eta_max: 34, sesso: 'F', motivo_cessazione: 'CAMBIO COMPARTO/CONTRATTO', numero: 16 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 25, eta_max: 34, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 159 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 25, eta_max: 34, sesso: 'F', motivo_cessazione: 'RINUNCIA ALLA SUPPLENZA', numero: 7 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 25, eta_max: 34, sesso: 'M', motivo_cessazione: 'ALTRO MOTIVO', numero: 206 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 25, eta_max: 34, sesso: 'M', motivo_cessazione: 'CAMBIO COMPARTO/CONTRATTO', numero: 7 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 25, eta_max: 34, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 81 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'ALTRO MOTIVO', numero: 945 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'ANNULLO GIURIDICO', numero: 7 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'CAMBIO COMPARTO/CONTRATTO', numero: 88 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 846 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'RINUNCIA ALLA SUPPLENZA', numero: 21 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'ALTRO MOTIVO', numero: 339 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'ANNULLO GIURIDICO', numero: 8 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'CAMBIO COMPARTO/CONTRATTO', numero: 19 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 285 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'ALTRO MOTIVO', numero: 869 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'CAMBIO COMPARTO/CONTRATTO', numero: 79 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1982 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'RINUNCIA ALLA SUPPLENZA', numero: 23 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'ALTRO MOTIVO', numero: 316 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'CAMBIO COMPARTO/CONTRATTO', numero: 25 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 698 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'ALTRO MOTIVO', numero: 408 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'CAMBIO COMPARTO/CONTRATTO', numero: 41 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1516 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'ALTRO MOTIVO', numero: 156 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'CAMBIO COMPARTO/CONTRATTO', numero: 11 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 724 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 65, eta_max: null, sesso: 'F', motivo_cessazione: 'ALTRO MOTIVO', numero: 54 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 65, eta_max: null, sesso: 'F', motivo_cessazione: 'CAMBIO COMPARTO/CONTRATTO', numero: 9 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 65, eta_max: null, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 214 },
  { provincia: 'AGRIGENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 65, eta_max: null, sesso: 'M', motivo_cessazione: 'ALTRO MOTIVO', numero: 17 },
  { provincia: 'AGRIGENTO', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 45 },
  { provincia: 'AGRIGENTO', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 65, eta_max: null, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 32 },

  // PALERMO - Sicilia
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 780 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2850 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 3800 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 520 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 65, eta_max: null, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 380 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 280 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 890 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1200 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 180 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 65, eta_max: null, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 140 },
  { provincia: 'PALERMO', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 95 },
  { provincia: 'PALERMO', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 68 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'ALTRO MOTIVO', numero: 320 },
  { provincia: 'PALERMO', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 180 },

  // CATANIA - Sicilia
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 680 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2500 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 3200 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 450 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 65, eta_max: null, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 320 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 250 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 780 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 980 },
  { provincia: 'CATANIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 150 },

  // MESSINA - Sicilia
  { provincia: 'MESSINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1650 },
  { provincia: 'MESSINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2000 },
  { provincia: 'MESSINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 280 },
  { provincia: 'MESSINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 520 },
  { provincia: 'MESSINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 650 },
  { provincia: 'MESSINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 95 },

  // SIRACUSA - Sicilia
  { provincia: 'SIRACUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1100 },
  { provincia: 'SIRACUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1350 },
  { provincia: 'SIRACUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 340 },
  { provincia: 'SIRACUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 430 },

  // TRAPANI - Sicilia
  { provincia: 'TRAPANI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 880 },
  { provincia: 'TRAPANI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 980 },
  { provincia: 'TRAPANI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 280 },
  { provincia: 'TRAPANI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 340 },

  // RAGUSA - Sicilia
  { provincia: 'RAGUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 620 },
  { provincia: 'RAGUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 750 },
  { provincia: 'RAGUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 200 },
  { provincia: 'RAGUSA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 250 },

  // CALTANISSETTA - Sicilia
  { provincia: 'CALTANISSETTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 480 },
  { provincia: 'CALTANISSETTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 620 },
  { provincia: 'CALTANISSETTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 150 },
  { provincia: 'CALTANISSETTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 200 },

  // ENNA - Sicilia
  { provincia: 'ENNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 350 },
  { provincia: 'ENNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 420 },
  { provincia: 'ENNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 115 },
  { provincia: 'ENNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 135 },

  // ROMA - Lazio
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 4800 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 11500 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 14500 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 2200 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 65, eta_max: null, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 1800 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1650 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 3800 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 5000 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 850 },
  { provincia: 'ROMA', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 450 },
  { provincia: 'ROMA', amministrazione: 'MINISTERO DELLA GIUSTIZIA', eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 380 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'ALTRO MOTIVO', numero: 1200 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'INTERNO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 980 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 720 },
  { provincia: 'ROMA', amministrazione: "MINISTERO DELL'ECONOMIA E FINANZE", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 580 },

  // FROSINONE - Lazio
  { provincia: 'FROSINONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1100 },
  { provincia: 'FROSINONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1380 },
  { provincia: 'FROSINONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 380 },
  { provincia: 'FROSINONE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 480 },

  // LATINA - Lazio
  { provincia: 'LATINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1280 },
  { provincia: 'LATINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1550 },
  { provincia: 'LATINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 440 },
  { provincia: 'LATINA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 530 },

  // RIETI - Lazio
  { provincia: 'RIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 320 },
  { provincia: 'RIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 380 },
  { provincia: 'RIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 110 },
  { provincia: 'RIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 135 },

  // VITERBO - Lazio
  { provincia: 'VITERBO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 530 },
  { provincia: 'VITERBO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 660 },
  { provincia: 'VITERBO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 180 },
  { provincia: 'VITERBO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 230 },

  // MILANO - Lombardia
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 4400 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 10800 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 13500 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 1950 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1500 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 3600 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 4700 },
  { provincia: 'MILANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 750 },

  // BERGAMO - Lombardia
  { provincia: 'BERGAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2400 },
  { provincia: 'BERGAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 3100 },
  { provincia: 'BERGAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 820 },
  { provincia: 'BERGAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1050 },

  // BRESCIA - Lombardia
  { provincia: 'BRESCIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2600 },
  { provincia: 'BRESCIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 3350 },
  { provincia: 'BRESCIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 880 },
  { provincia: 'BRESCIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1130 },

  // VARESE - Lombardia
  { provincia: 'VARESE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1700 },
  { provincia: 'VARESE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2150 },
  { provincia: 'VARESE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 580 },
  { provincia: 'VARESE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 730 },

  // COMO - Lombardia
  { provincia: 'COMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1200 },
  { provincia: 'COMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1500 },
  { provincia: 'COMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 400 },
  { provincia: 'COMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 510 },

  // MONZA E DELLA BRIANZA - Lombardia
  { provincia: 'MONZA E DELLA BRIANZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1550 },
  { provincia: 'MONZA E DELLA BRIANZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1950 },
  { provincia: 'MONZA E DELLA BRIANZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 530 },
  { provincia: 'MONZA E DELLA BRIANZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 660 },

  // NAPOLI - Campania
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 3800 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 9500 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 12000 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 1800 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1300 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 3200 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 4100 },
  { provincia: 'NAPOLI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 680 },

  // SALERNO - Campania
  { provincia: 'SALERNO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2800 },
  { provincia: 'SALERNO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 3500 },
  { provincia: 'SALERNO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 950 },
  { provincia: 'SALERNO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1180 },

  // CASERTA - Campania
  { provincia: 'CASERTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2200 },
  { provincia: 'CASERTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2750 },
  { provincia: 'CASERTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 750 },
  { provincia: 'CASERTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 930 },

  // TORINO - Piemonte
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 3200 },
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 8500 },
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 10800 },
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 1500 },
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1100 },
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 2850 },
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 3650 },
  { provincia: 'TORINO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 580 },

  // BARI - Puglia
  { provincia: 'BARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2100 },
  { provincia: 'BARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 5200 },
  { provincia: 'BARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 6500 },
  { provincia: 'BARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 720 },
  { provincia: 'BARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1750 },
  { provincia: 'BARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 2200 },

  // LECCE - Puglia
  { provincia: 'LECCE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2100 },
  { provincia: 'LECCE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2650 },
  { provincia: 'LECCE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 710 },
  { provincia: 'LECCE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 890 },

  // FOGGIA - Puglia
  { provincia: 'FOGGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1600 },
  { provincia: 'FOGGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2000 },
  { provincia: 'FOGGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 540 },
  { provincia: 'FOGGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 680 },

  // FIRENZE - Toscana
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1800 },
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 4500 },
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 5700 },
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'PENSIONAMENTO', numero: 820 },
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 620 },
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1500 },
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1920 },
  { provincia: 'FIRENZE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'PENSIONAMENTO', numero: 320 },

  // BOLOGNA - Emilia-Romagna
  { provincia: 'BOLOGNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1700 },
  { provincia: 'BOLOGNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 4200 },
  { provincia: 'BOLOGNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 5300 },
  { provincia: 'BOLOGNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 35, eta_max: 44, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 580 },
  { provincia: 'BOLOGNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1420 },
  { provincia: 'BOLOGNA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 1800 },

  // GENOVA - Liguria
  { provincia: 'GENOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2000 },
  { provincia: 'GENOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2500 },
  { provincia: 'GENOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 680 },
  { provincia: 'GENOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 850 },

  // VENEZIA - Veneto
  { provincia: 'VENEZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1900 },
  { provincia: 'VENEZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2400 },
  { provincia: 'VENEZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 650 },
  { provincia: 'VENEZIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 810 },

  // PADOVA - Veneto
  { provincia: 'PADOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2100 },
  { provincia: 'PADOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2650 },
  { provincia: 'PADOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 710 },
  { provincia: 'PADOVA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 900 },

  // VERONA - Veneto
  { provincia: 'VERONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2000 },
  { provincia: 'VERONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2500 },
  { provincia: 'VERONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 680 },
  { provincia: 'VERONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 850 },

  // CAGLIARI - Sardegna
  { provincia: 'CAGLIARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1400 },
  { provincia: 'CAGLIARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1750 },
  { provincia: 'CAGLIARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 480 },
  { provincia: 'CAGLIARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 590 },

  // SASSARI - Sardegna
  { provincia: 'SASSARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1100 },
  { provincia: 'SASSARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1400 },
  { provincia: 'SASSARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 370 },
  { provincia: 'SASSARI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 480 },

  // PERUGIA - Umbria
  { provincia: 'PERUGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1300 },
  { provincia: 'PERUGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1650 },
  { provincia: 'PERUGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 440 },
  { provincia: 'PERUGIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 560 },

  // TERNI - Umbria
  { provincia: 'TERNI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 480 },
  { provincia: 'TERNI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 620 },
  { provincia: 'TERNI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 165 },
  { provincia: 'TERNI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 210 },

  // ANCONA - Marche
  { provincia: 'ANCONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1050 },
  { provincia: 'ANCONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1320 },
  { provincia: 'ANCONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 360 },
  { provincia: 'ANCONA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 450 },

  // COSENZA - Calabria
  { provincia: 'COSENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1700 },
  { provincia: 'COSENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 2100 },
  { provincia: 'COSENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 580 },
  { provincia: 'COSENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 710 },

  // REGGIO CALABRIA - Calabria
  { provincia: 'REGGIO CALABRIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1350 },
  { provincia: 'REGGIO CALABRIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1680 },
  { provincia: 'REGGIO CALABRIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 460 },
  { provincia: 'REGGIO CALABRIA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 570 },

  // CATANZARO - Calabria
  { provincia: 'CATANZARO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 850 },
  { provincia: 'CATANZARO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1050 },
  { provincia: 'CATANZARO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 290 },
  { provincia: 'CATANZARO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 360 },

  // POTENZA - Basilicata
  { provincia: 'POTENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 780 },
  { provincia: 'POTENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 980 },
  { provincia: 'POTENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 265 },
  { provincia: 'POTENZA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 335 },

  // MATERA - Basilicata
  { provincia: 'MATERA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 420 },
  { provincia: 'MATERA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 530 },
  { provincia: 'MATERA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 145 },
  { provincia: 'MATERA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 180 },

  // CAMPOBASSO - Molise
  { provincia: 'CAMPOBASSO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 480 },
  { provincia: 'CAMPOBASSO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 600 },
  { provincia: 'CAMPOBASSO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 165 },
  { provincia: 'CAMPOBASSO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 205 },

  // L'AQUILA - Abruzzo
  { provincia: "L'AQUILA", amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 620 },
  { provincia: "L'AQUILA", amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 780 },
  { provincia: "L'AQUILA", amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 210 },
  { provincia: "L'AQUILA", amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 265 },

  // PESCARA - Abruzzo
  { provincia: 'PESCARA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 720 },
  { provincia: 'PESCARA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 900 },
  { provincia: 'PESCARA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 245 },
  { provincia: 'PESCARA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 305 },

  // CHIETI - Abruzzo
  { provincia: 'CHIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 820 },
  { provincia: 'CHIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1020 },
  { provincia: 'CHIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 280 },
  { provincia: 'CHIETI', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 345 },

  // TERAMO - Abruzzo
  { provincia: 'TERAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 650 },
  { provincia: 'TERAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 810 },
  { provincia: 'TERAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 220 },
  { provincia: 'TERAMO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 275 },

  // TRIESTE - Friuli-Venezia Giulia
  { provincia: 'TRIESTE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 520 },
  { provincia: 'TRIESTE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 650 },
  { provincia: 'TRIESTE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 175 },
  { provincia: 'TRIESTE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 220 },

  // UDINE - Friuli-Venezia Giulia
  { provincia: 'UDINE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1100 },
  { provincia: 'UDINE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1380 },
  { provincia: 'UDINE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 375 },
  { provincia: 'UDINE', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 470 },

  // TRENTO - Trentino-Alto Adige
  { provincia: 'TRENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 850 },
  { provincia: 'TRENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 1050 },
  { provincia: 'TRENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 290 },
  { provincia: 'TRENTO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 360 },

  // BOLZANO - Trentino-Alto Adige
  { provincia: 'BOLZANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 720 },
  { provincia: 'BOLZANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 900 },
  { provincia: 'BOLZANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 245 },
  { provincia: 'BOLZANO', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 305 },

  // AOSTA - Valle d'Aosta
  { provincia: 'AOSTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 280 },
  { provincia: 'AOSTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'F', motivo_cessazione: 'FINE INCARICO', numero: 350 },
  { provincia: 'AOSTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 45, eta_max: 54, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 95 },
  { provincia: 'AOSTA', amministrazione: "MINISTERO DELL'ISTRUZIONE E DEL MERITO", eta_min: 55, eta_max: 64, sesso: 'M', motivo_cessazione: 'FINE INCARICO', numero: 120 },
];

// Import provinceToRegion from assunzioniData
import { provinceToRegion, getProvinceByRegion } from './assunzioniData';

// Get aggregated data by province (total)
export const getCessazioniProvinciaAggregates = (): Record<string, number> => {
  const aggregates: Record<string, number> = {};
  
  cessazioniData.forEach(record => {
    if (!aggregates[record.provincia]) {
      aggregates[record.provincia] = 0;
    }
    aggregates[record.provincia] += record.numero;
  });
  
  return aggregates;
};

// Filter options interface
export interface CessazioniFilterOptions {
  fasciaEta?: string | null;
  sesso?: string | null;
}

// Helper to check if record matches age filter
const matchesCessazioniAgeFilter = (record: { eta_min: number; eta_max: number | null }, fasciaEta: string | null): boolean => {
  if (!fasciaEta) return true;
  
  if (fasciaEta === '65+') {
    return record.eta_min >= 65 || record.eta_max === null;
  }
  
  const [min, max] = fasciaEta.split('-').map(Number);
  return record.eta_min === min || (record.eta_max && record.eta_max === max);
};

// Get filtered cessazioni data
export const getFilteredCessazioniData = (filters: CessazioniFilterOptions = {}): CessazioneRecord[] => {
  return cessazioniData.filter(record => {
    if (filters.sesso && record.sesso !== filters.sesso) return false;
    if (filters.fasciaEta && !matchesCessazioniAgeFilter(record, filters.fasciaEta)) return false;
    return true;
  });
};

// Get provincia aggregates with filters
export const getCessazioniProvinciaAggregatesFiltered = (filters: CessazioniFilterOptions = {}): Record<string, number> => {
  const filteredData = getFilteredCessazioniData(filters);
  const aggregates: Record<string, number> = {};
  
  filteredData.forEach(record => {
    aggregates[record.provincia] = (aggregates[record.provincia] || 0) + record.numero;
  });
  
  return aggregates;
};

// Get province data by gender for a specific region with filters
export const getCessazioniRegionProvinceDataByGender = (region: string, filters: CessazioniFilterOptions = {}) => {
  const provinces = getProvinceByRegion(region);
  const filteredData = filters.fasciaEta || filters.sesso 
    ? getFilteredCessazioniData(filters)
    : cessazioniData;
  
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

// Get detailed drill-down data for a specific province and gender
export const getCessazioniProvinceDetails = (provincia: string, sesso: 'M' | 'F' | null) => {
  const records = cessazioniData.filter(r => 
    r.provincia === provincia && (sesso === null || r.sesso === sesso)
  );
  
  // Aggregate by age range
  const byEta: Record<string, number> = {};
  records.forEach(r => {
    const etaKey = r.eta_max ? `${r.eta_min}-${r.eta_max}` : `${r.eta_min}+`;
    byEta[etaKey] = (byEta[etaKey] || 0) + r.numero;
  });
  
  // Aggregate by termination reason
  const byMotivo: Record<string, number> = {};
  records.forEach(r => {
    byMotivo[r.motivo_cessazione] = (byMotivo[r.motivo_cessazione] || 0) + r.numero;
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
export const getCessazioniRegionDetails = (region: string, sesso: 'M' | 'F' | null) => {
  const records = cessazioniData.filter(r => 
    provinceToRegion[r.provincia] === region && (sesso === null || r.sesso === sesso)
  );
  
  // Aggregate by age range
  const byEta: Record<string, number> = {};
  records.forEach(r => {
    const etaKey = r.eta_max ? `${r.eta_min}-${r.eta_max}` : `${r.eta_min}+`;
    byEta[etaKey] = (byEta[etaKey] || 0) + r.numero;
  });
  
  // Aggregate by termination reason
  const byMotivo: Record<string, number> = {};
  records.forEach(r => {
    byMotivo[r.motivo_cessazione] = (byMotivo[r.motivo_cessazione] || 0) + r.numero;
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

// Get regional aggregates for bubble chart (when no region is selected)
export const getCessazioniRegionalAggregatesWithGender = (filters: CessazioniFilterOptions = {}) => {
  const filteredData = getFilteredCessazioniData(filters);
  
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
