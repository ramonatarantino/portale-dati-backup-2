import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DrillDownModal from './DrillDownModal';
import { DataMode } from './DataModeToggle';

interface ProvinceGenderData {
  provincia: string;
  maschi: number;
  femmine: number;
  totale: number;
}

interface PointChartProps {
  data: ProvinceGenderData[];
  selectedRegion: string | null;
  selectedProvince?: string | null;
  dataMode: DataMode;
  regionalData?: ProvinceGenderData[]; // Regional data to show when no region selected
  genderFilter?: 'M' | 'F' | null; // Filter to show only male or female points
  onLocationClick?: (location: string, isRegion: boolean, isAlreadySelected: boolean) => void; // Callback when clicking location label
}

const PointChart: React.FC<PointChartProps> = ({ 
  data, 
  selectedRegion, 
  selectedProvince,
  dataMode, 
  regionalData = [],
  genderFilter = null,
  onLocationClick
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProvincia, setSelectedProvincia] = useState<string>('');
  const [selectedSesso, setSelectedSesso] = useState<'M' | 'F' | null>(null);
  const [isNationalDrillDown, setIsNationalDrillDown] = useState(false);

  const handlePointClick = (provincia: string, sesso: 'M' | 'F', isNational: boolean = false) => {
    setSelectedProvincia(provincia);
    setSelectedSesso(sesso);
    setIsNationalDrillDown(isNational);
    setModalOpen(true);
  };

  // Unified color palette for all modes - blue/gold for gender differentiation
  const maleColor = 'hsl(210, 70%, 50%)'; // Blue
  const femaleColor = 'hsl(45, 85%, 55%)'; // Gold
  const neutralColor = 'hsl(210, 60%, 50%)'; // Blue for modes without gender

  // Decide which data to use: filter by province if selected, otherwise by region, otherwise show regional data
  const getDisplayData = () => {
    if (selectedProvince) {
      // Show only the selected province
      const provinceData = data.filter(d => d.provincia === selectedProvince);
      if (provinceData.length > 0) return provinceData;
    }
    if (selectedRegion) {
      return data;
    }
    return regionalData;
  };
  
  const displayData = getDisplayData();
  const isShowingRegions = !selectedRegion && !selectedProvince && regionalData.length > 0;
  const isShowingSingleProvince = !!selectedProvince;

  // Check if we have gender data
  const hasGenderData = displayData.some(d => d.maschi > 0 || d.femmine > 0);

  if (displayData.length === 0) {
    return (
      <AnimatePresence mode="wait">
        <motion.div 
          key="empty-state"
          className="flex items-center justify-center h-full text-muted-foreground"
          initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          transition={{ 
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <motion.p 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Nessun dato disponibile
          </motion.p>
        </motion.div>
      </AnimatePresence>
    );
  }

  const maxValue = Math.max(...displayData.flatMap(d => hasGenderData ? [d.maschi, d.femmine] : [d.totale]), 1);
  const chartWidth = 420;
  const leftPadding = 130;
  const rightPadding = 70;
  const dataWidth = chartWidth - leftPadding - rightPadding;
  
  const getXPosition = (value: number) => {
    return leftPadding + (value / maxValue) * dataWidth;
  };

  const getPointRadius = (value: number) => {
    const minRadius = 8;
    const maxRadius = 20;
    const intensity = value / maxValue;
    return minRadius + (maxRadius - minRadius) * Math.sqrt(intensity);
  };

  const getModeLabel = () => {
    switch (dataMode) {
      case 'assunzioni': return 'assunzioni';
      case 'cessazioni': return 'cessazioni';
      case 'inquadramento_eta': return 'personale';
      case 'inquadramento': return 'personale';
    }
  };

  const getChartTitle = () => {
    if (isShowingSingleProvince) {
      return `Provincia di ${selectedProvince}`;
    }
    if (isShowingRegions) {
      return 'Totale per Regione';
    }
    return `Province di ${selectedRegion}`;
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div 
          key={`chart-${selectedRegion}-${selectedProvince}-${dataMode}`}
          className="h-full flex flex-col"
          initial={{ opacity: 0, x: 100, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: -100, rotateY: 30 }}
          transition={{ 
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          {/* Header */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-foreground">
              {getChartTitle()}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isShowingSingleProvince
                ? `Dettaglio ${getModeLabel()} per la provincia selezionata`
                : isShowingRegions 
                  ? `Distribuzione ${getModeLabel()} per regione` 
                  : hasGenderData 
                    ? 'Clicca sui punti per il drill-down dettagliato' 
                    : 'Distribuzione per provincia'}
            </p>
          </motion.div>
          
          {/* X-axis scale */}
          <motion.div 
            className="flex items-center gap-2 mb-3" 
            style={{ paddingLeft: `${leftPadding}px` }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex-1 flex justify-between text-xs text-muted-foreground pr-[70px]">
              <span>0</span>
              <span>{Math.round(maxValue * 0.5).toLocaleString()}</span>
              <span>{maxValue.toLocaleString()}</span>
            </div>
          </motion.div>
          
          {/* Chart */}
          <div className="flex-1 overflow-y-auto pr-2">
            <svg width="100%" viewBox={`0 0 ${chartWidth} ${displayData.length * 40 + 20}`}>
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
                <motion.line
                  key={i}
                  x1={leftPadding + pct * dataWidth}
                  y1={0}
                  x2={leftPadding + pct * dataWidth}
                  y2={displayData.length * 40 + 10}
                  stroke="hsl(var(--border))"
                  strokeWidth={pct === 0 ? 1.5 : 0.5}
                  strokeDasharray={pct === 0 ? 'none' : '3,3'}
                  opacity={0.7}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                />
              ))}
              
              {/* Data rows */}
              <AnimatePresence mode="popLayout">
                {displayData.map((item, index) => {
                  const y = index * 40 + 24;
                  
                  if (hasGenderData) {
                    const xMaschi = getXPosition(item.maschi);
                    const xFemmine = getXPosition(item.femmine);
                    const radiusMaschi = getPointRadius(item.maschi);
                    const radiusFemmine = getPointRadius(item.femmine);
                    
                    return (
                      <motion.g 
                        key={`${selectedRegion}-${item.provincia}-${dataMode}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.06,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                      >
                        {/* Horizontal baseline */}
                        <motion.line
                          x1={leftPadding}
                          y1={y}
                          x2={leftPadding + dataWidth}
                          y2={y}
                          stroke="hsl(var(--border))"
                          strokeWidth={0.5}
                          opacity={0.4}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.06 }}
                        />
                        
                        {/* Province label - clickable */}
                        <motion.text
                          x={leftPadding - 8}
                          y={y + 4}
                          textAnchor="end"
                          className="fill-foreground font-medium"
                          style={{ 
                            fontSize: '13px', 
                            cursor: onLocationClick ? 'pointer' : 'default',
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.06 + 0.1 }}
                          onClick={() => {
                            const isAlreadySelected = isShowingRegions 
                              ? selectedRegion === item.provincia 
                              : selectedProvince === item.provincia;
                            onLocationClick?.(item.provincia, isShowingRegions, isAlreadySelected);
                          }}
                          onMouseEnter={(e) => {
                            if (onLocationClick) {
                              (e.target as SVGTextElement).style.fill = 'hsl(var(--primary))';
                              (e.target as SVGTextElement).style.textDecoration = 'underline';
                            }
                          }}
                          onMouseLeave={(e) => {
                            (e.target as SVGTextElement).style.fill = '';
                            (e.target as SVGTextElement).style.textDecoration = 'none';
                          }}
                        >
                          {item.provincia.length > 14 
                            ? item.provincia.substring(0, 12) + '...'
                            : item.provincia
                          }
                          <title>Clicca per navigare sulla mappa</title>
                        </motion.text>
                        
                        {/* Male point - bubble animation */}
                        {genderFilter !== 'F' && (
                          <motion.circle
                            cx={xMaschi}
                            cy={y}
                            r={radiusMaschi}
                            fill={maleColor}
                            initial={{ 
                              scale: 0, 
                              opacity: 0,
                              y: 30
                            }}
                            animate={{ 
                              scale: [0, 1.3, 0.85, 1.1, 1],
                              opacity: [0, 0.6, 0.85, 0.95, 0.9],
                              y: [30, -8, 4, -2, 0]
                            }}
                            transition={{ 
                              duration: 0.8,
                              delay: index * 0.08 + 0.2,
                              ease: [0.34, 1.56, 0.64, 1],
                              times: [0, 0.3, 0.5, 0.75, 1]
                            }}
                            whileHover={{ 
                              scale: 1.4, 
                              opacity: 1,
                              y: -4,
                              transition: { 
                                type: 'spring' as const,
                                stiffness: 500,
                                damping: 15
                              }
                            }}
                            whileTap={{ scale: 0.85 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePointClick(item.provincia, 'M', isShowingRegions);
                            }}
                            style={{ 
                              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                              cursor: 'pointer'
                            }}
                          >
                            <title>
                              {item.provincia}
                              {'\n'}Uomini: {item.maschi.toLocaleString()} ({((item.maschi / item.totale) * 100).toFixed(1)}%)
                              {'\n'}Totale: {item.totale.toLocaleString()}
                              {'\n'}Clicca per dettagli
                            </title>
                          </motion.circle>
                        )}
                        
                        {/* Female point - bubble animation */}
                        {genderFilter !== 'M' && (
                          <motion.circle
                            cx={xFemmine}
                            cy={y}
                            r={radiusFemmine}
                            fill={femaleColor}
                            initial={{ 
                              scale: 0, 
                              opacity: 0,
                              y: 35
                            }}
                            animate={{ 
                              scale: [0, 1.35, 0.8, 1.15, 1],
                              opacity: [0, 0.5, 0.8, 0.95, 0.9],
                              y: [35, -10, 5, -3, 0]
                            }}
                            transition={{ 
                              duration: 0.85,
                              delay: index * 0.08 + 0.3,
                              ease: [0.34, 1.56, 0.64, 1],
                              times: [0, 0.3, 0.5, 0.75, 1]
                            }}
                            whileHover={{ 
                              scale: 1.4, 
                              opacity: 1,
                              y: -4,
                              transition: { 
                                type: 'spring' as const,
                                stiffness: 500,
                                damping: 15
                              }
                            }}
                            whileTap={{ scale: 0.85 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePointClick(item.provincia, 'F', isShowingRegions);
                            }}
                            style={{ 
                              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                              cursor: 'pointer'
                            }}
                          >
                            <title>
                              {item.provincia}
                              {'\n'}Donne: {item.femmine.toLocaleString()} ({((item.femmine / item.totale) * 100).toFixed(1)}%)
                              {'\n'}Totale: {item.totale.toLocaleString()}
                              {'\n'}Clicca per dettagli
                            </title>
                          </motion.circle>
                        )}
                        
                        {/* Value labels */}
                        <motion.text
                          x={Math.max(xMaschi, xFemmine) + Math.max(radiusMaschi, radiusFemmine) + 8}
                          y={y + 4}
                          className="fill-muted-foreground"
                          style={{ fontSize: '11px' }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.06 + 0.5 }}
                        >
                          Tot: {item.totale.toLocaleString()}
                        </motion.text>
                      </motion.g>
                    );
                  } else {
                    // Single point for modes without gender data
                    const xPos = getXPosition(item.totale);
                    const radius = getPointRadius(item.totale);
                    
                    return (
                      <motion.g 
                        key={`${selectedRegion}-${item.provincia}-${dataMode}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.06,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                      >
                        <motion.line
                          x1={leftPadding}
                          y1={y}
                          x2={leftPadding + dataWidth}
                          y2={y}
                          stroke="hsl(var(--border))"
                          strokeWidth={0.5}
                          opacity={0.4}
                        />
                        
                        <motion.text
                          x={leftPadding - 8}
                          y={y + 4}
                          textAnchor="end"
                          className="fill-foreground font-medium"
                          style={{ 
                            fontSize: '11px',
                            cursor: onLocationClick ? 'pointer' : 'default',
                          }}
                          onClick={() => {
                            const isAlreadySelected = isShowingRegions 
                              ? selectedRegion === item.provincia 
                              : selectedProvince === item.provincia;
                            onLocationClick?.(item.provincia, isShowingRegions, isAlreadySelected);
                          }}
                          onMouseEnter={(e) => {
                            if (onLocationClick) {
                              (e.target as SVGTextElement).style.fill = 'hsl(var(--primary))';
                              (e.target as SVGTextElement).style.textDecoration = 'underline';
                            }
                          }}
                          onMouseLeave={(e) => {
                            (e.target as SVGTextElement).style.fill = '';
                            (e.target as SVGTextElement).style.textDecoration = 'none';
                          }}
                        >
                          {item.provincia.length > 14 
                            ? item.provincia.substring(0, 12) + '...'
                            : item.provincia
                          }
                          <title>Clicca per navigare sulla mappa</title>
                        </motion.text>
                        
                        <motion.circle
                          cx={xPos}
                          cy={y}
                          r={radius}
                          fill={neutralColor}
                          initial={{ scale: 0, opacity: 0, y: 30 }}
                          animate={{ 
                            scale: [0, 1.3, 0.85, 1.1, 1],
                            opacity: [0, 0.6, 0.85, 0.95, 0.9],
                            y: [30, -8, 4, -2, 0]
                          }}
                          transition={{ 
                            duration: 0.8,
                            delay: index * 0.08 + 0.2,
                            ease: [0.34, 1.56, 0.64, 1],
                            times: [0, 0.3, 0.5, 0.75, 1]
                          }}
                          whileHover={{ scale: 1.4, opacity: 1, y: -4 }}
                          style={{ 
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                            cursor: 'pointer'
                          }}
                        >
                          <title>
                            {item.provincia}
                            {'\n'}Totale: {item.totale.toLocaleString()}
                          </title>
                        </motion.circle>
                        
                        <motion.text
                          x={xPos + radius + 8}
                          y={y + 4}
                          className="fill-muted-foreground"
                          style={{ fontSize: '11px' }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.06 + 0.5 }}
                        >
                          {item.totale.toLocaleString()}
                        </motion.text>
                      </motion.g>
                    );
                  }
                })}
              </AnimatePresence>
            </svg>
          </div>
          
          {/* Legend */}
          <motion.div 
            className="mt-4 pt-3 border-t border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {hasGenderData ? (
              <div className="flex items-center justify-center gap-8 text-sm">
                {genderFilter !== 'F' && (
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: maleColor }}
                      layoutId="male-legend"
                      transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
                    />
                    <span className="text-foreground font-medium">Uomini</span>
                  </motion.div>
                )}
                {genderFilter !== 'M' && (
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: femaleColor }}
                      layoutId="female-legend"
                      transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
                    />
                    <span className="text-foreground font-medium">Donne</span>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-sm">
                <motion.div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: neutralColor }}
                />
                <span className="text-foreground font-medium">Totale personale</span>
              </div>
            )}
            <motion.p 
              className="text-center text-xs text-muted-foreground mt-2"
              key={dataMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {hasGenderData 
                ? `Clicca sui punti per vedere età e ${getModeLabel()}`
                : `Distribuzione per ${getModeLabel()}`
              }
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* Drill-down Modal */}
      <DrillDownModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        provincia={selectedProvincia}
        sesso={selectedSesso}
        dataMode={dataMode}
        isRegionalLevel={isNationalDrillDown}
      />
    </>
  );
};

export default PointChart;
