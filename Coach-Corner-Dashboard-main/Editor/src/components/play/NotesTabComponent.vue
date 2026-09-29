<template>
    <div class="drawer-item mb-6 p-3">
        <button class="btn btn--primary" :disabled="store.saving || !store.play"
        @click="addNoteSection">Add Note Section</button>
    </div>
    <template v-for="(note,index) in store.notes">
      <div class="drawer-item p-3 basis-full md:basis-1/3" v-bind:key="note.id" v-if="note?.status !== 'Deleted'">
        <div class="drawer-subitem mb-6" >
          <div class="drawer-subitem-items mb-3">
            <div class="flex justify-between">
              <label htmlFor="name" class="text-gray-500">Title</label>
              <button class="cursor-pointer" @click="(e)=>removeNoteSection(e,index)">
                  <BinIcon/>
              </button>
            </div>
            <input
              name="name"
              id="name"
              class="input--field rounded bg-slate-50"
              placeholder="Title"
              :value="note.title"
              @click="()=>store.isDirty = !0"
              @input="(t)=>updateNoteTitle(t,index)"
            />
          </div>
          <div class="drawer-subitem-items flex items-center flex-wrap justify-start gap-3 mb-3" @click="store.isDirty = !0">
            <TextEditorComponent :value="note.body" v-on:input="(t)=>updateNoteContent(t,index)" editorType="play-editor" :notesEditorMode="state.notesEditorMode" :notesTemplates="store.user.notes_templates"/>
          </div>
        </div>
      </div>
    </template>
    <div  v-if="!store.notes.length" class="drawer-item p-3 basis-full">
      <p>No notes added.</p>
    </div>
</template>

<script setup>
    import BinIcon from "../icons/BinIcon.vue";
    import { defineProps, ref, watch } from 'vue';
    import { usePlayStore } from '@/stores/play';
    import TextEditorComponent from "../TextEditorComponent.vue";
    const store = usePlayStore()
    const state = ref({
        selectedText: "",
        notes: store.notes,
        notesEditorMode: "quarter-screen"
    })
    
    const {notesData} = defineProps(['notesData'])

    function addNoteSection() {
        store.isDirty = !0,
        store.notes.push({
            id: 0,
            title: "Coaching Notes",
            body: "Enter notes here..."
        })
    }
    function removeNoteSection(e, t) {
        store.isDirty = !0,
        store.notes = store.notes.map((function(v,i){
          if(i === t) return {...v,status:'Deleted'}
          return v;
        }))
    }

    function updateNoteContent(t,index){
      store.isDirty = !0,
      store.notes = store.notes.map((function(v,i){
        if(i === index) return {...v,body:t,status:'Updated'}
        return v;
      }))
    }

    function updateNoteTitle(t,index){
      store.isDirty = !0,
      store.notes = store.notes.map(function(v,i){
        if(i === index) return {...v,title:t.target.value,status:'Updated'}
        return v;
      })
    }

    defineExpose({
      state
    })

</script>
