import { nanoid } from 'nanoid';
import toolkit from '@reduxjs/toolkit';

// to pass vitest because direct import is not working
const { createSlice } = toolkit;

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: nanoid(),
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: nanoid()
  }
];

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload;
      state.push({
        content,
        important: false,
        id: nanoid(),
      })
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find(n => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      };
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    }
  },
});

export const { createNote, toggleImportanceOf } = noteSlice.actions;
export default noteSlice.reducer;
