import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoPopup } from "./InfoPopup";

export const MapLegend = () => {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          Legenda Mappa
          <InfoPopup
            title="Come leggere la mappa"
            content={
              <div className="space-y-2">
                <p>
                  La mappa mostra la <strong>distribuzione geografica</strong> dei dipendenti pubblici sul territorio italiano.
                </p>
                <p>
                  <strong>Dimensione dei cerchi:</strong> proporzionale al numero di dipendenti nella zona.
                </p>
                <p>
                  <strong>Colori:</strong> distinguono il tipo di ente territoriale.
                </p>
              </div>
            }
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-full" style={{ backgroundColor: "hsl(var(--navy))" }} />
          <span className="text-sm">Capoluogo Regionale</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: "hsl(var(--amber))" }} />
          <span className="text-sm">Provincia (con dati)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-muted-foreground/40" />
          <span className="text-sm">Provincia (no dati)</span>
        </div>
        <div className="mt-4 flex flex-col items-center gap-3 border-t border-border pt-4">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "hsl(var(--navy))", opacity: 0.6 }} />
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: "hsl(var(--navy))", opacity: 0.7 }} />
            <div className="h-5 w-5 rounded-full" style={{ backgroundColor: "hsl(var(--navy))", opacity: 0.8 }} />
            <div className="h-6 w-6 rounded-full" style={{ backgroundColor: "hsl(var(--navy))" }} />
          </div>
          <span className="text-sm text-muted-foreground">Dimensione = volume dati</span>
        </div>
      </CardContent>
    </Card>
  );
};
