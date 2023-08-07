import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import recipeReducer from "./recipeSlice";
import sidebarReducer from "./sidebarSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    recipes: recipeReducer,
    sidebar: sidebarReducer,
  },
});
