import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "../features/Profile/ProfileSlice"; // Correct import for the profile slice
import UserReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    Profile: ProfileReducer, // Correctly use the reducer name as "profile"
    User: UserReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { profile: ProfileState }
export type AppDispatch = typeof store.dispatch;
