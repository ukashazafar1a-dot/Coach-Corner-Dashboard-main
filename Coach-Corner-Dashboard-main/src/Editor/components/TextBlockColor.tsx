import EmptyIcon from "@/components/icons/editor/EmptyIcon";
import IconTextColor from "@/components/icons/editor/IconTextColor";
import { strokeColors } from "@/lib/Editor";
import React from "react";

const TextBlockColor = () => {
  return (
    <div className="drawer-item pb-3 md:p-4 basis-full">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Text Color</span>
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
          <button type="button" className="drawer-subitem--item">
            <IconTextColor />
          </button>
          {strokeColors?.map((color) => {
            return (
              <button type="button" className="drawer-subitem--item" key={color?.id}>
                <IconTextColor fill={color?.value} />
              </button>
            );
          })}
        </div>
      </div>
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Stroke Color</span>
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
          <button type="button" className="drawer-subitem--item">
            <EmptyIcon />
          </button>
          {strokeColors?.map((color) => {
            return (
              <button type="button" className="drawer-subitem--item" key={color?.id}>
                <span
                  className={`block w-6 h-6 rounded-full hover:border hover:border-gray-600`}
                  style={{ background: color?.value }}
                ></span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TextBlockColor;
