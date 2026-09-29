import React from "react";

const IconSend = ({ classes }: any) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-send ${classes && classes}`}
    >
      <g clipPath="url(#clip0_441_50)">
        <path
          d="M26.9804 7.58137C27.5564 5.98804 26.0124 4.44404 24.419 5.02137L4.94572 12.064C3.34705 12.6427 3.15371 14.824 4.62438 15.676L10.8404 19.2747L16.391 13.724C16.6425 13.4812 16.9793 13.3468 17.3289 13.3498C17.6785 13.3528 18.0129 13.4931 18.2601 13.7403C18.5074 13.9875 18.6476 14.3219 18.6506 14.6715C18.6537 15.0211 18.5193 15.3579 18.2764 15.6094L12.7257 21.16L16.3257 27.376C17.1764 28.8467 19.3577 28.652 19.9364 27.0547L26.9804 7.58137Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_441_50">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconSend;
