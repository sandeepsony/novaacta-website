import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const layers = [
  {
    id: "structure",
    label: "Physical Structure",
    sublabel: "Mechanical & Structural Engineering",
    color: "hsl(var(--muted-foreground))",
    accentColor: "hsl(225, 15%, 40%)",
    annotations: ["Load Bearing Analysis", "Fatigue Life Prediction", "Vibration Modes"],
  },
  {
    id: "thermal",
    label: "Thermal & Fluid Systems",
    sublabel: "Thermodynamics & Flow Dynamics",
    color: "hsl(15, 70%, 50%)",
    accentColor: "hsl(15, 70%, 50%)",
    annotations: ["Heat Transfer Maps", "Fluid Flow Optimization", "Thermal Stress Zones"],
  },
  {
    id: "sensors",
    label: "Sensor & IoT Network",
    sublabel: "Real-Time Data Collection",
    color: "hsl(180, 60%, 45%)",
    accentColor: "hsl(180, 60%, 45%)",
    annotations: ["2,400+ Data Points", "Vibration Sensors", "Pressure Transducers"],
  },
  {
    id: "data",
    label: "Data Intelligence Layer",
    sublabel: "Physics-Informed Machine Learning",
    color: "hsl(var(--primary))",
    accentColor: "hsl(var(--primary))",
    annotations: ["Anomaly Detection", "Predictive Models", "Pattern Recognition"],
  },
  {
    id: "insights",
    label: "Actionable Insights",
    sublabel: "PhD-Led Decision Engineering",
    color: "hsl(45, 90%, 60%)",
    accentColor: "hsl(45, 90%, 60%)",
    annotations: ["Failure Prevention", "Cost Optimization", "Operational Intelligence"],
  },
];

// SVG sub-components for each layer of an industrial gas turbine
const StructureLayer = () => (
  <g>
    {/* Outer casing */}
    <rect x="80" y="100" width="440" height="200" rx="12" fill="none" stroke="hsl(225, 15%, 30%)" strokeWidth="2" />
    {/* Inner chamber */}
    <rect x="110" y="130" width="380" height="140" rx="6" fill="hsl(225, 15%, 10%)" stroke="hsl(225, 15%, 22%)" strokeWidth="1.5" />
    {/* Turbine blades */}
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i} transform={`translate(${160 + i * 65}, 200)`}>
        <ellipse rx="22" ry="50" fill="none" stroke="hsl(225, 15%, 28%)" strokeWidth="1.5" />
        <line x1="0" y1="-50" x2="0" y2="50" stroke="hsl(225, 15%, 20%)" strokeWidth="0.5" />
      </g>
    ))}
    {/* Shaft */}
    <line x1="100" y1="200" x2="500" y2="200" stroke="hsl(225, 15%, 25%)" strokeWidth="3" />
    {/* Intake */}
    <path d="M80 140 L40 120 L40 280 L80 260" fill="none" stroke="hsl(225, 15%, 25%)" strokeWidth="1.5" />
    {/* Exhaust */}
    <path d="M520 140 L560 120 L560 280 L520 260" fill="none" stroke="hsl(225, 15%, 25%)" strokeWidth="1.5" />
    {/* Support structures */}
    <line x1="180" y1="300" x2="180" y2="340" stroke="hsl(225, 15%, 20%)" strokeWidth="2" />
    <line x1="420" y1="300" x2="420" y2="340" stroke="hsl(225, 15%, 20%)" strokeWidth="2" />
    <line x1="140" y1="340" x2="460" y2="340" stroke="hsl(225, 15%, 22%)" strokeWidth="2" />
  </g>
);

const ThermalLayer = () => (
  <g>
    {/* Heat zones */}
    <ellipse cx="225" cy="200" rx="40" ry="60" fill="hsl(15, 70%, 50%)" opacity="0.08" />
    <ellipse cx="290" cy="200" rx="50" ry="70" fill="hsl(5, 80%, 50%)" opacity="0.12" />
    <ellipse cx="355" cy="200" rx="40" ry="55" fill="hsl(15, 70%, 50%)" opacity="0.08" />
    {/* Temperature gradient lines */}
    {[150, 170, 190, 210, 230, 250].map((y, i) => (
      <line key={i} x1="130" y1={y} x2="470" y2={y}
        stroke="hsl(15, 70%, 50%)"
        strokeWidth="0.5"
        opacity={0.15 + (i === 2 || i === 3 ? 0.2 : 0)}
        strokeDasharray="4 6"
      />
    ))}
    {/* Flow arrows */}
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <path
          d={`M${120 + i * 130} ${175 + i * 10} Q${180 + i * 130} ${160 + i * 5} ${240 + i * 130} ${175 + i * 10}`}
          fill="none" stroke="hsl(15, 70%, 50%)" strokeWidth="1" opacity="0.4"
          markerEnd="url(#arrowOrange)"
        />
      </g>
    ))}
    {/* Heat intensity labels */}
    <text x="280" y="155" fill="hsl(5, 80%, 55%)" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" opacity="0.7">1,400°C</text>
    <text x="220" y="275" fill="hsl(15, 70%, 50%)" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle" opacity="0.5">820°C</text>
    <text x="380" y="275" fill="hsl(15, 70%, 50%)" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle" opacity="0.5">560°C</text>
  </g>
);

const SensorLayer = () => {
  const sensorPositions = [
    { x: 160, y: 140 }, { x: 225, y: 145 }, { x: 290, y: 135 },
    { x: 355, y: 145 }, { x: 420, y: 140 },
    { x: 150, y: 200 }, { x: 450, y: 200 },
    { x: 160, y: 260 }, { x: 225, y: 255 }, { x: 290, y: 265 },
    { x: 355, y: 255 }, { x: 420, y: 260 },
    { x: 300, y: 320 },
  ];

  return (
    <g>
      {sensorPositions.map((pos, i) => (
        <g key={i}>
          <circle cx={pos.x} cy={pos.y} r="4" fill="hsl(180, 60%, 45%)" opacity="0.8" />
          <circle cx={pos.x} cy={pos.y} r="8" fill="none" stroke="hsl(180, 60%, 45%)" strokeWidth="0.5" opacity="0.4">
            <animate attributeName="r" from="8" to="14" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.4" to="0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          {/* Data connection lines */}
          {i < sensorPositions.length - 1 && (
            <line
              x1={pos.x} y1={pos.y}
              x2={sensorPositions[i + 1].x} y2={sensorPositions[i + 1].y}
              stroke="hsl(180, 60%, 45%)" strokeWidth="0.3" opacity="0.2"
              strokeDasharray="2 4"
            />
          )}
        </g>
      ))}
      {/* Data labels */}
      <text x="470" y="200" fill="hsl(180, 60%, 45%)" fontSize="7" fontFamily="JetBrains Mono" opacity="0.6">v: 2.4mm/s</text>
      <text x="130" y="145" fill="hsl(180, 60%, 45%)" fontSize="7" fontFamily="JetBrains Mono" opacity="0.6" textAnchor="end">P: 34.2 bar</text>
    </g>
  );
};

const DataLayer = () => (
  <g>
    {/* Neural network / data flow visualization */}
    {/* Nodes */}
    {[
      { x: 180, y: 170 }, { x: 240, y: 150 }, { x: 300, y: 180 },
      { x: 360, y: 155 }, { x: 420, y: 175 },
      { x: 200, y: 220 }, { x: 270, y: 210 }, { x: 330, y: 230 },
      { x: 390, y: 215 }, { x: 300, y: 270 },
    ].map((pos, i) => (
      <g key={i}>
        <circle cx={pos.x} cy={pos.y} r="3" fill="hsl(38, 80%, 55%)" opacity="0.9" />
        {/* Connections to nearby nodes */}
        {i < 9 && (
          <line
            x1={pos.x} y1={pos.y}
            x2={[240, 300, 360, 420, 300, 270, 330, 390, 300, 300][i]}
            y2={[150, 180, 155, 175, 220, 210, 230, 215, 270, 300][i]}
            stroke="hsl(38, 80%, 55%)" strokeWidth="0.5" opacity="0.3"
          />
        )}
      </g>
    ))}
    {/* Model output waves */}
    <path
      d="M150 290 Q200 275 250 285 Q300 295 350 280 Q400 265 450 280"
      fill="none" stroke="hsl(38, 80%, 55%)" strokeWidth="1" opacity="0.3"
    />
    <path
      d="M150 300 Q200 285 250 295 Q300 305 350 290 Q400 275 450 290"
      fill="none" stroke="hsl(38, 80%, 55%)" strokeWidth="0.7" opacity="0.2"
    />
    {/* Labels */}
    <text x="300" y="145" fill="hsl(38, 80%, 55%)" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle" opacity="0.6">LSTM + Physics Model</text>
    <text x="300" y="315" fill="hsl(38, 80%, 55%)" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle" opacity="0.5">σ = 0.023 · R² = 0.97</text>
  </g>
);

const InsightsLayer = () => (
  <g>
    {/* Decision outputs */}
    <rect x="140" y="160" width="150" height="50" rx="2" fill="hsl(45, 90%, 60%)" opacity="0.05" stroke="hsl(45, 90%, 60%)" strokeWidth="0.5" />
    <text x="155" y="178" fill="hsl(45, 90%, 60%)" fontSize="7" fontFamily="JetBrains Mono" opacity="0.8">BEARING FAILURE</text>
    <text x="155" y="192" fill="hsl(45, 90%, 60%)" fontSize="9" fontFamily="JetBrains Mono" fontWeight="600" opacity="0.9">14 days to event</text>
    <text x="155" y="204" fill="hsl(45, 90%, 60%)" fontSize="6" fontFamily="JetBrains Mono" opacity="0.5">Confidence: 94.2%</text>

    <rect x="320" y="160" width="150" height="50" rx="2" fill="hsl(45, 90%, 60%)" opacity="0.05" stroke="hsl(45, 90%, 60%)" strokeWidth="0.5" />
    <text x="335" y="178" fill="hsl(45, 90%, 60%)" fontSize="7" fontFamily="JetBrains Mono" opacity="0.8">EFFICIENCY GAIN</text>
    <text x="335" y="192" fill="hsl(45, 90%, 60%)" fontSize="9" fontFamily="JetBrains Mono" fontWeight="600" opacity="0.9">+8.3% thermal eff.</text>
    <text x="335" y="204" fill="hsl(45, 90%, 60%)" fontSize="6" fontFamily="JetBrains Mono" opacity="0.5">$2.4M annual savings</text>

    <rect x="220" y="240" width="160" height="50" rx="2" fill="hsl(45, 90%, 60%)" opacity="0.05" stroke="hsl(45, 90%, 60%)" strokeWidth="0.5" />
    <text x="235" y="258" fill="hsl(45, 90%, 60%)" fontSize="7" fontFamily="JetBrains Mono" opacity="0.8">MAINTENANCE SCHEDULE</text>
    <text x="235" y="272" fill="hsl(45, 90%, 60%)" fontSize="9" fontFamily="JetBrains Mono" fontWeight="600" opacity="0.9">Optimized: -34% cost</text>
    <text x="235" y="284" fill="hsl(45, 90%, 60%)" fontSize="6" fontFamily="JetBrains Mono" opacity="0.5">Zero unplanned downtime</text>

    {/* Connecting lines to outputs */}
    <line x1="215" y1="210" x2="300" y2="240" stroke="hsl(45, 90%, 60%)" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
    <line x1="395" y1="210" x2="300" y2="240" stroke="hsl(45, 90%, 60%)" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
  </g>
);

const layerComponents = [StructureLayer, ThermalLayer, SensorLayer, DataLayer, InsightsLayer];

const ExplodedEngineering = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="editorial-container relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left: Labels */}
            <div className="lg:col-span-4 hidden lg:block">
              {layers.map((layer, i) => (
                <LayerLabel key={layer.id} layer={layer} index={i} scrollProgress={scrollYProgress} />
              ))}
            </div>

            {/* Center: SVG Exploded View */}
            <div className="lg:col-span-8">
              <div className="relative">
                {/* Section title */}
                <ScrollTitle scrollProgress={scrollYProgress} />

                <svg viewBox="0 0 600 400" className="w-full max-w-2xl mx-auto" style={{ overflow: "visible" }}>
                  <defs>
                    <marker id="arrowOrange" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                      <path d="M0,0 L6,2 L0,4" fill="hsl(15, 70%, 50%)" opacity="0.4" />
                    </marker>
                  </defs>

                  {layers.map((_, i) => (
                    <ExplodedLayer key={i} index={i} scrollProgress={scrollYProgress} />
                  ))}
                </svg>

                {/* Mobile labels */}
                <div className="lg:hidden mt-6">
                  {layers.map((layer, i) => (
                    <MobileLayerLabel key={layer.id} layer={layer} index={i} scrollProgress={scrollYProgress} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
};

// Sub-components

const ScrollTitle = ({ scrollProgress }: { scrollProgress: any }) => {
  const opacity = useTransform(scrollProgress, [0, 0.05], [1, 0.3]);

  return (
    <motion.div style={{ opacity }} className="text-center mb-8">
      <p className="label-uppercase mb-3">Interactive System Analysis</p>
      <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground">
        Scroll to Explore Each Layer
      </h2>
    </motion.div>
  );
};

const ExplodedLayer = ({ index, scrollProgress }: { index: number; scrollProgress: any }) => {
  const totalLayers = layers.length;
  const layerStart = index / totalLayers;
  const layerEnd = (index + 1) / totalLayers;

  // Each layer separates vertically based on scroll
  const yOffset = useTransform(
    scrollProgress,
    [0, layerStart, layerEnd, 1],
    [0, 0, (index - 2) * 80, (index - 2) * 80]
  );

  const opacity = useTransform(
    scrollProgress,
    [
      Math.max(0, layerStart - 0.05),
      layerStart,
      layerEnd,
      Math.min(1, layerEnd + 0.15),
    ],
    [0.15, 1, 1, index === totalLayers - 1 ? 1 : 0.4]
  );

  const scale = useTransform(
    scrollProgress,
    [layerStart, (layerStart + layerEnd) / 2, layerEnd],
    [0.95, 1.02, 1]
  );

  const LayerComponent = layerComponents[index];

  return (
    <motion.g
      style={{
        y: yOffset,
        opacity,
        scale,
      }}
    >
      <LayerComponent />
    </motion.g>
  );
};

const LayerLabel = ({ layer, index, scrollProgress }: { layer: typeof layers[0]; index: number; scrollProgress: any }) => {
  const totalLayers = layers.length;
  const layerStart = index / totalLayers;
  const layerMid = (index + 0.5) / totalLayers;
  const layerEnd = (index + 1) / totalLayers;

  const opacity = useTransform(
    scrollProgress,
    [Math.max(0, layerStart - 0.02), layerStart, layerMid, layerEnd],
    [0, 1, 1, 0.2]
  );

  const x = useTransform(
    scrollProgress,
    [layerStart, layerMid],
    [-20, 0]
  );

  const isActive = useTransform(
    scrollProgress,
    [layerStart, layerEnd],
    [1, 0]
  );

  return (
    <motion.div
      style={{ opacity, x }}
      className="mb-8 py-4 border-l-2 pl-6 transition-colors duration-300"
      // @ts-ignore
      data-active={isActive}
    >
      <div className="flex items-center gap-2 mb-1">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: layer.accentColor }}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          Layer {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-heading text-lg font-medium text-foreground mb-1">
        {layer.label}
      </h3>
      <p className="font-mono text-[10px] text-muted-foreground mb-3">
        {layer.sublabel}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {layer.annotations.map((ann) => (
          <span
            key={ann}
            className="font-mono text-[8px] uppercase tracking-[0.1em] border px-2 py-0.5"
            style={{
              color: layer.accentColor,
              borderColor: `${layer.accentColor}33`,
            }}
          >
            {ann}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const MobileLayerLabel = ({ layer, index, scrollProgress }: { layer: typeof layers[0]; index: number; scrollProgress: any }) => {
  const totalLayers = layers.length;
  const layerStart = index / totalLayers;
  const layerEnd = (index + 1) / totalLayers;

  const opacity = useTransform(
    scrollProgress,
    [Math.max(0, layerStart - 0.02), layerStart, layerEnd, Math.min(1, layerEnd + 0.05)],
    [0, 1, 1, 0]
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-x-0 bottom-0 text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: layer.accentColor }} />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          Layer {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-heading text-lg font-medium text-foreground">{layer.label}</h3>
      <p className="font-mono text-[10px] text-muted-foreground">{layer.sublabel}</p>
    </motion.div>
  );
};

const ScrollIndicator = ({ scrollProgress }: { scrollProgress: any }) => {
  const opacity = useTransform(scrollProgress, [0, 0.1], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        Scroll to Explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
      />
    </motion.div>
  );
};

export default ExplodedEngineering;
