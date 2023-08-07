// recipeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "../utils/localStorage";

const initialState = {
  savedRecipes: getItemFromLocalStorage("savedRecipes") || [],
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    saveRecipe: (state, action) => {
      const newRecipe = action.payload;

      if (newRecipe) {
        const updatedRecipes = [...state.savedRecipes, newRecipe];
        state.savedRecipes = updatedRecipes;
        setItemInLocalStorage("savedRecipes", updatedRecipes);
      }
    },
    removeSavedRecipe: (state, action) => {
      const recipeIdToRemove = action.payload;

      if (recipeIdToRemove) {
        state.savedRecipes = state.savedRecipes.filter(
          (recipe) => recipe.recipe.label !== recipeIdToRemove
        );

        setItemInLocalStorage("savedRecipes", state.savedRecipes);
      }
    },
  },
});

export const { saveRecipe, removeSavedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
