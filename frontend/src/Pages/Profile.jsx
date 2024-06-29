import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import ProfileHistory from "../Components/ProfileHistory.jsx";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useGlobal } from "../Context/globalData";

import { useAuth } from "../Context/auth";
import config from "../config.js";

const Profile = () => {
  const imageURL =
    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=";

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("abc");
  const [email, setEmail] = useState("abc@gmail.com");
  const [type, setType] = useState("User");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");

  const [processingMethods, setProcessingMethods] = useState("");
  const [quantity, setQuantity] = useState("");
  const [licenceNumber, setLicenceNumber] = useState("");

  const [isValidPhone, setIsValidPhone] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, verifyUser, LogOut } = useAuth();

  const [justVerify, setJustVerify] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { users } = useGlobal();
  const [wastType, setWastType] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const handleNewQuantity = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setNewQuantity(input);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePhoneNumber = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input) && input.length <= 10) {
      setPhoneNumber(input);
    }
  };

  const handleQuantity = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setQuantity(input);
    }
  };

  const validatePhoneNumber = (input) => {
    if (input) {
      const value = input.replace(/\D/g, "");
      const isValid = /^\d{10}$/.test(value);
      setIsValidPhone(isValid);
    } else {
      setIsValidPhone(false); // Set to false if input is undefined
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Quicksand",
      body1: {
        fontWeight: "600",
      },
    },
  });

  const UpdateProfile = async () => {
    setJustVerify(true);
    if (name === "" || address === "" || !isValidPhone || location === "") {
      return;
    }
    setLoading(true);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.post(
        (config.BACKEND_API || "http://localhost:8000") + "/update-profile",
        {
          name,
          username: userName,
          email,
          role: type,
          contact: phoneNumber,
          address,
          location,
        },
        { headers }
      );
    } catch (err) {
      // if (err.results.status === 403) {
      //   LogOut();
      // }
      console.log(err);
    }
    setLoading(false);
  };

  const getProfile = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };

    try {
      const result = await axios.get(
        (config.BACKEND_API || "http://localhost:8000") + "/profile",
        {
          headers,
        }
      );
      const { user } = result.data;
      setName(user.name);
      setEmail(user.email);
      setUserName(user.username);
      setType(user.role);
      setPhoneNumber(user.contact);
      setAddress(user.address);
      setLocation(user.location);
      validatePhoneNumber(user.contact);
    } catch (err) {
      // if (err.result.status === 403) {
      //   LogOut();
      // }
      console.log(err);
    }
  };

  useEffect(() => {
    // verifyUser();
  }, []);

  useEffect(() => {
    getProfile();
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        };

        const response = await fetch(
          (config.BACKEND_API || "http://localhost:8000") + "/getTomTomApiKey",
          { headers }
        );
        const data = await response.json();
        setApiKey(data.apiKey.trim());
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };
    fetchApiKey();
  }, []);

  const initializeTomTomSearchBox = (apiKey) => {
    var options = {
      searchOptions: {
        key: apiKey,
        language: "en-GB",
        limit: 5,
        placeholder: "Search for Nearby Location",
      },
      autocompleteOptions: {
        key: apiKey,
        language: "en-GB",
      },
    };

    // Set the container to the ID of the div
    options.container = "#searchBoxContainer";

    var ttSearchBox = new window.tt.plugins.SearchBox(
      window.tt.services,
      options
    );

    ttSearchBox.on("tomtom.searchbox.resultselected", function (data) {
      const newLocation =
        String(data.data.result.position.lat) +
        "," +
        String(data.data.result.position.lng);
      document.getElementById("location").value = newLocation;
      setLocation(newLocation);
    });

    var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
    document.getElementById("searchBoxContainer").appendChild(searchBoxHTML);
  };

  useEffect(() => {
    if (apiKey) {
      initializeTomTomSearchBox(apiKey);
    }
  }, [apiKey]);

  return (
    <>
      <div
        data-aos="fade-up"
        style={{ fontFamily: "Quicksand", fontWeight: "600" }}
      >
        <ThemeProvider theme={theme}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <Card
                sx={{
                  maxWidth: "100%",
                  justifyContent: "center",
                  textAlign: "center",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardMedia
                  component="img"
                  alt="profile"
                  height="100"
                  image={imageURL}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    YOU
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    {userName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    {email}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    +91 {phoneNumber}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              margin={0}
              padding={0}
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <Card>
                <CardContent>
                  <Grid container spacing={2} style={{ marginLeft: "0.1em" }}>
                    <Grid item xs={10} style={{ marginTop: "1em" }}>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        Profile
                      </Typography>
                    </Grid>
                    <Grid item xs={10} style={{ marginTop: "1em" }}>
                      <TextField
                        id="standard-helperText-1"
                        label="Name"
                        value={name}
                        size="small"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        fullWidth
                        autoComplete="off"
                        error={justVerify && name === ""}
                        helperText={
                          justVerify &&
                          (name === ""
                            ? "Please enter a valid name containing only letters."
                            : "")
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={10} style={{ marginTop: "0.4em" }}>
                      <TextField
                        id="standard-helperText-4"
                        label="Username"
                        value={userName}
                        size="small"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        autoComplete="off"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        id="outlined-read-only-input-5"
                        label="Email"
                        value={email}
                        size="small"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        autoComplete="off"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={10} style={{ marginTop: "0.4em" }}>
                      <TextField
                        id="standard-helperText-4"
                        label="Type"
                        value={type}
                        size="small"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        autoComplete="off"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={10} style={{ marginTop: "0.4em" }}>
                      <TextField
                        id="address"
                        label="Address"
                        value={address}
                        size="small"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        fullWidth
                        autoComplete="off"
                        error={justVerify && address === ""}
                        helperText={
                          justVerify &&
                          (address === "" ? "address cannot be empty." : "")
                        }
                        multiline
                        rows={3}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={10} style={{ marginTop: "0.4em" }}>
                      <TextField
                        size="small"
                        id="phoneNumber"
                        label="Phone No."
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        fullWidth
                        autoComplete="off"
                        error={justVerify && phoneNumber === ""}
                        helperText={
                          justVerify &&
                          (phoneNumber === ""
                            ? "Please enter a 10-digit number."
                            : "")
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      style={{ marginTop: "0.4em" }}
                      id="searchBoxContainer"
                    >
                      <PlaceOutlinedIcon /> Location{" "}
                      <span style={{ color: "lightgray" }}>(Edit)</span>
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      style={{ marginTop: "0.4em" }}
                      id="searchBoxContainer"
                    ></Grid>
                    <Grid item xs={10} style={{ marginTop: "0.4em" }}>
                      <TextField
                        id="location"
                        label="Location"
                        size="small"
                        value={location === "" ? "N/A" : location}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                        fullWidth
                      />
                    </Grid>
                    {window.localStorage.getItem("role") === "user" ? (
                      <ProfileHistory />
                    ) : (
                      <></>
                    )}
                    {window.localStorage.getItem("role") === "disposer" ? (
                      <>
                        <Grid item xs={10} style={{ marginTop: "0.4em" }}>
                          <TextField
                            size="small"
                            id="Processing-Methods"
                            label="Processing Methods"
                            value={processingMethods}
                            onChange={(e) => {
                              setProcessingMethods(e.target.value);
                            }}
                            fullWidth
                            autoComplete="off"
                            error={justVerify && processingMethods === ""}
                            helperText={
                              justVerify &&
                              (processingMethods === ""
                                ? "Processing Methods cannot be empty."
                                : "")
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                fontWeight: "bold",
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={10} style={{ marginTop: "0.4em" }}>
                          <TextField
                            size="small"
                            id="Processing-Methods"
                            label="Processing Methods"
                            value={quantity}
                            onChange={handleQuantity}
                            fullWidth
                            autoComplete="off"
                            error={justVerify && quantity === ""}
                            helperText={
                              justVerify &&
                              (quantity === ""
                                ? "Quantity cannot be empty."
                                : "")
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                fontWeight: "bold",
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={10} style={{ marginTop: "0.4em" }}>
                          <TextField
                            size="small"
                            id="Licence-Number"
                            label="Licence Number"
                            value={licenceNumber}
                            onChange={(e) => {
                              setLicenceNumber(e.target.value);
                            }}
                            fullWidth
                            autoComplete="off"
                            error={justVerify && licenceNumber === ""}
                            helperText={
                              justVerify &&
                              (licenceNumber === ""
                                ? "Licence Number cannot be empty."
                                : "")
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                fontWeight: "bold",
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <React.Fragment>
                            <Button
                              variant="outlined"
                              onClick={handleClickOpen}
                            >
                              Add more
                            </Button>
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                ADD Waste
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  <Grid>
                                    <Grid item padding={1} margin={0}>
                                      <FormControl
                                        size="small"
                                        fullWidth
                                        required
                                        margin="normal"
                                      >
                                        <InputLabel id="type-label">
                                          Type
                                        </InputLabel>
                                        <Select
                                          margin="normal"
                                          labelId="type-label"
                                          id="type"
                                          required
                                          fullWidth
                                          label="Type"
                                          name="type"
                                          value={wastType}
                                          onChange={(e) => {
                                            setWastType(e.target.value);
                                          }}
                                          error={justVerify && wastType === ""}
                                          sx={{
                                            minWidth: "400px",
                                            borderRadius: "12px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          <MenuItem value="">
                                            Select Role
                                          </MenuItem>
                                          {users.map((item, index) => (
                                            <MenuItem
                                              key={index}
                                              value={item.type}
                                            >
                                              <Typography fontWeight="bold">
                                                {item.type}
                                              </Typography>
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                    <Grid item padding={1} margin={0}>
                                      <TextField
                                        size="small"
                                        id="quantity"
                                        label="Quantity"
                                        value={newQuantity}
                                        onChange={handleNewQuantity}
                                        fullWidth
                                        autoComplete="off"
                                        error={newQuantity === ""}
                                        helperText={
                                          newQuantity === ""
                                            ? "Quantity cannot be empty."
                                            : ""
                                        }
                                        sx={{
                                          "& .MuiOutlinedInput-root": {
                                            borderRadius: "12px",
                                            fontWeight: "bold",
                                          },
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  variant="outlined"
                                  onClick={handleClose}
                                  color="error"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    handleClose();
                                  }}
                                  autoFocus
                                  sx={{
                                    color: "white",
                                    backgroundColor: "#2A386B",
                                    "&:hover": {
                                      backgroundColor: "#2A386B",
                                    },
                                  }}
                                >
                                  Add
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </React.Fragment>
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <div style={{ textAlign: "center", marginTop: "1em" }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={UpdateProfile}
                      style={{ marginTop: "1em", backgroundColor: "#2A386B" }}
                      sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                    >
                      {!loading ? "Update" : "Updating"}
                      {loading && (
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      )}
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
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            style={{ marginTop: "5em" }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              xl={4}
              style={{ textAlign: "center" }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={LogOut}
                style={{ marginTop: "1em" }}
                sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
              >
                Logout &nbsp;
                <LogoutIcon />
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </>
  );
};

export default Profile;
