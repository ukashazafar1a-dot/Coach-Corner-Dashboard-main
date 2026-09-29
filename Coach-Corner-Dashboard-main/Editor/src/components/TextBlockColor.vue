<script setup>
import { ref } from 'vue';
import EmptyIcon from './icons/EmptyIcon.vue';
import IconTextColor from './icons/IconTextColor.vue';
import { strokeColors } from '@/lib/Editor';

const strokeColorObj = ref(strokeColors)

</script>


<template>
    <div className="drawer-item pb-3 md:p-4 basis-full">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Text Color</span>
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
          <button type="button" className="drawer-subitem--item">
            <IconTextColor />
          </button>
          <button type="button" className="drawer-subitem--item" v-for="color in strokeColorObj" :key="color?.id">
            <IconTextColor :fill="color?.value" />
          </button>
        </div>
      </div>
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Stroke Color</span>
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
          <button type="button" className="drawer-subitem--item">
            <EmptyIcon />
          </button>
          <button type="button" v-for="color in strokeColorObj" className="drawer-subitem--item" :key="color?.id">
            <span
                class="block w-6 h-6 rounded-full hover:border hover:border-gray-600"
                :style="{background: color?.value}"
            ></span>
          </button>
        </div>
      </div>
    </div>
</template>