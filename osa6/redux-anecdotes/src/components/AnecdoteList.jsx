// AnecdoteList.jsx
import { useSelector, useDispatch } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer'; // Adjust the path as necessary
import { setNotification, clearNotification } from '../reducers/notificationReducer';
import Filter from './Filter'; // Import the Filter component
import Notification from './Notification';


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter); // Get the current filter state
  const dispatch = useDispatch();

 const sortedAnecdotes = [...anecdotes]
    .filter(anecdote => 
      anecdote.content.toLowerCase().includes(String(filter).toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes); // Then sort them

    const vote = (id) => {
      dispatch(incrementVote(id));
      const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id);
      console.log(votedAnecdote); // Check if the correct anecdote is found
      if (votedAnecdote) {
        dispatch(setNotification(`You voted for '${votedAnecdote.content}'`));
        setTimeout(() => {
          dispatch(clearNotification());
        }, 5000);
      }
    };
    
    
    
    

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
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
