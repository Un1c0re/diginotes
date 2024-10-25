<template>
  <h1 class="absolute top-8 left-12 text-black text-2xl font-bold">{{ currentDesk.name }}</h1>
  <div class="h-[94vh] w-[96vw] bg-dot-pattern border rounded-xl p-2 relative">
    <Note v-for="note in currentDesk.notes" :key="note.id" :desk-id="deskId" :note="note"/>
  </div>
  <TheNoteMenu class="absolute left-12 bottom-10" :desk-id="deskId"/>
</template>

<script setup lang="ts">
import TheNoteMenu from "../components/TheNoteMenu.vue";
import { ref, watch } from "vue";
import { useDeskStore } from "@/store/DeskStore";
import Note from "@/components/Note.vue";
import { Desk } from "@/store/models/Desk";

const { getDesk } = useDeskStore();

const props = defineProps<{
  deskId: string;
}>();

const deskId = parseInt(props.deskId);
const currentDesk = ref<Desk>(getDesk(deskId));

watch(
    () => getDesk(deskId),
    (newDesk) => currentDesk.value = newDesk,
    { immediate: true }
);
</script>

<style scoped></style>