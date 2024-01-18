import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      // Set the state to the new notification message
      return action.payload;
    },
    clearNotification: () => {
      // Clear the notification message
      return '';
    }
  }
});

// Export the action creators
export const { setNotification, clearNotification } = notificationSlice.actions;

// Export the reducer
export default notificationSlice.reducer;