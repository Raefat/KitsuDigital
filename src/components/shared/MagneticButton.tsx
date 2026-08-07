'use client';

import { useRef, useState, useCallback, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary',
  size = 'md',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-4 text-lg',
  };

  const variantClasses = {
    primary:
      'bg-fox text-kitsu-bg fox-glow hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] active:scale-[0.97]',
    ghost: 'text-fox-light hover:text-fox hover:bg-white/5',
    outline:
      'border border-fox/30 text-fox hover:bg-fox/10 hover:border-fox',
  };

  const combinedClasses = `${sizeClasses[size]} ${variantClasses[variant]} relative overflow-hidden rounded-full font-medium transition-shadow duration-300 cursor-pointer select-none ${className}`;

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
      className={combinedClasses}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href={href}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </Component>
  );
}
