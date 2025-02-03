import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
  uid: string | null;
  email: string | null;
  name: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
};

const initialState: SliceState = {
  uid: null,
  email: null,
  name: null,
  isAuthenticated: false,
  isReady: false,
};

const postsSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    signIn(state, action) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isAuthenticated = true;
      state.isReady = true;
    },
    signOut(state) {
      state.uid = null;
      state.email = null;
      state.name = null;
      state.isAuthenticated = false;
      state.isReady = false;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = postsSlice;
// Extract and export each action creator by name
export const { signIn, signOut } = actions;
// Export the reducer, either as a default or named export
export default reducer;

