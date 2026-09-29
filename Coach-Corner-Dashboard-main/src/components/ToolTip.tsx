import React from "react";
type TooltipPosition =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end";
type toltip = {
  title: string;
  position?: TooltipPosition | "top";
  children: React.ReactNode;
};

const ToolTip = ({ title, position, children }: toltip) => {
  // reference https://codepen.io/frankuxui/pen/rNPJENJ
  return (
    <div className="flex flex-col items-center">
      <div
        className="tooltip-item"
        data-toggle="tooltip"
        data-placement={position}
        data-content={title}
      >
        {children}
      </div>
    </div>
  );
};

export default ToolTip;
