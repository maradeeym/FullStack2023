// AnecdoteList.jsx
import { useSelector, useDispatch } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer'; // Adjust the path as necessary

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(incrementVote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
