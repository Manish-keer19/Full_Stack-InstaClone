import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  profileData: object | string;
}

const initialState: ProfileState = {
  profileData: {},

};

export const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<object>) => {
      state.profileData = action.payload;
      console.log("profileData in profile slice", state.profileData);
      // Save profileData to AsyncStorage when updated
      AsyncStorage.setItem("profileData", JSON.stringify(action.payload));
    },
  },
});

export const { setProfileData } = ProfileSlice.actions;

export default ProfileSlice.reducer;
