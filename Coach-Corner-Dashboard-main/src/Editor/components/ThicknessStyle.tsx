import IconLineStyle from "@/components/icons/editor/IconLineStyle";
import { lineStyle, lineThickness } from "@/lib/Editor";
import React from "react";

const ThicknessStyle = () => {
  return (
    <div className="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full md:basis-1/3">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Thicknesss
        </div>
        <div className="drawer-subitem-items flex items-center flex-wrap justify-start gap-3">
          {lineThickness?.map((outline) => {
            return (
              <button
                type="button"
                className="drawer-subitem--item"
                key={outline?.id}
              >
                <span
                  className={`block w-6 bg-black`}
                  style={{ height: `${outline?.value}px` }}
                >
                  <span className="sr-only">{outline?.value}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Style
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
          {lineStyle?.map((style) => {
            return (
              <button
                type="button"
                className="drawer-subitem--item"
                key={style?.id}
              >
                <span
                  className={`block w-6 h-1  border-2 border-black border-${style.value}`}
                >
                  <span className="sr-only">{style?.value}</span>
                </span>
              </button>
            );
          })}
          <button type="button" className="drawer-subitem--item">
            <IconLineStyle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThicknessStyle;
