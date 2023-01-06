import * as toolkit from '@reduxjs/toolkit';
import noteService from '../services/notes';

// to pass vitest because direct import is not working
// need also to remove aliasing (* as)
const { createSlice } = toolkit;

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    updateNote(state, action) {
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

export const { updateNote, appendNote, setNotes } = noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  };
};

export const toggleImportanceOf = (id) => {
  return async (dispatch) => {
    const updatedNote = await noteService
      .toggleImportance(id);
    dispatch(updateNote(updatedNote));
  };
};

export default noteSlice.reducer;
