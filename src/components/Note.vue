<template>
  <div class="absolute"
       :class="{ 'dragging': isDragging }"
       :style="{ top: note.y + 'px', left: note.x + 'px'}"
       @mousedown="onMouseDown"
       @mouseup="onMouseUp">
    <div v-if="showButtons" class="absolute z-20 top-[-45px] left-[35px] flex items-center justify-center p-2 rounded-md">
      <button @click="pin" class="context-button p-2 rounded-r-none">
        <img :src="pinIcon" alt="pin" class="h-4 w-4"/>
      </button>
      <button @click="deleteNote" class="context-button rounded-l-none">
        <img :src="deleteIcon" alt="delete" class="h-4 w-4"/>
      </button>
    </div>
    <div v-if="note.pinned"
         class="absolute z-10 top-[-15px] left-[30px] h-[30px] w-[6rem] bg-purple-note border-2 border-white"></div>
    <div class="cursor-pointer w-[10rem] h-[10rem] shadow-lg opacity-1 z-0 pt-3.5"
         :style="{backgroundColor: note.color}"
         @click="onClick">
      <textarea v-model="note.note"
                class="note-textarea p-2 text-black cursor-default"
                @input="onNoteTextChange"
                placeholder="Введите текст"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import pinIcon from '@/assets/pin-icon.svg';
import deleteIcon from '@/assets/delete-icon.svg';

import {INote} from "@/store/models/Note";
import {ref} from "vue";
import {useDeskStore} from "@/store/DeskStore";

const props = defineProps<{
  deskId: number;
  note: INote;
}>();

const {updateNoteInDesk, deleteNoteInDesk} = useDeskStore();

const note = props.note;
const isDragging = ref(false);
const showButtons = ref(false);

let offsetX = 0;
let offsetY = 0;

const onMouseDown = (event: MouseEvent) => {
  if (note.pinned) return;

  offsetX = event.clientX - note.x;
  offsetY = event.clientY - note.y;

  isDragging.value = true;

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event: MouseEvent) => {
  if (!isDragging.value) return;

  note.x = event.clientX - offsetX;
  note.y = event.clientY - offsetY;
};

const onMouseUp = () => {
  isDragging.value = false;

  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);

  updateNoteInDesk(props.deskId, note);
};

const onClick = () => {
  showButtons.value = !showButtons.value;
};

const onNoteTextChange = () => {
  updateNoteInDesk(props.deskId, note); // Сохраняем текст при изменении
};

const pin = () => {
  note.pinned = !note.pinned;
  showButtons.value = false;
  updateNoteInDesk(props.deskId, note);
};

const deleteNote = () => {
  deleteNoteInDesk(props.deskId, note.id);
}
</script>

<style scoped>
.context-button {
  @apply bg-[#242424] p-2;
}
.context-button:hover {
  @apply bg-[#353535] border-transparent outline-none cursor-pointer;
}

.dragging {
  cursor: grabbing !important;
}

.note-textarea {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  resize: none;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  outline: none;
}
</style>
