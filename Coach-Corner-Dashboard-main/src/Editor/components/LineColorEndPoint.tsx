import EmptyIcon from "@/components/icons/editor/EmptyIcon";
import IconLineCircle from "@/components/icons/editor/IconLineCircle";
import IconLineCrop from "@/components/icons/editor/IconLineCrop";
import IconLineCropReverse from "@/components/icons/editor/IconLineCropReverse";
import IconLineText from "@/components/icons/editor/IconLineText";
import IconLineTop from "@/components/icons/editor/IconLineTop";
import { strokeColors } from "@/lib/Editor";
import React from "react";

const LineColorEndPoint = () => {
  return (
    <div className="drawer-item pb-3 md:p-4 basis-full">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Color</span>
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
          {strokeColors?.map((color) => {
            return (
              <button type="button" className="drawer-subitem--item" key={color?.id}>
                <span
                  className={`block w-6 h-1 rounded-full hover:border hover:border-gray-600`}
                  style={{ background: color?.value }}
                ></span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>End Point</span>
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
          <button type="button" className="drawer-subitem--item">
            <EmptyIcon
              classes={`hover:border hover:border-gray-600 rounded-full`}
            />
          </button>
          <button type="button" className="drawer-subitem--item">
            <IconLineTop />
          </button>
          <button type="button" className="drawer-subitem--item">
            <IconLineCircle />
          </button>
          <button type="button" className="drawer-subitem--item">
            <IconLineCrop />
          </button>
          <button type="button" className="drawer-subitem--item">
            <IconLineCropReverse />
          </button>
          <button type="button" className="drawer-subitem--item">
            <IconLineText />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LineColorEndPoint;
