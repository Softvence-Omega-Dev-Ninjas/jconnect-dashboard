import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearch: (state) => {
      state.searchTerm = "";
    },
  },
});

export const { setSearchTerm, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;