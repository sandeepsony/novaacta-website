import { AreaChart, Area, ResponsiveContainer, BarChart, Bar } from "recharts";

const areaData = Array.from({ length: 30 }, (_, i) => ({
  value: 20 + Math.sin(i * 0.5) * 15 + Math.random() * 10 + i * 1.5,
}));

const barData = Array.from({ length: 20 }, (_, i) => ({
  value: 10 + Math.random() * 40 + (i > 14 ? 20 : 0),
}));

export const MiniAreaChart = () => (
  <div className="h-24 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={areaData}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(38, 80%, 55%)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="hsl(38, 80%, 55%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke="hsl(38, 80%, 55%)"
          strokeWidth={1.5}
          fill="url(#areaGrad)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const MiniBarChart = () => (
  <div className="h-24 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={barData}>
        <Bar
          dataKey="value"
          fill="hsl(38, 80%, 55%)"
          opacity={0.4}
          radius={[1, 1, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
