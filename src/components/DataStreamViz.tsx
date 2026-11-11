import { useEffect, useRef } from "react";

const DataStreamViz = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();

    const columns = 40;
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    const colW = cw / columns;
    const drops: number[] = Array(columns).fill(0).map(() => Math.random() * ch);
    const speeds: number[] = Array(columns).fill(0).map(() => 0.3 + Math.random() * 1.2);
    const chars = "01█▓▒░╠╣╚╗".split("");

    const draw = () => {
      ctx.fillStyle = "hsla(225, 15%, 6%, 0.08)";
      ctx.fillRect(0, 0, cw, ch);

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const alpha = 0.15 + Math.random() * 0.2;
        ctx.fillStyle = `hsla(38, 80%, 55%, ${alpha})`;
        ctx.font = `${10}px 'JetBrains Mono', monospace`;
        ctx.fillText(char, i * colW, drops[i]);

        drops[i] += speeds[i];
        if (drops[i] > ch && Math.random() > 0.98) {
          drops[i] = 0;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ opacity: 0.5 }}
    />
  );
};

export default DataStreamViz;
