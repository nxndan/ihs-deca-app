"use client";

import { useRef, useState } from "react";

type Props = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  /** max tilt in degrees */
  max?: number;
};

/** A glass card that tilts toward the cursor with a moving light glare. */
export function TiltCard({ onClick, className, children, max = 9 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>(
    "perspective(900px) rotateX(0deg) rotateY(0deg)"
  );
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    const rotY = (px - 0.5) * (max * 2);
    const rotX = (0.5 - py) * (max * 2);
    setTransform(
      `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
        2
      )}deg) scale(1.02)`
    );
    setGlare({ x: px * 100, y: py * 100, o: 1 });
  }

  function handleLeave() {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlare((g) => ({ ...g, o: 0 }));
  }

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-bright/60 ${
        className ?? ""
      }`}
    >
      {children}
      <span
        aria-hidden="true"
        className="tilt-glare"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.28), transparent 45%)`,
          opacity: glare.o,
        }}
      />
    </div>
  );
}
