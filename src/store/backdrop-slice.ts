import { createSlice } from "@reduxjs/toolkit";

interface IBackdropState {
  isLoading: boolean;
}
const initialState: IBackdropState = {
  isLoading: false,
};
export const BackdropSlice = createSlice({
  name: "backdrop",
  initialState: initialState,
  reducers: {
    setIsLoading: (state: IBackdropState, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const BackdropActions = BackdropSlice.actions;
export default BackdropSlice;
