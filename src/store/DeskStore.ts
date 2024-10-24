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

    const removeDesk = (deskId: number): void => {
        desks.value.splice(deskId, 1);
    }

    const addNoteToDesk = (deskId: number, newNote: Note): void => {
        newNote.id = desks.value[deskId].notes.length;
        desks.value[deskId].notes.push(newNote);
    }

    const updateNoteInDesk = (deskId: number, updatedNote: Note): void => {
        desks.value[deskId].notes[updatedNote.id] = {...updatedNote};
    }

    const deleteNoteInDesk = (deskId: number, noteId: number): void => {
        desks.value[deskId].notes.splice(noteId, 1);
    }

    return {
        $reset,
        desks,
        getDesk,
        addDesk,
        removeDesk,
        addNoteToDesk,
        updateNoteInDesk,
        deleteNoteInDesk,
    }
});