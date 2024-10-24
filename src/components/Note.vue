<template>
  <div class="absolute"
       :class="{ 'dragging': isDragging }"
       :style="{ top: note.y + 'px', left: note.x + 'px'}"
       @mousedown="onMouseDown"
       @mouseup="onMouseUp">
    <div v-if="showButtons" class="mb-2 flex items-center justify-around bg-[#242424] p-2 rounded-md">
      <button @click="pin">pin</button>
      <button>del</button>
    </div>
    <div v-if="note.pinned" class="bottom-[-30px] z-99 h-[40px] w-[6rem] bg-red-400"></div>
    <div class="cursor-pointer w-[10rem] h-[10rem] shadow-lg opacity-1 z-0"
         :style="{backgroundColor: note.color}"
         @click="onClick">
      <textarea v-model="note.note"
                class="note-textarea p-0.5 text-black"
                @input="onNoteTextChange"
                placeholder="Введите текст"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import {INote} from "@/store/models/Note";
import {ref} from "vue";
import {useDeskStore} from "@/store/DeskStore";

const props = defineProps<{
  deskId: number;
  note: INote;
}>();

const {updateNoteInDesk} = useDeskStore();

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
</script>

<style scoped>
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
