// AnecdoteList.jsx
import { useSelector, useDispatch } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer'; // Adjust the path as necessary
import { setFilter } from '../reducers/filterReducer'; // Import setFilter action creator


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter); // Get the current filter state
  const dispatch = useDispatch();


  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value)); // Update the filter state when the input changes
  };

 const sortedAnecdotes = [...anecdotes]
    .filter(anecdote => 
      anecdote.content.toLowerCase().includes(String(filter).toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes); // Then sort them

  const vote = (id) => {
    dispatch(incrementVote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <div>
        <input 
          type="text" 
          name="filter" 
          value={filter} 
          onChange={handleFilterChange} 
          placeholder="Filter anecdotes" 
        />
      </div>
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
