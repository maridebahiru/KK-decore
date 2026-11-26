import React from 'react';

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
  onDarkSurface?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  className = '',
  compact = false,
  onDarkSurface = false,
}) => {
  return (
    <span className={`inline-flex items-center gap-3 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Outer architectural frame */}
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="3"
          stroke="var(--accent-2)"
          strokeWidth="1.25"
        />
        <rect
          x="5.5"
          y="5.5"
          width="29"
          height="29"
          rx="1.5"
          fill={onDarkSurface ? 'var(--footer-bg)' : 'var(--accent)'}
          stroke="var(--accent-2)"
          strokeOpacity="0.55"
          strokeWidth="0.75"
        />
        {/* Monogram KK */}
        <path
          d="M12.5 13V27M12.5 20L18.5 13M14.8 17.5L19 27"
          stroke={onDarkSurface ? 'var(--footer-text)' : 'var(--accent-text)'}
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.5 13V27M22.5 20L28.5 13M24.8 17.5L29 27"
          stroke="var(--accent-2)"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {!compact && (
        <span
          className={`font-display text-lg sm:text-[1.3rem] font-semibold tracking-tight whitespace-nowrap shrink-0 ${
            onDarkSurface ? 'text-white' : 'text-[var(--text)]'
          }`}
        >
          KK Decor and Event
        </span>
      )}
    </span>
  );
};
