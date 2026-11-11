import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, ResponsiveContainer, Tooltip, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Cell, RadialBarChart, RadialBar,
} from "recharts";

/* ── Types ────────────────────────────────────────── */

type ChartType = "line" | "area" | "bar" | "scatter" | "step" | "gauge";

interface SensorData {
  name: string;
  data: number[];
  chartType: ChartType;
}

interface CaseStudy {
  id: string;
  shortTitle: string;
  title: string;
  headline: string;
  color: string;
  colorSecondary: string;
  stats: { value: string; label: string }[];
  disciplines: string[];
  status: string;
  riskBefore: number;
  riskAfter: number;
  sensors: SensorData[];
  timelineLabel: string;
  heroChart: "radar" | "waterfall" | "radialBar" | "distribution" | "heatmap" | "comparison" | "gauge";
}

/* ── Helpers ──────────────────────────────────────── */

const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const generateSensorData = (seed: number, baseline: number, variance: number, anomalyAt?: number) => {
  const rng = seededRandom(seed);
  return Array.from({ length: 24 }, (_, i) => {
    let val = baseline + (rng() - 0.5) * variance;
    if (anomalyAt !== undefined && Math.abs(i - anomalyAt) <= 1) {
      val += variance * (1.5 + rng());
    }
    return Math.round(val * 10) / 10;
  });
};

const generateTimeline = (seed: number, riskStart: number, riskEnd: number) => {
  const rng = seededRandom(seed + 100);
  const points = 30;
  return Array.from({ length: points }, (_, i) => {
    const progress = i / (points - 1);
    const base = riskStart + (riskEnd - riskStart) * Math.pow(progress, 0.6);
    const noise = (rng() - 0.5) * 8;
    return {
      day: `D${i + 1}`,
      risk: Math.max(0, Math.min(100, Math.round((base + noise) * 100) / 100)),
      threshold: 70,
    };
  });
};

/* ── Case data ────────────────────────────────────── */

const caseStudies: CaseStudy[] = [
  {
    id: "offshore", shortTitle: "Offshore", title: "Offshore Platform",
    headline: "$400M platform losing 6% output",
    color: "hsl(35, 100%, 50%)", colorSecondary: "hsl(25, 90%, 40%)",
    stats: [
      { value: "$38M", label: "Failure cost prevented" },
      { value: "6.2%", label: "Output recovered" },
      { value: "26mo", label: "Early warning" },
    ],
    disciplines: ["Structural Integrity", "Corrosion Engineering", "Subsea Systems"],
    status: "RESOLVED", riskBefore: 0.87, riskAfter: 0.12,
    sensors: [
      { name: "Vibration (mm/s)", data: generateSensorData(1, 4.2, 2.5, 16), chartType: "area" },
      { name: "Corrosion Rate (mpy)", data: generateSensorData(2, 12, 8, 18), chartType: "bar" },
      { name: "Strain (µε)", data: generateSensorData(3, 340, 120, 15), chartType: "line" },
      { name: "Pressure (bar)", data: generateSensorData(4, 85, 15), chartType: "step" },
      { name: "Temperature (°C)", data: generateSensorData(5, 72, 18, 17), chartType: "scatter" },
      { name: "Fatigue Cycles (k)", data: generateSensorData(6, 1200, 300), chartType: "gauge" },
    ],
    timelineLabel: "Structural Risk Index",
    heroChart: "radar",
  },
  {
    id: "bridge", shortTitle: "Bridge", title: "Bridge Deflection",
    headline: "12mm overnight deflection explained",
    color: "hsl(200, 80%, 55%)", colorSecondary: "hsl(210, 70%, 40%)",
    stats: [
      { value: "$12M", label: "Saved vs replacement" },
      { value: "12mm", label: "Deflection explained" },
      { value: "15yr", label: "Hidden fatigue found" },
    ],
    disciplines: ["Structural Engineering", "Materials Science", "Thermal Analysis"],
    status: "RESOLVED", riskBefore: 0.72, riskAfter: 0.08,
    sensors: [
      { name: "Deflection (mm)", data: generateSensorData(10, 8, 5, 12), chartType: "area" },
      { name: "Temperature (°C)", data: generateSensorData(11, 15, 22), chartType: "line" },
      { name: "Strain (µε)", data: generateSensorData(12, 280, 90, 14), chartType: "bar" },
      { name: "Load (kN)", data: generateSensorData(13, 450, 120), chartType: "step" },
      { name: "Wind Speed (m/s)", data: generateSensorData(14, 12, 15), chartType: "scatter" },
      { name: "Tilt Angle (°)", data: generateSensorData(15, 0.3, 0.2, 13), chartType: "gauge" },
    ],
    timelineLabel: "Fatigue Risk Score",
    heroChart: "waterfall",
  },
  {
    id: "windfarm", shortTitle: "Wind Farm", title: "Wind Farm Capacity",
    headline: "11% capacity loss — zero alarms",
    color: "hsl(145, 65%, 45%)", colorSecondary: "hsl(155, 55%, 35%)",
    stats: [
      { value: "11%", label: "Capacity recovered" },
      { value: "$4.7M", label: "Annual value" },
      { value: "47", label: "Turbines optimized" },
    ],
    disciplines: ["Aerodynamics", "Applied Mathematics", "Fleet Analytics"],
    status: "MONITORING", riskBefore: 0.58, riskAfter: 0.04,
    sensors: [
      { name: "Power Output (kW)", data: generateSensorData(20, 2800, 600), chartType: "area" },
      { name: "Wind Speed (m/s)", data: generateSensorData(21, 11, 6), chartType: "line" },
      { name: "Blade Pitch (°)", data: generateSensorData(22, 12, 5, 8), chartType: "bar" },
      { name: "Rotor RPM", data: generateSensorData(23, 14, 3), chartType: "step" },
      { name: "Yaw Error (°)", data: generateSensorData(24, 3, 4, 10), chartType: "scatter" },
      { name: "Vibration (mm/s)", data: generateSensorData(25, 2.1, 1.5), chartType: "gauge" },
    ],
    timelineLabel: "Efficiency Loss Index",
    heroChart: "radialBar",
  },
  {
    id: "gears", shortTitle: "Gears", title: "Marine Drive Failure",
    headline: "Catastrophic gear failure predicted",
    color: "hsl(0, 70%, 55%)", colorSecondary: "hsl(10, 60%, 40%)",
    stats: [
      { value: "$2.3M", label: "Damage prevented" },
      { value: "12", label: "Vessels protected" },
      { value: "0", label: "Failures since" },
    ],
    disciplines: ["Mechanical Engineering", "Tribology", "Vibration Analysis"],
    status: "RESOLVED", riskBefore: 0.93, riskAfter: 0.05,
    sensors: [
      { name: "Vibration (g)", data: generateSensorData(30, 2.8, 3.5, 19), chartType: "scatter" },
      { name: "Oil Temp (°C)", data: generateSensorData(31, 68, 20, 20), chartType: "area" },
      { name: "Particle Count", data: generateSensorData(32, 45, 60, 18), chartType: "bar" },
      { name: "Torque (kNm)", data: generateSensorData(33, 180, 50), chartType: "line" },
      { name: "RPM", data: generateSensorData(34, 1450, 80), chartType: "step" },
      { name: "Bearing Temp (°C)", data: generateSensorData(35, 55, 15, 19), chartType: "gauge" },
    ],
    timelineLabel: "Gear Failure Probability",
    heroChart: "distribution",
  },
  {
    id: "refinery", shortTitle: "Refinery", title: "Refinery Energy Loss",
    headline: "$2M/year energy bleed found",
    color: "hsl(280, 60%, 55%)", colorSecondary: "hsl(270, 50%, 40%)",
    stats: [
      { value: "$2.1M", label: "Annual savings" },
      { value: "0", label: "Capital required" },
      { value: "2.1MW", label: "Energy recovered" },
    ],
    disciplines: ["Process Engineering", "Thermodynamics", "Control Systems"],
    status: "RESOLVED", riskBefore: 0.45, riskAfter: 0.03,
    sensors: [
      { name: "Steam Flow (t/h)", data: generateSensorData(40, 120, 30), chartType: "area" },
      { name: "Heat Loss (kW)", data: generateSensorData(41, 850, 200, 14), chartType: "bar" },
      { name: "Efficiency (%)", data: generateSensorData(42, 78, 8), chartType: "gauge" },
      { name: "Pressure (bar)", data: generateSensorData(43, 42, 8), chartType: "step" },
      { name: "Exhaust Temp (°C)", data: generateSensorData(44, 310, 45, 16), chartType: "line" },
      { name: "Flow Rate (m³/h)", data: generateSensorData(45, 2400, 300), chartType: "scatter" },
    ],
    timelineLabel: "Energy Loss Index",
    heroChart: "heatmap",
  },
  {
    id: "pipeline", shortTitle: "Pipeline", title: "Pipeline Integrity",
    headline: "0.5mm defect under a river",
    color: "hsl(40, 95%, 50%)", colorSecondary: "hsl(45, 85%, 40%)",
    stats: [
      { value: "$50M+", label: "Disaster averted" },
      { value: "0.5mm", label: "Defect detected" },
      { value: "12m", label: "Precision located" },
    ],
    disciplines: ["Pipeline Engineering", "Digital Twin", "Risk Assessment"],
    status: "RESOLVED", riskBefore: 0.96, riskAfter: 0.02,
    sensors: [
      { name: "Wall Thickness (mm)", data: generateSensorData(50, 8.2, 2.5, 20), chartType: "bar" },
      { name: "Pressure (bar)", data: generateSensorData(51, 65, 12), chartType: "area" },
      { name: "Corrosion (mpy)", data: generateSensorData(52, 6, 8, 21), chartType: "scatter" },
      { name: "Flow Velocity (m/s)", data: generateSensorData(53, 3.2, 1.2), chartType: "line" },
      { name: "Ground Movement (mm)", data: generateSensorData(54, 0.8, 1.5, 19), chartType: "step" },
      { name: "Cathodic Prot. (mV)", data: generateSensorData(55, -850, 120), chartType: "gauge" },
    ],
    timelineLabel: "Integrity Threat Level",
    heroChart: "comparison",
  },
  {
    id: "wastewater", shortTitle: "Wastewater", title: "Wastewater Treatment",
    headline: "Compliance achieved in 8 weeks",
    color: "hsl(180, 60%, 45%)", colorSecondary: "hsl(190, 50%, 35%)",
    stats: [
      { value: "$15M", label: "Fines avoided" },
      { value: "8wk", label: "To compliance" },
      { value: "$340K", label: "Fix cost" },
    ],
    disciplines: ["Environmental Eng.", "Biochemistry", "Process Control"],
    status: "RESOLVED", riskBefore: 0.68, riskAfter: 0.06,
    sensors: [
      { name: "BOD (mg/L)", data: generateSensorData(60, 45, 25, 6), chartType: "bar" },
      { name: "pH Level", data: generateSensorData(61, 7.2, 1.5), chartType: "step" },
      { name: "TSS (mg/L)", data: generateSensorData(62, 35, 20, 8), chartType: "area" },
      { name: "DO (mg/L)", data: generateSensorData(63, 5.5, 2.5), chartType: "line" },
      { name: "Flow (ML/d)", data: generateSensorData(64, 12, 4), chartType: "scatter" },
      { name: "Ammonia (mg/L)", data: generateSensorData(65, 8, 6, 5), chartType: "gauge" },
    ],
    timelineLabel: "Compliance Risk",
    heroChart: "gauge",
  },
];

/* ── Mini chart renderers (sparkline size) ────────── */

const MiniLine = ({ data, color }: { data: { i: number; v: number }[]; color: string }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
      <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.2} dot={false} strokeOpacity={0.8} />
    </LineChart>
  </ResponsiveContainer>
);

const MiniArea = ({ data, color }: { data: { i: number; v: number }[]; color: string }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
      <defs>
        <linearGradient id={`miniArea-${color.replace(/[^a-z0-9]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.2} fill={`url(#miniArea-${color.replace(/[^a-z0-9]/gi, "")})`} dot={false} />
    </AreaChart>
  </ResponsiveContainer>
);

const MiniBar = ({ data, color }: { data: { i: number; v: number }[]; color: string }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 2, right: 1, bottom: 2, left: 1 }}>
      <Bar dataKey="v" fill={color} opacity={0.6} radius={[1, 1, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

const MiniScatter = ({ data, color }: { data: { i: number; v: number }[]; color: string }) => (
  <ResponsiveContainer width="100%" height="100%">
    <ScatterChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
      <Scatter data={data} fill={color} opacity={0.7}>
        {data.map((_, idx) => (
          <Cell key={idx} fill={color} />
        ))}
      </Scatter>
    </ScatterChart>
  </ResponsiveContainer>
);

const MiniStep = ({ data, color }: { data: { i: number; v: number }[]; color: string }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
      <Line type="stepAfter" dataKey="v" stroke={color} strokeWidth={1.2} dot={false} strokeOpacity={0.8} />
    </LineChart>
  </ResponsiveContainer>
);

const MiniGauge = ({ data, color }: { data: { i: number; v: number }[]; color: string }) => {
  const current = data[data.length - 1]?.v ?? 0;
  const max = Math.max(...data.map(d => d.v));
  const min = Math.min(...data.map(d => d.v));
  const pct = max !== min ? ((current - min) / (max - min)) * 100 : 50;
  const gaugeData = [{ value: pct, fill: color }];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart cx="50%" cy="85%" innerRadius="60%" outerRadius="100%" startAngle={180} endAngle={0} data={gaugeData} barSize={6}>
        <RadialBar dataKey="value" cornerRadius={3} background={{ fill: "hsl(var(--secondary))" }} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

const renderMiniChart = (chartType: ChartType, data: { i: number; v: number }[], color: string) => {
  switch (chartType) {
    case "area": return <MiniArea data={data} color={color} />;
    case "bar": return <MiniBar data={data} color={color} />;
    case "scatter": return <MiniScatter data={data} color={color} />;
    case "step": return <MiniStep data={data} color={color} />;
    case "gauge": return <MiniGauge data={data} color={color} />;
    default: return <MiniLine data={data} color={color} />;
  }
};

/* ── Hero chart renderers ─────────────────────────── */

const HeroRadar = ({ cs }: { cs: CaseStudy }) => {
  const radarData = cs.sensors.map(s => {
    const max = Math.max(...s.data);
    const min = Math.min(...s.data);
    const current = s.data[s.data.length - 1];
    return { subject: s.name.split(" (")[0], before: 80 + Math.random() * 20, after: ((current - min) / (max - min || 1)) * 100 };
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={radarData} cx="50%" cy="50%">
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 7, fill: "hsl(var(--muted-foreground))" }} />
        <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
        <Radar name="Before" dataKey="before" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.15} strokeWidth={1} strokeDasharray="4 4" />
        <Radar name="After" dataKey="after" stroke={cs.color} fill={cs.color} fillOpacity={0.25} strokeWidth={1.5} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

const HeroWaterfall = ({ cs }: { cs: CaseStudy }) => {
  const stages = ["Detection", "Analysis", "Root Cause", "Solution", "Validation", "Resolution"];
  const rng = seededRandom(42);
  let running = cs.riskBefore * 100;
  const data = stages.map((name, i) => {
    const drop = (cs.riskBefore - cs.riskAfter) * 100 * (0.1 + rng() * 0.25);
    running = Math.max(cs.riskAfter * 100, running - drop);
    return { name, value: Math.round(running), fill: i < 2 ? "hsl(var(--destructive))" : cs.color };
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <XAxis dataKey="name" tick={{ fontSize: 7, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 7, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[0, 100]} width={25} />
        <Bar dataKey="value" radius={[2, 2, 0, 0]}>
          {data.map((entry, idx) => (
            <Cell key={idx} fill={entry.fill} opacity={0.7} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const HeroRadialBar = ({ cs }: { cs: CaseStudy }) => {
  const metrics = cs.sensors.slice(0, 4).map((s, i) => {
    const max = Math.max(...s.data);
    const min = Math.min(...s.data);
    const current = s.data[s.data.length - 1];
    const pct = Math.round(((current - min) / (max - min || 1)) * 100);
    const hues = [145, 170, 120, 100];
    return { name: s.name.split(" (")[0], value: pct, fill: `hsl(${hues[i]}, 60%, 50%)` };
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={metrics} startAngle={90} endAngle={-270} barSize={10}>
        <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "hsl(var(--secondary))" }} label={{ position: "insideStart", fontSize: 7, fill: "hsl(var(--foreground))" }} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

const HeroDistribution = ({ cs }: { cs: CaseStudy }) => {
  const mainSensor = cs.sensors[0];
  const bins = Array.from({ length: 12 }, (_, i) => {
    const min = Math.min(...mainSensor.data);
    const max = Math.max(...mainSensor.data);
    const binMin = min + (max - min) * (i / 12);
    const binMax = min + (max - min) * ((i + 1) / 12);
    const count = mainSensor.data.filter(v => v >= binMin && v < binMax).length;
    return { bin: binMin.toFixed(1), count, fill: count > 2 ? "hsl(var(--destructive))" : cs.color };
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={bins} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <XAxis dataKey="bin" tick={{ fontSize: 6, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} interval={1} />
        <YAxis tick={{ fontSize: 7, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={20} />
        <Bar dataKey="count" radius={[2, 2, 0, 0]}>
          {bins.map((entry, idx) => (
            <Cell key={idx} fill={entry.fill} opacity={0.65} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const HeroHeatmap = ({ cs }: { cs: CaseStudy }) => {
  // Render as stacked multi-line for different sensors
  const chartData = cs.sensors[0].data.map((_, i) => {
    const point: Record<string, number> = { i };
    cs.sensors.forEach((s, si) => {
      const max = Math.max(...s.data);
      const min = Math.min(...s.data);
      point[`s${si}`] = min !== max ? ((s.data[i] - min) / (max - min)) * 100 : 50;
    });
    return point;
  });
  const colors = [cs.color, cs.colorSecondary, "hsl(var(--destructive))", "hsl(var(--muted-foreground))", cs.color, cs.colorSecondary];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        {cs.sensors.map((_, si) => (
          <Area key={si} type="monotone" dataKey={`s${si}`} stroke={colors[si % colors.length]} strokeWidth={1} fill={colors[si % colors.length]} fillOpacity={0.08} dot={false} />
        ))}
        <XAxis hide />
        <YAxis hide domain={[0, 100]} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const HeroComparison = ({ cs }: { cs: CaseStudy }) => {
  const data = cs.sensors.map(s => {
    const before = s.data.slice(0, 8);
    const after = s.data.slice(-8);
    return {
      name: s.name.split(" (")[0],
      before: Math.round(before.reduce((a, b) => a + b, 0) / before.length),
      after: Math.round(after.reduce((a, b) => a + b, 0) / after.length),
    };
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, bottom: 5, left: 60 }}>
        <XAxis type="number" tick={{ fontSize: 7, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 7, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={58} />
        <Bar dataKey="before" fill="hsl(var(--destructive))" opacity={0.4} radius={[0, 2, 2, 0]} barSize={6} />
        <Bar dataKey="after" fill={cs.color} opacity={0.7} radius={[0, 2, 2, 0]} barSize={6} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const HeroGauge = ({ cs }: { cs: CaseStudy }) => {
  const gaugeData = cs.sensors.slice(0, 5).map((s, i) => {
    const current = s.data[s.data.length - 1];
    const max = Math.max(...s.data);
    const min = Math.min(...s.data);
    const pct = Math.round(((current - min) / (max - min || 1)) * 100);
    return { name: s.name.split(" (")[0], value: pct, fill: `hsl(${180 + i * 20}, 55%, ${45 + i * 3}%)` };
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart cx="50%" cy="55%" innerRadius="15%" outerRadius="85%" data={gaugeData} startAngle={180} endAngle={-180} barSize={8}>
        <RadialBar dataKey="value" cornerRadius={3} background={{ fill: "hsl(var(--secondary))" }} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

const heroChartLabels: Record<CaseStudy["heroChart"], string> = {
  radar: "Multi-Axis Risk Radar",
  waterfall: "Risk Reduction Cascade",
  radialBar: "Performance Metrics",
  distribution: "Anomaly Distribution",
  heatmap: "Multi-Sensor Correlation",
  comparison: "Before vs After Analysis",
  gauge: "System Health Gauges",
};

const renderHeroChart = (cs: CaseStudy) => {
  switch (cs.heroChart) {
    case "radar": return <HeroRadar cs={cs} />;
    case "waterfall": return <HeroWaterfall cs={cs} />;
    case "radialBar": return <HeroRadialBar cs={cs} />;
    case "distribution": return <HeroDistribution cs={cs} />;
    case "heatmap": return <HeroHeatmap cs={cs} />;
    case "comparison": return <HeroComparison cs={cs} />;
    case "gauge": return <HeroGauge cs={cs} />;
  }
};

/* ── Sparkline Card ───────────────────────────────── */

const SparklineCard = ({ sensor, color }: { sensor: SensorData; color: string }) => {
  const [expanded, setExpanded] = useState(false);
  const chartData = useMemo(
    () => sensor.data.map((v, i) => ({ i, v })),
    [sensor.data]
  );

  const max = Math.max(...sensor.data);
  const min = Math.min(...sensor.data);
  const avg = sensor.data.reduce((a, b) => a + b, 0) / sensor.data.length;
  const current = sensor.data[sensor.data.length - 1];
  const prev = sensor.data[sensor.data.length - 2];
  const delta = current - prev;
  const isSpike = Math.abs(delta) > (max - min) * 0.3;

  return (
    <>
      <div
        onClick={() => setExpanded(true)}
        className="bg-secondary/30 border border-border/50 rounded-sm p-3 hover:border-border transition-colors group cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground truncate mr-2">
            {sensor.name}
          </span>
          <span className={`font-mono-data text-[10px] font-semibold ${isSpike ? "text-destructive" : "text-foreground"}`}>
            {current}
          </span>
        </div>
        <div className="h-10">
          {renderMiniChart(sensor.chartType, chartData, color)}
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="font-mono-data text-[10px] text-muted-foreground">
            {min.toFixed(1)} — {max.toFixed(1)}
          </span>
          <span className={`font-mono-data text-[10px] ${delta > 0 ? "text-destructive" : "text-accent"}`}>
            {delta > 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}
          </span>
        </div>
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-card border border-border rounded-sm shadow-2xl w-[90vw] max-w-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-data text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {sensor.name}
                </span>
                <button
                  onClick={() => setExpanded(false)}
                  className="font-mono-data text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕ CLOSE
                </button>
              </div>

              <div className="h-56 mb-5">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <defs>
                      <linearGradient id="expandGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="i" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} tickLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[Math.floor(min * 0.9), Math.ceil(max * 1.1)]} width={40} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "2px",
                        fontSize: "10px",
                        fontFamily: "monospace",
                      }}
                      formatter={(value: number) => [value.toFixed(2), sensor.name]}
                    />
                    <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill="url(#expandGrad)" dot={{ r: 2.5, fill: color, strokeWidth: 0 }} activeDot={{ r: 4, fill: color }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Current", value: current.toFixed(2) },
                  { label: "Average", value: avg.toFixed(2) },
                  { label: "Min", value: min.toFixed(2) },
                  { label: "Max", value: max.toFixed(2) },
                ].map((s) => (
                  <div key={s.label} className="bg-secondary/30 border border-border/50 rounded-sm p-3 text-center">
                    <div className="font-heading text-base text-foreground">{s.value}</div>
                    <div className="font-mono-data text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ── Risk bar ─────────────────────────────────────── */

const RiskBar = ({ before, after, color }: { before: number; after: number; color: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono-data text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Risk Before</span>
        <span className="font-mono-data text-[10px] text-destructive">{(before * 100).toFixed(0)}%</span>
      </div>
      <div className="h-1 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${before * 100}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full bg-destructive/70 rounded-full"
        />
      </div>
    </div>
    <div className="font-mono-data text-[11px] text-muted-foreground">→</div>
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono-data text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Risk After</span>
        <span className="font-mono-data text-[10px]" style={{ color }}>{(after * 100).toFixed(0)}%</span>
      </div>
      <div className="h-1 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${after * 100}%` }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  </div>
);

/* ── Main section ─────────────────────────────────── */

const PlatformSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const activeCase = caseStudies[activeIndex];

  const timelineData = useMemo(
    () => generateTimeline(activeIndex, activeCase.riskBefore, activeCase.riskAfter),
    [activeIndex, activeCase.riskBefore, activeCase.riskAfter]
  );

  return (
    <section ref={ref} className="py-16 md:py-24 overflow-hidden">
      <div className="cinematic-container">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-card border border-border rounded-sm overflow-hidden shadow-2xl shadow-background/50">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              <span className="ml-3 font-mono-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                NovaActa Platform — Case Monitor
              </span>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono-data text-[11px] text-muted-foreground">7 CASES TRACKED</span>
              </div>
            </div>

            {/* Case tabs */}
            <div className="flex border-b border-border bg-secondary/30 overflow-x-auto">
              {caseStudies.map((cs, i) => (
                <button
                  key={cs.id}
                  onClick={() => setActiveIndex(i)}
                  className={`relative px-4 py-2.5 font-mono-data text-[10px] uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    i === activeIndex
                      ? "text-foreground bg-card"
                      : "text-muted-foreground hover:text-foreground/70"
                  }`}
                >
                  <span className="mr-2 text-[11px]" style={{ color: i === activeIndex ? cs.color : undefined }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {cs.shortTitle}
                  {i === activeIndex && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ backgroundColor: cs.color }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Main content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {/* Case header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50 bg-secondary/20">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeCase.color }} />
                  <span className="font-mono-data text-[10px] uppercase tracking-[0.2em]" style={{ color: activeCase.color }}>
                    {activeCase.title}
                  </span>
                  <span className="font-heading text-sm md:text-base text-foreground ml-2">
                    {activeCase.headline}
                  </span>
                  <span className={`ml-auto font-mono-data text-[11px] px-2 py-0.5 rounded-sm ${
                    activeCase.status === "MONITORING"
                      ? "bg-accent/20 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {activeCase.status}
                  </span>
                </div>

                {/* Sparkline grid */}
                <div className="px-5 pt-5 pb-3">
                  <div className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    Sensor Array — Live Monitoring
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                    {activeCase.sensors.map((sensor) => (
                      <SparklineCard key={sensor.name} sensor={sensor} color={activeCase.color} />
                    ))}
                  </div>
                </div>

                {/* Hero chart + Timeline side by side */}
                <div className="grid md:grid-cols-2 border-t border-border/50">
                  {/* Signature hero chart */}
                  <div className="p-5 border-r border-border/50">
                    <div className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      {heroChartLabels[activeCase.heroChart]}
                    </div>
                    <div className="h-44">
                      {renderHeroChart(activeCase)}
                    </div>
                  </div>

                  {/* Timeline chart */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {activeCase.timelineLabel} — 30 Day Trend
                      </span>
                      <span className="font-mono-data text-[11px] text-muted-foreground/50">
                        ─── Threshold
                      </span>
                    </div>
                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timelineData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                          <defs>
                            <linearGradient id={`grad-${activeCase.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={activeCase.color} stopOpacity={0.25} />
                              <stop offset="100%" stopColor={activeCase.color} stopOpacity={0.02} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="day" tick={{ fontSize: 8, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} tickLine={false} interval={4} />
                          <YAxis tick={{ fontSize: 8, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[0, 100]} width={28} />
                          <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "2px", fontSize: "10px", fontFamily: "monospace" }} />
                          <Line type="monotone" dataKey="threshold" stroke="hsl(var(--destructive))" strokeWidth={1} strokeDasharray="4 4" dot={false} strokeOpacity={0.4} />
                          <Area type="monotone" dataKey="risk" stroke={activeCase.color} strokeWidth={1.5} fill={`url(#grad-${activeCase.id})`} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Right sidebar row */}
                <div className="grid md:grid-cols-3 border-t border-border/50">
                  {/* Stats */}
                  <div className="p-5 border-r border-border/50">
                    <div className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      Key Outcomes
                    </div>
                    <div className="space-y-3">
                      {activeCase.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="font-heading text-lg text-foreground">{stat.value}</div>
                          <div className="font-mono-data text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risk */}
                  <div className="p-5 border-r border-border/50">
                    <div className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      Risk Assessment
                    </div>
                    <RiskBar before={activeCase.riskBefore} after={activeCase.riskAfter} color={activeCase.color} />
                    <div className="mt-4">
                      <div className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                        Disciplines
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {activeCase.disciplines.map((d) => (
                          <span key={d} className="font-mono-data text-[10px] px-1.5 py-0.5 border border-border text-muted-foreground">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-5 flex flex-col justify-between">
                    <div>
                      <div className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                        Case ID
                      </div>
                      <div className="font-heading text-3xl text-foreground/15">
                        {String(activeIndex + 1).padStart(2, "0")}
                        <span className="font-mono-data text-[11px] text-muted-foreground ml-1">/07</span>
                      </div>
                    </div>
                    <Link
                      to="/case-studies"
                      className="inline-flex items-center gap-1.5 font-mono-data text-[10px] uppercase tracking-[0.15em] hover:text-accent transition-colors group mt-4"
                      style={{ color: activeCase.color }}
                    >
                      Full Report
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Glow */}
          <div
            className="absolute -inset-8 blur-3xl -z-10 rounded-full opacity-10 transition-colors duration-700"
            style={{ backgroundColor: activeCase.color }}
          />
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
