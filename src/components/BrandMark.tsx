import React from 'react';

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ className = '', compact = false }) => {
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
        {/* Outer architectural diamond & double hairline ring */}
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="2"
          className="stroke-[#C5A46D]"
          strokeWidth="1.25"
        />
        <rect
          x="5.5"
          y="5.5"
          width="29"
          height="29"
          rx="1"
          className="fill-[#541C2B] dark:fill-[#222222] stroke-[#C5A46D]/60"
          strokeWidth="0.75"
        />
        {/* Monogram KK in Champagne Gold */}
        <path
          d="M12.5 13V27M12.5 20L18.5 13M14.8 17.5L19 27"
          stroke="#C5A46D"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.5 13V27M22.5 20L28.5 13M24.8 17.5L29 27"
          stroke="#FAF8F4"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {!compact && (
        <span className="font-display text-xl sm:text-[1.35rem] font-semibold tracking-tight text-[#202020] dark:text-white whitespace-nowrap shrink-0">
          KK Decor and Event
        </span>
      )}
    </span>
  );
};
