import IconUpload from "@/components/icons/editor/IconUpload";
import React from "react";

const AddVideoBlock = () => {
  return (
    <div className="drawer-item p-3 basis-full md:basis-1/3 flex-shrink-0 md:border-l border-[#dddddd]">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Add New Video
        </div>
        <div className="drawer-subitem-items mb-3">
          <label htmlFor="name" className="text-gray-500">Title</label>
          <input
            name="name"
            id="name"
            className="input--field rounded bg-slate-50"
            placeholder="Text"
          />
        </div>
        <div className="p-2 bg-slate-100 border rounded flex items-center justify-center mb-4">
          <div className="py-8">
            <div className="flex items-center justify-center gap-2">
              <IconUpload />
              <span className="text-[#949494]">Upload Video</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button className="btn btn--primary">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddVideoBlock;
