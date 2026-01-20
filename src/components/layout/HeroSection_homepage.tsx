import { Search, Database, Users, FileText, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";

const searchableData = [
  { type: "dataset", title: "Stipendi medi per settore", category: "Open Data" },
  { type: "dataset", title: "Distribuzione geografica dipendenti", category: "Open Data" },
  { type: "dataset", title: "Contratti per tipologia", category: "Open Data" },
  { type: "statistica", title: "Numero totale amministrati", category: "Numeri DAG" },
  { type: "statistica", title: "Erogazioni mensili", category: "Numeri DAG" },
  { type: "report", title: "Report trimestrale Q4 2024", category: "Report" },
  { type: "report", title: "Analisi spesa pubblica 2024", category: "Report" },
  { type: "dataset", title: "Età media dipendenti PA", category: "Open Data" },
  { type: "statistica", title: "Puntualità pagamenti", category: "Numeri DAG" },
  { type: "dataset", title: "Turnover personale", category: "Open Data" },
];

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return searchableData.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const stats = [
    { icon: Database, label: "Dataset Disponibili", value: "150+" },
    { icon: Users, label: "Amministrati", value: "2.4M+" },
    { icon: FileText, label: "Report Mensili", value: "1.200+" },
  ];

  const handleSearchClick = (result: typeof searchableData[0]) => {
    console.log("Navigating to:", result);
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  return (
    <section className="relative hero-gradient py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full mb-6 animate-fade-in">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-gold-light text-sm font-medium">Portale della Trasparenza</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
            Patrimonio Informativo{" "}
            <span className="gold-text">DAG</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up stagger-1">
            Non accumuliamo dati, creiamo conoscenza condividendo informazioni.
            Scopri i dati della Pubblica Amministrazione.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 animate-slide-up stagger-2 relative">
            <div className="flex gap-2 p-2 bg-card/95 backdrop-blur rounded-xl shadow-lg">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cerca dataset, statistiche, report..."
                  className="pl-12 pr-10 h-12 border-0 bg-transparent focus-visible:ring-0 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button 
                size="lg" 
                className="h-12 px-8 bg-primary hover:bg-primary-dark shadow-primary transition-all hover:shadow-lg"
              >
                Cerca
              </Button>
            </div>

            {/* Search Results Dropdown */}
            {isSearchFocused && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-xl border border-border overflow-hidden z-50">
                {searchResults.length > 0 ? (
                  <ul className="divide-y divide-border">
                    {searchResults.map((result, index) => (
                      <li
                        key={index}
                        className="px-4 py-3 hover:bg-secondary/50 cursor-pointer transition-colors"
                        onClick={() => handleSearchClick(result)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            {result.type === "dataset" && <Database className="h-4 w-4 text-primary" />}
                            {result.type === "statistica" && <Users className="h-4 w-4 text-gold" />}
                            {result.type === "report" && <FileText className="h-4 w-4 text-primary" />}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-foreground">{result.title}</p>
                            <p className="text-xs text-muted-foreground">{result.category}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    <p>Nessun risultato per "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex items-center justify-center gap-4 p-4 bg-card/10 backdrop-blur-sm rounded-xl border border-primary-foreground/10 animate-scale-in stagger-${index + 3}`}
              >
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-gold-light" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-primary-foreground">{stat.value}</p>
                  <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;