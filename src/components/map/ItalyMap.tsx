import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AggregatedByProvince } from '@/types/data';
import { italyProvinces, italyOutline, sardiniaOutline, sicilyOutline } from '@/data/italyProvinces';
import { cn } from '@/lib/utils';
import { MapPin, Users, TrendingUp, X } from 'lucide-react';

interface ItalyMapProps {
  data: AggregatedByProvince[];
  onProvinceClick?: (provincia: string) => void;
}

function getColorForValue(value: number, max: number): string {
  const ratio = Math.min(value / max, 1);
  // Gradient from light cyan to deep blue
  const hue = 199;
  const saturation = 89;
  const lightness = 85 - (ratio * 45); // From 85% to 40%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getGlowForValue(value: number, max: number): string {
  const ratio = Math.min(value / max, 1);
  const intensity = 0.2 + (ratio * 0.4);
  return `drop-shadow(0 0 ${8 + ratio * 12}px hsla(199, 89%, 48%, ${intensity}))`;
}

export function ItalyMap({ data, onProvinceClick }: ItalyMapProps) {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const dataMap = useMemo(() => {
    const map = new Map<string, AggregatedByProvince>();
    data.forEach(d => map.set(d.provincia.toUpperCase(), d));
    return map;
  }, [data]);

  const maxValue = useMemo(() => {
    return Math.max(...data.map(d => d.totale), 1);
  }, [data]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleProvinceClick = (provinceId: string) => {
    setSelectedProvince(selectedProvince === provinceId ? null : provinceId);
    onProvinceClick?.(provinceId);
  };

  const hoveredData = hoveredProvince ? dataMap.get(hoveredProvince.toUpperCase()) : null;
  const selectedData = selectedProvince ? dataMap.get(selectedProvince.toUpperCase()) : null;

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-up relative overflow-hidden" style={{ animationDelay: '300ms' }}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Mappa Interattiva
            </h3>
            <p className="text-sm text-muted-foreground">Clicca su una provincia per i dettagli</p>
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Meno</span>
            <div className="flex h-3 rounded-full overflow-hidden">
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <div 
                  key={i}
                  className="w-6 h-full"
                  style={{ backgroundColor: getColorForValue(ratio * maxValue, maxValue) }}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">Più</span>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="relative aspect-[3/4] max-h-[600px] mx-auto"
          onMouseMove={handleMouseMove}
        >
          <svg 
            viewBox="50 30 380 580" 
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 20px hsla(199, 89%, 48%, 0.1))' }}
          >
            {/* Definitions for gradients and filters */}
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(199, 89%, 95%)" />
                <stop offset="100%" stopColor="hsl(199, 89%, 85%)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="hsla(199, 89%, 30%, 0.3)"/>
              </filter>
            </defs>

            {/* Background outlines */}
            <motion.path
              d={italyOutline}
              fill="url(#mapGradient)"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d={sardiniaOutline}
              fill="url(#mapGradient)"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
            />
            <motion.path
              d={sicilyOutline}
              fill="url(#mapGradient)"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />

            {/* Province paths */}
            {italyProvinces.map((province, index) => {
              const provinceData = dataMap.get(province.id);
              const value = provinceData?.totale || 0;
              const isHovered = hoveredProvince === province.id;
              const isSelected = selectedProvince === province.id;
              
              return (
                <motion.g key={province.id}>
                  <motion.path
                    d={province.path}
                    fill={value > 0 ? getColorForValue(value, maxValue) : 'hsl(var(--muted))'}
                    stroke={isSelected ? 'hsl(var(--primary))' : isHovered ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                    className="cursor-pointer transition-all duration-300"
                    style={{ 
                      filter: isHovered || isSelected ? getGlowForValue(value, maxValue) : 'none'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: isHovered ? 1.05 : 1,
                      y: isHovered ? -2 : 0
                    }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05
                    }}
                    onMouseEnter={() => setHoveredProvince(province.id)}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(province.id)}
                  />
                  
                  {/* Province label - only show on hover or if selected */}
                  <AnimatePresence>
                    {(isHovered || isSelected) && (
                      <motion.text
                        x={province.center.x}
                        y={province.center.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-[8px] font-bold fill-foreground pointer-events-none"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                      >
                        {province.name}
                      </motion.text>
                    )}
                  </AnimatePresence>

                  {/* Pulse effect for provinces with data */}
                  {value > 0 && !isHovered && !isSelected && (
                    <motion.circle
                      cx={province.center.x}
                      cy={province.center.y}
                      r="3"
                      fill="hsl(var(--primary))"
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ 
                        opacity: [0.6, 0, 0.6],
                        scale: [1, 2, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.1
                      }}
                    />
                  )}
                </motion.g>
              );
            })}
          </svg>

          {/* Hover tooltip */}
          <AnimatePresence>
            {hoveredProvince && hoveredData && !selectedProvince && (
              <motion.div
                className="absolute z-20 pointer-events-none"
                style={{
                  left: mousePos.x + 15,
                  top: mousePos.y - 10,
                }}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
              >
                <div className="glass-card rounded-lg p-3 shadow-xl border border-primary/20 min-w-[180px]">
                  <p className="font-semibold text-sm gradient-text">{hoveredData.provincia}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Totale:</span>
                      <span className="font-medium">{new Intl.NumberFormat('it-IT').format(hoveredData.totale)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Uomini:</span>
                      <span className="font-medium text-chart-1">{new Intl.NumberFormat('it-IT').format(hoveredData.maschi)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Donne:</span>
                      <span className="font-medium text-chart-5">{new Intl.NumberFormat('it-IT').format(hoveredData.femmine)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selected Province Detail Panel */}
        <AnimatePresence>
          {selectedProvince && selectedData && (
            <motion.div
              className="absolute top-6 right-6 z-30 w-72"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <div className="glass-card rounded-xl p-5 shadow-2xl border border-primary/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-lg gradient-text">{selectedData.provincia}</h4>
                    <p className="text-xs text-muted-foreground">Dettaglio provincia</p>
                  </div>
                  <button
                    onClick={() => setSelectedProvince(null)}
                    className="p-1 hover:bg-muted rounded-md transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Total with visual bar */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        Totale Amministrati
                      </span>
                      <span className="font-bold">
                        {new Intl.NumberFormat('it-IT').format(selectedData.totale)}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full gradient-bg rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(selectedData.totale / maxValue) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Gender breakdown */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-chart-1/10 border border-chart-1/20">
                      <p className="text-xs text-muted-foreground">Uomini</p>
                      <p className="text-lg font-bold text-chart-1">
                        {new Intl.NumberFormat('it-IT').format(selectedData.maschi)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {((selectedData.maschi / selectedData.totale) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-chart-5/10 border border-chart-5/20">
                      <p className="text-xs text-muted-foreground">Donne</p>
                      <p className="text-lg font-bold text-chart-5">
                        {new Intl.NumberFormat('it-IT').format(selectedData.femmine)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {((selectedData.femmine / selectedData.totale) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Ranking */}
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      <span className="text-muted-foreground">Posizione: </span>
                      <span className="font-bold">
                        #{data.findIndex(d => d.provincia === selectedData.provincia) + 1}
                      </span>
                      <span className="text-muted-foreground"> su {data.length}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions when no data hovered */}
        {!hoveredProvince && !selectedProvince && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <motion.p 
              className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Passa sopra una provincia per vedere i dati
            </motion.p>
          </div>
        )}
      </div>
    </div>
  );
}
