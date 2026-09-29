import React from "react";

const SectionLoader = () => {
  return (
    <div className="flex items-center justify-center p-5">
      <svg
        width="696"
        height="696"
        viewBox="0 0 696 696"
        className="w-48 h-48 animate-spin"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="348.439"
          cy="348.439"
          r="347.5"
          transform="rotate(45 348.439 348.439)"
          fill="url(#paint0_linear_182_611)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_182_611"
            x1="348.439"
            y1="0.939211"
            x2="348.439"
            y2="528.65"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3B7ABF" stopOpacity="0.6" />
            <stop offset="1" stopColor="#3B7ABF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SectionLoader;
