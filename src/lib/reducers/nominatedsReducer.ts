import {
  IVote,
  TCategories,
  TNominateds /* TOldWinners */,
} from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { INominated } from "../../interfaces/index";

interface INominatedState {
  categories: TCategories;
  nominateds: TNominateds;
  winners: TNominateds;
  votes: IVote[];
}

const nominatedsSlice = createSlice({
  name: "auth",
  initialState: {
    categories: [],
    nominateds: [],
    winners: [],
    oldWinners: [],
    votes: [],
  } as INominatedState,
  reducers: {
    initializeStore(state, action) {
      state.categories = action.payload.categories || [];
    },
    setNominateds(state, action) {
      state.nominateds = action.payload;
      state.winners =
        action.payload?.filter((nominated: INominated) => nominated.winner) ||
        [];
    },
    setVotes(state, action) {
      state.votes = action.payload;
    },
    addWinners(state, action) {
      // Update nominateds with votes
      state.nominateds = state.nominateds.map((item) => {
        const updateNominated = action.payload.find(
          (nm: INominated) => nm.id === item.id
        );

        if (updateNominated) {
          return updateNominated;
        } else {
          return item;
        }
      });

      // Update winners
      state.winners =
        action.payload?.filter((nominated: INominated) => nominated.winner) ||
        [];
    },
    resetWinners(state, action) {
      // Update nominateds with votes
      state.nominateds = state.nominateds.map((item) => {
        const updateNominated = action.payload.find(
          (nm: INominated) => nm.id === item.id
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
