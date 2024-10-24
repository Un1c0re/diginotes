<template>
  <div class="bg-white p-3 border rounded-md flex items-center justify-around gap-4 drop-shadow-lg">
    <div class="note-button bg-[#FEB1B1]" @click="createNote('#FEB1B1')"></div>
    <div class="note-button bg-[#B1D0FE]" @click="createNote('#B1D0FE')"></div>
    <div class="note-button bg-[#FCFEB1]" @click="createNote('#FCFEB1')"></div>
  </div>
</template>

<script setup lang="ts">

import {useDeskStore} from "@/store/DeskStore";
import {Note} from "@/store/models/Note";

const props = defineProps<{ deskId: number }>();

const {addNoteToDesk} = useDeskStore();

const createNote = (noteColor: string) => {
  const newNote = new Note({color: noteColor});

  addNoteToDesk(props.deskId, newNote);
}
</script>

<style scoped>
.note-button {
  @apply w-[2rem] h-[2rem]
}

.note-button:hover {
  @apply cursor-pointer;
}
</style>