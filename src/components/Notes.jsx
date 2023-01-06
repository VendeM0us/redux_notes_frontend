import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';
import PropTypes from 'prop-types';

const Note = ({ note, handleClick }) => (
  <li onClick={handleClick}>
    {note.content}
    <strong> {note.important ? 'important' : ''}</strong>
  </li>
);

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes;
    }

    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important);
  });

  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={async () => {
            dispatch(toggleImportanceOf(note.id));
          }
          }
        />
      )}
    </ul>
  );
};

Note.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string,
    important: PropTypes.bool,
  }),
  handleClick: PropTypes.func
};

export default Notes;
