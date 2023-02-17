import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Logo } from "~/assets";
import { Box, Typography } from "@mui/material";

const ApplicationBar = () => {
  return (
    <>
      <AppBar sx={{ backgroundColor: "#6C63FF", height: "50px" }}>
        <Toolbar>
          <Typography>BioFarmApp</Typography>
          <Box sx={{ flexGrow: "1" }}></Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default ApplicationBar;
