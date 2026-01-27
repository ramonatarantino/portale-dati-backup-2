import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Determine active page
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    if (path.startsWith('#')) return false; // Skip anchor links for now
    return currentPath.startsWith(path);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.intersectionRatio > 0.1);
      },
      {
        threshold: [0, 0.1, 0.2],
        rootMargin: '-80px 0px 0px 0px',
      }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  const headerColorClasses = isHeroVisible
    ? 'bg-white/90 text-primary border-white/60 shadow-sm'
    : 'bg-primary/95 text-white border-primary-dark/50 shadow-lg';

  const iconColor = isHeroVisible ? 'text-primary/60' : 'text-white/70';

  const getNavLinkClasses = (path: string) => {
    const active = isActive(path);
    if (isHeroVisible) {
      return `relative text-sm font-medium transition-colors ${active ? 'text-primary' : 'text-primary/70 hover:text-primary'}`;
    }
    return `relative text-sm font-medium transition-colors ${active ? 'text-white' : 'text-white/80 hover:text-white'}`;
  };

  const activeIndicatorClass = isHeroVisible ? 'bg-primary' : 'bg-white';

  const logoSrc = isHeroVisible ? '/opendagblu.png' : '/opendagbianco.png';

  const desktopSearchClasses = isHeroVisible
    ? 'pl-10 pr-4 h-11 bg-secondary/50 border-border focus:border-primary focus:ring-primary/20'
    : 'pl-10 pr-4 h-11 bg-white/10 text-white placeholder:text-white/70 border-white/30 focus:border-white focus:ring-white/30';

  const mobileSearchClasses = isHeroVisible
    ? 'pl-10 pr-4 bg-secondary/50'
    : 'pl-10 pr-4 bg-white/10 text-white placeholder:text-white/70';

  const mobileLinkClasses = (path: string) => {
    const active = isActive(path);
    if (isHeroVisible) {
      return `relative py-2 text-sm font-medium transition-colors ${active ? 'text-primary' : 'text-primary/70 hover:text-primary'}`;
    }
    return `relative py-2 text-sm font-medium transition-colors ${active ? 'text-white' : 'text-white/80 hover:text-white'}`;
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-500 ${headerColorClasses}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0 h-full">
            <img
              src={logoSrc}
              alt="OpenDAG"
              className="h-full w-auto object-contain"
            />
          </a>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${iconColor}`} />
              <Input
                type="search"
                placeholder="Cerca dati, statistiche, report..."
                className={desktopSearchClasses}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className={getNavLinkClasses('/')}>
              {isActive('/') && (
                <div className={`absolute -top-1 left-0 right-0 h-0.5 rounded-full ${activeIndicatorClass}`}></div>
              )}
              Home
            </a>

            <a href="#cosa-e-opendag" className={getNavLinkClasses('#cosa-e-opendag')}>
              {isActive('#cosa-e-opendag') && (
                <div className={`absolute -top-1 left-0 right-0 h-0.5 rounded-full ${activeIndicatorClass}`}></div>
              )}
              Cos'è OpenDag
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`${getNavLinkClasses('/dashboard')} hover:bg-transparent`}>
                  {isActive('/dashboard') && (
                    <div className={`absolute -top-1 left-0 right-0 h-0.5 rounded-full ${activeIndicatorClass}`}></div>
                  )}
                  Open Data
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuItem asChild>
                  <a href="/dashboard" className="flex items-center w-full px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                    Dati stipendiali NoiPa
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/dashboard" className="flex items-center w-full px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                    Spesa Pensioni MEF
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/dashboard" className="flex items-center w-full px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                    Numeri DAG
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <a href="#news" className={isHeroVisible ? 'text-sm font-medium text-primary/70 hover:text-primary transition-colors' : 'text-sm font-medium text-white/80 hover:text-white transition-colors'}>
              News
            </a>
          
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors ${isHeroVisible ? 'text-primary hover:text-primary/80' : 'text-white hover:text-white/80'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="relative mb-4">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${iconColor}`} />
              <Input
                type="search"
                placeholder="Cerca dati, statistiche..."
                className={mobileSearchClasses}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <nav className="flex flex-col gap-3">
              <a href="#cosa-e-opendag" className={mobileLinkClasses('#cosa-e-opendag')}>
                {isActive('#cosa-e-opendag') && (
                  <div className={`absolute -top-1 left-0 right-0 h-0.5 rounded-full ${activeIndicatorClass}`}></div>
                )}
                Cos'è OpenDag
              </a>
              <a href="/dashboard" className={mobileLinkClasses('/dashboard')}>
                {isActive('/dashboard') && (
                  <div className={`absolute -top-1 left-0 right-0 h-0.5 rounded-full ${activeIndicatorClass}`}></div>
                )}
                Open Data
              </a>
              <a href="/" className={mobileLinkClasses('/')}>
                {isActive('/') && (
                  <div className={`absolute -top-1 left-0 right-0 h-0.5 rounded-full ${activeIndicatorClass}`}></div>
                )}
                Home
              </a>
              <a href="#news" className={isHeroVisible ? 'py-2 text-sm font-medium text-primary/70 hover:text-primary transition-colors' : 'py-2 text-sm font-medium text-white/80 hover:text-white transition-colors'}>
                News
              </a>
              <Button
                variant="default"
                size="sm"
                className={`w-full mt-2 ${isHeroVisible ? 'bg-primary hover:bg-primary-dark' : 'bg-white text-primary hover:bg-white/90'}`}
              >
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