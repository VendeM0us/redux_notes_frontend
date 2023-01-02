// import { nanoid } from 'nanoid';
import * as toolkit from '@reduxjs/toolkit';

// to pass vitest because direct import is not working
// need also to remove aliasing (* as)
const { createSlice } = toolkit;

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload);
    },
    toggleImportanceOf(state, action) {
      const changedNote = action.payload;
      return state.map(note =>
        note.id !== changedNote.id ? note : changedNote
      );
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;
export default noteSlice.reducer;
