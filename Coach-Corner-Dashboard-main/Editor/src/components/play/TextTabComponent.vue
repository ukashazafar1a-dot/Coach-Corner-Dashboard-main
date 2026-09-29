<template>
  <div className="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] md:max-w-80 lg:min-w-80">
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
        :disabled="store.saving" @click="(t)=>store.addText()"
      >
        <PlusIcon />
        <span className="text-sm text-primary ml-[5px]">Add Text Box</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
        :disabled="store.saving" @click="(t)=>store.removeItem()"
      >
        <BinIcon />
        <span className="text-sm text-primary ml-[5px]">Remove</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
        :disabled="store.saving" @click="(t)=>store.flipObject()"
      >
        <FlipIcon width="18" height="18" direction="h" />
        <span className="text-sm text-primary ml-[5px]">Flip Object</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
        :disabled="store.saving" @click="(t)=>store.duplicateItem()"
      >
        <DuplicateIcon />
        <span className="text-sm text-primary ml-[5px]">Duplicate</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
        :disabled="store.saving" @click="(t)=>store.groupItem()"
      >
        <GroupIcon />
        <span className="text-sm text-primary ml-[5px]">Group</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center bg-themeSoftBg rounded py-2 px-2 min-w-[130px]"
        :disabled="store.saving" @click="(t)=>store.ungroupItem()"
      >
        <UngroupIcon />
        <span className="text-sm text-primary ml-[5px]">Ungroup</span>
      </button>
    </div>
  </div>
  <div v-show="!store.activeItemHasTextBox()" class="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full md:basis-1/3">
    <div class="drawer-subitem mb-6">
        <i></i>Add or select a text box to see text editing options here.
    </div>
  </div>
  <div v-show="store.activeItemHasTextBox()" class="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full md:basis-1/3">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Text
        </div>
        <div class="drawer-subitem-items flex items-center flex-wrap justify-start gap-3">
           <textarea name="name" id="textBoxEditor" class='input--field rounded bg-slate-50' rows="5" placeholder='Text'
             @keydown="setText"
             @keyup="setText"
             @change="setText"
             @focus="store.disableOnKeyDownHandler"
             @blur="store.disableOnKeyDownHandler"
           ></textarea>
        </div>
      </div>
  </div>
  <div v-show="store.activeItemHasTextBox()" class="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full md:basis-1/3">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Size
        </div>
        <div class="drawer-subitem-items flex flex-wrap items-center justify-start">
            <template  v-for="fontSize in fontSizes" :key="fontSize.id">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="button" @click="setTextSize" :id="fontSize.size" :value="fontSize.id" :class="'drawer-subitem--item w-[40px] h-[40px] '+(text.size == fontSize.id && 'isSelected')">
                            <span
                            :class="'block m-auto '+ fontSize.className"
                            >
                            <span class="sr-only">{{fontSize.label}}</span>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            {{ fontSize.label }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </template>
        </div>
      </div>
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Format
        </div>
        <div class="drawer-subitem-items flex items-center flex-wrap justify-start gap-3">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setTextFormat" id="normal" value="true" :class="'drawer-subitem--item w-[40px] h-[40px] '+(text.format.none == 'true' && 'isSelected')">
                        <span
                        :class="'block m-auto'"
                        >
                            <div class="property-none"></div>
                            <span class="sr-only">None</span>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>None</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setTextFormat" id="bold" value="true" :class="'drawer-subitem--item w-[40px] h-[40px] '+(text.format.bold == 'true' && 'isSelected')">
                        <span
                        :class="'block m-auto'"
                        >
                            <div class="property-text-format-bold"></div>
                            <span class="sr-only">Bold</span>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>Bold</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setTextFormat" id="italic" value="true" :class="'drawer-subitem--item w-[40px] h-[40px] '+(text.format.italic == 'true' && 'isSelected')">
                        <span
                        :class="'block m-auto'"
                        >
                            <div class="property-text-format-italic"></div>
                            <span class="sr-only">italic</span>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>Italic</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setTextFormat" id="underline" value="true" :class="'drawer-subitem--item w-[40px] h-[40px] '+(text.format.underline == 'true' && 'isSelected')">
                        <span
                        :class="'block m-auto'"
                        >
                            <div class="property-text-format-underline"></div>
                            <span class="sr-only">underline</span>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>Underline</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
      </div>
  </div>
  <div v-show="store.activeItemHasTextBox()" className="drawer-item pb-3 md:p-4 basis-full">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Text Color</span>
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start">
          <template  v-for="color in textColors" :key="color.id">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setTextColor" :id="color.hex" :value="color.id" :class="'drawer-subitem--item w-[40px] h-[40px] '+(text.color == color.id && 'isSelected')">
                        <span
                        :class="'block m-auto '"
                        >
                          <div v-if="color.name.toLowerCase() === 'white'" class="property-text-color-21pt-border">
                            <div class="property-text-color-21pt"></div>
                          </div>
                          <div v-else class="property-text-color-21pt" :style="{backgroundColor: color.hex}"></div>
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
          <span>Background Color</span>
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start">
          <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setTextBackgroundColor" id="transparent" value="0" :class="'drawer-subitem--item w-[40px] h-[40px] '+(text.backgroundColor == '0' && 'isSelected')">
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
          <template  v-for="color in textColors" :key="color.id">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setTextBackgroundColor" :id="color.hex" :value="color.id" :class="'drawer-subitem--item w-[40px] h-[40px] '+(text.backgroundColor == color.id && 'isSelected')">
                        <span
                        :class="'block m-auto '"
                        >
                           <div v-if="color.name.toLowerCase() === 'white'" class="property-fill-color-rectangle-border">
                              <div class="property-fill-color-rectangle"></div>
                           </div>
                           <div v-else class="property-fill-color-rectangle" :style="{backgroundColor: color.hex}"></div>
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
          <span>Border Color</span>
        </div>
        <div className="drawer-subitem-items flex flex-wrap items-center justify-start">
          <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setTextBorderColor" id="transparent" value="0" :class="'drawer-subitem--item w-[40px] h-[40px] '+(text.borderColor == '0' && 'isSelected')">
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
          <template  v-for="color in textColors" :key="color.id">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger type="button" @click="setTextBorderColor" :id="color.hex" :value="color.id" :class="'drawer-subitem--item w-[40px] h-[40px] '+(text.borderColor == color.id && 'isSelected')">
                        <span
                        :class="'block m-auto '"
                        >
                           <div class="property-border-color-rectangle-border" v-if="color.name.toLowerCase() === 'white'">
                              <div class="property-border-color-rectangle"></div>
                           </div>
                           <!----> 
                           <div v-else class="property-border-color-rectangle" :style="{backgroundColor: color.hex}"></div>
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
    import ArrowLineIcon from '../icons/ArrowLineIcon.vue';
    import BinIcon from '../icons/BinIcon.vue';
    import CurveLineIcon from '../icons/CurveLineIcon.vue';
    import DuplicateIcon from '../icons/DuplicateIcon.vue';
    import FlipIcon from '../icons/FlipIcon.vue';
    import GroupIcon from '../icons/GroupIcon.vue';
    import PlusIcon from '../icons/PlusIcon.vue';
    import UngroupIcon from '../icons/UngroupIcon.vue';
    import IconTextBold from "../icons/IconTextBold.vue";
    import IconTextItalic from "../icons/IconTextItalic.vue";
    import IconTextSize from "../icons/IconTextSize.vue";
    import IconTextUnderline from "../icons/IconTextUnderline.vue";
    import EmptyIcon from '../icons/EmptyIcon.vue';
    import IconTextColor from '../icons/IconTextColor.vue';
    import { strokeColors } from '@/lib/Editor';
    import { textSize } from "@/lib/Editor";
    import { ref } from 'vue';

    import {
        Tooltip,
        TooltipContent,
        TooltipProvider,
        TooltipTrigger
    } from '@/components/ui/tooltip'

    import { usePlayStore } from '@/stores/play';
    import { fontSizes,textColors } from '@/lib/Objects';
    const store = usePlayStore();
    const strokeColorObj = ref(strokeColors)

    const {text} = defineProps(['text'])

    function setText(e) {
        var t = e.currentTarget.value;
        window.pbt.paperPlayEditor.applyTextBoxStyle(null, "text", t),
        store.isDirty = !0
    }

    function setTextSize(e) {
        var t = e.currentTarget.id;
        window.pbt.paperPlayEditor.applyTextBoxStyle(null, "fontSize", t),
        store.tabData.text.size = e.currentTarget.value,
        store.isDirty = !0
    }

    function setTextFormat(e) {
        var t = e.currentTarget.id;
        window.pbt.paperPlayEditor.updateTextBoxFontStyle(t),
        store.tabData.text.format[t] = e.currentTarget.value,
        console.log("ID",t,'Value',e.currentTarget.value),
        store.isDirty = !0
    }

    function setTextColor(e) {
        var t = e.currentTarget.id;
        window.pbt.paperPlayEditor.applyTextBoxStyle(null, "textColor", t),
        store.tabData.text.color = e.currentTarget.value,
        store.isDirty = !0
    }

    function setTextBackgroundColor(e) {
        window.pbt.paperPlayEditor.updateTextBoxFillColor(e),
        store.tabData.text.backgroundColor = e.currentTarget.value,
        store.isDirty = !0
    }

    function setTextBorderColor(e) {
        var t = e.currentTarget.id;
        "NONE" == t && (t = null),
        window.pbt.paperPlayEditor.applyTextBoxStyle(null, "strokeColor", t),
        store.tabData.text.borderColor = e.currentTarget.value,
        store.isDirty = !0
    }
</script>
