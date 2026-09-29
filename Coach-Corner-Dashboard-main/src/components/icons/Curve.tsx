import React from "react";

const Curve = ({ classes }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="267"
      height="163"
      viewBox="0 0 267 163"
      fill="none"
      className={`${classes}`}
    >
      <g filter="url(#filter0_d_774_47)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 11C15.5817 11 12 14.5817 12 19V124C12 128.418 15.5817 132 20 132H99.7344C105.342 133.433 111.562 135.314 116.1 137.5C123.642 141.133 133 150 133 150C133 150 143.663 143.133 151.205 139.5C156.782 136.813 164.53 134.027 170.585 132H247C251.418 132 255 128.418 255 124V19C255 14.5817 251.418 11 247 11H20Z"
          fill="#3B7ABF"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_774_47"
          x="0"
          y="0"
          width="267"
          height="163"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_774_47"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_774_47"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Curve;
