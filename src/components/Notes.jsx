import { connect } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';
import PropTypes from 'prop-types';

const Note = ({ note, handleClick }) => (
  <li onClick={handleClick}>
    {note.content}
    <strong> {note.important ? 'important' : ''}</strong>
  </li>
);

const Notes = (props) => {
  return (
    <ul>
      {props.notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => props.toggleImportanceOf(note.id)}
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

Notes.propTypes = {
  notes: PropTypes.array,
  toggleImportanceOf: PropTypes.func,
};

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      notes: state.notes,
    };
  }

  return {
    notes: (state.filter === 'IMPORTANT'
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
    ),
  };
};

const mapDispatchToProps = {
  toggleImportanceOf,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);
