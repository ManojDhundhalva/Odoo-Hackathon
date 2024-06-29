import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/auth";
import {
  IconButton,
  MenuItem,
  Menu,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";

function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, LogOut } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="m-3">
      <List>
        <ListItem button onClick={() => navigate("/")}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => navigate("/about-us")}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={() => navigate("/history")}>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button onClick={() => navigate("/appointments")}>
          <ListItemText primary="Appointments" />
        </ListItem>
        {!isLoggedIn ? (
          <>
            <ListItem button onClick={() => navigate("/login")}>
              <ListItemText primary="LogIn" />
            </ListItem>
            <ListItem button onClick={() => navigate("/register")}>
              <ListItemText primary="SignUp" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => navigate("/profile")}>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                LogOut();
                navigate("/");
              }}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <Grid
      container
      paddingY={1}
      paddingX={2}
      margin={0}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: "transparent",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 1000, // Adjust the zIndex as needed
      }}
    >
      <Grid item>
        <Typography fontWeight="bold" fontSize="large">
          LOGO
        </Typography>
      </Grid>
      <Grid item>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <>
            <Button variant="text" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button variant="text" onClick={() => navigate("/about-us")}>
              About
            </Button>
            <Button variant="text" onClick={() => navigate("/history")}>
              History
            </Button>
            <Button variant="text" onClick={() => navigate("/appointments")}>
              Appointments
            </Button>
            {!isLoggedIn ? (
              <>
                <Button variant="outlined" onClick={() => navigate("/login")}>
                  LogIn
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/register")}
                >
                  SignUp
                </Button>
              </>
            ) : (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircleOutlinedIcon
                    fontSize="large"
                    style={{ fontFamily: "Quicksand" }}
                  />
                </IconButton>
                <Menu
                  style={{ fontFamily: "Quicksand" }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={handleClose}
                    style={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                  >
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem
                    style={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                    onClick={() => {
                      handleClose();
                      LogOut();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default NavBar;
