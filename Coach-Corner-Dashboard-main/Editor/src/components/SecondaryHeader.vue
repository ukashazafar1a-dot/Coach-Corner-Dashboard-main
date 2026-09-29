<script setup lang="ts">
  import UndoIcon from './icons/UndoIcon.vue';
  import ZoomIn from './icons/ZoomIn.vue';
  import ZoomOut from './icons/ZoomOut.vue';
  import FlipIcon from './icons/FlipIcon.vue';
  import BringToBackIcon from './icons/BringToBackIcon.vue';
  import BringToFrontIcon from './icons/BringToFrontIcon.vue';
  import IconRedo from './icons/IconRedo.vue';

  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from '@/components/ui/popover'

  import IconChevronRight from './icons/IconChevronRight.vue';
  import { usePlayStore } from '@/stores/play';
  import { computed, ref, watch,defineEmits } from 'vue';
  import { Switch } from "@/components/ui/switch";

  const emit = defineEmits(['changeSportsField'])

  const store = usePlayStore();

  const selectedSportsFieldId = ref(store.selectedSportsFieldId.toString())

  const selectedIndex = computed(()=>{
      return store.zoomLevels.findIndex(
        (zoom:any) => zoom.zoomLevel === store.selectedZoomLevel
      );
  });

  watch(
    selectedSportsFieldId,
    (value:any,oldValue:any)=>{
      console.log("Value",value)
      store.selectedSportsFieldId = value;
      emit('changeSportsField')
    }
  )

  watch(
    ()=>store.selectedZoomLevel,
    (value:any,oldValue:any)=>{
      store.changeZoomLevel()
    }
  )

  function increaseZoom() {
    if (selectedIndex.value < store.zoomLevels.length - 1) {
      store.selectedZoomLevel =
        store.zoomLevels[selectedIndex.value + 1].zoomLevel;
    }
  }

  function decreaseZoom() {
    if (selectedIndex.value > 0) {
      store.selectedZoomLevel =
        store.zoomLevels[selectedIndex.value - 1].zoomLevel;
    }
  }
</script>


<template>
    <div id="left-pane-tabs" class="secondary-header-action bg-gray-100 p-2 flex justify-start relative items-center w-full">
      <div class="flex items-center justify-center gap-2 max-editor:hidden">
        <button
          type="button"
          class="px-2 py-1 text-center hover:bg-blue-100 hover:rounded"
          :disabled="store.tab=='notes'"
          @click.prevent="store.undo"
        >
          <UndoIcon classes="mx-auto" />
          <span class="text-sm">Undo</span>
        </button>
        <button
          type="button"
          class="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
          :disabled="store.tab=='notes'"
          @click.prevent="store.redo"
        >
          <IconRedo classes="mx-auto" />
          <span class="text-sm">Redo</span>
        </button>
      </div>
      <div class="min-w-48 2xl:min-w-96">
        <span class="mb-1 text-gray-700 text-sm">Field Background</span>
        <div class="editor-secondary-header-field-background-select">
          <Select v-model="selectedSportsFieldId">
            <SelectTrigger>
              <SelectValue placeholder="Field Background" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="field in store.sports_fields"
                :key="field.id"
                :value="field.id.toString()"
              >
                {{ field.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div class="block zoom-fields basis-full md:basis-auto">
        <span class="mb-1 text-gray-700 text-sm">Zoom</span>
        <div class="flex items-start justify-start gap-1  md:gap-2">
          <button class=""
          :disabled="selectedIndex === store.zoomLevels.length - 1" 
          @click="increaseZoom">
            <ZoomOut />
          </button>
          <input
            class="input--field w-full max-w-16 text-xs md:text-sm"
            type="text"
            :value="store.zoomLevels[selectedIndex].label"
            readonly
          />
          <button :disabled="selectedIndex === 0" 
                  @click="decreaseZoom">
            <ZoomIn />
          </button>
        </div>
      </div>
      <div class="flex items-start justify-start gap-3 max-editor:hidden">
        <button
          type="button"
          class="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
          :disabled="store.tab == 'notes'"
          @click.prevent="store.flipVertical"
        >
          <FlipIcon width="34" height="34" direction="v" classes="mx-auto" />
          <span class="text-sm">Flip V.</span>
        </button>
        <button
          type="button"
          class="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
          :disabled="store.tab == 'notes'"
          @click.prevent="store.flipHorizontal"
        >
          <FlipIcon width="34" height="34" direction="h" classes="mx-auto" />
          <span class="text-sm">Flip H.</span>
        </button>
        <button
          type="button"
          class="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
          :disabled="store.tab == 'notes'"
          @click.prevent="store.bringToFront"
        >
          <BringToFrontIcon />
          <span class="text-sm">Front</span>
        </button>
        <button
          type="button"
          class="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
          :disabled="store.tab == 'notes'"
          @click.prevent="store.sendToBack"
        >
          <BringToBackIcon />
          <span class="text-sm">Back</span>
        </button>
      </div>
      <div class="h-full flex items-center justify-center max-editor:hidden">
        <div class="flex items-center gap-3 p-3">
          <label htmlFor="auto-save" class="p-0 m-0 cursor-pointer">
            Auto Save
          </label>
          <Switch id="auto-save" class="m-0" :checked="!!store.enableAutoSave" @update:checked="store.toggleAutoSave" />
        </div>
      </div>
      <div class="h-full hidden max-editor:flex items-end justify-end">
        <Popover>
          <PopoverTrigger class="py-3">
            <IconChevronRight classes="w-4 h-4 rotate-90 fill-primary stroke-primary text-primary"/>
          </PopoverTrigger>
          <PopoverContent class="p-3 bg-zinc-100 w-52">
            <div class="block w-full">
              <div class="flex items-center gap-3 p-3 justify-between">
                <label htmlFor="auto-save" class="p-0 m-0 cursor-pointer">
                  Auto Save
                </label>
                <Switch id="auto-save" class="m-0" />
              </div>
              <hr class="bg-gray-100 my-1" />
              <div class="flex items-center justify-center gap-2">
                <button
                  type="button"
                  class="px-2 py-1 text-center hover:bg-blue-100 hover:rounded"
                >
                  <UndoIcon classes="mx-auto" />
                  <span class="text-sm">Undo</span>
                </button>
                <button
                  type="button"
                  class="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
                >
                  <IconRedo classes="mx-auto" />
                  <span class="text-sm">Redo</span>
                </button>
              </div>
              <hr class="bg-gray-100 my-1" />
              <div class="flex items-start justify-center gap-3">
                <button
                  type="button"
                  class="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
                >
                  <FlipIcon
                    width="34"
                    height="34"
                    direction="v"
                    classes="mx-auto"
                  />
                  <span class="text-sm">Flip V.</span>
                </button>
                <button
                  type="button"
                  class="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
                >
                  <FlipIcon
                    width="34"
                    height="34"
                    direction="h"
                    classes="mx-auto"
                  />
                  <span class="text-sm">Flip H.</span>
                </button>
              </div>
              <hr class="bg-gray-100 my-1" />
              <div class="flex items-start justify-center gap-3">
                <button
                  type="button"
                  class="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
                >
                  <BringToFrontIcon />
                  <span class="text-sm">Front</span>
                </button>
                <button
                  type="button"
                  class="px-2 py-1  text-center hover:bg-blue-100 hover:rounded"
                >
                  <BringToBackIcon />
                  <span class="text-sm">Back</span>
                </button>
              </div>
              <hr class="bg-gray-100 my-1" />
              <div class="py-2">
                <div class="bg-themeSoftBg flex items-center gap-1 p-1 justify-between rounded">
                  <label
                    htmlFor="line-scrimmage"
                    class="p-0 m-0 cursor-pointer text-xs text-primary"
                  >
                    Line of Scrimmage
                  </label>
                  <Switch id="line-scrimmage" class="m-0" />
                </div>
              </div>
              <hr class="bg-gray-100 my-1" />
              <div class="block w-full">
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
          </PopoverContent>
        </Popover>
      </div>
    </div>
</template>
