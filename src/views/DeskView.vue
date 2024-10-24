<template>
  <h1 class="absolute top-8 left-12 text-black text-2xl font-bold">{{ currentDesk.name }}</h1>
  <div class="h-[94vh] w-[96vw] bg-dot-pattern border rounded-xl p-2 relative">
    <Note v-for="note in currentDesk.notes" :key="note.id" :desk-id="parseInt(props.deskId)" :note="note"/>
  </div>
  <div class="absolute left-12 bottom-10">
    <TheNoteMenu :desk-id="parseInt(props.deskId)"/>
  </div>
</template>

<script setup lang="ts">
import TheNoteMenu from "../components/TheNoteMenu.vue";
import {ref, watch} from "vue";
import {useDeskStore} from "@/store/DeskStore";
import Note from "@/components/Note.vue";
import {Desk} from "@/store/models/Desk";

const {getDesk} = useDeskStore();

const props = defineProps<{
  deskId: string;
}>();

const currentDesk = ref<Desk>(getDesk(parseInt(props.deskId)));

watch(
    () => getDesk(parseInt(props.deskId)),
    (newDesk) => {
      currentDesk.value = newDesk;
    },
    {immediate: true}
);
</script>

<style scoped></style>