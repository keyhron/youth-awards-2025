import { createSlice } from "@reduxjs/toolkit";

interface NominatedState {
  categories: Category[];
  nominateds: Nominated[];
  winners: Nominated[];
  votes: Vote[];
}

const nominatedsSlice = createSlice({
  name: "auth",
  initialState: {
    categories: [],
    nominateds: [],
    winners: [],
    oldWinners: [],
    votes: [],
  } as NominatedState,
  reducers: {
    initializeStore(state, action) {
      state.categories = action.payload.categories || [];
    },
    setNominateds(state, action) {
      state.nominateds = action.payload;
      state.winners =
        action.payload?.filter((nominated: Nominated) => nominated.winner) ||
        [];
    },
    setVotes(state, action) {
      state.votes = action.payload;
    },
    addWinners(state, action) {
      // Update nominateds with votes
      state.nominateds = state.nominateds.map((item) => {
        const updateNominated = action.payload.find(
          (nm: Nominated) => nm.id === item.id
        );

        if (updateNominated) {
          return updateNominated;
        } else {
          return item;
        }
      });

      // Update winners
      state.winners =
        action.payload?.filter((nominated: Nominated) => nominated.winner) ||
        [];
    },
    resetWinners(state, action) {
      // Update nominateds with votes
      state.nominateds = state.nominateds.map((item) => {
        const updateNominated = action.payload.find(
          (nm: Nominated) => nm.id === item.id
        );

        if (updateNominated) {
          return updateNominated;
        } else {
          return item;
        }
      });
      state.winners = [];
    },
  },
});

// Extract and export each action creator by name
export const {
  initializeStore,
  setNominateds,
  setVotes,
  addWinners,
  resetWinners,
} = nominatedsSlice.actions;
// Export the reducer, either as a default or named export
export default nominatedsSlice.reducer;
