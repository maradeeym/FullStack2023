import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)); // Initialize votes array with zeros
  
  const setRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }
  
  const voteAnecdote = () => {
    const newVotes = [...votes]; // Create a copy of the votes array
    newVotes[selected] += 1; // Increment the vote count for the currently displayed anecdote
    setVotes(newVotes); // Update the votes state
  }

  const mostVotedAnecdoteIndex = votes.indexOf(Math.max(...votes));
  
  return (
    <div>
      {anecdotes[selected]}
      <br/>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteAnecdote}>Vote</button>
      <button onClick={setRandomAnecdote}>Next Anecdote</button>
      <h2>Anecdote with the most votes</h2>
    {anecdotes[mostVotedAnecdoteIndex]}
    <p>has {votes[mostVotedAnecdoteIndex]} votes</p>
    </div>
  )
}  

export default App