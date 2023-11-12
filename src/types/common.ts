export interface Category {
  catID: number;
  catName: string;
}

export interface Client {
  clientID: number;
  firstName: string;
  lastName: string;
  dob: string;
}

export interface Note {
  noteID: number;
  text: string;
  categoryId: number;
  clientId: number;
}

export interface NotesState {
  notes: Note[];
  currentNote: Note | null;
}
