<script setup>
import LabelColorIcon from "./icons/LabelColorIcon.vue";
import PlayerShadingCenter from "./icons/PlayerShadingCenter.vue";
import PlayerShadingLeft from "./icons/PlayerShadingLeft.vue";
import PlayerShadingRight from "./icons/PlayerShadingRight.vue";
import EmptyIcon from "./icons/EmptyIcon.vue";

</script>


<template>
    <div class="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full">
      <div class="flex items-start justify-start gap-2">
        <div class="drawer-subitem">
          <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
            <span>Label Color</span>
          </div>
          <div class="drawer-subitem-items flex items-center justify-center gap-3">
            <button type="button" class="drawer-subitem--item">
              <LabelColorIcon color="black" />
            </button>
            <button type="button" class="drawer-subitem--item">
              <LabelColorIcon color="white" />
            </button>
          </div>
        </div>
        <div class="drawer-subitem">
          <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
            Label Text
          </div>
          <div class="drawer-subitem-items">
            <input
              type="text"
              placeholder="Text"
              class="rounded bg-[#fdfdfd] border border-[#eeeeee] placeholder:text-[#E3E3E3] focus:border-[var(--themePrimary)]"
            />
          </div>
        </div>
      </div>
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Fill Shading</span>
        </div>
        <div class="drawer-subitem-items flex items-center justify-start gap-3">
          <button type="button" class="drawer-subitem--item">
            <EmptyIcon />
          </button>
          <button type="button" class="drawer-subitem--item">
            <PlayerShadingLeft />
          </button>
          <button type="button" class="drawer-subitem--item">
            <PlayerShadingCenter />
          </button>
          <button type="button" class="drawer-subitem--item">
            <PlayerShadingRight />
          </button>
        </div>
      </div>
    </div>
</template>