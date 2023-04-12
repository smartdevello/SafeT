import * as React from "react";

import LoadingBackdrop from "./ui-components/LoadingBackDrop";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "../../store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignIn from "../pages/SignIn";

/* global console, Excel  */

export interface AppProps {
  isOfficeInitialized: boolean;
}
const theme = createTheme();

export default function App(props: AppProps) {
  const { isOfficeInitialized } = props;

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isLoading = useSelector((state: RootState) => state.backdrop.isLoading);
  if (!isOfficeInitialized) {
    return <LoadingBackdrop open={true} />;
  }

  React.useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <LoadingBackdrop open={isLoading} />
      {!isLoggedIn && <SignIn />}
    </ThemeProvider>
  );
}
