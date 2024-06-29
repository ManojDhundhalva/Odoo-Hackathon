import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
<<<<<<< HEAD
import History from "./Pages/History";
import Appointments from "./Pages/Appointments"; // Import Appointments component
=======
import Profile from "./Pages/Profile";
import AboutUS from "./Pages/AboutUs";
import History from "./Pages/History"; // Import the History component
>>>>>>> bc8a30b9da15c9d8b47b1cd9fbf41c06d265ce56
import "./App.css";

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
    <ThemeProvider theme={theme}>
      {!isHiddenPath && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
<<<<<<< HEAD
        <Route path="/history" element={<History />} />
        <Route path="/appointments" element={<Appointments />} /> {/* Add Appointments route */}
=======
        <Route path="/profile" element={<Profile />} />
        <Route path="/about-us" element={<AboutUS />} />
        <Route path="/history" element={<History />} /> {/* Add History route */}
>>>>>>> bc8a30b9da15c9d8b47b1cd9fbf41c06d265ce56
      </Routes>
      {!isHiddenPath && <Footer />}
    </ThemeProvider>
  );
}

export default App;
