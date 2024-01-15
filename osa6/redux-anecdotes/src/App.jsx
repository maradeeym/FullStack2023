import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from './reducers/anecdoteReducer'; // Import the action creator

const App = () => {
  const anecdotes = useSelector(state => state); //this breaks the application
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(incrementVote(id)); // Dispatch the action
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App