import { cn } from "@/lib/utils";

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
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={cn(
            "relative px-1 py-3 text-base font-medium transition-colors duration-300",
            "hover:text-apple-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2",
            activeTab === tab.key
              ? "text-apple-blue"
              : "text-muted-foreground"
          )}
        >
          {tab.label}
          <span
            className={cn(
              "absolute bottom-0 left-0 right-0 h-0.5 bg-apple-blue transition-transform duration-300 origin-left",
              activeTab === tab.key ? "scale-x-100" : "scale-x-0"
            )}
          />
        </button>
      ))}
    </nav>
  );
}
