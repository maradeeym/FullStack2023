import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

// Async thunk for initializing anecdotes
export const initializeAnecdotes = createAsyncThunk(
  'anecdotes/initializeAnecdotes',
  async () => {
    const anecdotes = await anecdoteService.getAll();
    return anecdotes;
  }
);

// Async thunk for adding a new anecdote
export const addNewAnecdote = createAsyncThunk(
  'anecdotes/addNewAnecdote',
  async (content) => {
    const newAnecdote = await anecdoteService.createNew(content);
    return newAnecdote;
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [], // Initial state is empty or fetched asynchronously
  reducers: {
    // Reducer for incrementing votes
    incrementVote: (state, action) => {
      const id = action.payload;
      const anecdoteToChange = state.find(anecdote => anecdote.id === id);
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1;
      }
    },
    // Additional reducers can be added here
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewAnecdote.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

// Export the action creators from the slice
export const { incrementVote } = anecdoteSlice.actions;

// Export the reducer
export default anecdoteSlice.reducer;
