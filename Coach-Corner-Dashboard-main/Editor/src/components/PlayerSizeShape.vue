<script setup>

import { ref } from "vue";
import PlayerShapeCircleIcon from "./icons/PlayerShapeCircleIcon.vue";
import PlayerShapeOvalIcon from "./icons/PlayerShapeOvalIcon.vue";
import PlayerShapePolygon from "./icons/PlayerShapePolygon.vue";
import PlayerShapeRectangle from "./icons/PlayerShapeRectangle.vue";
import PlayerShapeSquareIcon from "./icons/PlayerShapeSquareIcon.vue";
import PlayerShapeSquareTurnedIcon from "./icons/PlayerShapeSquareTurnedIcon.vue";
import PlayerShapeTriangleIcon from "./icons/PlayerShapeTriangleIcon.vue";
import PlayerSizeIcon from "./icons/PlayerSizeIcon.vue";
import { playerSize } from "@/lib/Editor";


const playerSizeObj = ref(playerSize)

</script>

<template>
    <div class="drawer-item pb-3 md:p-4 flex flex-col md:border-r border-[#dddddd] basis-full">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Player Shape</span>
        </div>
        <div class="drawer-subitem--items flex items-center justify-start gap-4 flex-wrap">
          <button type="button" class="drawer-subitem--item">
            <PlayerShapeCircleIcon />
          </button>
          <button type="button" class="drawer-subitem--item">
            <PlayerShapeOvalIcon />
          </button>
          <button type="button" class="drawer-subitem--item">
            <PlayerShapeSquareIcon />
          </button>
          <button type="button" class="drawer-subitem--item">
            <PlayerShapeRectangle />
          </button>
          <button type="button" class="drawer-subitem--item">
            <PlayerShapeTriangleIcon />
          </button>
          <button type="button" class="drawer-subitem--item">
            <PlayerShapePolygon />
          </button>
          <button type="button" class="drawer-subitem--item">
            <PlayerShapeSquareTurnedIcon />
          </button>
        </div>
      </div>
      <div class="drawer-subitem mb-6">
        <p class="drawer-subitem--title mb-5 font-semibold text-base text-[#989898]">Player Size</p>
        <div class="drawer-subitem--items flex items-center justify-start gap-4 flex-wrap">
            <button type="button" class="drawer-subitem--item" v-for="size in playerSizeObj" :key="size?.id">
                <PlayerSizeIcon :width="size?.value" :height="size?.value" />
            </button>
        </div>
      </div>
    </div>
</template>