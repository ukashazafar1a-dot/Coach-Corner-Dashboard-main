"use client";
import React, { useState } from "react";
import EditIcon from "@/components/icons/EditIcon";
import CheckIconWithoutCircle from "@/components/icons/editor/CheckIconWithoutCircle";

const PrimaryHeader = () => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("My Play");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const toggleEdit = () => {
    setEdit(!edit);
  };
  return (
    <div className="editor-primary-header p-3 flex items-center justify-between text-primary relative w-full">
      <div className="editor-primary-header-wrapper">
        {!edit ? (
          <div className="flex items-center justify-start gap-2 md:gap-4">
            <span className="md:px-2 text-base  md:text-xl font-medium two-lines max-sm:w-28 overflow-hidden">{title}</span>
            <span
              className="px-3 flex items-center justify-start gap-2 py-1 text-sm rounded-full bg-blue-200 cursor-pointer"
              onClick={toggleEdit}
            >
              <EditIcon />
              <span className="text-primary font-medium">Edit</span>
            </span>
          </div>
        ) : (
          <div className="flex gap-3 items-center overflow-hidden absolute w-full md:static md:w-auto z-1 inset-0 bg-white md:bg-transparent p-2 md:p-0">
            <input
              className="input--field border-gray-300"
              onChange={(e) => handleInputChange(e)}
              type="text"
              value={title}
              name="title"
              required
              minLength={3}
            />
            <span className="px-3 py-1 bg-blue-300 hover:bg-blue-400 text-white rounded cursor-pointer" onClick={toggleEdit}>
              <span>Save</span>
            </span>
          </div>
        )}
      </div>
      <button type="button" className="btn btn--outline gap-2 text-xs md:text-sm">
        <CheckIconWithoutCircle />
        <span>Save</span>
      </button>
    </div>
  );
};

export default PrimaryHeader;
