import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
import History from "./Pages/History";
import Appointments from "./Pages/Appointments"; // Import Appointments component
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
        <Route path="/history" element={<History />} />
        <Route path="/appointments" element={<Appointments />} /> {/* Add Appointments route */}
      </Routes>
      {!isHiddenPath && <Footer />}
    </ThemeProvider>
  );
}

export default App;
