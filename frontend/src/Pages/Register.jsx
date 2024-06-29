import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Select, MenuItem } from "@mui/material";
import config from "../config.js";
import { useAuth } from "../Context/auth.jsx";
import { toast } from "react-hot-toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const defaultTheme = createTheme();

export default function Register() {
  const [loading, setloading] = useState(false);
  const [justVerify, setJustVerify] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordofLogin = (e) => {
    const input = e.target.value;
    setPassword(input);
    if (input.length < 8) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const { LogOut } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setJustVerify(true);

    if (
      username === "" ||
      email === "" ||
      name === "" ||
      !validPassword ||
      password !== repassword ||
      role === ""
    ) {
      return;
    }

    setloading(true);
    if (password === repassword) {
      await axios
        .post(config.BACKEND_API + "/signup", {
          username: username,
          email: email,
          name: name,
          password: password,
          role: role,
        })
        .then((response) => {
          if (response.status === 201) {
            toast.success("Registered");
            navigate("/login");
          }
        })
        .catch((error) => {
          toast.error("Invalid credentials");
          console.error("Error: ", error);
          // LogOut();
        });
    } else {
      setPassword("");
      setRePassword("");
      toast.error("Passwords do not match!");
    }
    setloading(false);
  };

  return (
    <div className="my-glass-effect">
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <CssBaseline />
          <Box
            style={{
              backgroundColor: "#caf0f8",
              boxShadow: "0px 4px 8px #caf0f8",
            }}
            sx={{
              marginY: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderRadius: "2em",
              padding: "3em",
              height: "auto",
              // "&:hover": {
              //   border: "1px solid #03045e",
              // },
            }}
          >
            <Avatar sx={{ m: 1 }} style={{ backgroundColor: "#25396F" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
            >
              Create A New Account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                id="standard-basic-1"
                variant="outlined"
                margin="normal"
                size="small"
                required
                fullWidth
                label="Username"
                name="username"
                autoFocus
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                InputProps={{
                  style: {
                    fontFamily: "Quicksand",
                    fontWeight: "bold",
                  },
                }}
                error={justVerify && username === ""}
                helperText={
                  justVerify &&
                  (username === "" ? "This field cannot be empty." : "")
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    fontWeight: "bold",
                  },
                }}
              />
              <TextField
                id="standard-basic-2"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                autoFocus
                size="small"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                InputProps={{
                  style: {
                    fontFamily: "Quicksand",
                    fontWeight: "bold",
                  },
                }}
                error={justVerify && name === ""}
                helperText={
                  justVerify &&
                  (name === "" ? "This field cannot be empty." : "")
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    fontWeight: "bold",
                  },
                }}
              />
              <TextField
                id="standard-basic-3"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="Email Address"
                name="email"
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                InputProps={{
                  style: {
                    fontFamily: "Quicksand",
                    fontWeight: "bold",
                  },
                }}
                error={justVerify && email === ""}
                helperText={
                  justVerify &&
                  (email === "" ? "This field cannot be empty." : "")
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    fontWeight: "bold",
                  },
                }}
              />
              <TextField
                onChange={handlePasswordofLogin}
                value={password}
                margin="normal"
                id="password"
                label="Password"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                size="small"
                error={justVerify && (!validPassword || password === "")}
                helperText={
                  justVerify &&
                  (password === ""
                    ? "This field cannot be empty."
                    : !validPassword
                    ? "The password must contain at least 8 digits."
                    : "")
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility sx={{ color: "#02294F" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "#02294F" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    fontWeight: "bold",
                  },
                }}
              />
              <TextField
                onChange={(e) => {
                  setRePassword(e.target.value);
                }}
                margin="normal"
                value={repassword}
                id="confirm-password"
                label="Confirm - Password"
                variant="outlined"
                name="confirm-password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                size="small"
                error={justVerify && repassword !== password}
                helperText={
                  justVerify &&
                  (repassword !== password ? "password is not mathing" : "")
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility sx={{ color: "#02294F" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "#02294F" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    fontWeight: "bold",
                  },
                }}
              />
              <FormControl size="small" fullWidth required margin="normal">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  margin="normal"
                  labelId="role-label"
                  id="role"
                  required
                  fullWidth
                  label="Role"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  error={justVerify && role === ""}
                  sx={{
                    borderRadius: "12px",
                    fontWeight: "bold",
                  }}
                >
                  <MenuItem value="">
                    <Typography
                      fontWeight="bold"
                      sx={{ fontFamily: "Quicksand" }}
                    >
                      Select Role
                    </Typography>
                  </MenuItem>
                  <MenuItem value="a">
                    <Typography
                      fontWeight="bold"
                      sx={{ fontFamily: "Quicksand" }}
                    >
                      Individual / business
                    </Typography>
                  </MenuItem>
                  <MenuItem value="b" sx={{ fontWeight: "bold" }}>
                    <Typography
                      fontWeight="bold"
                      sx={{ fontFamily: "Quicksand" }}
                    >
                      Disposer
                    </Typography>
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  fontFamily: "Quicksand",
                  fontWeight: "bold",
                  backgroundColor: "#25396F",
                }}
              >
                {!loading ? "Sign In" : "Signing In"}
                {loading && <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                {loading && (
                  <CircularProgress
                    size={20}
                    sx={{
                      color: "white",
                      right: 0,
                    }}
                  />
                )}
              </Button>
              <Grid container>
                <Button
                  color="secondary"
                  onClick={() => {
                    navigate("/login");
                  }}
                  variant="text"
                  style={{
                    fontFamily: "Quicksand",
                    fontWeight: "bold",
                    color: "ghostwhite",
                    textDecoration: "underline",
                    color: "#03045e",
                  }}
                >
                  Already have an account? Sign In
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
