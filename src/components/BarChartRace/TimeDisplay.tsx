interface TimeDisplayProps {
  month: string;
  year: number;
}

const monthAbbreviations: Record<string, string> = {
  'Gennaio': 'Gen',
  'Febbraio': 'Feb',
  'Marzo': 'Mar',
  'Aprile': 'Apr',
  'Maggio': 'Mag',
  'Giugno': 'Giu',
  'Luglio': 'Lug',
  'Agosto': 'Ago',
  'Settembre': 'Set',
  'Ottobre': 'Ott',
  'Novembre': 'Nov',
  'Dicembre': 'Dic',
};

export function TimeDisplay({ month, year }: TimeDisplayProps) {
  const abbrev = monthAbbreviations[month] || month.slice(0, 3);
  
  return (
    <div className="absolute bottom-4 right-4 pointer-events-none select-none z-10">
      <div 
        className="text-[6rem] md:text-[10rem] lg:text-[12rem] font-bold leading-none tracking-tight"
        style={{ 
          color: 'hsl(var(--muted-foreground) / 0.15)',
        }}
      >
        {abbrev}-{year}
      </div>
    </div>
  );
}
