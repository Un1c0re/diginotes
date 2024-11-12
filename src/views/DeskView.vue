<template>
  <div class="flex gap-2 items-center mb-2">
    <button class="back-btn" @click="goBack">←</button>
    <input v-model="currentDesk.name" class="desk-input" @input="onDeskNameChange"/>
  </div>
  <div id="capture" class="h-[90vh] w-[96vw] bg-dot-pattern border rounded-xl p-2 relative">
    <Note v-for="note in currentDesk.notes" :key="note.id" :desk-id="deskId" :note="note"/>
  </div>
  <TheNoteMenu class="absolute left-12 bottom-8" :desk-id="deskId"/>
</template>

<script setup lang="ts">
import TheNoteMenu from "../components/TheNoteMenu.vue";
import {ref, watch} from "vue";
import {useDeskStore} from "@/store/DeskStore";
import Note from "@/components/Note.vue";
import {Desk} from "@/store/models/Desk";
import {useRouter} from "vue-router";
import html2canvas from "html2canvas";

const {getDesk, updateDesk} = useDeskStore();

const props = defineProps<{
  deskId: string;
}>();

const router = useRouter();

const deskId = parseInt(props.deskId);
const currentDesk = ref<Desk>(getDesk(deskId));

const onDeskNameChange = () => {
  updateDesk(currentDesk.value);
};

const goBack = async () => {
  const screenshot = await captureScreenshot();
  if (screenshot) {
    currentDesk.value.screenshot = screenshot;
    updateDesk(currentDesk.value);
  }
  router.back();
}

const captureScreenshot = async () => {
  const element = document.getElementById('capture'); // Убедитесь, что этот элемент содержит доску
  if (element) {
    const canvas = await html2canvas(element);
    return canvas.toDataURL('image/png');
  }
};

watch(
    () => getDesk(deskId),
    (newDesk) => currentDesk.value = newDesk,
    {immediate: true}
);
</script>

<style scoped>
.desk-input {
  @apply bg-transparent outline-none;
  @apply focus:border-b focus:border-black;
  @apply font-bold text-black text-2xl transition-colors;
}

.back-btn {
  @apply bg-transparent py-1 px-3;
  @apply hover:bg-blue-note hover:border-transparent focus:outline-none;
  @apply text-black text-xl font-bold transition-colors;
}
</style>
