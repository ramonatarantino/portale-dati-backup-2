import { useInView } from "@/hooks/useInView";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

interface MinimalBarChartProps {
  title: string;
  data: ChartDataItem[];
}

export function MinimalBarChart({ title, data }: MinimalBarChartProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  // Parse fill colors - handle CSS variable references
  const getBarColor = (fill: string, index: number) => {
    if (fill.includes("apple-blue")) {
      return "hsl(210 100% 40%)";
    }
    if (fill.includes("apple-gold")) {
      return "hsl(43 74% 38%)";
    }
    return index === 0 ? "hsl(210 100% 40%)" : "hsl(43 74% 38%)";
  };

  return (
    <div
      ref={ref}
      className={`flex flex-col h-full transition-all duration-700 delay-200 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <h4 className="text-sm font-medium text-yellow-400 mb-6 uppercase tracking-wider">
        {title}
      </h4>
      
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            barCategoryGap="30%"
          >
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(0 0% 80%)" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 13, fill: "hsl(0 0% 90%)" }}
              width={80}
            />
            <Bar
              dataKey="value"
              radius={[0, 4, 4, 0]}
              animationBegin={isInView ? 0 : 9999}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.fill, index)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-4 pt-4 border-t border-white/20">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: getBarColor(item.fill, index) }}
            />
            <span className="text-sm text-gray-200">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
