import React from "react";

const CloseIcon = ({ classes }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.5 0 25 25"
      className={`icon icon-close ${classes}`}
    >
      <path
        d="M3 21.32L21 3.32001"
        stroke="inherit"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3.32001L21 21.32"
        stroke="inherit"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
