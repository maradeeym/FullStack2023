// reducers/filterReducer.js

// Initial state for the filter
const initialState = '';

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// Action creator for setting the filter
export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter,
  };
};

export default filterReducer;
