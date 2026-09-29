<script setup>
import ArrowLineIcon from "./icons/ArrowLineIcon.vue";
import BinIcon from "./icons/BinIcon.vue";
import CurveLineIcon from "./icons/CurveLineIcon.vue";
import DuplicateIcon from "./icons/DuplicateIcon.vue";
import FlipIcon from "./icons/FlipIcon.vue";
import GroupIcon from "./icons/GroupIcon.vue";
import PlusIcon from "./icons/PlusIcon.vue";
import UngroupIcon from "./icons/UngroupIcon.vue";

</script>


<template>
    <div className="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] md:max-w-80 lg:min-w-80">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
        >
          <PlusIcon />
          <span className="text-sm text-primary ml-[5px]">Add Player</span>
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
          <ArrowLineIcon />
          <span className="text-sm text-primary ml-[5px]">Straight Line</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
        >
          <CurveLineIcon />
          <span className="text-sm text-primary ml-[5px]">Curve Line</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
        >
          <FlipIcon width="18" height="18" direction="h" />
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
</template>