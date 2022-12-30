import noteReducer from './noteReducer.js';

const state = [];
const action = {
  type: 'notes/createNote',
  payload: 'the app state is in redux store'
};

const newState = noteReducer(state, action);

console.log(state);
console.log(newState);