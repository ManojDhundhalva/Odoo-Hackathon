import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/Profile";
import AboutUs from "./Pages/AboutUs";
import History from "./Pages/History";
import Appointments from "./Pages/Appointments";
import CollectorDashboard from "./Pages/CollectorDashboard";
import "./App.css";
import { Grid } from "@mui/material";

const themeStyle = {
  typography: {
    fontFamily: "Quicksand",
  },
};

function App() {
  const location = useLocation();
  const hiddenPaths = ["/login", "/register"];
  const isHiddenPath = hiddenPaths.includes(location.pathname);
  const theme = createTheme(themeStyle);

  return (
    <Grid id="style-1" sx={{ width: "100%", height: "100vh" }}>
      <ThemeProvider theme={theme}>
        {!isHiddenPath && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/history" element={<History />} />
          <Route path="/collectorDashboard" element={<CollectorDashboard />} />
        </Routes>
        {!isHiddenPath && <Footer />}
      </ThemeProvider>
    </Grid>
  );
}

export default App;
