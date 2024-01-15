// AnecdoteForm.jsx
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer'; // Adjust the path as necessary

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(addAnecdote(content));
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
