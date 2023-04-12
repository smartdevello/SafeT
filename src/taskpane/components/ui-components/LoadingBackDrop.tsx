import * as React from "react";
import * as ReactDOM from "react-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

/* global document */
export interface LoadingBackdropProps {
  open: boolean;
}
export default function LoadingBackdrop(props: LoadingBackdropProps) {
  const { open } = props;
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>,
        document.getElementById("backdrop-root")
      )}
    </>
  );
}
LoadingBackdrop.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
