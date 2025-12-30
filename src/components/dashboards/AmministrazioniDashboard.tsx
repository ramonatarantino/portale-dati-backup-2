import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Interfaccia per i dati grezzi
interface AmministrazioniRecord {
  comune_della_sede: string;
  amministrazione: string;
  eta_min: number;
  eta_max: number | null;
  sesso: 'M' | 'F';
  numero_unita_organizzative: number;
  numero_rapporti_lavoro: number;
  regione?: string;
}

// Dati aggregati per comune
interface ComuneData {
  comune: string;
  regione: string;
  amministrazione: string;
  totaleRapporti: number;
  etaMedia: number;
  percFemminile: number;
}

interface AmministrazioniDashboardProps {
  data: AmministrazioniRecord[];
  selectedYear: number | null;
  selectedMonth: number | null;
}

// Colori per amministrazioni
const ADMIN_COLORS: Record<string, string> = {
  'MINISTERO DELL\'ISTRUZIONE E DEL MERITO': '#1e40af', // Blu scuro
  'MINISTERO DELL\'INTERNO': '#f59e0b', // Oro
  'AGENZIA DELLE ENTRATE': '#dc2626', // Rosso
  'INPS': '#16a34a', // Verde
  'MINISTERO DELLA GIUSTIZIA': '#7c3aed', // Viola
  // Aggiungi altri colori se necessario
};

const getAdminColor = (admin: string) => ADMIN_COLORS[admin] || '#6b7280';

export function AmministrazioniDashboard({ data, selectedYear, selectedMonth }: AmministrazioniDashboardProps) {
  const [selectedRegione, setSelectedRegione] = useState<string>('all');
  const [selectedAdmin, setSelectedAdmin] = useState<string>('all');
  const [selectedComune, setSelectedComune] = useState<ComuneData | null>(null);

  // Aggrega dati per comune
  const aggregatedData = useMemo(() => {
    const comuneMap = new Map<string, ComuneData>();

    data.forEach(record => {
      const key = record.comune_della_sede;
      if (!comuneMap.has(key)) {
        comuneMap.set(key, {
          comune: record.comune_della_sede,
          regione: record.regione || 'Sconosciuta',
          amministrazione: record.amministrazione,
          totaleRapporti: 0,
          etaMedia: 0,
          percFemminile: 0,
        });
      }

      const comune = comuneMap.get(key)!;
      comune.totaleRapporti += record.numero_rapporti_lavoro;

      // Calcola età media (usa il centro della fascia)
      const etaCentro = record.eta_max ? (record.eta_min + record.eta_max) / 2 : record.eta_min + 5; // Per 65+
      comune.etaMedia = (comune.etaMedia * (comune.totaleRapporti - record.numero_rapporti_lavoro) + etaCentro * record.numero_rapporti_lavoro) / comune.totaleRapporti;

      // % femminile
      if (record.sesso === 'F') {
        comune.percFemminile += record.numero_rapporti_lavoro;
      }
    });

    // Calcola % femminile finale
    comuneMap.forEach(comune => {
      comune.percFemminile = (comune.percFemminile / comune.totaleRapporti) * 100;
    });

    return Array.from(comuneMap.values());
  }, [data]);

  // Filtra dati
  const filteredData = useMemo(() => {
    return aggregatedData.filter(comune => {
      if (selectedRegione !== 'all' && comune.regione !== selectedRegione) return false;
      if (selectedAdmin !== 'all' && comune.amministrazione !== selectedAdmin) return false;
      return true;
    });
  }, [aggregatedData, selectedRegione, selectedAdmin]);

  // Opzioni per filtri
  const regioni = useMemo(() => [...new Set(aggregatedData.map(d => d.regione))], [aggregatedData]);
  const amministrazioni = useMemo(() => [...new Set(aggregatedData.map(d => d.amministrazione))], [aggregatedData]);

  // Tooltip personalizzato
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.comune}</p>
          <p>Regione: {data.regione}</p>
          <p>Amministrazione: {data.amministrazione}</p>
          <p>Rapporti di lavoro: {data.totaleRapporti}</p>
          <p>Età media: {data.etaMedia.toFixed(1)} anni</p>
          <p>% Femminile: {data.percFemminile.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  const handleBubbleClick = (data: ComuneData) => {
    setSelectedComune(data);
  };

  const closeDrillDown = () => {
    setSelectedComune(null);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card>
          <CardHeader>
            <CardTitle>Filtri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Regione</label>
              <Select value={selectedRegione} onValueChange={setSelectedRegione}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona regione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte le regioni</SelectItem>
                  {regioni.map(regione => (
                    <SelectItem key={regione} value={regione}>{regione}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Amministrazione</label>
              <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona amministrazione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte le amministrazioni</SelectItem>
                  {amministrazioni.map(admin => (
                    <SelectItem key={admin} value={admin}>{admin}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">{filteredData.length}</p>
                <p className="text-sm text-muted-foreground">Comuni</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{filteredData.reduce((sum, d) => sum + d.totaleRapporti, 0).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Totale rapporti</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Organigramma Occupazionale</CardTitle>
            <p className="text-sm text-muted-foreground">
              Bubble chart: dimensione = rapporti di lavoro, X = età media, Y = % femminile, colore = amministrazione
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={600}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="etaMedia"
                  name="Età Media"
                  domain={['dataMin - 5', 'dataMax + 5']}
                  label={{ value: 'Età Media (anni)', position: 'insideBottom', offset: -10 }}
                />
                <YAxis
                  type="number"
                  dataKey="percFemminile"
                  name="% Femminile"
                  domain={[0, 100]}
                  label={{ value: '% Femminile', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter data={filteredData} fill="#8884d8" onClick={handleBubbleClick}>
                  {filteredData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getAdminColor(entry.amministrazione)}
                      r={Math.max(3, Math.min(20, Math.sqrt(entry.totaleRapporti) / 2))}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Drill-down per fasce d'età */}
      {selectedComune && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Drill-down: {selectedComune.comune}</CardTitle>
              <button onClick={closeDrillDown} className="text-sm text-muted-foreground hover:text-foreground">Chiudi</button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-2xl font-bold">{selectedComune.totaleRapporti}</p>
                    <p className="text-sm text-muted-foreground">Totale rapporti</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{selectedComune.etaMedia.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">Età media</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{selectedComune.percFemminile.toFixed(1)}%</p>
                    <p className="text-sm text-muted-foreground">% Femminile</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{selectedComune.amministrazione}</p>
                    <p className="text-sm text-muted-foreground">Amministrazione</p>
                  </div>
                </div>
                {/* Qui puoi aggiungere un grafico per fasce d'età */}
                <p className="text-sm text-muted-foreground">Dettagli per fasce d'età disponibili nei dati grezzi.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Legenda colori */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-2"
      >
        {amministrazioni.map(admin => (
          <Badge key={admin} variant="outline" style={{ borderColor: getAdminColor(admin) }}>
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: getAdminColor(admin) }}
            />
            {admin}
          </Badge>
        ))}
      </motion.div>
    </div>
  );
}