import {ref} from "vue";
import {defineStore} from "pinia";
import {Desk} from "@/store/models/Desk";
import {Note} from "@/store/models/Note";

export const useDeskStore = defineStore("DeskStore", () => {
    const desks = ref<Desk[]>([]);

    function $reset() {
        desks.value = [];
    }

    const getDesk = (deskId: number): Desk => {
        return new Desk(desks.value.find(d => d.id === deskId))
    };

    const addDesk = (newDesk: Desk): void => {
        newDesk.id = desks.value.length;
        desks.value.push(newDesk);
    }

    const addNoteToDesk = (deskId: number, newNote: Note): void => {
        newNote.id = desks.value[deskId].notes.length;
        desks.value[deskId].notes.push(newNote);
    }

    const updateNoteInDesk = (deskId: number, updatedNote: Note): void => {
        desks.value[deskId].notes[updatedNote.id] = {...updatedNote};
    }

    return {
        $reset,
        desks,
        addDesk,
        getDesk,
        addNoteToDesk,
        updateNoteInDesk,
    }
});