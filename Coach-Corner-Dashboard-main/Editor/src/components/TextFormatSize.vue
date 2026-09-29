<script setup>
import EmptyIcon from "./icons/EmptyIcon.vue";
import IconTextBold from "./icons/IconTextBold.vue";
import IconTextItalic from "./icons/IconTextItalic.vue";
import IconTextSize from "./icons/IconTextSize.vue";
import IconTextUnderline from "./icons/IconTextUnderline.vue";
import { textSize } from "@/lib/Editor";

</script>


<template>
    <div class="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full md:basis-1/3">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Thicknesss
        </div>
        <div class="drawer-subitem-items flex items-center flex-wrap justify-start gap-3">
          <button type="button" class="drawer-subitem--item">
            <EmptyIcon />
          </button>
          <button type="button" class="drawer-subitem--item">
            <IconTextBold />
          </button>
          <button type="button" class="drawer-subitem--item">
            <IconTextItalic />
          </button>
          <button type="button" class="drawer-subitem--item">
            <IconTextUnderline />
          </button>
        </div>
      </div>
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Style
        </div>
        <div class="drawer-subitem-items flex flex-wrap items-center justify-start gap-4">
            <button
                type="button"
                class="drawer-subitem--item"
                v-for="size in textSize"
                :key="size?.id"
                >
                <IconTextSize :width="size?.value" :height="size?.value"/>
            </button>
        </div>
      </div>
    </div>
</template>