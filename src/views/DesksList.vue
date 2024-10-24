<template>
  <div class="h-[94vh] w-[96vw] p-2 flex flex-wrap gap-5">
    <div v-for="desk in desks" :key="desk.id" class="flex flex-col gap-1 drop-shadow-lg">
      <div class="desk-card overflow-hidden" @click="openDesk(desk.id)">
        <img class="h-[100%] w-[100%]" src="/placeholder.png" alt="placeholder"/>
      </div>
      <input v-model="desk.name" class="desk-input font-bold text-black"/>

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
    <div class="desk-card text-black" @click="createDesk">Создать</div>
  </div>
  <div class="absolute left-12 bottom-10">
  </div>
</template>

<script setup lang="ts">
import {useDeskStore} from "@/store/DeskStore";
import {useRouter} from "vue-router";
import {Desk} from "@/store/models/Desk";
import {ref} from "vue";

const {desks, addDesk, removeDesk} = useDeskStore();

const router = useRouter();

const activeDeskId = ref<number | null>(null);

const createDesk = () => {
  const newDesk = new Desk();
  addDesk(newDesk);
  openDesk(desks.findLast((x) => x)!.id);
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
  @apply w-[14rem] h-[8rem] border rounded-md flex flex-col justify-center items-center cursor-pointer;
}

.desk-card:hover {
  @apply shadow-lg transition-shadow;
}

.desk-input {
  @apply bg-transparent focus:border-b focus:border-black outline-none;
  transition: border-color 0.3s;
}

.toggle {
  @apply text-black bg-transparent py-0 px-2 hover:border-transparent focus:outline-none;
}

.toggle:active {
  @apply border-transparent outline-none;

}

.delete-btn {
  @apply bg-transparent text-red-500 hover:border-transparent p-0 absolute right-0 top-6;
}
</style>