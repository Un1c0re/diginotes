<template>
  <div class="h-[94vh] w-[96vw] flex flex-wrap gap-x-5">
    <div v-for="desk in desks" :key="desk.id" class="h-[12rem] flex flex-col gap-1.5">
      <div class="desk-card" @click="openDesk(desk.id)">
        <img class="h-[100%] w-[100%]" src="/placeholder.png" alt="placeholder"/>
      </div>
      <input v-model="desk.name" class="desk-input"/>
      <div class="flex items-center justify-between">
        <p class="text-left text-black">заметок: {{ desk.notes.length }}</p>
        <div class="relative">
          <button @click="toggleDelete(desk.id)" class="toggle">⋮</button>
          <transition name="fade">
            <button v-if="activeDeskId === desk.id" @click="deleteDesk(desk.id)" class="delete-btn">
              Удалить
            </button>
          </transition>
        </div>
      </div>
    </div>
  </div>
  <button class="create-btn" @click="createDesk">Создать доску</button>
</template>

<script setup lang="ts">
import { useDeskStore } from "@/store/DeskStore";
import { useRouter } from "vue-router";
import { Desk } from "@/store/models/Desk";
import { ref } from "vue";

const { desks, addDesk, removeDesk } = useDeskStore();

const router = useRouter();

const activeDeskId = ref<number | null>(null);

const createDesk = () => {
  let newDesk = new Desk();
  newDesk = addDesk(newDesk);
  openDesk(newDesk.id);
}

const openDesk = (deskId: number) => {
  router.push({path: "/desk", query: {deskId: deskId.toString()}});
}

const toggleDelete = (deskId: number) => {
  activeDeskId.value = activeDeskId.value === deskId ? null : deskId;
};

const deleteDesk = (deskId: number) => {
  removeDesk(deskId);
};
</script>

<style scoped>
.desk-card {
  @apply w-[14rem] h-[8rem] border rounded-md;
  @apply flex flex-col justify-center items-center;
  @apply cursor-pointer overflow-hidden drop-shadow-md;
  @apply hover:shadow-lg hover:transition-shadow;
}

.desk-input {
  @apply bg-transparent outline-none;
  @apply focus:border-b focus:border-black;
  @apply font-bold text-black transition-colors;
}

.toggle {
  @apply text-black bg-transparent py-0 px-2 hover:border-transparent focus:outline-none;
  @apply hover:border-transparent focus:outline-none;
  @apply active:border-transparent active:outline-none;
}

.delete-btn {
  @apply bg-transparent text-red-500 hover:border-transparent p-0 absolute right-0 top-6;
}

.create-btn {
  @apply absolute bottom-10 right-12;
  @apply bg-blue-note rounded-md text-black drop-shadow-md;
  @apply hover:bg-yellow-note hover:border-transparent hover:outline-none hover:transition-colors;
}
</style>