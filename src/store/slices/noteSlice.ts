import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Note, NotesState} from 'types/common';

const initialState: NotesState = {
  notes: [],
  currentNote: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // Adding new note or updating existing note
    addNote: (state, action: PayloadAction<Note>) => {
      const existingNoteIndex = state.notes.findIndex(
        note => note.noteID === action.payload.noteID,
      );

      if (existingNoteIndex !== -1) {
        // Update existing note if the ID already exists
        state.notes[existingNoteIndex] = action.payload;
      } else {
        // Add new note if the ID doesn't exist
        state.notes.push(action.payload);
      }
    },
    // Deleting notes
    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter(note => note.noteID !== action.payload);
    },
    // Setting current note to be edited
    setCurrentNote: (state, action: PayloadAction<Note | null>) => {
      state.currentNote = action.payload;
    },
  },
});

export const {addNote, deleteNote, setCurrentNote} = notesSlice.actions;
export default notesSlice.reducer;
