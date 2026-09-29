import { outlineStyle, outlineThickness } from "@/lib/Editor";
import React from "react";

const OutlineStyle = () => {
  return (
    <div className="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Outline Thickness
        </div>
        <div className="drawer-subitem-items flex items-center flex-wrap justify-start gap-3">
          {outlineThickness?.map((outline) => {
            return (
              <button type="button" className="drawer-subitem--item" key={outline?.id}>
                <span
                  className={`block w-6 h-6 rounded-full ${outline?.class} border-black`}
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
          Outline Style
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
          {outlineStyle?.map((style) => {
            return (
              <button type="button" className="drawer-subitem--item" key={style?.id}>
                <span
                  className={`block w-6 h-6 rounded-full border-2 border-black border-${style.value}`}
                >
                  <span className="sr-only">{style?.value}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OutlineStyle;
