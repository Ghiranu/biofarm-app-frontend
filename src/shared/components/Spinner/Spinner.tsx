import { CircularProgress, Typography, Box } from "@mui/material";
import React from "react";

type SpinnerProps = {
  message: string;
};

const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: " column",
      }}
    >
      <CircularProgress size="lg" />
      <Typography variant="h5">{message}</Typography>
    </Box>
  );
};

export default Spinner;
