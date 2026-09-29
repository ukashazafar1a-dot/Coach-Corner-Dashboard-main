<template>
    <div class="drawer-item p-3 basis-full md:basis-1/3 flex-shrink-0 md:border-l border-[#dddddd]">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Add New Video
        </div>
        <div class="drawer-subitem-items mb-3">
          <label htmlFor="name" class="text-gray-500">Title</label>
          <input
            name="name"
            id="name"
            class="input--field rounded bg-slate-50"
            placeholder="Text"
          />
        </div>
        <div class="p-2 bg-slate-100 border rounded flex items-center justify-center mb-4">
          <div class="py-8">
            <div class="flex items-center justify-center gap-2">
              <IconUpload />
              <span class="text-[#949494]">Upload Video</span>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end">
          <button class="btn btn--primary">Save</button>
        </div>
      </div>
    </div>
</template>

<script>
import IconUpload from "./icons/IconUpload.vue";
export default {

}
</script>
