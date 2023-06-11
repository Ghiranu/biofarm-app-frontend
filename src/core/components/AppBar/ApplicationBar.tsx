import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Logo } from "~/assets";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@mui/icons-material";
import { AuthenticationService } from "Authentication/services";

const navItems = [
  { name: "Produse", path: "/" },
  { name: "Comenzi", path: "/orders" },
  { name: "Abonamente", path: "/subscriptions" },
  { name: "Cos produse", path: "/shopping-cart" },
];

const ApplicationBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar sx={{ backgroundColor: "#6C63FF", height: "60px" }}>
        <Toolbar>
          <Box sx={{ width: "40%" }}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <Typography>BioFarmApp</Typography>
            </Link>
          </Box>
          <Box sx={{ display: "flex", gap: "15px", marginRight: "auto" }}>
            {navItems.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  // marginRight: "15px",
                }}
              >
                {item.name}
              </Link>
            ))}
          </Box>
          <IconButton
            onClick={() =>
              AuthenticationService.logout("logout").then(() =>
                navigate("/login")
              )
            }
          >
            <LogoutOutlined sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default ApplicationBar;
