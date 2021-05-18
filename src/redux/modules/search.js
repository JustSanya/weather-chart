import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: { 
    result: [],
    errorMsg: ''
  },
  reducers: {
    updateResult: (state, action) => {
      state.result = [...action.payload]
    },
    updateErrorMessage: (state, action) => {
      state.errorMsg = [...action.payload]
    },
  }
})

export const {updateResult, updateErrorMessage} = searchSlice.actions;

export const selectResult = state => state.search.result;
export const selectErrorMsg = state => state.search.errorMsg;

export default searchSlice.reducer;