import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {
  Grid,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../Context/auth.jsx";
import axios from "axios";
import config from "../config.js";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";

const defaultTheme = createTheme();

export default function Login() {
  const [loading, setloading] = useState(false);
  const [justVerify, setJustVerify] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const { setIsLoggedIn, LogOut } = useAuth();

  const [isAlert, setIsAlert] = useState(false);
  // const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordofLogin = (e) => {
    const input = e.target.value;
    setPassword(input);
    if (input.length < 8) {
      setValidPassword(false);
      return;
    } else {
      setValidPassword(true);
    }
  };

  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setJustVerify(true);
    if (emailUsername === "" || password === "" || !validPassword) {
      return;
    }
    setloading(true);
    await axios
      .post(config.BACKEND_API + "/create-session", {
        emailUsername: emailUsername,
        password: password,
      })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Invalid credentials");
        console.error("Error: ", error);
        // LogOut();
      });
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
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderRadius: "2em",
              padding: "3em",
              height: "auto",
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
              Sign in
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
                required
                fullWidth
                label="Username / Email Address"
                name="email"
                size="small"
                autoFocus
                value={emailUsername}
                onChange={(e) => {
                  setEmailUsername(e.target.value);
                }}
                InputProps={{
                  style: {
                    fontFamily: "Quicksand",
                    fontWeight: "bold",
                    color: "#25396F",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#02294F" }} />
                    </InputAdornment>
                  ),
                }}
                error={justVerify && emailUsername === ""}
                helperText={
                  justVerify &&
                  (emailUsername == "" ? "This field cannot be empty." : "")
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
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyRoundedIcon sx={{ color: "#02294F" }} />
                    </InputAdornment>
                  ),
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
                {!loading ? "Sign In" : "Signing In...."}
              </Button>
              <Grid container>
                <Button
                  color="secondary"
                  onClick={() => {
                    navigate("/register");
                  }}
                  variant="text"
                  style={{
                    fontFamily: "Quicksand",
                    fontWeight: "bold",
                    color: "#03045e",
                    textDecoration: "underline",
                  }}
                >
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
