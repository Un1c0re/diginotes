import {Note} from "./Note";

interface IDesk {
    id: number;
    name: string;
    notes: Note[];
}

export class Desk implements IDesk {
    constructor(options: IDesk = {
        id: 0,
        name: "Без имени",
        notes: []
    }) {
        this.id = options.id;
        this.name = options.name;
        this.notes = options.notes.map((note: Note) => new Note(note));
    }

    id: number;
    name: string;
    notes: Note[];
}