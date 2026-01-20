import { amministrazioni, Amministrazione } from '@/data/barChartData';

interface LegendProps {
  selectedAmministrazioni: string[];
  onToggle: (id: string) => void;
}

export function Legend({ selectedAmministrazioni, onToggle }: LegendProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Seleziona Amministrazioni
      </h3>
      <div className="flex flex-wrap gap-3">
        {amministrazioni.map((amm) => {
          const isSelected = selectedAmministrazioni.includes(amm.id);
          return (
            <button
              key={amm.id}
              onClick={() => onToggle(amm.id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-200 border-2
                ${isSelected 
                  ? 'opacity-100 scale-100 shadow-md' 
                  : 'opacity-50 scale-95 border-transparent hover:opacity-75'
                }
              `}
              style={{
                backgroundColor: isSelected ? amm.color : 'transparent',
                borderColor: amm.color,
                color: isSelected ? '#ffffff' : amm.color,
              }}
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: amm.color }}
              />
              <span className="truncate max-w-48">{amm.label}</span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Clicca per selezionare/deselezionare le amministrazioni.
      </p>
    </div>
  );
}
