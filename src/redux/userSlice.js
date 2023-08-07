import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage } from "../utils/localStorage";
let userPersist = getItemFromLocalStorage("user");
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: userPersist !== null ? userPersist : null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    savedRecipe: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout, signup } = userSlice.actions;

// selectors
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
