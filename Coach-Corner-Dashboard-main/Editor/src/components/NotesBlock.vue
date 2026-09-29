<script>

export default {

}
</script>

<template>
    <div class="drawer-item p-3 basis-full md:basis-1/3">
      <div class="drawer-subitem mb-6">
        <div class="drawer-subitem-items mb-3">
          <label htmlFor="name" class="text-gray-500">Title</label>
          <input
            name="name"
            id="name"
            class="input--field rounded bg-slate-50"
            placeholder="Text"
          />
        </div>
        <div class="drawer-subitem-items flex items-center flex-wrap justify-start gap-3 mb-3">
          <textarea
            name="name"
            id="name"
            class="input--field rounded bg-slate-50"
            rows="4"
            placeholder="Text"
          ></textarea>
        </div>
        <div class="flex items-center justify-end">
          <button class="btn btn--primary">Save</button>
        </div>
      </div>
    </div>
</template>