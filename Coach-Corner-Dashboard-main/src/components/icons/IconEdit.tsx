import React from "react";

const IconEdit = ({ classes }: any) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`icon icon-edit ${classes && classes}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 15.9997L4 19.9997L8 18.9997L19.586 7.4137C19.9609 7.03864 20.1716 6.53003 20.1716 5.9997C20.1716 5.46937 19.9609 4.96075 19.586 4.5857L19.414 4.4137C19.0389 4.03876 18.5303 3.82812 18 3.82812C17.4697 3.82813 16.9611 4.03876 16.586 4.4137L5 15.9997Z"
        stroke="#3B7ABF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 16L4 20L8 19L18 9L15 6L5 16Z" fill="#3B7ABF" />
      <path
        d="M15 6L18 9M13 20H21"
        stroke="#3B7ABF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconEdit;
