import { createSlice } from "@reduxjs/toolkit";

export interface iAuthState {
  isLoggedIn: boolean;
}
const initialState: iAuthState = {
  isLoggedIn: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoggedIn: (state: iAuthState, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
