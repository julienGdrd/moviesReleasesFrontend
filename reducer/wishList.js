import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    toggleWishList: (state, action) => {
        const isListed = state.value.some(movie => movie.title === action.payload.title);
      if (isListed) {
        state.value = state.value.filter((movie)=> movie.title !== action.payload.title);
        console.log("wishListRemove :", action.payload);
      } else {
        state.value.push(action.payload);
        console.log("wishListADDED :", action.payload);
      }
    },
  },
});

export const { toggleWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
