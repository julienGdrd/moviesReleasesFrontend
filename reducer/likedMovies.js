import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const likedMoviesSlice = createSlice({
  name: "likedMovies",
  initialState,
  reducers: {
    addLikedMovie: (state, action) => {
        const isLiked = state.value.some(movie => movie.title === action.payload.title);
      if (isLiked) {
        state.value = state.value.filter((movie)=> movie.title !== action.payload.title);
        console.log("likedMovieRemove :", action.payload);
      } else {
        state.value.push(action.payload);
        console.log("likedMovieRedADDED :", action.payload);
      }
    },
  },
});

export const { addLikedMovie } = likedMoviesSlice.actions;
export default likedMoviesSlice.reducer;
