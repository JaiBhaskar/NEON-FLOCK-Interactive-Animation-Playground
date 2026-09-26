"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three-legacy";

export default function BirdsBackground() {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let effect: any;
    let cancelled = false;
    let frameOne = 0;
    let frameTwo = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;

    async function loadVanta() {
      const element = vantaRef.current;
      if (!element) return;

      const waitForPaint = () =>
        new Promise<void>((resolve) => {
          frameOne = requestAnimationFrame(() => {
            frameTwo = requestAnimationFrame(() => resolve());
          });
        });

      try {
        await waitForPaint();
        if (cancelled || !vantaRef.current) return;

        (window as typeof window & { THREE: typeof THREE }).THREE = THREE;

        const vantaModule = await import("vanta/dist/vanta.birds.min");
        const BIRDS = vantaModule.default ?? vantaModule;

        if (cancelled || !vantaRef.current) return;

        effect = BIRDS({
          THREE,
          el: vantaRef.current,

          mouseControls: true,
          touchControls: true,
          gyroControls: false,

          minHeight: 200,
          minWidth: 200,

          scale: 1,
          scaleMobile: 1,

          backgroundColor: 0x000000,
          color1: 0xfe0ca4,
          color2: 0x00e5ff,

          birdSize: 1.6,
          speedLimit: 6,
          cohesion: 30,
          quantity: 5,
          forceAnimate: true,
        });

        resizeTimer = setTimeout(() => {
          effect?.resize?.();
        }, 300);
      } catch (error) {
        console.error("Failed to load Vanta Birds:", error);
        setFailed(true);
      }
    }

    loadVanta();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
      clearTimeout(resizeTimer);
      effect?.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 z-0 h-dvh w-screen overflow-hidden bg-black"
    >
      {failed && (
        <div className="flex h-full items-center justify-center text-sm text-white/60">
          Vanta failed to start. Check the browser console.
        </div>
      )}
    </div>
  );
}
