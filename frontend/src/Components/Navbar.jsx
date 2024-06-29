import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../Context/auth";
import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  IconButton,
  MenuItem,
  Menu,
  Button,
  TextField,
  Grid,
  InputLabel,
  FormControl,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

function NavBar() {
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [justVerify, setJustVerify] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoggedIn, LogOut } = useAuth();
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Grid item container margin={0} padding={0}>
            <Grid item container margin={0} padding={0}>
              <TextField
                id="search"
                variant="outlined"
                margin="normal"
                size="small"
                required
                fullWidth
                label="Search"
                name="search"
                autoFocus
                // value={username}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    fontWeight: "bold",
                  },
                }}
              />
            </Grid>
            <FormControl size="small" fullWidth required margin="normal">
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                margin="normal"
                labelId="type-label"
                id="type"
                required
                fullWidth
                label="Type"
                name="type"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                error={justVerify && type === ""}
                sx={{
                  borderRadius: "12px",
                  fontWeight: "bold",
                }}
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="user">
                  <Typography fontWeight="bold">
                    Individual / business
                  </Typography>
                </MenuItem>
                <MenuItem value="disposer" sx={{ fontWeight: "bold" }}>
                  <Typography fontWeight="bold">Disposer</Typography>
                </MenuItem>
              </Select>
            </FormControl>
            <Grid item container margin={0} padding={0}>
              <TextField
                id="quantity"
                variant="outlined"
                margin="normal"
                size="small"
                required
                fullWidth
                label="Quantity"
                name="quantity"
                autoFocus
                // value={username}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    fontWeight: "bold",
                  },
                }}
              />
            </Grid>
            <Button variant="outlined">Search</Button>
          </Grid>
          {!isLoggedIn ? (
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
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
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
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/login");
                }}
              >
                LogIn
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/register");
                }}
              >
                SignUP
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
