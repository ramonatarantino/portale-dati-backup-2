import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Layers } from 'lucide-react';
import { AggregatedByProvince } from '@/types/data';
import { provinceCoordinates, italyCenter, italyDefaultZoom } from '@/data/provinceCoordinates';

interface MapLibreMapProps {
  data: AggregatedByProvince[];
  selectedProvince?: string | null;
  onProvinceSelect?: (province: string | null) => void;
}

export function MapLibreMap({ data, selectedProvince, onProvinceSelect }: MapLibreMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentProvince, setCurrentProvince] = useState<string | null>(null);

  const maxValue = Math.max(...data.map(d => d.totale), 1);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: italyCenter,
      zoom: italyDefaultZoom,
      pitch: 0,
      bearing: 0,
      maxBounds: [
        [5.5, 35],
        [19, 48]
      ]
    });

    map.current.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');
    map.current.addControl(new maplibregl.ScaleControl({ maxWidth: 100 }), 'bottom-left');

    map.current.on('load', () => {
      setIsLoaded(true);
    });

    return () => {
      markersRef.current.forEach(m => m.remove());
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current || !isLoaded) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    data.forEach(provinceData => {
      const coords = provinceCoordinates[provinceData.provincia.toUpperCase()];
      if (!coords) return;

      const ratio = provinceData.totale / maxValue;
      const size = 24 + ratio * 36;
      const opacity = 0.6 + ratio * 0.3;

      const el = document.createElement('div');
      el.className = 'province-marker';
      el.innerHTML = `
        <div style="position: relative; width: ${size}px; height: ${size}px;">
        <div class="marker-ring" style="
          position: absolute;
          width: ${size + 10}px;
          height: ${size + 10}px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid hsla(210, 100%, 35%, 0.3);
          border-radius: 50%;
          animation: ringPulse 2s ease-out infinite;
        "></div>
        <div class="marker-core" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${size * 0.5}px;
          height: ${size * 0.5}px;
          background: linear-gradient(135deg, hsl(210, 100%, 35%), hsl(199, 89%, 48%));
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px hsla(210, 100%, 25%, 0.4);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        "></div>
        </div>
      `;
      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        cursor: pointer;
      `;

      const popup = new maplibregl.Popup({
        offset: 25,
        closeButton: false,
        className: 'province-popup'
      }).setHTML(`
        <div style="
          padding: 16px;
          font-family: 'Titillium Web', system-ui, sans-serif;
          min-width: 200px;
        ">
          <h3 style="
            margin: 0 0 12px 0;
            font-size: 15px;
            font-weight: 600;
            color: hsl(210, 100%, 35%);
          ">${provinceData.provincia}</h3>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="color: #666;">Totale</span>
              <strong style="font-size: 16px;">${new Intl.NumberFormat('it-IT').format(provinceData.totale)}</strong>
            </div>
            <div style="height: 1px; background: #eee; margin: 4px 0;"></div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #666;">Maschi</span>
              <span style="color: hsl(210, 100%, 35%); font-weight: 500;">${new Intl.NumberFormat('it-IT').format(provinceData.maschi)}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #666;">Femmine</span>
              <span style="color: hsl(339, 90%, 51%); font-weight: 500;">${new Intl.NumberFormat('it-IT').format(provinceData.femmine)}</span>
            </div>
            <div style="margin-top: 8px;">
              <div style="height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden;">
                <div style="height: 100%; width: ${(provinceData.maschi / provinceData.totale) * 100}%; background: hsl(210, 100%, 35%);"></div>
              </div>
            </div>
          </div>
        </div>
      `);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(coords.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        onProvinceSelect?.(provinceData.provincia);
      });

      el.addEventListener('mouseenter', () => {
        const core = el.querySelector('.marker-core') as HTMLElement;
        if (core) {
          core.style.transform = 'translate(-50%, -50%) scale(1.4)';
          core.style.boxShadow = '0 6px 20px hsla(210, 100%, 25%, 0.5)';
        }
        marker.togglePopup();
      });

      el.addEventListener('mouseleave', () => {
        const core = el.querySelector('.marker-core') as HTMLElement;
        if (core) {
          core.style.transform = 'translate(-50%, -50%) scale(1)';
          core.style.boxShadow = '0 4px 12px hsla(210, 100%, 25%, 0.4)';
        }
        if (marker.getPopup()?.isOpen()) {
          marker.togglePopup();
        }
      });

      markersRef.current.push(marker);
    });
  }, [data, isLoaded, maxValue, onProvinceSelect]);

  useEffect(() => {
    if (!map.current || !isLoaded || !selectedProvince) return;

    const coords = provinceCoordinates[selectedProvince.toUpperCase()];
    if (coords) {
      map.current.flyTo({
        center: coords.coordinates,
        zoom: coords.zoom,
        duration: 1500,
        essential: true
      });
      setCurrentProvince(selectedProvince);

      markersRef.current.forEach(marker => {
        const el = marker.getElement();
        const core = el.querySelector('.marker-core') as HTMLElement;
        const lngLat = marker.getLngLat();
        const isSelected = 
          Math.abs(lngLat.lng - coords.coordinates[0]) < 0.01 &&
          Math.abs(lngLat.lat - coords.coordinates[1]) < 0.01;
        
        if (core) {
          if (isSelected) {
            core.style.background = 'linear-gradient(135deg, hsl(339, 90%, 51%), hsl(339, 80%, 60%))';
            core.style.transform = 'translate(-50%, -50%) scale(1.6)';
            marker.togglePopup();
          } else {
            core.style.background = 'linear-gradient(135deg, hsl(210, 100%, 35%), hsl(199, 89%, 48%))';
            core.style.transform = 'translate(-50%, -50%) scale(1)';
          }
        }
      });
    }
  }, [selectedProvince, isLoaded]);

  const handleResetView = () => {
    map.current?.flyTo({
      center: italyCenter,
      zoom: italyDefaultZoom,
      duration: 1000
    });
    setCurrentProvince(null);
    onProvinceSelect?.(null);
  };

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none rounded-xl" />
      
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Mappa Interattiva</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {currentProvince 
                ? `Visualizzando: ${currentProvince}` 
                : 'Clicca su una provincia per navigare'
              }
            </p>
          </div>
          
          {currentProvince && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleResetView}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
            >
              <Compass className="h-4 w-4" />
              Vista Italia
            </motion.button>
          )}
        </div>

        <div className="relative rounded-xl overflow-hidden border border-border">
          <div 
            ref={mapContainer} 
            className="w-full h-[500px]"
          />
          
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

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, hsl(210, 100%, 35%), hsl(199, 89%, 48%))' }} />
              <span>Provincia</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(339, 90%, 51%)' }} />
              <span>Selezionata</span>
            </div>
          </div>
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Dimensione = volume dati
          </span>
        </div>
      </div>

      <style>{`
        @keyframes ringPulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        .province-popup .maplibregl-popup-content {
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          border: 1px solid hsl(var(--border));
          padding: 0;
        }
        .province-popup .maplibregl-popup-tip {
          border-top-color: white;
        }
        .maplibregl-ctrl-group {
          border-radius: 8px !important;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08) !important;
          border: 1px solid hsl(var(--border)) !important;
        }
        .maplibregl-ctrl-group button {
          width: 36px !important;
          height: 36px !important;
        }
      `}</style>
    </div>
  );
}