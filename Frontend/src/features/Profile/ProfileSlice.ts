import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Define the interface for ProfileState
interface ProfileState {
  profileData: object | null;
}

// Initial state with profileData set to null initially
const initialState: ProfileState = {
  profileData: null
};

// Create the slice for profile management
export const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<object>) => {
      state.profileData = action.payload;
      console.log("Profile saved successfully in Redux", state.profileData);

      // Save profileData to AsyncStorage
      AsyncStorage.setItem("profileData", JSON.stringify(state.profileData))
        .then(() => {
          console.log("Profile saved successfully in AsyncStorage");
        })
        .catch((error) => {
          console.error("Could not save the profile data into AsyncStorage", error);
        });
    },
    loadProfileData: (state, action: PayloadAction<object | null>) => {
      state.profileData = action.payload;
    },
  },
});

// Actions generated from the slice
export const { setProfileData, loadProfileData } = ProfileSlice.actions;

// Async function to load profile data from AsyncStorage
const loadProfileDataFromStorage = async () => {
  try {
    const profileData = await AsyncStorage.getItem("profileData");
    return profileData !== null ? JSON.parse(profileData) : null;
  } catch (error) {
    console.error("Error loading profile data: ", error);
    return null;
  }
};

// Hook to load profile data on component mount
export const useLoadProfileData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      const data = await loadProfileDataFromStorage();
      if (data) {
        dispatch(loadProfileData(data)); // Dispatch loaded data to Redux
      }
    };

    loadData();
  }, [dispatch]); // Ensure dispatch is included in the dependency array
};

export default ProfileSlice.reducer;
