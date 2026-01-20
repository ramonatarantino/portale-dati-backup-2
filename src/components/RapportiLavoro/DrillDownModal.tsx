import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getProvinceDetails, getRegionDetails, provinceToRegion } from '@/data/assunzioniData';
import { getCessazioniProvinceDetails, getCessazioniRegionDetails } from '@/data/cessazioniData';
import { getInquadramentoProvinceDetails, getInquadramentoRegionDetails } from '@/data/inquadramentoData';
import { DataMode } from './DataModeToggle';
import { TrendingUp, TrendingDown, Users, Building2, ChevronDown, Sparkles, Globe, MapPin } from 'lucide-react';

interface DrillDownModalProps {
  isOpen: boolean;
  onClose: () => void;
  provincia: string;
  sesso: 'M' | 'F' | null;
  dataMode: DataMode;
  isRegionalLevel?: boolean; // When true, provincia is actually a region name
}

const DrillDownModal: React.FC<DrillDownModalProps> = ({ 
  isOpen, 
  onClose, 
  provincia, 
  sesso,
  dataMode,
  isRegionalLevel = false
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('eta');
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get the appropriate details based on mode and level
  const getDetails = () => {
    if (isRegionalLevel) {
      // Regional level - provincia contains region name
      if (dataMode === 'assunzioni') {
        return getRegionDetails(provincia, sesso);
      } else if (dataMode === 'cessazioni') {
        return getCessazioniRegionDetails(provincia, sesso);
      } else {
        return getInquadramentoRegionDetails(provincia, sesso);
      }
    } else {
      // Province level
      if (dataMode === 'assunzioni') {
        return getProvinceDetails(provincia, sesso);
      } else if (dataMode === 'cessazioni') {
        return getCessazioniProvinceDetails(provincia, sesso);
      } else {
        return getInquadramentoProvinceDetails(provincia, sesso);
      }
    }
  };
  
  const details = getDetails();
  const sessoLabel = sesso === 'M' ? 'Uomini' : sesso === 'F' ? 'Donne' : 'Tutti';
  
  // Colors based on mode - unified palette for data visualizations
  const getBaseColor = () => {
    if (sesso === 'M') return 'hsl(180, 55%, 40%)'; // Teal for male
    if (sesso === 'F') return 'hsl(45, 85%, 55%)'; // Amber for female
    return 'hsl(210, 60%, 50%)'; // Blue for neutral/all
  };

  const baseColor = getBaseColor();

  const getBarColor = (index: number, isHovered: boolean) => {
    const hoverBoost = isHovered ? 15 : 0;
    if (sesso === 'M') {
      return `hsl(180, ${55 + index * 3 + hoverBoost}%, ${40 + index * 4 - hoverBoost/2}%)`;
    } else if (sesso === 'F') {
      return `hsl(45, ${85 - index * 5 + hoverBoost}%, ${55 + index * 5 - hoverBoost/2}%)`;
    }
    return `hsl(210, ${60 + index * 3 + hoverBoost}%, ${50 + index * 4 - hoverBoost/2}%)`;
  };

  // Labels based on mode
  const getModeLabels = () => {
    switch (dataMode) {
      case 'assunzioni':
        return {
          modeLabel: 'Assunzione',
          totalLabel: 'Totale assunzioni',
          secondaryTitle: 'Distribuzione per Motivo Assunzione',
          icon: TrendingUp
        };
      case 'cessazioni':
        return {
          modeLabel: 'Cessazione',
          totalLabel: 'Totale cessazioni',
          secondaryTitle: 'Distribuzione per Motivo Cessazione',
          icon: TrendingDown
        };
      case 'inquadramento_eta':
      case 'inquadramento':
        return {
          modeLabel: 'Inquadramento',
          totalLabel: 'Totale personale',
          secondaryTitle: 'Distribuzione per Comparto',
          icon: Users
        };
    }
  };

  const labels = getModeLabels();
  const IconComponent = labels.icon;
  
  // Calculate max values for scaling
  const byEtaValues = Object.values(details.byEta) as number[];
  const maxEta = Math.max(...byEtaValues, 1);
  
  // Get the secondary distribution data
  const getSecondaryData = (): Record<string, number> => {
    if (dataMode === 'inquadramento' || dataMode === 'inquadramento_eta') {
      const inqDetails = details as { byComparto?: Record<string, number> };
      return inqDetails.byComparto || {};
    }
    const stdDetails = details as { byMotivo?: Record<string, number> };
    return stdDetails.byMotivo || {};
  };
  
  const secondaryData = getSecondaryData();
  const secondaryValues = Object.values(secondaryData) as number[];
  const maxSecondary = Math.max(...secondaryValues, 1);

  // Calculate insights
  const totalByEta = byEtaValues.reduce((a, b) => a + b, 0);
  const dominantAge = Object.entries(details.byEta).sort(([,a], [,b]) => (b as number) - (a as number))[0];
  const dominantAgePercentage = totalByEta > 0 ? (((dominantAge?.[1] as number) || 0) / totalByEta * 100).toFixed(1) : '0';

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 500,
        damping: 30
      }
    }
  };

  const sectionVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        height: { type: 'spring' as const, stiffness: 400, damping: 30 },
        opacity: { duration: 0.2 }
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${provincia}-${sesso}-${dataMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${baseColor}20` }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <IconComponent className="w-5 h-5" style={{ color: baseColor }} />
                </motion.div>
                <div className="flex flex-col">
                  <motion.span
                    className="text-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {provincia}
                  </motion.span>
                  <motion.span 
                    className="text-sm text-muted-foreground font-normal flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: baseColor }}
                    />
                    {sessoLabel}
                  </motion.span>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              {/* Summary Card with animated counter */}
              <motion.div 
                className="rounded-xl p-5 relative overflow-hidden cursor-pointer"
                style={{ backgroundColor: `${baseColor}10` }}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${baseColor}15 0%, transparent 50%)` 
                  }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <motion.p 
                      className="text-3xl font-bold text-foreground"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' as const, stiffness: 400, delay: 0.2 }}
                    >
                      {details.totale.toLocaleString()}
                    </motion.p>
                    <p className="text-sm text-muted-foreground mt-1">{labels.totalLabel}</p>
                  </div>
                  <motion.div
                    className="flex flex-col items-end"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-background/50">
                      <Sparkles className="w-3 h-3" style={{ color: baseColor }} />
                      <span className="text-muted-foreground">
                        {dominantAge?.[0]} più rappresentata
                      </span>
                    </div>
                    <span className="text-lg font-semibold mt-1" style={{ color: baseColor }}>
                      {dominantAgePercentage}%
                    </span>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Age Distribution - Collapsible */}
              <motion.div variants={itemVariants} className="border rounded-xl overflow-hidden">
                <motion.button
                  className="w-full p-4 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
                  onClick={() => toggleSection('eta')}
                  whileTap={{ scale: 0.99 }}
                >
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" style={{ color: baseColor }} />
                    Distribuzione per Fascia d'Età
                  </h4>
                  <motion.div
                    animate={{ rotate: expandedSection === 'eta' ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {expandedSection === 'eta' && (
                    <motion.div
                      variants={sectionVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-3">
                        {Object.entries(details.byEta)
                          .sort(([a], [b]) => {
                            const order = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
                            return order.indexOf(a) - order.indexOf(b);
                          })
                          .map(([fascia, valoreRaw], idx) => {
                            const valore = valoreRaw as number;
                            const isHovered = hoveredBar === `eta-${fascia}`;
                            const percentage = totalByEta > 0 ? (valore / totalByEta * 100).toFixed(1) : '0';
                            
                            return (
                              <motion.div 
                                key={fascia}
                                className="group cursor-pointer"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  delay: 0.05 + idx * 0.04,
                                  type: 'spring' as const,
                                  stiffness: 300,
                                  damping: 20
                                }}
                                onMouseEnter={() => setHoveredBar(`eta-${fascia}`)}
                                onMouseLeave={() => setHoveredBar(null)}
                                onClick={() => setSelectedCategory(selectedCategory === fascia ? null : fascia)}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                    {fascia}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <motion.span 
                                      className="text-xs text-muted-foreground"
                                      animate={{ opacity: isHovered ? 1 : 0.6 }}
                                    >
                                      {percentage}%
                                    </motion.span>
                                    <motion.span 
                                      className="text-xs font-semibold text-foreground min-w-[60px] text-right"
                                      animate={{ scale: isHovered ? 1.1 : 1 }}
                                    >
                                      {valore.toLocaleString()}
                                    </motion.span>
                                  </div>
                                </div>
                                <div className="h-7 bg-muted rounded-lg overflow-hidden relative">
                                  <motion.div
                                    className="h-full rounded-lg relative"
                                    style={{ backgroundColor: baseColor }}
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ 
                                      width: `${(valore / maxEta) * 100}%`,
                                      opacity: isHovered ? 1 : 0.85,
                                      filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
                                    }}
                                    transition={{ 
                                      width: { duration: 0.5, delay: 0.1 + idx * 0.04, ease: [0.34, 1.56, 0.64, 1] },
                                      opacity: { duration: 0.2 },
                                      filter: { duration: 0.2 }
                                    }}
                                  >
                                    {/* Shimmer effect on hover */}
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                      initial={{ x: '-100%' }}
                                      animate={{ x: isHovered ? '200%' : '-100%' }}
                                      transition={{ duration: 0.6 }}
                                    />
                                  </motion.div>
                                </div>
                              </motion.div>
                            );
                          })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Secondary Distribution - Collapsible */}
              <motion.div variants={itemVariants} className="border rounded-xl overflow-hidden">
                <motion.button
                  className="w-full p-4 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
                  onClick={() => toggleSection('secondary')}
                  whileTap={{ scale: 0.99 }}
                >
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4" style={{ color: baseColor }} />
                    {labels.secondaryTitle}
                  </h4>
                  <motion.div
                    animate={{ rotate: expandedSection === 'secondary' ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {expandedSection === 'secondary' && (
                    <motion.div
                      variants={sectionVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-3">
                        {Object.entries(secondaryData)
                          .sort(([, a], [, b]) => (b as number) - (a as number))
                          .slice(0, 6)
                          .map(([key, valoreRaw], idx) => {
                            const valore = valoreRaw as number;
                            const isHovered = hoveredBar === `sec-${key}`;
                            
                            return (
                              <motion.div 
                                key={key}
                                className="group cursor-pointer"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  delay: 0.05 + idx * 0.04,
                                  type: 'spring' as const,
                                  stiffness: 300,
                                  damping: 20
                                }}
                                onMouseEnter={() => setHoveredBar(`sec-${key}`)}
                                onMouseLeave={() => setHoveredBar(null)}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span 
                                    className="text-xs text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-[180px]" 
                                    title={key}
                                  >
                                    {key.length > 25 ? key.substring(0, 25) + '...' : key}
                                  </span>
                                  <motion.span 
                                    className="text-xs font-semibold text-foreground"
                                    animate={{ scale: isHovered ? 1.1 : 1 }}
                                  >
                                    {valore.toLocaleString()}
                                  </motion.span>
                                </div>
                                <div className="h-7 bg-muted rounded-lg overflow-hidden relative">
                                  <motion.div
                                    className="h-full rounded-lg relative"
                                    style={{ backgroundColor: getBarColor(idx, isHovered) }}
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ 
                                      width: `${(valore / maxSecondary) * 100}%`,
                                      opacity: 1
                                    }}
                                    transition={{ 
                                      width: { duration: 0.5, delay: 0.1 + idx * 0.04, ease: [0.34, 1.56, 0.64, 1] }
                                    }}
                                  >
                                    {/* Ranking badge */}
                                    <motion.div
                                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/80"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: isHovered ? 1 : 0 }}
                                    >
                                      #{idx + 1}
                                    </motion.div>
                                    {/* Shimmer effect */}
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                      initial={{ x: '-100%' }}
                                      animate={{ x: isHovered ? '200%' : '-100%' }}
                                      transition={{ duration: 0.6 }}
                                    />
                                  </motion.div>
                                </div>
                              </motion.div>
                            );
                          })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Top Amministrazioni - Collapsible */}
              {details.topAmministrazioni.length > 0 && (
                <motion.div variants={itemVariants} className="border rounded-xl overflow-hidden">
                  <motion.button
                    className="w-full p-4 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
                    onClick={() => toggleSection('admin')}
                    whileTap={{ scale: 0.99 }}
                  >
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Building2 className="w-4 h-4" style={{ color: baseColor }} />
                      Top Amministrazioni
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {details.topAmministrazioni.length} trovate
                      </span>
                      <motion.div
                        animate={{ rotate: expandedSection === 'admin' ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {expandedSection === 'admin' && (
                      <motion.div
                        variants={sectionVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="overflow-hidden"
                      >
                        <div className="p-4 space-y-2">
                          {details.topAmministrazioni.slice(0, 5).map((amm, idx) => (
                            <motion.div
                              key={amm.nome}
                              className="flex items-center justify-between p-3 rounded-lg relative overflow-hidden group cursor-pointer"
                              style={{ backgroundColor: `${baseColor}08` }}
                              initial={{ opacity: 0, scale: 0.95, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ 
                                delay: 0.05 + idx * 0.04,
                                type: 'spring' as const,
                                stiffness: 350,
                                damping: 20
                              }}
                              whileHover={{ 
                                scale: 1.02,
                                backgroundColor: `${baseColor}15`
                              }}
                            >
                              {/* Rank badge */}
                              <div 
                                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                                style={{ backgroundColor: baseColor, opacity: 1 - idx * 0.15 }}
                              />
                              
                              <div className="flex items-center gap-3 pl-2">
                                <span 
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                  style={{ 
                                    backgroundColor: `${baseColor}20`,
                                    color: baseColor
                                  }}
                                >
                                  {idx + 1}
                                </span>
                                <span 
                                  className="text-xs text-foreground truncate max-w-[200px] group-hover:max-w-none transition-all" 
                                  title={amm.nome}
                                >
                                  {amm.nome}
                                </span>
                              </div>
                              
                              <motion.span 
                                className="text-sm font-bold px-3 py-1 rounded-full"
                                style={{ 
                                  color: baseColor,
                                  backgroundColor: `${baseColor}15`
                                }}
                                whileHover={{ scale: 1.1 }}
                              >
                                {amm.totale.toLocaleString()}
                              </motion.span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default DrillDownModal;
