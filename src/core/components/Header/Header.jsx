import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import Logo from "../../../assets/images/logo2.png";

import React from "react";

const Header = () => {
  const pages = ["Products", "Pricing", "Blog"];
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <img src={Logo} alt="logo" /> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu>
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
