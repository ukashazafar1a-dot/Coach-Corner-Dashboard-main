<template>
    <div v-if="editor" class="notes-editor border editor-height-small play-editor p-2">
        <div class="container-fluid bg-light">
            <div class="row py-2 border-bottom">
                <div class="col-12">
                    <button type="button" class="btn btn-success"><i class="fas fa-save mr-1" aria-hidden="true"></i>Save as Notes Template<i class="fas fa-question-circle ml-1" data-original-title="" title="" aria-hidden="true"></i></button>
                </div> 
                <div class="col-12">
                    <div class="my-2">
                        <Select name="notes_template_id">
                            <SelectTrigger>
                            <SelectValue placeholder="-- Select a Notes Template --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="3535">Coches notes</SelectItem>
                                <SelectItem value="3542">Sample Notes</SelectItem>
                                <SelectItem value="5183">Softball</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="float-left"><small>
                        <a href="/notes-templates" target="_blank">
							Manage <br>Notes Templates
                        </a>
                    </small></div> 
                    <button type="button" class="btn btn-info float-right disabled" data-original-title="" title="">Insert <br>Template</button>
                </div>
            </div> 
            <div class="grid grid-cols-6 py-2 text-center w-full mt-3">
                <div class="col-2">
                    <button type="button" :class="['btn', 'btn-text-editor', editor.isActive('bold') && 'active']" @click="editor.chain().focus().toggleBold().run()" data-original-title="" title=""><i class="far fa-bold" aria-hidden="true"></i></button>
                </div> 
                <div class="col-2">
                    <button type="button" :class="['btn', 'btn-text-editor', editor.isActive('italic') && 'active']" @click="editor.chain().focus().toggleItalic().run()" data-original-title="" title=""><i class="far fa-italic" aria-hidden="true"></i></button>
                </div> 
                <div class="col-2">
                    <button type="button" :class="['btn', 'btn-text-editor', editor.isActive('underline') && 'active']" @click="editor.chain().focus().toggleUnderline().run()" data-original-title="" title=""><i class="far fa-underline" aria-hidden="true"></i></button>
                </div> 
                <div class="col-2">
                    <button type="button" :class="['btn', 'btn-text-editor', editor.isActive('heading',{level: 3}) && 'active']" @click="editor.chain().focus().toggleHeading({level: 3}).run()" data-original-title="" title=""><i class="far fa-line-height" aria-hidden="true"></i></button>
                </div> 
                <div class="col-2">
                    <button type="button" :class="['btn', 'btn-text-editor', editor.isActive('heading',{level: 3}) && 'active']" @click="editor.chain().focus().toggleHeading({level: 3}).run()" data-original-title="" title="">h3</button>
                </div>
                <div class="col-2">
                    <button type="button" :class="['btn', 'btn-text-editor', editor.isActive('heading',{level: 4}) && 'active']" @click="editor.chain().focus().toggleHeading({level: 4}).run()" data-original-title="" title="">h4</button>
                </div>
                <div class="col-2">
                    <button type="button" :class="['btn', 'btn-text-editor', editor.isActive('bulletList') && 'active']" @click="editor.chain().focus().toggleBulletList().run()" data-original-title="" title=""><i class="far fa-list-ul" aria-hidden="true"></i></button>
                </div>
                <div class="col-2">
                    <button type="button" :class="['btn', 'btn-text-editor', editor.isActive('orderedList') && 'active']" @click="editor.chain().focus().toggleOrderedList().run()" data-original-title="" title=""><i class="far fa-list-ol" aria-hidden="true"></i></button>
                </div>
                <div class="col-2">
                    <button type="button" :class="['btn', 'btn-text-editor', editor.isActive({textAlign:'left'}) && 'active']" @click="editor.chain().focus().setTextAlign('left').run()" data-original-title="" title=""><i class="far fa-align-left" aria-hidden="true"></i></button>
                </div>
                <div class="col-2">
                    <button type="button" :class="['btn', 'btn-text-editor', editor.isActive({textAlign: 'center'}) && 'active']" @click="editor.chain().focus().setTextAlign('center').run()" data-original-title="" title=""><i class="far fa-align-center" aria-hidden="true"></i></button>
                </div>
                <div class="col-2">
                    <button type="button" :class="['btn', 'btn-text-editor', editor.isActive({textAlign: 'right'}) && 'active']" @click="editor.chain().focus().setTextAlign('right').run()" data-original-title="" title=""><i class="far fa-align-right" aria-hidden="true"></i></button>
                </div>
                <div class="col-2">
                    <button type="button" :class="['btn', 'btn-text-editor', editor.isActive({textAlign: 'justify'}) && 'active']" @click="editor.chain().focus().setTextAlign('justify').run()" data-original-title="" title=""><i class="far fa-align-justify" aria-hidden="true"></i></button>
                </div>
            </div>
            <div class="grid grid-cols-6 py-2 text-center w-full mt-3">
                <div class="col-2">
                    <button type="button" class="btn btn-text-editor" @click="editor.chain().focus().insertTable({rows: 13,cols: 4,withHeaderRow: !0}).run()"><i class="fal fa-table fa-lg text-success" aria-hidden="true"></i></button>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-text-editor" @click="editor.chain().focus().addColumnBefore().run()"><i class="fad fa-line-columns" aria-hidden="true"></i></button>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-text-editor" @click="editor.chain().focus().addColumnAfter().run()"><i class="fad fa-line-columns fa-rotate-180" aria-hidden="true"></i></button>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-text-editor" @click="editor.chain().focus().deleteColumn().run()"><span class="fa-stack"><i class="far fa-times fa-stack-1x text-danger" aria-hidden="true"></i> <i class="fal fa-line-columns fa-stack-1x" aria-hidden="true"></i></span></button>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-text-editor" @click="editor.chain().focus().addRowBefore().run()"><i class="fad fa-grip-lines fa-lg" aria-hidden="true"></i></button>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-text-editor" @click="editor.chain().focus().addRowAfter().run()"><i class="fad fa-grip-lines fa-lg fa-rotate-180" aria-hidden="true"></i></button>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-text-editor" @click="editor.chain().focus().deleteRow().run()"><span class="fa-stack"><i class="far fa-times fa-stack-1x text-danger" aria-hidden="true"></i> <i class="fal fa-grip-lines fa-stack-1x" aria-hidden="true"></i></span></button>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-text-editor" @click="editor.chain().focus().mergeCells().run()"><i class="far fa-object-group" aria-hidden="true"></i></button>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-text-editor" @click="editor.chain().focus().splitCell().run()"><i class="far fa-object-ungroup" aria-hidden="true"></i></button>
                </div>
                <!-- <div class="col-2">
                    <button type="button" class="btn btn-text-editor" @click="editor.chain().focus().undo().run()"><i class="far fa-horizontal-rule" aria-hidden="true"></i></button>
                </div> -->
                <div class="col-2">
                    <button type="button" class="btn btn-text-editor" @click="editor.chain().focus().undo().run()"><i class="far fa-undo" aria-hidden="true"></i></button>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-text-editor" @click="editor.chain().focus().redo().run()"><i class="far fa-redo" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
        <div>
            <editor-content :editor="editor"/>
        </div>
    </div>
</template>

<script setup>
    import { ref,defineProps,defineEmits, watch } from 'vue'
    import { useEditor,EditorContent } from '@tiptap/vue-3'
    import Document from '@tiptap/extension-document'
    import Paragraph from '@tiptap/extension-paragraph'
    import TextAlign from '@tiptap/extension-text-align'
    import GapCursor from '@tiptap/extension-gapcursor'
    import Text from '@tiptap/extension-text'
    import Table from '@tiptap/extension-table'
    import TableRow from '@tiptap/extension-table-row'
    import TableCell from '@tiptap/extension-table-cell'
    import TableHeader from '@tiptap/extension-table-header'
    import StarterKit from '@tiptap/starter-kit'

    import {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectLabel,
        SelectTrigger,
        SelectValue,
    } from '@/components/ui/select'

    const {value,notesEditorMode,editorHeightClass,editorId,editorType,enableNotesTemplates,showTableFunctions,notesTemplates,editorStyle} = 
        defineProps(['notesEditorMode','value','editorHeightClass','editorId','editorType','enableNotesTemplates','showTableFunctions','notesTemplates','editorStyle'])

    const notesTemplateId = ref(null)
    const dataNotesTemplates = ref(notesTemplates ? notesTemplates : [])

    watch(()=>value,(newVal)=>{
        editor.value.getHTML() === newVal || editor.value.commands.setContent(this.value, !1)
    })

    const emit = defineEmits(['input'])

    const editor = useEditor({
        // content: value,
        content: value,
        // extensions: [StarterKit,GapCursor,Document, Paragraph, Text],
        extensions: [StarterKit.configure({
            heading: {
                levels: [1,2,3],
            },
        }),TextAlign.configure({
            types:['heading','paragraph'] 
        }),
        Table.configure({
            resizable: !0,
            allowTableNodeSelection: !0
        }),TableRow,TableHeader,TableCell],
        onUpdate: function(){
            emit('input',editor.value.getHTML())
        }
    })
</script>
