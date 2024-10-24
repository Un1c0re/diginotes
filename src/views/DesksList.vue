<template>
  <div class="h-[94vh] w-[96vw] bg-gray-800 p-2 flex flex-wrap gap-2">
    <div v-for="desk in desks" :key="desk.id" class="flex flex-col gap-2">
      <div :style="{ backgroundColor: generateRandomColor() }" class="desk-card" @click="openDesk(desk.id)"></div>
      <input v-model="desk.name" class="desk-input font-bold"/>
      <p class="text-left">заметок: {{ desk.notes.length }}</p>
    </div>
    <div class="desk-card" @click="createDesk">Создать</div>
  </div>
  <div class="absolute left-12 bottom-10">
  </div>
</template>

<script setup lang="ts">
import {useDeskStore} from "@/store/DeskStore";
import {useRouter} from "vue-router";
import {Desk} from "@/store/models/Desk";

const {desks, addDesk} = useDeskStore();

const router = useRouter();

const createDesk = () => {
  const newDesk = new Desk();
  addDesk(newDesk);
  openDesk(desks.findLast((x) => x)!.id);
}

const openDesk = (deskId: number) => {
  router.push({path: "/desk", query: {deskId: deskId.toString()}});
}

const generateRandomColor = (): string => {
  const r = Math.floor(100 + Math.random() * 156);
  const g = Math.floor(100 + Math.random() * 156);
  const b = Math.floor(100 + Math.random() * 156);
  return `rgb(${r}, ${g}, ${b})`;
}
</script>

<style scoped>
.desk-card {
  @apply w-[10rem] h-[6rem] bg-red-400 border rounded-md flex flex-col align-middle justify-around cursor-pointer;
}

.desk-input {
  @apply bg-transparent border-0 border-none focus:border-b focus:border-white outline-none;
  transition: border-color 0.3s;
}
</style>