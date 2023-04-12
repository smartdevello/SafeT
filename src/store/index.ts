import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import authSlice from "./auth-slice";
import BackdropSlice from "./backdrop-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    backdrop: BackdropSlice.reducer,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
