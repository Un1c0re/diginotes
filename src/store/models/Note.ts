export interface INote {
    id: number;
    note: string;
    color: string;
    pinned: boolean;
    x: number;
    y: number;
}

export class Note implements INote {
    constructor(options: Partial<Note>) {
        this.id = options.id ?? 0;
        this.note = options.note ?? "";
        this.color = options.color ?? "#ccc";
        this.pinned = options.pinned ?? false;
        this.x = options.x ?? 0;
        this.y = options.y ?? 0;
    }

    id: number;
    note: string;
    color: string;
    pinned: boolean;
    x: number;
    y: number;
}