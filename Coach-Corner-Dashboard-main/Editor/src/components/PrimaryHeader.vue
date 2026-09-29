<template>
    <div class="editor-primary-header p-3 flex items-center justify-between text-primary relative w-full">
  <div class="editor-primary-header-wrapper">
      <div v-if="!store.editingPlayName" class="flex items-center justify-start gap-2 md:gap-4">
        <span class="md:px-2 text-base  md:text-xl font-medium two-lines max-sm:w-28 overflow-hidden">{{store.play.name}}</span>
        <span
          class="px-3 flex items-center justify-start gap-2 py-1 text-sm rounded-full bg-blue-200 cursor-pointer"
          @click="store.editingPlayName = !store.editingPlayName"
        >
          <EditIcon />
          <span class="text-primary font-medium">Edit</span>
        </span>
      </div>
      <div v-else class="flex gap-3 items-center overflow-hidden absolute w-full md:static md:w-auto z-1 inset-0 bg-white md:bg-transparent p-2 md:p-0">
        <input
          class="input--field border-gray-300"
          v-model="store.play.name"
          type="text"
          name="title"
          required
          minLength={3}
        />
        <span class="px-3 py-1 bg-blue-300 hover:bg-blue-400 text-white rounded cursor-pointer" @click="store.savePlayName">
          <span>Save</span>
        </span>
      </div>
  </div>
  <button type="button" @click.prevent="(e)=>store.save(!1)" :class="['btn', 'gap-2', 'text-xs', 'md:text-sm', store.isDirty ? 'btn--primary' : 'btn--outline']">
    <CheckIconWithoutCircle v-if="!store.isDirty" />
    <span>Save</span>
  </button>
</div>
</template>

<script setup>

import { ref } from 'vue';
import CheckIconWithoutCircle from './icons/CheckIconWithoutCircle.vue';
import EditIcon from './icons/EditIcon.vue';

import { usePlayStore } from '@/stores/play';

const store = usePlayStore()

</script>