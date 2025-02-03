import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import nominatedsReducer from './reducers/nominatedsReducer';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      nominateds: nominatedsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

