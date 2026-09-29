<template>
    <div className="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] md:max-w-80 lg:min-w-80">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
          :disabled="store.saving"
          @click="store.addSymbol(symbol.shape)"
        >
          <PlusIcon />
          <span className="text-sm text-primary ml-[5px]">Add Symbol</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
          @click="store.removeItem" :disabled="store.saving"
        >
          <BinIcon />
          <span className="text-sm text-primary ml-[5px]">Remove</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
          :disabled="store.saving"
          @click="store.flipObject"
        >
          <FlipIcon width="18" height="18" direction="h" />
          <span className="text-sm text-primary ml-[5px]">Flip Object</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
          :disabled="store.saving"
          @click="store.duplicateItem"
        >
          <DuplicateIcon />
          <span className="text-sm text-primary ml-[5px]">Duplicate</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
          :disabled="store.saving"
          @click="store.groupItem"
        >
          <GroupIcon />
          <span className="text-sm text-primary ml-[5px]">Group</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
          :disabled="store.saving"
          @click="store.ungroupItem"
        >
          <UngroupIcon />
          <span className="text-sm text-primary ml-[5px]">Ungroup</span>
        </button>
      </div>
    </div>
    <div class="drawer-item pb-3 md:p-4 basis-full">
      <div class="drawer-subitem">
        <div class="drawer-subitem-items flex flex-wrap justify-center  xl:justify-start gap-3">
          <template  v-for="shape in shapes['firstdown']" :key="shape.id">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger 
                            :class="'property-container hover:border-gray-400'"> 
                            <div class="property-checkmark">
                                <div :class="['redue',(symbol.shape == shape.fileName && 'bg-tertiary'), shape.iconClass,'border', 'border-gray-200', 'rounded', 'hover:border-gray-400', 'p-2']"
                                    @click="(t)=>store.tabData.symbol.shape = shape.fileName"
                                    @dblclick="(t)=>{store.tabData.symbol.shape = shape.fileName,store.addSymbol(symbol.shape)}">
                                    <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
                                        <image :width="shape.width" :height="shape.height" 
                                                crossorigin="anonymous" 
                                                :href="'/imgs/'.concat(shape.fileName)+'.svg'"></image>
                                    </svg>
                                </div>
                            </div>
                        </TooltipTrigger>
                        <!-- <TooltipContent>
                            {{ shape.name }}
                        </TooltipContent> -->
                    </Tooltip>
                </TooltipProvider>
            </template>
        </div>
      </div>
    </div>
</template>

<script setup>
    import { defineProps, ref } from 'vue';
    import { usePlayStore } from '@/stores/play';
    import { shapes } from '@/lib/Objects';
    const store = usePlayStore()
    const {symbol} = defineProps(['symbol'])

    function addDirectSymbol(e, t) {
        playEditorSymbolObject = t,
        window.pbt.paperPlayEditor.addSymbol(e),
        store.isDirty = !0
    }

</script>
