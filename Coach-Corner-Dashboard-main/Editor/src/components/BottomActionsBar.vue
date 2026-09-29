<script setup>

import TextIcon from './icons/TextIcon.vue';
import PlayerIcon from './icons/PlayerIcon.vue';
import LineIcon from './icons/LineIcon.vue';
import SymbolIcon from './icons/SymbolIcon.vue';
import NotesIcon from './icons/NotesIcon.vue';
import VideoIcon from './icons/VideoIcon.vue';
import IconChevronRight from './icons/IconChevronRight.vue';
import PlayerActions from './PlayerActions.vue';
import PlayerSizeShape from "./PlayerSizeShape.vue";
import TextShadeStyle from "./TextShadeStyle.vue";
import OutlineStyle from "./OutlineStyle.vue";
import FillStoreColor from "./FillStoreColor.vue";
import CloseIcon from './icons/CloseIcon.vue';

import ThicknessStyle from "./ThicknessStyle.vue";
import LineColorEndPoint from "./LineColorEndPoint.vue";
import TextBlockActions from "./TextBlockActions.vue";
import TextBlockInput from "./TextBlockInput.vue";
import TextFormatSize from "./TextFormatSize.vue";
import TextBlockColor from "./TextBlockColor.vue";
import SymbolActionBlock from "./SymbolActionBlock.vue";
import NotesBlock from "./NotesBlock.vue";
import VideoListBlock from "./VideoListBlock.vue";
import AddVideoBlock from "./AddVideoBlock.vue";
import PlayerTabComponent from './play/PlayerTabComponent.vue';

import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";
import { reactive, ref } from 'vue';

const actionButtons = [
  {
    id: 1,
    name: "Player",
    val: "player",
    icon: PlayerIcon,
  },
  {
    id: 2,
    name: "Line",
    val: "line",
    icon: LineIcon,
  },
  {
    id: 3,
    name: "Text",
    val: "text",
    icon: TextIcon,
  },
  {
    id: 4,
    name: "Symbol",
    val: "symbol",
    icon: SymbolIcon,
  },
  {
    id: 5,
    name: "Notes",
    val: "notes",
    icon: NotesIcon,
  },
  {
    id: 6,
    name: "Video",
    val: "video",
    icon: VideoIcon,
  },
];

    
    const open = ref(false);
    const selectedAction = reactive({
      id: actionButtons[0].id,
      name: actionButtons[0].name,
      val:  actionButtons[0].val,
      icon: actionButtons[0].icon
    })


    const handleObjectChange = function(newVal){
        const abc = actionButtons.find((btn)=>btn.name == newVal.name);
        console.log("Value>>",newVal,selectedAction)
        open.value = !open.value;
        selectedAction.id = abc.id;
        selectedAction.name = abc.name;
        selectedAction.val = abc.val;
        selectedAction.icon = abc.icon;
    }

</script>


<template>
    <div class="editor-bottom-bar w-full bg-tertiary p-3">
        <div class="flex items-center justify-center md:justify-between md:px-4">
          <div class="bottom-bar-actions flex justify-start gap-2">

                <button
                  type="button" 
                  v-for="button in actionButtons" :key="button?.id"
                  :class="['bottom-bar-btn flex flex-col items-center gap-2 justify-center cursor-pointer border border-primary rounded', 
                      selectedAction?.val == button.val
                      ? 'bg-primary text-white'
                      : 'bg-transparent text-primary']"
                  :data-selected="selectedAction?.val === button?.val"
                  @click="handleObjectChange(button)"
                >
                  <component :is="button?.icon"/>
                  <span class="font-semibold">{{button?.name}}</span>
                </button>


          </div>
          <div class="second-part hidden md:flex items-center justify-center w-full basis-5/12 gap-3 border-l border-[#B7C9DB] ">
            <div class="h-full w-full mt-6 ps-3 block">
              <div class="bg-themeSoftBg flex items-center gap-1 p-2 justify-between rounded">
                <label
                  htmlFor="line-scrimmage"
                  class="p-0 m-0 cursor-pointer text-base text-primary"
                >
                  Line of Scrimmage
                </label>
                <Switch id="line-scrimmage" class="m-0" />
              </div>
            </div>
            <div class="block w-full px-3 type-player">
              <span class="mb-2 text-gray-700 text-sm">Type of play</span>
              <div class="editor-secondary-header-field-background-select">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer v-model:open="open">
        <DrawerContent class="">
          <div class="absolute -top-10 left-5 vaul-sticky-close px-3 pt-1">
            <DrawerClose class="px-5 pt-2 pb-1 flex items-center justify-center gap-2">
              <div class="flex items-center justify-start gap-2">
                <component :is="selectedAction?.icon"/>
                <span class="capitalize">{{selectedAction?.name}}</span>
              </div>
              <IconChevronRight classes="rotate-90" />
              <CloseIcon />
            </DrawerClose>
          </div>
          <DrawerHeader>
            <div class="drawer-content flex items-start flex-wrap xl:flex-nowrap justify-start w-full" :data-value="selectedAction.val">
              <template v-if="selectedAction?.val== 'player'" >
                  <!-- <PlayerActions />
                  <PlayerSizeShape />
                  <TextShadeStyle />
                  <OutlineStyle />
                  <FillStoreColor /> -->
                  <player-tab-component :player="player"/>
              </template>
              <template v-else-if="selectedAction?.val== 'line'">
                  <PlayerActions />
                  <ThicknessStyle />
                  <LineColorEndPoint />
              </template>
              <template v-else-if="selectedAction?.val == 'text'">
                  <TextBlockActions />
                  <TextBlockInput />
                  <TextFormatSize />
                  <TextBlockColor />
              </template>
              <template v-else-if="selectedAction?.val == 'symbol'">
                  <SymbolActionBlock />
              </template>
              <template v-else-if="selectedAction?.val == 'notes'">
                  <NotesBlock />
              </template>
              <template v-else-if="selectedAction?.val == 'video'">
                  <VideoListBlock />
                  <AddVideoBlock />
              </template>
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
</template>