<script>
import IconLineStyle from "./icons/IconLineStyle.vue";
import { lineStyle, lineThickness } from "@/lib/Editor";
export default {
    data: function(){
        return {
            lineStyle,
            lineThickness
        }
    }
}
</script>


<template>
    <div class="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full md:basis-1/3">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Thicknesss
        </div>
        <div class="drawer-subitem-items flex items-center flex-wrap justify-start gap-3">
            <button
                type="button"
                class="drawer-subitem--item"
                v-for="outline in lineThickness"
                :key="outline?.id"
              >
                <span
                  class="block w-6 bg-black"
                  :style="{ height: outline?.value + 'px'}"
                >
                  <span class="sr-only">{{outline?.value}}</span>
                </span>
            </button>
        </div>
      </div>
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Style
        </div>
        <div class="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
            <button
                type="button"
                class="drawer-subitem--item"
                v-for="style in lineStyle"
                :key="style?.id"
              >
                <span
                  :class="'block w-6 h-1  border-2 border-black border-' + style.value"
                >
                  <span class="sr-only">{{style?.value}}</span>
                </span>
            </button>
          <button type="button" class="drawer-subitem--item">
            <IconLineStyle />
          </button>
        </div>
      </div>
    </div>
</template>
