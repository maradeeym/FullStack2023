import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
/*
const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});
*/
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})

//const store = createStore(rootReducer);

export default store;
