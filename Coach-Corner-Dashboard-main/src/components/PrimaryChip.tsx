import React from "react";

type props = {
  title: String;
  classes?: String;
};

const PrimaryChip = ({ title, classes }: props) => {
  return (
    <span
      className={`${
        classes ? classes : "bg-primary text-white ms-1"
      } py-1 px-2 text-[10px] rounded-full inline-block whitespace-nowrap text-center  align-baseline capitalize text-xs leading-none`}
    >
      {title}
    </span>
  );
};

export default PrimaryChip;
