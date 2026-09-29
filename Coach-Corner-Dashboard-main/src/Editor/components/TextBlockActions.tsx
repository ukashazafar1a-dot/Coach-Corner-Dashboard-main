import React from 'react';
import ArrowLineIcon from "@/components/icons/editor/ArrowLineIcon";
import BinIcon from "@/components/icons/editor/BinIcon";
import CurveLineIcon from "@/components/icons/editor/CurveLineIcon";
import DuplicateIcon from "@/components/icons/editor/DuplicateIcon";
import FlipIcon from "@/components/icons/editor/FlipIcon";
import GroupIcon from "@/components/icons/editor/GroupIcon";
import PlusIcon from "@/components/icons/editor/PlusIcon";
import UngroupIcon from "@/components/icons/editor/UngroupIcon";

const TextBlockActions = () => {
  return (
    <div className="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] md:max-w-80 lg:min-w-80">
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
      >
        <PlusIcon />
        <span className="text-sm text-primary ml-[5px]">Add Text Box</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
      >
        <BinIcon />
        <span className="text-sm text-primary ml-[5px]">Remove</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
      >
        <FlipIcon width={18} height={18} direction="h" />
        <span className="text-sm text-primary ml-[5px]">Flip Object</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
      >
        <DuplicateIcon />
        <span className="text-sm text-primary ml-[5px]">Duplicate</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
      >
        <GroupIcon />
        <span className="text-sm text-primary ml-[5px]">Group</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
      >
        <UngroupIcon />
        <span className="text-sm text-primary ml-[5px]">Ungroup</span>
      </button>
    </div>
  </div>
  )
}

export default TextBlockActions