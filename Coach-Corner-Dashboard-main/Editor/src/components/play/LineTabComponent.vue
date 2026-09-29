<template>
    <div className="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] md:max-w-80 lg:min-w-80">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
          :disabled="store.saving"
          @click="store.addPlayer('Offense')"
        >
          <PlusIcon />
          <span className="text-sm text-primary ml-[5px]">Add Player</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
          @click="store.removeItem" :disabled="store.saving"
        >
          <BinIcon />
          <span className="text-sm text-primary ml-[5px]">Remove Line</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
          :disabled="store.saving"
          @click="store.addLine('straightLine')"
        >
          <ArrowLineIcon />
          <span className="text-sm text-primary ml-[5px]">Straight Line</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
          :disabled="store.saving"
          @click="store.addLine('curvedLine')"
        >
          <CurveLineIcon />
          <span className="text-sm text-primary ml-[5px]">Curve Line</span>
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
    <div class="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full md:basis-1/3">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Thicknesss
        </div>
        <div class="drawer-subitem-items flex items-center flex-wrap justify-start">
            <template  v-for="thick in lineThicks" :key="thick.id">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button" @click="setLineThickness" :value="thick.id" :id="thick.width" :class="'drawer-subitem--item w-[40px] h-[40px] '+(line.thickness == thick.id && 'isSelected')">
                            <span
                            :class="'block m-auto '+ thick.className"
                            >
                            <span class="sr-only">{{thick.label}}</span>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            {{ thick.label }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </template>
        </div>
      </div>
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Style
        </div>
        <div class="drawer-subitem-items flex flex-wrap items-center justify-start">
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
            <template  v-for="style in lineStyles['firstdown']" :key="style.id">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button" @click="setLineStyle" :value="style.id" :id="style.text" :class="'drawer-subitem--item w-[40px] h-[40px] '+(line.style == style.id && 'isSelected')">
                            <span
                            :class="'block m-auto '+ style.className"
                            >
                            <span class="sr-only">{{style.label}}</span>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            {{ style.label }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </template>
        </div>
      </div>
    </div>
    <div class="drawer-item pb-3 md:p-4 basis-full">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Color</span>
        </div>
        <div class="drawer-subitem-items flex flex-wrap items-center justify-start">
            <template  v-for="color in lineColors" :key="color.id">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button" @click="setLineColor" 
                            :value="color.id" :id="color.hex" :class="'drawer-subitem--item w-[40px] h-[40px] '+(line.color == color.id && 'isSelected')">
                            <span
                            :class="'block m-auto '"
                            >
                              <div class="property-line-color" :style="{backgroundColor: color.hex}"></div>
                              <span class="sr-only">{{color.name}}</span>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            {{ color.name }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </template>
        </div>
      </div>
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>End Point</span>
        </div>
        <div class="drawer-subitem-items flex flex-wrap items-center justify-start gap-3">
            <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button" @click="setLineEndpoint" 
                            value="0" id="NONE" :class="'drawer-subitem--item w-[40px] h-[40px] '+(line.endpoint == '0' && 'isSelected')">
                            <span
                            :class="'block m-auto'"
                            >
                              <div class="property-none"></div>
                              <span class="sr-only">None</span>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            None
                        </TooltipContent>
                    </Tooltip>
            </TooltipProvider>
            <template  v-for="endpoint in lineEndpoints['firstdown']" :key="endpoint.id">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button" @click="setLineEndpoint" 
                            :value="endpoint.id" :id="endpoint.text" :class="'drawer-subitem--item w-[40px] h-[40px] '+(line.endpoint == endpoint.id && 'isSelected')">
                            <span
                            :class="'block m-auto '"
                            >
                                <div :class="{'property-checkmark':true,'border-transparent background-none': endpoint.nobg}">
                                    <div :class="endpoint.className"></div>
                                </div>                              
                                <span class="sr-only">{{endpoint.label}}</span>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            {{ endpoint.label }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </template>
        </div>
      </div>
    </div>
</template>

<script setup>
    import ArrowLineIcon from "../icons/ArrowLineIcon.vue";
    import BinIcon from "../icons/BinIcon.vue";
    import CurveLineIcon from "../icons/CurveLineIcon.vue";
    import DuplicateIcon from "../icons/DuplicateIcon.vue";
    import FlipIcon from "../icons/FlipIcon.vue";
    import GroupIcon from "../icons/GroupIcon.vue";
    import PlusIcon from "../icons/PlusIcon.vue";
    import UngroupIcon from "../icons/UngroupIcon.vue";
    import IconLineStyle from "../icons/IconLineStyle.vue";
    import EmptyIcon from "../icons/EmptyIcon.vue";
    import IconLineCircle from "../icons/IconLineCircle.vue";
    import IconLineCrop from "../icons/IconLineCrop.vue";
    import IconLineCropReverse from "../icons/IconLineCropReverse.vue";
    import IconLineText from "../icons/IconLineText.vue";
    import IconLineTop from "../icons/IconLineTop.vue";
    import { defineProps, ref } from 'vue';
    import { lineThicks,lineStyles,lineColors,lineEndpoints,lineInserts } from "@/lib/Objects";

    import {
        Tooltip,
        TooltipContent,
        TooltipProvider,
        TooltipTrigger
    } from '@/components/ui/tooltip'

    import { usePlayStore } from "@/stores/play";
    const {line} = defineProps(['line']);
    const store = usePlayStore()
    const lineStyle = ref([])
    const strokeColors = ref([])

    function setLineThickness(e) {
        if (store.activeItemHasPlayerObjects()) {
            var t = Number(e.currentTarget.id);
            window.pbt.paperPlayEditor.applyLineStyle("strokeWidth", t),
            store.tabData.line.thickness = e.currentTarget.value,
            store.isDirty = !0
        } else
            // this.$root.displayErrorMessage("Please select at least one player first, then try again.")
            console.error("Please select at least one player first, then try again.")
    }
    function setLineStyle(e) {
        if(store.activeItemHasPlayerObjects()){
            window.pbt.paperPlayEditor.applyLineStyle("strokeStyle", e.currentTarget.id),
            store.tabData.line.style = e.currentTarget.value,
            store.isDirty = !0
        }else
            // this.$root.displayErrorMessage("Please select at least one player first, then try again.")
            console.error('Please select at least one player first, then try again.')
    }
    function setLineColor(e) {
        if (store.activeItemHasPlayerObjects()) {
            var t = e.currentTarget.id;
            window.pbt.paperPlayEditor.applyLineStyle("strokeColor", t),
            store.tabData.line.color = e.currentTarget.value,
            store.isDirty = !0
        } else
            // this.$root.displayErrorMessage("Please select at least one player first, then try again.")
            console.error("Please select at least one player first, then try again.")
    }
    function setLineEndpoint(e) {
        window.pbt.paperPlayEditor.updateLineEndPoint(e.currentTarget.id),
        store.tabData.line.endpoint = e.currentTarget.value,
        store.isDirty = !0
    }
    function setLineInserts(e) {
        window.pbt.paperPlayEditor.updateLineInsertStyle(e),
        store.isDirty = !0
    }
</script>
