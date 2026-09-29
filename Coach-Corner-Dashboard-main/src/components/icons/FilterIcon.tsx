import React from "react";

const FilterIcon = ({ classes }: any) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-filter ${classes && classes}`}
    >
      <path
        d="M1.5 6.75H22.5M5.25 12H18.75M9.75 17.25H14.25"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FilterIcon;
