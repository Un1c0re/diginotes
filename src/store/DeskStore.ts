import { ref } from "vue";
import { defineStore } from "pinia";
import { Desk } from "@/store/models/Desk";
import { Note } from "@/store/models/Note";

export const useDeskStore = defineStore("DeskStore", () => {
    const desks = ref<Desk[]>([]);

    function $reset() {
        desks.value = [];
    }

    const getDesk = (deskId: number): Desk => {
        return new Desk(desks.value.find(d => d.id === deskId))
    };

    const addDesk = (newDesk: Desk): Desk => {
        const lastDeskId = desks.value.findLast((x) => x)?.id;
        newDesk.id = lastDeskId != undefined ? lastDeskId + 1 : 0;
        desks.value.push(newDesk);

        return newDesk;
    }

    const updateDesk = (desk: Desk): void => {
        const deskIndex = desks.value.findIndex(d => d.id == desk.id);
        if (deskIndex === -1) return;

        desks.value[deskIndex] = desk;
    }

    const removeDesk = (deskId: number): void => {
        desks.value.splice(deskId, 1);
    }

    const addNoteToDesk = (deskId: number, newNote: Note): void => {
        const desk = desks.value.find(d => d.id === deskId);
        if (!desk) return;

        const lastNoteId = desk.notes.findLast((x) => x)?.id;
        newNote.id = lastNoteId != undefined ? lastNoteId + 1 : 0;

        desk.notes.push(newNote);
    }

    const updateNoteInDesk = (deskId: number, updatedNote: Note): void => {
        const desk = desks.value.find(d => d.id === deskId);
        if (!desk) return;

        const noteIndex = desk.notes.findIndex(n => n.id === updatedNote.id);
        if (noteIndex === -1) return;

        desk.notes[noteIndex] = updatedNote;
    }

    const deleteNoteInDesk = (deskId: number, noteId: number): void => {
        const desk = desks.value.find(d => d.id === deskId);
        if (!desk) return;

        const noteIndex = desk.notes.findIndex(n => n.id === noteId);
        if (noteIndex === -1) return;

        desk.notes.splice(noteIndex, 1);
    }

    return {
        $reset,
        desks,
        getDesk,
        addDesk,
        updateDesk,
        removeDesk,
        addNoteToDesk,
        updateNoteInDesk,
        deleteNoteInDesk,
    }
});
