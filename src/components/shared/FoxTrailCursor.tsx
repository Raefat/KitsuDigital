'use client';

import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

export function FoxTrailCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef<TrailPoint[]>([]);
  const rafRef = useRef<number>(0);
  const isTouchRef = useRef(false);
  const disabledRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      disabledRef.current = true;
      return;
    }

    const onTouchStart = () => {
      isTouchRef.current = true;
    };
    window.addEventListener('touchstart', onTouchStart, { once: true });

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const draw = () => {
      if (isTouchRef.current || disabledRef.current) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const trail = trailRef.current;

      trail.unshift({ x: mouse.x, y: mouse.y, age: 0 });
      for (let i = 0; i < trail.length; i++) {
        trail[i].age++;
      }

      while (trail.length > 12) trail.pop();

      if (trail.length > 2) {
        for (let i = 1; i < trail.length; i++) {
          const progress = i / trail.length;
          const alpha = Math.max(0, 1 - progress) * 0.6;
          const width = Math.max(0.5, (1 - progress) * 3);

          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
          ctx.lineWidth = width;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(249, 115, 22, 0.9)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(249, 115, 22, 0.15)';
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchstart', onTouchStart);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 10000 }}
      aria-hidden="true"
    />
  );
}
