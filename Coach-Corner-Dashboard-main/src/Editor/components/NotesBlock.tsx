import React from "react";

const NotesBlock = () => {
  return (
    <div className="drawer-item p-3 basis-full md:basis-1/3">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Text
        </div>
        <div className="drawer-subitem-items flex items-center flex-wrap justify-start gap-3 mb-3">
          <textarea
            name="name"
            id="name"
            className="input--field rounded bg-slate-50"
            rows={4}
            placeholder="Text"
          ></textarea>
        </div>
        <div className="flex items-center justify-end">
          <button className="btn btn--primary">Save</button>
        </div>
      </div>
    </div>
  );
};

export default NotesBlock;
