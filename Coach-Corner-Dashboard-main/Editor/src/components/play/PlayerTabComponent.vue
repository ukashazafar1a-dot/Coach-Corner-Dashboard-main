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
          <span className="text-sm text-primary ml-[5px]">Remove</span>
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
    <div class="drawer-item pb-3 md:p-4 flex flex-col md:border-r border-[#dddddd] basis-full">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Player Shape</span>
        </div>
        <div class="drawer-subitem--items flex items-center justify-start flex-wrap">
          <template  v-for="shape in playerShapes['firstdown']" :key="shape.id">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setPlayerShape(shape)" :id="shape.id" :class="'drawer-subitem--item w-[40px] h-[40px] '+(player.playerShape == shape.id && 'isSelected')">
                        <span
                        :class="'block m-auto w-6 h-6 rounded-full border-2 border-black '+ shape.iconClassName"
                        >
                        <span class="sr-only">{{shape.name}}</span>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        {{ shape.name }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          </template>
        </div>
      </div>
      <div class="drawer-subitem mb-6">
        <p class="drawer-subitem--title mb-5 font-semibold text-base text-[#989898]">Player Size</p>
        <div class="drawer-subitem--items flex items-center justify-start flex-wrap">
            <template  v-for="size in playerSizes" :key="size.id">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setPlayerSize(size)" :class="'drawer-subitem--item w-[40px] h-[40px] '+(player.playerSize == size.id && 'isSelected')">
                        <span
                        :class="'block m-auto '+ size.className"
                        >
                        <span class="sr-only">{{size.label}}</span>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        {{ size.label }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          </template>
        </div>
      </div>
    </div>
    <div class="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full">
      <div class="flex items-start justify-start gap-2">
        <div class="drawer-subitem">
          <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
            <span>Label Color</span>
          </div>
          <div class="drawer-subitem-items flex items-center justify-center gap-3">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setLabelColor" id="#000000" value="1" :class="'drawer-subitem--item w-[40px] h-[40px] '+(player.labelColor == '1' && 'isSelected')">
                        <span
                        :class="'block m-auto'"
                        >
                            <div class="property-label-color-21pt"></div>
                            <span class="sr-only">Black</span>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        Black
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setLabelColor" id="#ffffff" value="2" :class="'drawer-subitem--item w-[40px] h-[40px] '+(player.labelColor == '2' && 'isSelected')">
                        <span
                        :class="'block m-auto'"
                        >
                            <div class="property-label-color-21pt-border">
                              <div class="property-label-color-21pt"></div>
                            </div>
                            <span class="sr-only">White</span>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        White
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div class="drawer-subitem">
          <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
            Label Text
          </div>
          <div class="drawer-subitem-items">
            <input
              type="text" maxlength="2"
              :value="player.labelText"
              @focus="store.disableOnKeyDownHandler"
              @blur="store.disableOnKeyDownHandler"
              @keyup="setLabelText"
              @keypress="(t)=>!t.type.indexOf('key') && (t.keyCode === 13 && t.key === 'Enter') ? null : setLabelText.apply(null, arguments)"
              @input="(t)=>t.target.composing || (store.tabData.player.labelText = t.target.value)"
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
        <div class="drawer-subitem-items flex items-center justify-start">
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger type="button" 
                    @click="setFillShading" id="NONE" value="0" :class="'drawer-subitem--item w-[40px] h-[40px] '+(player.fillShading == '0' && 'isSelected')">
                    <span
                    :class="'block m-auto '"
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
          <template  v-for="shading in fillShadings" :key="shading.id">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" :id="shading.text" :value="shading.id" @click="setFillShading" :class="'drawer-subitem--item w-[40px] h-[40px] '+(player.fillShading == shading.id && 'isSelected')">
                        <span
                        :class="'block m-auto '+ shading.className"
                        >
                            <span class="sr-only">{{shading.label}}</span>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        {{ shading.label }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          </template>
        </div>
      </div>
    </div>
    <div class="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Outline Thickness
        </div>
        <div class="drawer-subitem-items flex items-center flex-wrap justify-start">
            <template  v-for="thickness in outlineThicknesses" :key="thickness?.id">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button" 
                            @click="(t)=>setOutlineThickness(thickness)" 
                            :value="thickness.id"
                            :class="'drawer-subitem--item w-[40px] h-[40px] '+(player.outlineThickness == thickness.id && 'isSelected')">
                            <span
                            :class="'block m-auto '+thickness.className"
                            >
                            <span class="sr-only">{{thickness.label}}</span>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            {{ thickness.label }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </template>
        </div>
      </div>
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Outline Style
        </div>
        <div class="drawer-subitem-items flex flex-wrap items-center justify-start">
            <template  v-for="style in outlineStyles" :key="style?.id">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button" @click="setOutlineStyle" :data-text="style.text" :id="style.id" :class="'drawer-subitem--item w-[40px] h-[40px] '+(player.outlineStyle == style?.id && 'isSelected')">
                            <span
                            :class="'block m-auto w-6 h-6 rounded-full border-2 border-black '+ style?.className"
                            >
                            <span class="sr-only">{{style?.text}}</span>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            {{ style?.label }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </template>
        </div>
      </div>
    </div>
    <div className="drawer-item pb-3 md:p-4 basis-full">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Fill Color</span>
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start">
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger type="button" 
                    @click="setFillColor" id="NONE" value="0" :class="'drawer-subitem--item w-[40px] h-[40px] '+(player.fillColor == '0' && 'isSelected')">
                    <span
                    :class="'block m-auto '"
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
          <template  v-for="color in colors" :key="color.id">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button"
                            :id="color.hex" :value="color.id"
                            @click="setFillColor"
                            :class="'drawer-subitem--item w-[40px] h-[40px] '+(player.fillColor == color.id && 'isSelected')">
                            <span
                            :class="'block m-auto '"
                            >
                              <div class="property-fill-color-circle-border" v-if="color.name.toLowerCase() === 'white'">
                                  <div class="property-fill-color-circle" :style="{backgroundColor: color.hex}"></div>
                              </div>
                              <div v-else class="property-fill-color-circle" :style="{backgroundColor: color.hex}"></div>
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
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Stroke Color</span>
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start">
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger type="button" 
                    @click="setOutlineColor" id="NONE" value="0" :class="'drawer-subitem--item w-[40px] h-[40px] '+(player.outlineColor == '0' && 'isSelected')">
                    <span
                    :class="'block m-auto '"
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
          <template  v-for="color in colors" :key="color.id">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button"
                            :id="color.hex" :value="color.id"
                            @click="setOutlineColor"
                            :class="'drawer-subitem--item w-[40px] h-[40px] '+(player.outlineColor == color.id && 'isSelected')">
                            <span
                            :class="'block m-auto '"
                            >
                              <div class="property-outline-color-circle-border" v-if="color.name.toLowerCase() === 'White'">
                                <div class="property-outline-color-circle-border" :style="{ backgroundColor: color.hex }"></div>
                              </div>
                              <div v-else class="property-outline-color-circle" :style="{ backgroundColor: color.hex }"></div>
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
    </div>
</template>

<script setup>
    import { getCurrentInstance, inject, onMounted, ref } from "vue";
    import ArrowLineIcon from "../icons/ArrowLineIcon.vue";
    import BinIcon from "../icons/BinIcon.vue";
    import CurveLineIcon from "../icons/CurveLineIcon.vue";
    import DuplicateIcon from "../icons/DuplicateIcon.vue";
    import FlipIcon from "../icons/FlipIcon.vue";
    import GroupIcon from "../icons/GroupIcon.vue";
    import PlusIcon from "../icons/PlusIcon.vue";
    import UngroupIcon from "../icons/UngroupIcon.vue";
    import PlayerShapeCircleIcon from "../icons/PlayerShapeCircleIcon.vue";
    import PlayerShapeOvalIcon from "../icons/PlayerShapeOvalIcon.vue";
    import PlayerShapePolygon from "../icons/PlayerShapePolygon.vue";
    import PlayerShapeRectangle from "../icons/PlayerShapeRectangle.vue";
    import PlayerShapeSquareIcon from "../icons/PlayerShapeSquareIcon.vue";
    import PlayerShapeSquareTurnedIcon from "../icons/PlayerShapeSquareTurnedIcon.vue";
    import PlayerShapeTriangleIcon from "../icons/PlayerShapeTriangleIcon.vue";
    import PlayerSizeIcon from "../icons/PlayerSizeIcon.vue";
    import LabelColorIcon from "../icons/LabelColorIcon.vue";
    import PlayerShadingCenter from "../icons/PlayerShadingCenter.vue";
    import PlayerShadingLeft from "../icons/PlayerShadingLeft.vue";
    import PlayerShadingRight from "../icons/PlayerShadingRight.vue";
    import EmptyIcon from "../icons/EmptyIcon.vue";

    import {
        Tooltip,
        TooltipContent,
        TooltipProvider,
        TooltipTrigger
    } from '@/components/ui/tooltip'

    // import { playerSize, outlineStyle, outlineThickness, strokeColors } from "@/lib/Editor";
    import { usePlayStore } from "@/stores/play"
    import { outlineStyles, outlineThicknesses,fillShadings,playerShapes,playerSizes,labelColors,colors } from "@/lib/Objects";

    const store = usePlayStore()



    const {player} = defineProps(['player']);

    function giveBallTo() {
        this.$parent.activeItemIsBasketballDefensePlayer ? this.$root.displayErrorMessage("The ball cannot be given to defense players.") : this.$parent.activePlayerObject ? (window.pbt.paperPlayEditor.giveBallToPlayer(),
        this.$parent.isDirty = !0) : this.$root.displayErrorMessage("Please select the player you want to give the ball to first by clicking on that player on the frame.")
    }
    function setLabelText(e) {
        if(store.activeItemHasPlayerObjects()){
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "text", player.labelText);
            store.isDirty = !0;
        }else
            // this.$root.displayErrorMessage("Please select at least one player first, then try again.")
            console.error("Please select at least one player first, then try again.")
    }
    function setPlayerSpeed(e) {
        this.$parent.activeItemHasPlayerObjects() ? (window.pbt.paperPlayEditor.updatePlayerSpeed(null, player.speed),
        this.$parent.isDirty = !0) : this.$root.displayErrorMessage("Please select at least one player first, then try again.")
    }
    function setLabelColor(e) {
        if (store.activeItemHasPlayerObjects()) {
            var t = e.currentTarget.id;
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "textColor", t),
            store.tabData.player.labelColor = e.currentTarget.value,
            store.isDirty = !0
        } else
            this.$root.displayErrorMessage("Please select at least one player first, then try again.")
    }
    function setPlayerSize(e) {
        window.pbt.paperPlayEditor.updatePlayerSize(e),
        store.tabData.player.playerSize = e.id,
        store.isDirty = !0
    }
    function setPlayerShape(e) {
        if (store.activeItemHasPlayerObjects()) {
            var t = e.type.toUpperCase();
            "DEFENSIVE_PLAYER" == t && (window.pbt.paperPlayEditor.applyPlayerStyle(null, "fillColor", null),
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "strokeColor", null),
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "strokeWidth", 1),
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "text", "E"),
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "fontSize", 31),
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "playerShapeWidth", 50),
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "playerShapeHeight", 33)),
            "BASKETBALL_PLAYER" == t && window.pbt.paperPlayEditor.applyPlayerStyle(null, "text", e.playerNumber.toString()),
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "shapeType", t),
            store.tabData.player.playerShape = e.id;
            store.isDirty = !0
        } else
            console.error("Please select at least one player first, then try again.")
            // this.$root.displayErrorMessage("Please select at least one player first, then try again.")
    }
    function setFillColor(e) {
        if (store.activeItemHasPlayerObjects()) {
            var t = e.currentTarget.id;
            "NONE" == t && (t = null),
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "fillColor", t),
            store.tabData.player.fillColor = e.currentTarget.value,
            store.isDirty = !0
        } else
            // this.$root.displayErrorMessage("Please select at least one player first, then try again.")
            console.error("Please select at least one player first, then try again.")
    }
    function setFillShading(e) {
        if (store.activeItemHasPlayerObjects()) {
            var t = e.currentTarget.id;
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "shadowStyle", t),
            store.tabData.player.fillShading = e.currentTarget.value,
            store.isDirty = !0
        } else
            // this.$root.displayErrorMessage("Please select at least one player first, then try again.")
            console.error("Please select at least one player first, then try again.")
    }
    function setOutlineThickness(e) {
        if (store.activeItemHasPlayerObjects()) {
            var t = Number(e.width);
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "strokeWidth", t),
            store.tabData.player.outlineThickness = e.id,
            store.isDirty = !0
        } else
            // this.$root.displayErrorMessage("Please select at least one player first, then try again.")
            console.error("Please select at least one player first, then try again.")
    }
    function setOutlineStyle(e) {
        if (store.activeItemHasPlayerObjects()) {
            var t = e.currentTarget.dataset.text;
            console.log("T",t,e.currentTarget.id,store.tabData.player.outlineStyle)
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "strokeStyle", t);
            store.tabData.player.outlineStyle = e.currentTarget.id;
            store.isDirty = !0;
        } else
            console.error("Please select at least one player first, then try again.")
            // this.$root.displayErrorMessage("Please select at least one player first, then try again.")
    }
    function setOutlineColor(e) {
        if (store.activeItemHasPlayerObjects()) {
            var t = e.currentTarget.id;
            "NONE" == t && (t = null),
            window.pbt.paperPlayEditor.applyPlayerStyle(null, "strokeColor", t),
            store.tabData.player.outlineColor = e.currentTarget.value,
            store.isDirty = !0
        } else
            // this.$root.displayErrorMessage("Please select at least one player first, then try again.")
            console.error("Please select at least one player first, then try again.")
    }

</script>
