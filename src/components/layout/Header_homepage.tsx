import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0">
            <div className="h-14 md:h-16 lg:h-18 flex items-center">
              <img
                src="/favicon.ico"
                alt="logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </a>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cerca dati, statistiche, report..."
                className="pl-10 pr-4 h-11 bg-secondary/50 border-border focus:border-primary focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Open Data
            </a>
            <a href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Numeri DAG
            </a>
            <a href="#news" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              News
            </a>
            <Button variant="default" size="sm" className="bg-primary hover:bg-primary-dark shadow-primary">
              Accedi
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cerca dati, statistiche..."
                className="pl-10 pr-4 bg-secondary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <nav className="flex flex-col gap-3">
              <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2">
                Home
              </a>
              <a href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2">
                Open Data
              </a>
              <a href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2">
                Numeri DAG
              </a>
              <a href="#news" className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2">
                News
              </a>
              <Button variant="default" size="sm" className="w-full bg-primary hover:bg-primary-dark mt-2">
                Accedi
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;