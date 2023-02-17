import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { MAIN_MENU_ITEMS } from "shared/constants";
import { PATHS } from "shared/constants/utils";
import { useProductStore } from "Products/store";
import "./MainMenu.scss";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  justifyContent: "space-between",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  justifyContent: "space-between",
  marginBottom: "auto",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type MainMenuProps = {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
};

const MainMenu: React.FC<MainMenuProps> = ({
  open,
  handleDrawerOpen,
  handleDrawerClose,
}) => {
  const { shoppingCart } = useProductStore();

  const navLinkClassNames = {
    active: "menu__navItem menu__navItem--active",
    default: "menu__navItem",
  };

  return (
    <Drawer classes={{ paper: "menu" }} open={open} variant="permanent">
      <Box
        alt="Biofarm App"
        component="img"
        className="menu__logo"
        sx={{
          opacity: open ? 1 : 0,
          translateX: open ? "-100%" : 0,
        }}
      />
      <List>
        {MAIN_MENU_ITEMS.map((item) => {
          if (item.path === PATHS.SHOPPING_CART) {
            return (
              <NavLink
                to={item.path}
                key={item.text}
                className={({ isActive }) =>
                  isActive
                    ? navLinkClassNames.active
                    : navLinkClassNames.default
                }
              >
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{ mr: open ? 3 : "auto", position: "relative" }}
                  className="menu__listItem"
                >
                  <ListItemButton
                    sx={{
                      justifyContent: open ? "initial" : "center",
                      minHeight: 48,
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      className="menu__listIcon"
                      sx={{ mr: open ? 3 : "auto" }}
                    >
                      {item.icon}
                      {shoppingCart.length > 0 ? (
                        <div
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "red",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            top: "0",
                            right: "12px",
                            width: "1rem",
                            height: "1rem",
                          }}
                        >
                          {shoppingCart.length}
                        </div>
                      ) : null}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.text}
                      sx={{
                        opacity: open ? 1 : 0,
                        transition: ".1s ease opacity",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            );
          }
          return (
            <NavLink
              to={item.path}
              key={item.text}
              className={({ isActive }) =>
                isActive ? navLinkClassNames.active : navLinkClassNames.default
              }
            >
              <ListItem
                key={item.text}
                disablePadding
                sx={{ mr: open ? 3 : "auto" }}
                className="menu__listItem"
              >
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    className="menu__listIcon"
                    sx={{ mr: open ? 3 : "auto" }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: ".1s ease opacity",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          );
        })}
      </List>
      <Box
        alignItems={"center"}
        display={"flex"}
        justifyContent={"flex-end"}
        padding={[0, 1]}
      >
        <IconButton
          color="inherit"
          onClick={handleDrawerClose}
          sx={{
            ...(!open && { display: "none" }),
            ...(open && { alignSelf: "end" }),
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            ...(open && { display: "none" }),
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default MainMenu;
