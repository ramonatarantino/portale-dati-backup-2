import { useState, useEffect } from "react";
import { DataSectionTabs } from "./DataSectionTabs";
import { ContextColumn } from "./ContextColumn";
import { CountUpNumber } from "./CountUpNumber";
import { MinimalBarChart } from "./MinimalBarChart";

interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

interface DataSectionItem {
  id: string;
  tab_key: string;
  tab_label: string;
  title: string;
  question: string;
  description: string | null;
  key_number: number;
  key_unit: string;
  key_description: string | null;
  key_subtitle: string | null;
  chart_title: string | null;
  chart_data: ChartDataItem[];
  display_order: number;
}

// Mock data to replace Supabase
const mockDataSections: DataSectionItem[] = [
  {
    id: "1",
    tab_key: "personale",
    tab_label: "Personale PA",
    title: "Il Personale della Pubblica Amministrazione",
    question: "Quanti dipendenti lavorano nella PA?",
    description: "La Pubblica Amministrazione italiana conta milioni di dipendenti distribuiti in vari settori e regioni.",
    key_number: 3240000,
    key_unit: "",
    key_description: "dipendenti attivi",
    key_subtitle: "al 2024",
    chart_title: "Distribuzione per settore",
    chart_data: [
      { name: "Sanità", value: 650000, fill: "#3b82f6" },
      { name: "Istruzione", value: 850000, fill: "#10b981" },
      { name: "Amministrazione", value: 720000, fill: "#f59e0b" },
      { name: "Sicurezza", value: 480000, fill: "#ef4444" },
      { name: "Giustizia", value: 540000, fill: "#8b5cf6" },
    ],
    display_order: 1,
  },
  {
    id: "2",
    tab_key: "stipendi",
    tab_label: "Stipendi",
    title: "Gli Stipendi dei Dipendenti Pubblici",
    question: "Quanto guadagnano i dipendenti PA?",
    description: "Analisi degli stipendi medi per categoria e regione nella Pubblica Amministrazione.",
    key_number: 28500,
    key_unit: "€",
    key_description: "stipendio medio annuo",
    key_subtitle: "lordi al 2024",
    chart_title: "Stipendio medio per categoria",
    chart_data: [
      { name: "Dirigenti", value: 65000, fill: "#3b82f6" },
      { name: "Quadri", value: 42000, fill: "#10b981" },
      { name: "Impiegati", value: 28000, fill: "#f59e0b" },
      { name: "Operai", value: 22000, fill: "#ef4444" },
    ],
    display_order: 2,
  },
  {
    id: "3",
    tab_key: "pensioni",
    tab_label: "Pensioni",
    title: "Le Pensioni della PA",
    question: "Quanto costa il sistema pensionistico?",
    description: "Il sistema pensionistico della Pubblica Amministrazione rappresenta una parte significativa della spesa pubblica.",
    key_number: 185000000000,
    key_unit: "€",
    key_description: "spesa annua",
    key_subtitle: "per pensioni PA",
    chart_title: "Composizione spesa pensioni",
    chart_data: [
      { name: "Pensioni dirette", value: 120000000000, fill: "#3b82f6" },
      { name: "Pensioni indirette", value: 45000000000, fill: "#10b981" },
      { name: "Indennizzi", value: 20000000000, fill: "#f59e0b" },
    ],
    display_order: 3,
  },
];

export function DataSection() {
  const [sections, setSections] = useState<DataSectionItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSections(mockDataSections);
      setActiveTab(mockDataSections[0].tab_key);
      setIsLoading(false);
    };

    fetchSections();
  }, []);

  const handleTabChange = (tabKey: string) => {
    if (tabKey === activeTab) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tabKey);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const activeSection = sections.find((s) => s.tab_key === activeTab);
  const tabs = sections.map((s) => ({ key: s.tab_key, label: s.tab_label }));

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-apple-blue border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (!activeSection) {
    return null;
  }

  return (
    <section className="min-h-screen bg-background py-24 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <DataSectionTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Content Grid */}
        <div
          className={`grid grid-cols-3 gap-16 transition-all duration-300 ${
            isTransitioning
              ? "opacity-0 translate-x-4"
              : "opacity-100 translate-x-0"
          }`}
          key={activeTab}
        >
          {/* Column 1: Context */}
          <ContextColumn
            title={activeSection.title}
            question={activeSection.question}
            description={activeSection.description || undefined}
          />

          {/* Column 2: Key Number */}
          <CountUpNumber
            value={activeSection.key_number}
            unit={activeSection.key_unit}
            description={activeSection.key_description || ""}
            subtitle={activeSection.key_subtitle || undefined}
          />

          {/* Column 3: Chart */}
          <MinimalBarChart
            title={activeSection.chart_title || "Confronto"}
            data={activeSection.chart_data}
          />
        </div>
      </div>
    </section>
  );
}
