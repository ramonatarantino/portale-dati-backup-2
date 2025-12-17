import { BarChart3 } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-2xl p-2">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">NoiPA Analytics</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#dataset" className="apple-nav-link">Dataset</a>
            <a href="#visualizations" className="apple-nav-link">Visualizzazioni</a>
            <a href="#insights" className="apple-nav-link">Insights</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
