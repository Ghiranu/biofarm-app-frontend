import { useRefreshToken } from "Authentication/hooks";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "Authentication/contexts";
import { ApplicationBar, MainMenu } from "~/core";
import { Box, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const contentStyle = {
    transition: "margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)",
  } as React.CSSProperties;

  if (open) {
    contentStyle.marginLeft = 240;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    auth?.accessToken === "" ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return (
    <>
      <CssBaseline />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={contentStyle}>
          {/* <MainMenu
            open={open}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
          /> */}
          <ApplicationBar />
          {/* <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          > */}
          {/* <Container maxWidth="xl" sx={{ mt: 2, mb: 2, ml: 5 }}> */}
          <Outlet />
          {/* </Container> */}
          {/* </Box> */}
        </div>
      )}
    </>
  );
};

export default PersistLogin;
