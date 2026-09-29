<script setup>
import { outlineStyle, outlineThickness } from "@/lib/Editor";
import { ref } from "vue";


const outlineStyles = ref(outlineStyle);
const outlineThicknesses = ref(outlineThickness);

</script>


<template>
    <div class="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Outline Thickness
        </div>
        <div class="drawer-subitem-items flex items-center flex-wrap justify-start gap-3">
            <button type="button" class="drawer-subitem--item" v-for="outline in outlineThicknesses" :key="outline?.id">
                <span
                  :class="'block w-6 h-6 rounded-full ' + outline?.class + ' border-black'"
                >
                  <span class="sr-only">{{outline?.value}}</span>
                </span>
            </button>
        </div>
      </div>
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Outline Style
        </div>
        <div class="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
            <button type="button" class="drawer-subitem--item" v-for="style in outlineStyles" :key="style?.id">
                <span
                  :class="'block w-6 h-6 rounded-full border-2 border-black border-'+ style?.value"
                >
                  <span class="sr-only">{{style?.value}}</span>
                </span>
            </button>
        </div>
      </div>
    </div>
</template>