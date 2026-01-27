import { MapPin } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card shadow-card">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Pubblica Amministrazione</h1>
            <p className="text-xs text-muted-foreground">Dashboard Dipendenti Pubblici</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            1/2025
          </span>
        </div>
      </div>
    </header>
  );
};
