import React from "react";
import EmptyIcon from "@/components/icons/editor/EmptyIcon";
import { strokeColors } from "@/lib/Editor";

const FillStoreColor = () => {
  return (
    <div className="drawer-item pb-3 md:p-4 basis-full">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Fill Color</span>
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
          <button type="button" className="drawer-subitem--item">
            <EmptyIcon classes={`hover:border hover:border-gray-600 rounded-full`}/>
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
                  className={`block w-6 h-6 rounded-full border-2`}
                  style={{ borderColor: color?.value }}
                ></span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FillStoreColor;
