<script>
import EmptyIcon from "./icons/EmptyIcon.vue";
import IconLineCircle from "./icons/IconLineCircle.vue";
import IconLineCrop from "./icons/IconLineCrop.vue";
import IconLineCropReverse from "./icons/IconLineCropReverse.vue";
import IconLineText from "./icons/IconLineText.vue";
import IconLineTop from "./icons/IconLineTop.vue";
import { strokeColors } from "@/lib/Editor";
export default {
    data: function(){
        return {
            strokeColors
        }
    }
}
</script>


<template>
    <div class="drawer-item pb-3 md:p-4 basis-full">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Color</span>
        </div>
        <div class="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
            <button type="button" class="drawer-subitem--item" v-for="color in strokeColors" :key="color?.id">
                <span
                    class="block w-6 h-1 rounded-full hover:border hover:border-gray-600"
                    :style="{ background: color?.value }"
                ></span>
            </button>
        </div>
      </div>
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>End Point</span>
        </div>
        <div class="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
          <button type="button" class="drawer-subitem--item">
            <EmptyIcon
              classes="hover:border hover:border-gray-600 rounded-full"
            />
          </button>
          <button type="button" class="drawer-subitem--item">
            <IconLineTop />
          </button>
          <button type="button" class="drawer-subitem--item">
            <IconLineCircle />
          </button>
          <button type="button" class="drawer-subitem--item">
            <IconLineCrop />
          </button>
          <button type="button" class="drawer-subitem--item">
            <IconLineCropReverse />
          </button>
          <button type="button" class="drawer-subitem--item">
            <IconLineText />
          </button>
        </div>
      </div>
    </div>
</template>
