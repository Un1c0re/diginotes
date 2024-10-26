<template>
  <div class="absolute"
       :class="{ 'dragging': isDragging }"
       :style="{ top: note.y + 'px', left: note.x + 'px'}"
       @mousedown="onMouseDown"
       @mouseup="onMouseUp">
    <div v-if="showButtons"
         class="context-buttons">
      <button @click="pin" class="rounded-r-none">
        <img :src="pinIcon" alt="pin" class="h-4 w-4"/>
      </button>
      <button @click="deleteNote" class="rounded-l-none">
        <img :src="deleteIcon" alt="delete" class="h-4 w-4"/>
      </button>
    </div>
    <div v-if="note.pinned" class="note-pin"></div>
    <div class="note-body" :style="{ backgroundColor: note.color }" @click="onClick">
      <textarea v-model="note.note"
                class="note-textarea"
                @input="onNoteTextChange"
                placeholder="Ваша заметка">
      </textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import pinIcon from '@/assets/pin-icon.svg';
import deleteIcon from '@/assets/delete-icon.svg';
import { Note } from "@/store/models/Note";
import { ref } from "vue";
import { useDeskStore } from "@/store/DeskStore";

const props = defineProps<{
  deskId: number;
  note: Note;
}>();

const { updateNoteInDesk, deleteNoteInDesk } = useDeskStore();

const note = props.note;
const isDragging = ref(false);
const showButtons = ref(false);
const hasMoved = ref(false);

let offsetX = 0;
let offsetY = 0;

const onMouseDown = (event: MouseEvent) => {
  if (note.pinned) return;

  offsetX = event.clientX - note.x;
  offsetY = event.clientY - note.y;

  isDragging.value = true;
  hasMoved.value = false;

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event: MouseEvent) => {
  if (!isDragging.value) return;

  hasMoved.value = true;

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
  if (!hasMoved.value) {
    showButtons.value = !showButtons.value;
  }
};

const onNoteTextChange = () => {
  updateNoteInDesk(props.deskId, note);
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
.note-body {
  @apply w-[10rem] h-[10rem] cursor-pointer shadow-lg z-0 pt-3.5;
}

.context-buttons {
  @apply absolute z-20 top-[-45px] left-1/2 -translate-x-1/2 flex items-center justify-center p-2;
}

.context-buttons button {
  @apply bg-[#242424] p-2;
  @apply hover:bg-[#353535] hover:border-transparent hover:outline-none;
}

.dragging {
  @apply cursor-grabbing !important;
}

.note-pin {
  @apply absolute z-10;
  @apply h-[2rem] w-[6rem] top-[-1rem] left-1/2 transform -translate-x-1/2;
  @apply bg-purple-note border-2 border-white;
}

.note-textarea {
  @apply w-full h-full p-1.5;
  @apply bg-transparent border-none outline-none resize-none;
  @apply break-words whitespace-pre-wrap;
  @apply text-black cursor-default;
}
</style>
