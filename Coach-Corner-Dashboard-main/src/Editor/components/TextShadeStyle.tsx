import React from "react";
import LabelColorIcon from "@/components/icons/editor/LabelColorIcon";
import PlayerShadingCenter from "@/components/icons/editor/PlayerShadingCenter";
import PlayerShadingLeft from "@/components/icons/editor/PlayerShadingLeft";
import PlayerShadingRight from "@/components/icons/editor/PlayerShadingRight";
import EmptyIcon from "@/components/icons/editor/EmptyIcon";

const TextShadeStyle = () => {
  return (
    <div className="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full">
      <div className="flex items-start justify-start gap-2">
        <div className="drawer-subitem">
          <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
            <span>Label Color</span>
          </div>
          <div className="drawer-subitem-items flex items-center justify-center gap-3">
            <button type="button" className="drawer-subitem--item">
              <LabelColorIcon color="black" />
            </button>
            <button type="button" className="drawer-subitem--item">
              <LabelColorIcon color="white" />
            </button>
          </div>
        </div>
        <div className="drawer-subitem">
          <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
            Label Text
          </div>
          <div className="drawer-subitem-items">
            <input
              type="text"
              placeholder="Text"
              className="rounded bg-[#fdfdfd] border border-[#eeeeee] placeholder:text-[#E3E3E3] focus:border-[var(--themePrimary)]"
            />
          </div>
        </div>
      </div>
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Fill Shading</span>
        </div>
        <div className="drawer-subitem-items flex items-center justify-start gap-3">
          <button type="button" className="drawer-subitem--item">
            <EmptyIcon />
          </button>
          <button type="button" className="drawer-subitem--item">
            <PlayerShadingLeft />
          </button>
          <button type="button" className="drawer-subitem--item">
            <PlayerShadingCenter />
          </button>
          <button type="button" className="drawer-subitem--item">
            <PlayerShadingRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextShadeStyle;
