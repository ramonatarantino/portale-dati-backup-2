import { motion } from 'framer-motion';
import { Users, Key, TrendingUp, Euro, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DatasetType, DATASETS, DatasetInfo } from '@/types/data';

interface DatasetTabsProps {
  activeDataset: DatasetType;
  onDatasetChange: (dataset: DatasetType) => void;
  datasets?: DatasetInfo[];
}

const ICONS = {
  Users,
  Key,
  TrendingUp,
  Euro,
  Briefcase
};

export function DatasetTabs({ activeDataset, onDatasetChange, datasets = DATASETS }: DatasetTabsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 p-1.5 bg-secondary/50 rounded-2xl overflow-x-auto">
        {datasets.map((dataset) => {
          const IconComponent = ICONS[dataset.icon as keyof typeof ICONS];
          const isActive = activeDataset === dataset.id;
          
          return (
            <motion.button
              key={dataset.id}
              onClick={() => onDatasetChange(dataset.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap min-w-fit",
                isActive 
                  ? "text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">{dataset.name}</span>
                <span className="sm:hidden">{dataset.name.split(' ')[0]}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Description */}
      <motion.p
        key={activeDataset}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 text-sm text-muted-foreground text-center"
      >
        {datasets.find(d => d.id === activeDataset)?.description}
      </motion.p>
    </div>
  );
}