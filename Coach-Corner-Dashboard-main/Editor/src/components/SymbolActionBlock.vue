<script setup>

import IconSymbolArrowUp from './icons/IconSymbolArrowUp.vue';
import IconSymbolArrowUpLeft from './icons/IconSymbolArrowUpLeft.vue';
import IconSymbolArrowUpRight from './icons/IconSymbolArrowUpRight.vue';
import IconSymbolAstrick from './icons/IconSymbolAstrick.vue';
import IconSymbolBall from './icons/IconSymbolBall.vue';
import IconSymbolDollar from './icons/IconSymbolDollar.vue';
import IconSymbolDown from './icons/IconSymbolDown.vue';
import IconSymbolExclamination from './icons/IconSymbolExclamination.vue';
import IconSymbolRight from './icons/IconSymbolRight.vue';
import IconSymbolRightDown from './icons/IconSymbolRightDown.vue';
import IconSymbolRightF from './icons/IconSymbolRightF.vue';
import IconSymbolRightGo from './icons/IconSymbolRightGo.vue';
import IconSymbolStar from './icons/IconSymbolStar.vue';
import IconSymbolVlc from './icons/IconSymbolVlc.vue';

</script>


<template>
    <div class="drawer-item pb-3 md:p-4 basis-full">
      <div class="drawer-subitem">
        <div class="drawer-subitem-items flex flex-wrap justify-center  xl:justify-start gap-3">
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolVlc />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolAstrick />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolDollar />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolExclamination />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolFlag />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolBall />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolStar />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolDown />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolArrowUp />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolRightGo />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolRightF />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolRight />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolRightDown />
          </button>
         
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolArrowUpLeft />
          </button>
          <button type="button" class="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolArrowUpRight />
          </button>
        </div>
      </div>
    </div>
</template>