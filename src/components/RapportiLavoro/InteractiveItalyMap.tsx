import { useState, useEffect, useRef, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, ChevronLeft, Layers } from 'lucide-react';
import { 
  provinceCoordinates, 
  regionCoordinates, 
  italyCenter, 
  italyDefaultZoom,
  getProvincesByRegion,
  ProvinceCoords,
  regionalCapitals
} from '@/data/provinceCoordinatesRL';
import { DataMode } from './DataModeToggle';

interface InteractiveItalyMapProps {
  regionData: Record<string, number>;
  provinceData?: Record<string, number>; // Province-level data for when zoomed into a region
  selectedRegion: string | null;
  selectedProvince?: string | null; // For inquadramento mode province selection
  onRegionClick: (region: string) => void;
  onProvinceClick?: (province: string) => void; // For inquadramento mode province selection
  dataMode: DataMode;
}

type ViewLevel = 'italy' | 'region';

// Colors from design system (blue/gold/white)
const COLORS = {
  primary: 'hsl(212, 70%, 18%)',
  primaryLight: 'hsl(212, 70%, 40%)',
  gold: 'hsl(45, 90%, 50%)',
  goldDark: 'hsl(40, 90%, 40%)',
  white: '#ffffff',
};

// Get color based on data mode
const getModeColor = (mode: DataMode) => {
  switch (mode) {
    case 'assunzioni': return 'hsl(220, 70%, 45%)';
    case 'cessazioni': return 'hsl(0, 55%, 45%)';
    case 'inquadramento_eta': return 'hsl(280, 55%, 45%)';
    case 'inquadramento': return 'hsl(160, 55%, 35%)';
  }
};

export function InteractiveItalyMap({ 
  regionData,
  provinceData = {},
  selectedRegion: externalSelectedRegion,
  selectedProvince,
  onRegionClick,
  onProvinceClick,
  dataMode
}: InteractiveItalyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewLevel, setViewLevel] = useState<ViewLevel>('italy');
  const [internalSelectedRegion, setInternalSelectedRegion] = useState<string | null>(null);
  const ITALY_BOUNDS: [[number, number], [number, number]] = [[5.5, 35], [19, 48]];

  const selectedRegion = externalSelectedRegion || internalSelectedRegion;

  // Get max value for scaling
  const maxValue = useMemo(() => {
    return Math.max(...Object.values(regionData), 1);
  }, [regionData]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: italyCenter,
      zoom: italyDefaultZoom,
      pitch: 0,
      bearing: 0,
      maxBounds: [[5.5, 35], [19, 48]]
    });

    map.current.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');
    map.current.addControl(new maplibregl.ScaleControl({ maxWidth: 100 }), 'bottom-left');

    map.current.on('load', () => {
      setIsLoaded(true);
      map.current!.fitBounds(ITALY_BOUNDS, { padding: 10 });
    });

    return () => {
      markersRef.current.forEach(m => m.remove());
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update markers when data or view changes
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    clearMarkers();

    if (viewLevel === 'italy') {
      renderCapitalMarkers();
    } else if (viewLevel === 'region' && selectedRegion) {
      renderProvinceMarkers(selectedRegion);
    }
  }, [regionData, provinceData, isLoaded, viewLevel, selectedRegion, selectedProvince, dataMode]);

  // Sync with external selection
  useEffect(() => {
    if (externalSelectedRegion && externalSelectedRegion !== internalSelectedRegion) {
      setInternalSelectedRegion(externalSelectedRegion);
      setViewLevel('region');
      const coords = regionCoordinates[externalSelectedRegion];
      if (coords && map.current) {
        map.current.flyTo({
          center: coords.coordinates,
          zoom: coords.zoom,
          duration: 1000
        });
      }
    } else if (!externalSelectedRegion && internalSelectedRegion) {
      setInternalSelectedRegion(null);
      setViewLevel('italy');
      if (map.current) {
        map.current.fitBounds(ITALY_BOUNDS, { padding: 10 });
      }
    }
  }, [externalSelectedRegion]);

  const clearMarkers = () => {
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
  };

  // Render regional capitals at italy level
  const renderCapitalMarkers = () => {
    const modeColor = getModeColor(dataMode);

    Object.entries(regionalCapitals).forEach(([regionName, capitalName]) => {
      const coords = regionCoordinates[regionName];
      const capitalCoords = provinceCoordinates[capitalName];
      if (!coords || !capitalCoords) return;

      const value = regionData[regionName] || 0;
      const ratio = value / maxValue;
      const size = 40 + ratio * 50;

      const el = createCapitalMarker(size, regionName, value, COLORS.primary);

      const popup = createRegionPopup(regionName, capitalName, value, modeColor);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(capitalCoords.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener('click', () => handleRegionClick(regionName, coords));
      el.addEventListener('mouseenter', () => marker.togglePopup());
      el.addEventListener('mouseleave', () => {
        if (marker.getPopup()?.isOpen()) marker.togglePopup();
      });
      
      markersRef.current.push(marker);
    });
  };

  const renderProvinceMarkers = (regionName: string) => {
    const allRegionProvinces = getProvincesByRegion(regionName);
    const modeColor = getModeColor(dataMode);
    
    // Get max value for sizing
    let maxValue = 1;
    allRegionProvinces.forEach(prov => {
      const value = provinceData[prov.name.toUpperCase()] || provinceData[prov.name] || 0;
      if (value > maxValue) maxValue = value;
    });
    
    allRegionProvinces.forEach(provCoords => {
      const provinceName = provCoords.name.toUpperCase();
      const value = provinceData[provinceName] || provinceData[provCoords.name] || 0;
      const ratio = maxValue > 0 ? value / maxValue : 0;
      const size = value > 0 ? 30 + ratio * 45 : 22;
      const isSelected = selectedProvince === provinceName || selectedProvince === provCoords.name;

      const el = createProvinceMarker(size, provCoords.name, value, COLORS.primary, isSelected);

      // Add click handler for province selection in inquadramento mode
      if (onProvinceClick) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
          onProvinceClick(provinceName);
        });
      }

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(provCoords.coordinates)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  };

  const createCapitalMarker = (size: number, regionName: string, value: number, color: string) => {
    const el = document.createElement('div');
    
    el.innerHTML = `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
        cursor: pointer;
      ">
        <div style="
          position: absolute;
          width: ${size + 16}px;
          height: ${size + 16}px;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid ${COLORS.primary}30;
          border-radius: 50%;
          animation: capitalPulse 3s ease-out infinite;
        "></div>
        <div style="
          position: absolute;
          width: ${size + 8}px;
          height: ${size + 8}px;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid ${COLORS.primary}50;
          border-radius: 50%;
          animation: capitalPulse 3s ease-out infinite 0.5s;
        "></div>
        <div style="
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: ${size * 0.75}px;
          height: ${size * 0.75}px;
          background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight});
          border: 4px solid ${COLORS.white};
          border-radius: 50%;
          box-shadow: 0 6px 24px ${COLORS.primary}40;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        ">
          <span style="color: ${COLORS.white}; font-size: ${size > 55 ? 12 : 10}px; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
            ${value >= 1000000 ? (value / 1000000).toFixed(1) + 'M' : value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}
          </span>
        </div>
      </div>
    `;
    el.style.cssText = `width: ${size}px; height: ${size}px; cursor: pointer;`;
    el.title = regionName;
    return el;
  };

  const createProvinceMarker = (size: number, name: string, value: number, color: string, isSelected: boolean = false) => {
    const el = document.createElement('div');
    const hasData = value > 0;
    const displayValue = value >= 1000000 ? (value / 1000000).toFixed(1) + 'M' : value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value.toString();
    const borderColor = isSelected ? 'hsl(45, 100%, 50%)' : COLORS.white;
    const borderWidth = isSelected ? '4px' : '3px';
    const shadowColor = isSelected ? 'hsl(45, 100%, 50%)' : (hasData ? COLORS.gold : '#ccc');
    
    el.innerHTML = `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
        cursor: pointer;
      ">
        ${hasData ? `
        <div style="
          position: absolute;
          width: ${size + 10}px;
          height: ${size + 10}px;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid ${COLORS.gold}40;
          border-radius: 50%;
          animation: provincePulse 2.5s ease-out infinite;
        "></div>
        ` : ''}
        <div style="
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: ${size * 0.75}px;
          height: ${size * 0.75}px;
          background: linear-gradient(135deg, ${hasData ? COLORS.gold : '#ccc'}, ${hasData ? COLORS.goldDark : '#aaa'});
          border: ${borderWidth} solid ${borderColor};
          border-radius: 50%;
          box-shadow: 0 4px 16px ${shadowColor}40${isSelected ? ', 0 0 20px ' + shadowColor + '80' : ''};
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          ${hasData ? `
          <span style="
            color: ${COLORS.white};
            font-size: ${size > 50 ? 10 : 8}px;
            font-weight: 700;
            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          ">
            ${displayValue}
          </span>
          ` : `
          <span style="
            color: ${COLORS.white};
            font-size: 7px;
            font-weight: 600;
            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          ">
            ${name.length > 3 ? name.substring(0, 3) : name}
          </span>
          `}
        </div>
      </div>
    `;
    el.style.cssText = `width: ${size}px; height: ${size}px; cursor: pointer;`;
    el.title = `${name}: ${value.toLocaleString()}`;
    return el;
  };

  const createRegionPopup = (regionName: string, capitalName: string, value: number, color: string) => {
    const content = `
      <div style="padding: 16px; font-family: 'Inter', system-ui; min-width: 200px;">
        <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 700; color: ${color};">
          ${regionName}
        </h3>
        <p style="margin: 0 0 12px 0; font-size: 12px; color: #888;">
          Capoluogo: ${capitalName}
        </p>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #666;">Totale</span>
            <strong style="font-size: 18px; color: ${color};">${new Intl.NumberFormat('it-IT').format(value)}</strong>
          </div>
        </div>
        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee;">
          <span style="font-size: 11px; color: #888;">Clicca per vedere le province</span>
        </div>
      </div>
    `;

    return new maplibregl.Popup({
      offset: 25,
      closeButton: false,
      className: 'region-popup'
    }).setHTML(content);
  };

  const handleRegionClick = (
    regionName: string,
    coords: { coordinates: [number, number]; zoom: number }
  ) => {
    setViewLevel('region');
    setInternalSelectedRegion(regionName);
    onRegionClick(regionName);

    map.current?.flyTo({
      center: coords.coordinates,
      zoom: coords.zoom,
      duration: 1200
    });
  };

  const handleBack = () => {
    setInternalSelectedRegion(null);
    setViewLevel('italy');
    onRegionClick('');
    map.current?.fitBounds(ITALY_BOUNDS, { padding: 10 });
  };

  const handleResetView = () => {
    setViewLevel('italy');
    setInternalSelectedRegion(null);
    onRegionClick('');
    map.current?.fitBounds(ITALY_BOUNDS, { padding: 10 });
  };

  const modeColor = getModeColor(dataMode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden h-full"
    >
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {viewLevel !== 'italy' && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleBack}
                className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-5 h-5" style={{ color: modeColor }} />
                <h3 className="text-base font-semibold text-foreground">Mappa Interattiva</h3>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${viewLevel}-${selectedRegion}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-muted-foreground"
                >
                  {viewLevel === 'italy' && 'Clicca un capoluogo per esplorare la regione'}
                  {viewLevel === 'region' && `${selectedRegion} • Visualizza province`}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {viewLevel !== 'italy' && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleResetView}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 text-foreground rounded-xl transition-colors"
              >
                <Compass className="h-4 w-4" />
                Italia
              </motion.button>
            )}
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-3 text-xs">
          <button 
            onClick={handleResetView}
            className={`transition-colors ${viewLevel === 'italy' ? 'font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            style={{ color: viewLevel === 'italy' ? modeColor : undefined }}
          >
            Italia
          </button>
          {selectedRegion && (
            <>
              <span className="text-muted-foreground">›</span>
              <span className="font-medium" style={{ color: modeColor }}>
                {selectedRegion}
              </span>
            </>
          )}
        </div>

        {/* Map Container */}
        <div className="relative rounded-xl overflow-hidden border border-border flex-1">
          <div ref={mapContainer} className="w-full h-full min-h-[350px]" />
          
          <AnimatePresence>
            {!isLoaded && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground">Caricamento mappa...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: modeColor }} />
              <span>Capoluogo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.gold }} />
              <span>Provincia</span>
            </div>
          </div>
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Dimensione = volume
          </span>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes capitalPulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes provincePulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }
        .maplibregl-popup-content {
          border-radius: 16px !important;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15) !important;
          padding: 0 !important;
          overflow: hidden;
        }
        .maplibregl-popup-tip {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}

export default InteractiveItalyMap;
