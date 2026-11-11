import logoGold from "@/assets/logo-compass-gold.png";
import wordmark1 from "@/assets/wordmark-1.png";
import wordmark2 from "@/assets/wordmark-2.png";
import wordmark3 from "@/assets/wordmark-3.png";
import wordmark4 from "@/assets/wordmark-4.png";
import wordmark5 from "@/assets/wordmark-5.png";
import wordmark6 from "@/assets/wordmark-6.png";
import wordmark7 from "@/assets/wordmark-7.png";
import wordmark8 from "@/assets/wordmark-8.png";
import wordmark9 from "@/assets/wordmark-9.png";
import wordmark10 from "@/assets/wordmark-10.png";
import wordmark11 from "@/assets/wordmark-11.png";
import wordmark12 from "@/assets/wordmark-12.png";
import wordmarkTech1 from "@/assets/wordmark-tech-1.png";
import wordmarkTech2 from "@/assets/wordmark-tech-2.png";
import wordmarkTech3 from "@/assets/wordmark-tech-3.png";
import wordmarkTech4 from "@/assets/wordmark-tech-4.png";
import wordmarkTech5 from "@/assets/wordmark-tech-5.png";
import wordmarkTech6 from "@/assets/wordmark-tech-6.png";

const wordmarks = [
  { id: 1, src: wordmark1, name: "1", desc: "Thin elegant serif" },
  { id: 2, src: wordmark2, name: "2", desc: "Geometric sans" },
  { id: 3, src: wordmark3, name: "3", desc: "Bold editorial serif" },
  { id: 4, src: wordmark4, name: "4", desc: "Luxury didone" },
  { id: 5, src: wordmark5, name: "5", desc: "Technical monospace" },
  { id: 6, src: wordmark6, name: "6", desc: "Script signature" },
  { id: 7, src: wordmark7, name: "7", desc: "Futuristic rounded" },
  { id: 8, src: wordmark8, name: "8", desc: "Stacked geometric" },
  { id: 9, src: wordmark9, name: "9", desc: "Bold industrial stencil" },
  { id: 10, src: wordmark10, name: "10", desc: "Art deco ornate" },
  { id: 11, src: wordmark11, name: "11", desc: "Sci-fi glowing" },
  { id: 12, src: wordmark12, name: "12", desc: "Lowercase friendly" },
];

const techWordmarks = [
  { id: "T1", src: wordmarkTech1, name: "T1", desc: "Futuristic aerospace sans" },
  { id: "T2", src: wordmarkTech2, name: "T2", desc: "Bold condensed stencil" },
  { id: "T3", src: wordmarkTech3, name: "T3", desc: "Elegant thin serif" },
  { id: "T4", src: wordmarkTech4, name: "T4", desc: "Art deco chrome" },
  { id: "T5", src: wordmarkTech5, name: "T5", desc: "Brutalist industrial" },
  { id: "T6", src: wordmarkTech6, name: "T6", desc: "Swiss modernist" },
];

const BrandGallery = () => {
  return (
    <section className="min-h-screen py-16 bg-background">
      <div className="cinematic-container">
        {/* Big Eye-Catching Logo Section */}
        <div className="mb-24">
          <div className="label-mono mb-4 text-center">Your Logo Mark — Now Bigger & Bolder</div>
          <div className="divider-line mx-auto mb-12" />

          <div className="flex justify-center">
            <div className="relative">
              {/* Glow effect behind */}
              <div
                className="absolute inset-0 blur-3xl scale-150"
                style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, transparent 70%)" }}
              />
              <img
                src={logoGold}
                alt="NovaActa Gold Compass"
                className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
              />
            </div>
          </div>
          <p className="text-center mt-8 font-heading text-2xl text-foreground">
            Gold North Star Compass
          </p>
          <p className="text-center mt-2 font-body text-sm text-muted-foreground">
            Striking, premium, impossible to miss
          </p>
        </div>

        {/* Technical Monospace Section - White & Gold */}
        <div className="label-mono mb-4 text-accent">Technical Monospace Collection — White & Gold</div>
        <div className="divider-line mb-8" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {techWordmarks.map((wm) => (
            <div
              key={wm.id}
              className="bg-card border border-accent/30 group hover:border-accent transition-all duration-500 overflow-hidden shadow-lg"
            >
              {/* Wordmark display */}
              <div className="aspect-[2/1] flex items-center justify-center p-4 bg-black">
                <img
                  src={wm.src}
                  alt={`Technical Wordmark ${wm.name}`}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Info */}
              <div className="p-4 border-t border-accent/30 bg-gradient-to-br from-background to-accent/5">
                <div className="flex items-center justify-between">
                  <span className="font-mono-data text-lg font-bold text-accent">
                    #{wm.name}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">
                    {wm.desc}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Original Wordmark Options */}
        <div className="label-mono mb-4">Other Wordmark Styles (1-12)</div>
        <div className="divider-line mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wordmarks.map((wm) => (
            <div
              key={wm.id}
              className="bg-card border border-border group hover:border-accent/50 transition-all duration-500 overflow-hidden"
            >
              {/* Wordmark display */}
              <div className="aspect-[2/1] flex items-center justify-center p-4 bg-background">
                <img
                  src={wm.src}
                  alt={`Wordmark ${wm.name}`}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Info */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="font-mono-data text-lg font-bold text-accent">
                    #{wm.name}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">
                    {wm.desc}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-border pt-12">
          <p className="font-heading text-2xl text-foreground mb-2">
            Which technical wordmark do you like?
          </p>
          <p className="font-body text-sm text-muted-foreground">
            Tell me T1-T6 for technical monospace, or 1-12 for other styles
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandGallery;