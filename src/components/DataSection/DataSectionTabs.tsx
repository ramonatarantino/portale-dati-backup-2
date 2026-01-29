import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Tab {
  key: string;
  label: string;
}

interface DataSectionTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
}

export function DataSectionTabs({ tabs, activeTab, onTabChange }: DataSectionTabsProps) {
  return (
    <nav className="flex justify-center gap-8 mb-16">
      {tabs.map((tab) => (
        <div key={tab.key} className="relative">
          <Button
            variant={activeTab === tab.key ? "default" : "secondary"}
            onClick={() => onTabChange(tab.key)}
            className={cn(
              "relative px-6 py-3 text-base font-medium transition-all duration-300",
              activeTab === tab.key
                ? "text-white bg-primary-foreground/20 hover:bg-primary-foreground/30"
                : "text-white/80 hover:text-white bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
            )}
          >
            {tab.label}
          </Button>
          <span
            className={cn(
              "absolute bottom-0 left-0 right-0 h-0.5 bg-apple-blue transition-transform duration-300 origin-left",
              activeTab === tab.key ? "scale-x-100" : "scale-x-0"
            )}
          />
        </div>
      ))}
    </nav>
  );
}
