// Simplified SVG paths for Italian provinces (main ones)
// Each path represents a province with approximate boundaries

export interface ProvinceData {
  id: string;
  name: string;
  path: string;
  center: { x: number; y: number };
}

export const italyProvinces: ProvinceData[] = [
  // Nord-Ovest
  { id: "TORINO", name: "Torino", path: "M 85 95 L 105 80 L 125 85 L 130 105 L 115 125 L 90 120 Z", center: { x: 107, y: 102 } },
  { id: "MILANO", name: "Milano", path: "M 145 100 L 165 95 L 180 105 L 175 125 L 155 130 L 140 118 Z", center: { x: 160, y: 112 } },
  { id: "GENOVA", name: "Genova", path: "M 115 145 L 145 140 L 160 155 L 140 170 L 110 165 Z", center: { x: 135, y: 155 } },
  { id: "VENEZIA", name: "Venezia", path: "M 220 95 L 250 90 L 265 105 L 255 125 L 225 120 L 215 105 Z", center: { x: 240, y: 107 } },
  { id: "VERONA", name: "Verona", path: "M 185 95 L 210 90 L 220 105 L 210 120 L 185 115 Z", center: { x: 200, y: 105 } },
  { id: "BOLOGNA", name: "Bologna", path: "M 175 155 L 205 150 L 220 170 L 200 190 L 170 180 Z", center: { x: 192, y: 170 } },
  { id: "FIRENZE", name: "Firenze", path: "M 175 200 L 205 195 L 220 220 L 195 240 L 165 225 Z", center: { x: 192, y: 218 } },
  
  // Centro
  { id: "ROMA", name: "Roma", path: "M 185 290 L 220 280 L 245 305 L 230 340 L 190 335 L 175 310 Z", center: { x: 210, y: 310 } },
  { id: "PERUGIA", name: "Perugia", path: "M 200 245 L 230 240 L 245 265 L 225 285 L 195 275 Z", center: { x: 220, y: 262 } },
  { id: "ANCONA", name: "Ancona", path: "M 235 210 L 265 205 L 275 230 L 255 250 L 230 240 Z", center: { x: 252, y: 227 } },
  
  // Sud
  { id: "NAPOLI", name: "Napoli", path: "M 230 360 L 265 355 L 285 380 L 265 410 L 235 400 L 220 375 Z", center: { x: 252, y: 380 } },
  { id: "BARI", name: "Bari", path: "M 305 355 L 345 345 L 365 375 L 350 405 L 310 400 L 295 375 Z", center: { x: 330, y: 375 } },
  { id: "PALERMO", name: "Palermo", path: "M 195 485 L 235 475 L 255 500 L 235 530 L 195 525 L 180 505 Z", center: { x: 217, y: 502 } },
  { id: "CATANIA", name: "Catania", path: "M 270 495 L 305 485 L 325 515 L 305 545 L 270 535 L 255 515 Z", center: { x: 287, y: 515 } },
  { id: "AGRIGENTO", name: "Agrigento", path: "M 220 530 L 255 535 L 265 560 L 245 580 L 210 570 L 205 545 Z", center: { x: 235, y: 555 } },
  
  // Altre province importanti
  { id: "CAGLIARI", name: "Cagliari", path: "M 145 475 L 175 465 L 190 495 L 170 525 L 140 515 L 130 490 Z", center: { x: 160, y: 495 } },
  { id: "REGGIO_CALABRIA", name: "Reggio Calabria", path: "M 280 445 L 310 440 L 325 470 L 305 500 L 275 490 L 265 465 Z", center: { x: 292, y: 470 } },
  { id: "COSENZA", name: "Cosenza", path: "M 290 410 L 325 405 L 340 435 L 320 460 L 285 450 L 275 425 Z", center: { x: 307, y: 432 } },
  { id: "LECCE", name: "Lecce", path: "M 350 400 L 385 395 L 400 425 L 380 455 L 345 445 L 335 420 Z", center: { x: 367, y: 425 } },
  { id: "POTENZA", name: "Potenza", path: "M 275 385 L 305 380 L 320 405 L 300 430 L 270 420 L 260 400 Z", center: { x: 287, y: 405 } },
];

// Full Italy outline for background
export const italyOutline = `
  M 85 60 
  L 130 50 L 180 55 L 230 45 L 280 55 L 310 70
  L 340 90 L 365 120 L 385 160 L 400 200
  L 410 250 L 400 300 L 385 350 L 370 390
  L 350 430 L 340 470 L 310 510
  L 280 550 L 240 580 L 200 590
  L 160 570 L 130 540 L 120 500
  L 140 460 L 160 420 L 180 380
  L 175 340 L 160 300 L 140 260
  L 120 220 L 100 180 L 85 140
  L 75 100 L 85 60 Z
`;

// Sardinia outline
export const sardiniaOutline = `
  M 100 420 
  L 130 410 L 160 420 L 180 450
  L 185 490 L 175 530 L 150 560
  L 115 550 L 90 520 L 85 480
  L 90 440 L 100 420 Z
`;

// Sicily outline  
export const sicilyOutline = `
  M 175 470
  L 220 460 L 270 465 L 320 480
  L 340 510 L 330 550 L 290 575
  L 240 590 L 190 580 L 165 550
  L 160 510 L 175 470 Z
`;
