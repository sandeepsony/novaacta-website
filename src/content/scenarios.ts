import bridgeSmall from "@/assets/case-bridge-480.webp";
import bridgeLarge from "@/assets/case-bridge-960.webp";
import gearSmall from "@/assets/case-gearsystem-480.webp";
import gearLarge from "@/assets/case-gearsystem-960.webp";
import offshoreSmall from "@/assets/case-offshore-480.webp";
import offshoreLarge from "@/assets/case-offshore-960.webp";
import pipelineSmall from "@/assets/case-pipeline-480.webp";
import pipelineLarge from "@/assets/case-pipeline-960.webp";
import refinerySmall from "@/assets/case-refinery-480.webp";
import refineryLarge from "@/assets/case-refinery-960.webp";
import wastewaterSmall from "@/assets/case-wastewater-480.webp";
import wastewaterLarge from "@/assets/case-wastewater-960.webp";
import windSmall from "@/assets/case-windfarm-480.webp";
import windLarge from "@/assets/case-windfarm-960.webp";

/**
 * Illustrative scenarios. These are constructed examples, not client work.
 * Keep them free of outcome figures (money saved, percentages recovered) until
 * there is a real engagement to report; when there is, add it as a case study
 * with the client's sign-off rather than editing one of these.
 */
export interface Scenario {
  id: string;
  title: string;
  shortTitle: string;
  headline: string;
  subline: string;
  situation: string;
  approach: string;
  /** What an investigation of this kind can surface. */
  findings: string[];
  stakes: string;
  disciplines: string[];
  tags: string[];
  image: { small: string; large: string; alt: string };
}

export const scenarios: Scenario[] = [
  {
    id: "offshore",
    title: "Offshore platform",
    shortTitle: "Offshore",
    headline: "An offshore platform is slowly losing output.",
    subline: "Each team has a different explanation.",
    situation:
      "Production has drifted down by a few percent over more than a year. Operations puts it down to seasonal variance and aging equipment, and no single system is in alarm.",
    approach:
      "We would treat the platform as one coupled system instead of a set of separate packages: cathodic protection current maps against tidal flow, heat exchanger performance against design curves, and riser vibration spectra against the fatigue model.",
    findings: [
      "Wall loss at jacket joints hidden under marine growth and missed by routine ROV inspection",
      "Heat exchanger fouling that takes a fraction of a percent off efficiency each month",
      "Flow-induced riser oscillation, an early precursor of fatigue cracking",
      "Links between the three: issues that look independent but share a cause",
    ],
    stakes:
      "Small losses compound, and structural degradation caught early is a planned repair instead of an emergency shutdown.",
    disciplines: ["Structural integrity", "Corrosion engineering", "Subsea systems", "Thermodynamics"],
    tags: ["Structural", "Corrosion", "Energy"],
    image: { small: offshoreSmall, large: offshoreLarge, alt: "Offshore production platform at night" },
  },
  {
    id: "bridge",
    title: "Bridge deflection",
    shortTitle: "Bridge",
    headline: "A bridge moves more than its design says it should.",
    subline: "The monitoring data and the model disagree.",
    situation:
      "Overnight monitoring on a highway bridge records a deflection well beyond what the thermal expansion calculations predict. Traffic loading does not explain it, and the owner has to decide whether to restrict the crossing.",
    approach:
      "We would map temperature across every girder face at high resolution, combine it with the embedded strain and displacement records, and compare the measured response with the structural model under the thermal gradients the bridge actually sees.",
    findings: [
      "Uneven solar heating between girder faces that the design assumed away",
      "A bending moment from asymmetric expansion that is missing from the structural model",
      "Reduced stiffness at specific connections after years of small fatigue cycles",
      "A deflection driven by overnight thermal relaxation, not by load",
    ],
    stakes:
      "Separating an environmental effect from structural damage decides whether the right answer is a targeted retrofit or a major intervention.",
    disciplines: ["Structural engineering", "Materials science", "Sensor analytics", "Thermal analysis"],
    tags: ["Structural", "Materials"],
    image: { small: bridgeSmall, large: bridgeLarge, alt: "Suspension bridge cable and deck in fog at night" },
  },
  {
    id: "windfarm",
    title: "Wind farm capacity",
    shortTitle: "Wind farm",
    headline: "A wind farm underperforms and no alarm has triggered.",
    subline: "Every turbine passes its own checks.",
    situation:
      "Farm output has declined gradually over several months. Each turbine sits inside its individual performance limits, so nothing in the monitoring system points to a fault.",
    approach:
      "We would analyze the fleet as a whole: SCADA data from every turbine at once, feeding a wake interaction model that accounts for wind direction, turbulence intensity and yaw position.",
    findings: [
      "Small yaw misalignments, each below its alarm threshold, across much of the fleet",
      "Wake interference between rows that turns small individual errors into a large combined loss",
      "Downstream turbines running in degraded wind for most of their operating hours",
      "A common cause, such as calibration drift in the yaw sensors",
    ],
    stakes:
      "Losses that only appear at fleet level are invisible to turbine-by-turbine monitoring, and they are often recoverable through recalibration instead of new hardware.",
    disciplines: ["Aerodynamics", "Applied mathematics", "Energy systems", "Fleet analytics"],
    tags: ["Energy", "Aerodynamics"],
    image: { small: windSmall, large: windLarge, alt: "Wind turbines in mist at dusk" },
  },
  {
    id: "gears",
    title: "Marine gearbox failure",
    shortTitle: "Gearbox",
    headline: "A marine gearbox fails without warning.",
    subline: "The vibration archive tells a different story.",
    situation:
      "A propulsion gearbox suffers a tooth fracture in service. Condition monitoring reported the unit as healthy until the day it failed, and the operator needs to know whether the rest of the fleet is at risk.",
    approach:
      "We would go back through the archived vibration spectra, lubricant analysis records and load profiles, using frequency decomposition tuned to the gear geometry to isolate harmonics that standard band monitoring averages out.",
    findings: [
      "Micro-pitting that grows from lubricant film breakdown at particular shaft speeds",
      "Gear mesh resonance amplified by gradual drift in bearing clearance",
      "Faster lubricant degradation under sustained high load",
      "A failure sequence that developed over many months while every indicator read normal",
    ],
    stakes:
      "A root cause that is understood becomes a monitoring rule that can be applied to every similar unit in service.",
    disciplines: ["Mechanical engineering", "Tribology", "Vibration analysis", "Signal processing"],
    tags: ["Mechanical", "Materials"],
    image: { small: gearSmall, large: gearLarge, alt: "Close-up of a worn helical gear" },
  },
  {
    id: "refinery",
    title: "Refinery energy loss",
    shortTitle: "Refinery",
    headline: "A refinery unit uses more energy than its design basis.",
    subline: "Several audits have not found the reason.",
    situation:
      "A crude distillation unit runs consistently above its design energy consumption. Audits keep pointing to equipment age, which explains neither the size of the gap nor when it began.",
    approach:
      "We would build a first-principles process simulation, calibrate it against several years of operating data, and compare simulated with actual performance for each heat exchanger, pump and control valve in turn.",
    findings: [
      "A miscalibrated control loop that causes systematic over-cooling",
      "Compensating heat added downstream to correct for it",
      "Heat exchangers fouling faster than the maintenance schedule assumes",
      "Operators correcting for temperature drift by hand, which hides the cause",
    ],
    stakes:
      "Losses of this kind are often fixed by recalibration and scheduling changes, with no capital project required.",
    disciplines: ["Process engineering", "Thermodynamics", "Control systems", "Energy optimization"],
    tags: ["Energy", "Process"],
    image: { small: refinerySmall, large: refineryLarge, alt: "Refinery columns and pipework lit at night" },
  },
  {
    id: "pipeline",
    title: "Pipeline integrity",
    shortTitle: "Pipeline",
    headline: "A buried pipeline shows a pressure anomaly.",
    subline: "It is small enough to be instrument error.",
    situation:
      "A transmission pipeline at a river crossing shows a persistent pressure deviation that sits inside instrument tolerance. It is too small to justify excavation and too consistent to ignore.",
    approach:
      "We would combine acoustic emission monitoring with pressure transient analysis on a digital twin of the segment, and screen months of continuous data against known defect signatures.",
    findings: [
      "A small defect in a buried section that in-line inspection has not flagged",
      "A growth rate that sets how long the line can safely run at pressure",
      "A location narrowed from kilometers of pipe to a short segment",
      "A mechanism, such as stress corrosion cracking driven by soil chemistry",
    ],
    stakes:
      "A targeted dig at a known location costs a small fraction of an uncontrolled release, in money and in environmental damage.",
    disciplines: ["Pipeline engineering", "Non-destructive testing", "Digital twin modeling", "Risk assessment"],
    tags: ["Structural", "Process"],
    image: { small: pipelineSmall, large: pipelineLarge, alt: "Corroded pipeline section fitted with pressure gauges" },
  },
  {
    id: "wastewater",
    title: "Wastewater treatment",
    shortTitle: "Wastewater",
    headline: "A treatment plant breaches its discharge limits.",
    subline: "Yet it is running inside its design parameters.",
    situation:
      "A municipal treatment works intermittently exceeds its phosphorus and ammonia limits. The exceedances follow no obvious pattern and routine sampling shows nothing wrong.",
    approach:
      "We would bring together continuous effluent chemistry, hydraulic flow modeling and microbial community analysis across each treatment stage, and calibrate a biochemical process model against the plant's laboratory record.",
    findings: [
      "Intermittent industrial discharges upstream that shock the nitrifying bacteria",
      "Hydraulic short-circuiting in a clarifier that cuts effective retention time",
      "Chemical dosing at slightly the wrong pH, which undermines phosphorus removal",
      "Causes that only combine during peak flow, between routine samples",
    ],
    stakes:
      "Finding the operating cause can restore compliance through control changes, before fines or a plant upgrade are on the table.",
    disciplines: ["Environmental engineering", "Biochemistry", "Hydraulic modeling", "Process control"],
    tags: ["Process", "Environmental"],
    image: { small: wastewaterSmall, large: wastewaterLarge, alt: "Corroded process vessels and pipework at a treatment plant" },
  },
];

export const scenarioTags = Array.from(new Set(scenarios.flatMap((scenario) => scenario.tags)));
