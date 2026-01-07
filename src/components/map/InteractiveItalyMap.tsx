import { useState, useEffect, useRef, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, ChevronLeft, Layers } from 'lucide-react';
import { AggregatedByProvince } from '@/types/data';
import { 
  provinceCoordinates, 
  regionCoordinates, 
  italyCenter, 
  italyDefaultZoom,
  getProvincesByRegion,
  ProvinceCoords
} from '@/data/provinceCoordinates';
import { getComuniByProvince } from '@/data/comuniCoordinates';
import { regionalCapitals } from '@/data/mockData2025';

interface InteractiveItalyMapProps {
  data: AggregatedByProvince[];
  selectedYear?: number | null;
  selectedMonth?: number | null;
  selectedProvince?: string | null;
  regionToZoom?: string | null;
  cityToZoom?: string | null;
  onProvinceSelect?: (province: string | null) => void;
  onRegionSelect?: (region: string) => void;
  onResetRegion?: () => void;
}

type ViewLevel = 'italy' | 'region' | 'province' | 'city';

// Colors from design system (blue/gold/white)
const COLORS = {
  primary: 'hsl(212, 70%, 18%)',      // #082B6F - Same as GenderPieChart
  primaryLight: 'hsl(212, 70%, 40%)', // Lighter version of the same blue
  gold: 'hsl(45, 90%, 50%)',
  goldDark: 'hsl(40, 90%, 40%)',
  white: '#ffffff',
};

export function InteractiveItalyMap({ 
  data, 
  selectedYear,
  selectedMonth,
  selectedProvince,
  regionToZoom,
  cityToZoom,
  onProvinceSelect,
  onRegionSelect,
  onResetRegion
}: InteractiveItalyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewLevel, setViewLevel] = useState<ViewLevel>('italy');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const ITALY_BOUNDS: [[number, number], [number, number]] = [[5.5, 35], [19, 48]];

  // Create a data map for quick lookup
  const dataMap = useMemo(() => {
    const map = new Map<string, AggregatedByProvince>();
    data.forEach(d => map.set(d.provincia.toUpperCase(), d));
    return map;
  }, [data]);

  // Aggregate data by region for initial view
  const regionTotals = useMemo(() => {
    const totals: Record<string, { totale: number; maschi: number; femmine: number }> = {};
    
    Object.entries(provinceCoordinates).forEach(([provinceName, provinceData]) => {
      const region = provinceData.region.toUpperCase();
      if (!totals[region]) {
        totals[region] = { totale: 0, maschi: 0, femmine: 0 };
      }
      const d = dataMap.get(provinceName);
      if (d) {
        totals[region].totale += d.totale;
        totals[region].maschi += d.maschi;
        totals[region].femmine += d.femmine;
      }
    });
    
    return totals;
  }, [dataMap]);

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
      // Fit to whole Italy on load
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
    } else if ((viewLevel === 'province' || viewLevel === 'city') && selectedProvince) {
      renderCityMarkers(selectedProvince);
    }
  }, [data, isLoaded, viewLevel, selectedRegion, dataMap, regionTotals]);

  // Handle region selection coming from bar chart: zoom and switch view
  useEffect(() => {
    if (!map.current || !isLoaded) return;
    if (!regionToZoom) return;

    const coords = regionCoordinates[regionToZoom];
    if (!coords) return;

    setViewLevel('region');
    setSelectedRegion(regionToZoom);
    map.current.flyTo({
      center: coords.coordinates,
      zoom: coords.zoom,
      duration: 1000
    });
  }, [regionToZoom, isLoaded]);

  // Handle city selection from bar chart: zoom in province context
  useEffect(() => {
    if (!map.current || !isLoaded) return;
    if (!cityToZoom || !selectedProvince) return;
    const comuni = getComuniByProvince(selectedProvince);
    const target = comuni.find(c => c.name.toUpperCase() === cityToZoom.toUpperCase());
    if (!target) return;
    setViewLevel('city');
    map.current.flyTo({ center: target.coordinates, zoom: target.zoom, duration: 900 });
  }, [cityToZoom, selectedProvince, isLoaded]);

  // Handle province selection from barchart
  useEffect(() => {
    if (!map.current || !isLoaded || !selectedProvince) return;

    const coords = provinceCoordinates[selectedProvince.toUpperCase()];
    if (!coords) return;

    if (viewLevel === 'italy') {
      // Zoom to the selected province from italy view
      map.current.flyTo({
        center: coords.coordinates,
        zoom: coords.zoom + 1,
        duration: 1000
      });
    } else if (viewLevel === 'region') {
      // Switch to province view and zoom to the province
      setViewLevel('province');
      map.current.flyTo({
        center: coords.coordinates,
        zoom: coords.zoom + 1,
        duration: 1000
      });
    }
  }, [selectedProvince, isLoaded, viewLevel]);

  const clearMarkers = () => {
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
  };

  // Render capoluoghi regionali at italy level
  const renderCapitalMarkers = () => {
    const maxValue = Math.max(...Object.values(regionTotals).map(r => r.totale), 1);

    Object.entries(regionalCapitals).forEach(([regionName, capitalName]) => {
      const coords = regionCoordinates[regionName];
      const capitalCoords = provinceCoordinates[capitalName];
      if (!coords || !capitalCoords) return;

      const regionData = regionTotals[regionName] || { totale: 0, maschi: 0, femmine: 0 };
      const ratio = regionData.totale / maxValue;
      const size = 40 + ratio * 50;

      const el = createCapitalMarker(size, regionName, capitalName, regionData.totale);

      const popup = createRegionPopup(regionName, capitalName, regionData);

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
    
    // Get max value for sizing
    let maxValue = 1;
    allRegionProvinces.forEach(prov => {
      const d = dataMap.get(prov.name.toUpperCase());
      if (d && d.totale > maxValue) maxValue = d.totale;
    });

    allRegionProvinces.forEach(provCoords => {
      const provinceData = dataMap.get(provCoords.name.toUpperCase());
      const value = provinceData?.totale || 0;
      const ratio = maxValue > 0 ? value / maxValue : 0;
      const size = value > 0 ? 30 + ratio * 45 : 22;

      const el = createProvinceMarker(size, provCoords.name, value, !!provinceData);

      const popup = createProvincePopup(provCoords.name, provinceData);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(provCoords.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        handleProvinceClick(provCoords.name, provCoords);
      });

      el.addEventListener('mouseenter', () => marker.togglePopup());
      el.addEventListener('mouseleave', () => {
        if (marker.getPopup()?.isOpen()) marker.togglePopup();
      });

      markersRef.current.push(marker);
    });
  };

  const renderCityMarkers = (provinceName: string) => {
    const comuni = getComuniByProvince(provinceName);
    comuni.forEach(com => {
      const el = document.createElement('div');
      el.innerHTML = `
        <div style="
          position: relative;
          width: 28px;
          height: 28px;
          cursor: pointer;
        ">
          <div style="
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 22px; height: 22px;
            background: linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark});
            border: 3px solid ${COLORS.white};
            border-radius: 50%;
            box-shadow: 0 4px 16px ${COLORS.gold}40;
          "></div>
        </div>
      `;
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(com.coordinates)
        .addTo(map.current!);
      el.addEventListener('click', () => {
        setViewLevel('city');
        onProvinceSelect?.(provinceName);
        map.current?.flyTo({ center: com.coordinates, zoom: com.zoom, duration: 900 });
      });
      markersRef.current.push(marker);
    });
  };

  const createCapitalMarker = (size: number, regionName: string, capitalName: string, value: number) => {
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
    el.title = `${regionName} - Capoluogo: ${capitalName}`;
    return el;
  };

  const createProvinceMarker = (size: number, name: string, value: number, hasData: boolean) => {
    const el = document.createElement('div');
    const color = hasData ? COLORS.gold : COLORS.primaryLight;
    
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
          width: ${hasData ? size * 0.7 : size * 0.5}px;
          height: ${hasData ? size * 0.7 : size * 0.5}px;
          background: ${hasData ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})` : COLORS.primaryLight + '50'};
          border: ${hasData ? '3px' : '2px'} solid ${hasData ? COLORS.white : COLORS.primary + '30'};
          border-radius: 50%;
          box-shadow: ${hasData ? `0 4px 16px ${COLORS.gold}40` : 'none'};
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        ">
          ${hasData && value > 0 ? `
            <span style="
              position: absolute;
              top: 50%; left: 50%;
              transform: translate(-50%, -50%);
              color: ${COLORS.white};
              font-size: ${size > 50 ? 10 : 8}px;
              font-weight: 600;
              text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            ">
              ${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}
            </span>
          ` : ''}
        </div>
      </div>
    `;
    el.style.cssText = `width: ${size}px; height: ${size}px; cursor: pointer;`;
    el.title = name;
    return el;
  };

  const createRegionPopup = (regionName: string, capitalName: string, data: { totale: number; maschi: number; femmine: number }) => {
    const content = `
      <div style="padding: 16px; font-family: 'Inter', system-ui; min-width: 220px;">
        <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 700; color: ${COLORS.primary};">
          ${regionName}
        </h3>
        <p style="margin: 0 0 12px 0; font-size: 12px; color: #888;">
          Capoluogo: ${capitalName}
        </p>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #666;">Totale Regione</span>
            <strong style="font-size: 18px; color: ${COLORS.goldDark};">${new Intl.NumberFormat('it-IT').format(data.totale)}</strong>
          </div>
          <div style="height: 1px; background: #eee;"></div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">Uomini</span>
            <span style="color: ${COLORS.primary}; font-weight: 500;">${new Intl.NumberFormat('it-IT').format(data.maschi)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">Donne</span>
            <span style="color: ${COLORS.gold}; font-weight: 500;">${new Intl.NumberFormat('it-IT').format(data.femmine)}</span>
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

  const createProvincePopup = (name: string, data?: AggregatedByProvince) => {
    const content = data ? `
      <div style="padding: 16px; font-family: 'Inter', system-ui; min-width: 200px;">
        <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 600; color: ${COLORS.primary};">
          ${name}
        </h3>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">Totale</span>
            <strong style="font-size: 16px; color: ${COLORS.goldDark};">${new Intl.NumberFormat('it-IT').format(data.totale)}</strong>
          </div>
          <div style="height: 1px; background: #eee;"></div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">Uomini</span>
            <span style="color: ${COLORS.primary}; font-weight: 500;">${new Intl.NumberFormat('it-IT').format(data.maschi)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">Donne</span>
            <span style="color: ${COLORS.gold}; font-weight: 500;">${new Intl.NumberFormat('it-IT').format(data.femmine)}</span>
          </div>
        </div>
      </div>
    ` : `
      <div style="padding: 12px; font-family: 'Inter', system-ui;">
        <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: ${COLORS.primary};">
          ${name}
        </h3>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #888;">
          Nessun dato disponibile
        </p>
      </div>
    `;

    return new maplibregl.Popup({
      offset: 25,
      closeButton: false,
      className: 'province-popup'
    }).setHTML(content);
  };

  const handleRegionClick = (
    regionName: string,
    coords: { coordinates: [number, number]; zoom: number }
  ) => {
    setViewLevel('region');
    setSelectedRegion(regionName);

    onRegionSelect?.(regionName); // 🔥 NOTIFICA IL PARENT

    map.current?.flyTo({
      center: coords.coordinates,
      zoom: coords.zoom,
      duration: 1200
    });
  };

  const handleProvinceClick = (provinceName: string, coords: ProvinceCoords) => {
    setViewLevel('province');
    onProvinceSelect?.(provinceName);
    map.current?.flyTo({
      center: coords.coordinates,
      zoom: coords.zoom + 1,
      duration: 1000
    });
  };

  const handleCitySelect = (cityName: string) => {
    if (!selectedProvince) return;
    const comuni = getComuniByProvince(selectedProvince);
    const target = comuni.find(c => c.name.toUpperCase() === cityName.toUpperCase());
    if (!target) return;
    setViewLevel('city');
    map.current?.flyTo({ center: target.coordinates, zoom: target.zoom, duration: 900 });
  };

  const handleBack = () => {
    if (viewLevel === 'province') {
      onProvinceSelect?.(null);
      setViewLevel('region');
      if (selectedRegion) {
        const coords = regionCoordinates[selectedRegion];
        if (coords) {
          map.current?.flyTo({
            center: coords.coordinates,
            zoom: coords.zoom,
            duration: 1000
          });
        }
      }
    } else if (viewLevel === 'region') {
      setSelectedRegion(null);
      setViewLevel('italy');
      map.current?.fitBounds(ITALY_BOUNDS, { padding: 10 });
    }
    onProvinceSelect?.(null);
  };

  const handleResetView = () => {
  setViewLevel('italy');
  setSelectedRegion(null);

  onResetRegion?.(); // 🔥 RIPRISTINA TOP15

  map.current?.fitBounds(ITALY_BOUNDS, { padding: 10 });
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="apple-card p-6 relative overflow-hidden"
    >
      <div className="absolute inset-0" />
      
      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {viewLevel !== 'italy' && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleBack}
                className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Mappa Interattiva</h3>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${viewLevel}-${selectedRegion}-${selectedProvince}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-sm text-muted-foreground"
                >
                  {viewLevel === 'italy' && 'Clicca un capoluogo per esplorare la regione'}
                  {viewLevel === 'region' && `${selectedRegion} • Clicca una provincia per i dettagli`}
                  {viewLevel === 'province' && `${selectedRegion} › ${selectedProvince}`}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedYear && selectedMonth && (
              <span className="text-xs bg-gold/20 text-gold-dark px-3 py-1.5 rounded-lg font-medium">
                {selectedMonth}/{selectedYear}
              </span>
            )}
            {viewLevel !== 'italy' && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleResetView}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-colors"
              >
                <Compass className="h-4 w-4" />
                Italia
              </motion.button>
            )}
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-xs">
          <button 
            onClick={handleResetView}
            className={`transition-colors ${viewLevel === 'italy' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Italia
          </button>
          {selectedRegion && (
            <>
              <span className="text-muted-foreground">›</span>
              <button 
                onClick={() => { 
                  setViewLevel('region'); 
                  onProvinceSelect?.(null);
                  const coords = regionCoordinates[selectedRegion];
                  if (coords) {
                    map.current?.flyTo({
                      center: coords.coordinates,
                      zoom: coords.zoom,
                      duration: 800
                    });
                  }
                }}
                className={`transition-colors ${viewLevel === 'region' ? 'text-gold-dark font-medium' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {selectedRegion}
              </button>
            </>
          )}
          {selectedProvince && (
            <>
              <span className="text-muted-foreground">›</span>
              <span className="text-gold font-medium">{selectedProvince}</span>
            </>
          )}
        </div>

        {/* Map Container */}
        <div className="relative rounded-2xl overflow-hidden border border-border">
          <div ref={mapContainer} className="w-full h-[500px]" />
          
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
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span>Capoluogo Regionale</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gold" />
              <span>Provincia (con dati)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary/30 border border-primary/40" />
              <span>Provincia (no dati)</span>
            </div>
          </div>
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Dimensione = volume dati
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
