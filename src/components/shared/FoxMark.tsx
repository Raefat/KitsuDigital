'use client';

export function FoxMark({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Kitsu Digital fox mark"
    >
      {/* Geometric fox head - angular, refined line art */}
      <path
        d="M50 15 L65 5 L72 30 L85 25 L78 50 L90 55 L70 60 L72 80 L50 70 L28 80 L30 60 L10 55 L22 50 L15 25 L28 30 L35 5 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner ear detail - left */}
      <path
        d="M40 20 L35 8 L45 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
      />
      {/* Inner ear detail - right */}
      <path
        d="M60 20 L65 8 L55 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
      />
      {/* Eyes - geometric dots */}
      <circle cx="40" cy="42" r="2.5" fill="currentColor" />
      <circle cx="60" cy="42" r="2.5" fill="currentColor" />
      {/* Nose */}
      <path
        d="M47 52 L50 55 L53 52"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function FoxMarkAnimated({ className = '', size = 40 }: { className?: string; size?: number }) {
  const pathId = `fox-path-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Kitsu Digital fox mark"
    >
      <path
        id={pathId}
        d="M50 15 L65 5 L72 30 L85 25 L78 50 L90 55 L70 60 L72 80 L50 70 L28 80 L30 60 L10 55 L22 50 L15 25 L28 30 L35 5 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="400"
        strokeDashoffset="400"
        style={{
          animation: 'fox-draw 1.2s ease-out forwards',
        }}
      />
      <path
        d="M40 20 L35 8 L45 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
        strokeDasharray="60"
        strokeDashoffset="60"
        style={{
          animation: 'fox-draw 0.8s ease-out 0.6s forwards',
        }}
      />
      <path
        d="M60 20 L65 8 L55 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
        strokeDasharray="60"
        strokeDashoffset="60"
        style={{
          animation: 'fox-draw 0.8s ease-out 0.8s forwards',
        }}
      />
      <circle
        cx="40"
        cy="42"
        r="2.5"
        fill="currentColor"
        opacity="0"
        style={{
          animation: 'fadeIn 0.3s ease-out 1s forwards',
        }}
      />
      <circle
        cx="60"
        cy="42"
        r="2.5"
        fill="currentColor"
        opacity="0"
        style={{
          animation: 'fadeIn 0.3s ease-out 1.1s forwards',
        }}
      />
      <path
        d="M47 52 L50 55 L53 52"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
        opacity="0"
        style={{
          animation: 'fadeIn 0.3s ease-out 1.2s forwards',
        }}
      />
      <style>{`
        @keyframes fadeIn { to { opacity: 1; } }
      `}</style>
    </svg>
  );
}
