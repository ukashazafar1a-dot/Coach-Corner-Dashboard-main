import EmptyIcon from "@/components/icons/editor/EmptyIcon";
import IconTextBold from "@/components/icons/editor/IconTextBold";
import IconTextItalic from "@/components/icons/editor/IconTextItalic";
import IconTextSize from "@/components/icons/editor/IconTextSize";
import IconTextUnderline from "@/components/icons/editor/IconTextUnderline";
import { textSize } from "@/lib/Editor";
import React from "react";

const TextFormatSize = () => {
  return (
    <div className="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full md:basis-1/3">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Thicknesss
        </div>
        <div className="drawer-subitem-items flex items-center flex-wrap justify-start gap-3">
          <button type="button" className="drawer-subitem--item">
            <EmptyIcon />
          </button>
          <button type="button" className="drawer-subitem--item">
            <IconTextBold />
          </button>
          <button type="button" className="drawer-subitem--item">
            <IconTextItalic />
          </button>
          <button type="button" className="drawer-subitem--item">
            <IconTextUnderline />
          </button>
        </div>
      </div>
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Style
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start gap-4">
          {textSize?.map((size) => {
            return (
              <button
                type="button"
                className="drawer-subitem--item"
                key={size?.id}
              >
                <IconTextSize width={size?.value} height={size?.value}/>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TextFormatSize;
