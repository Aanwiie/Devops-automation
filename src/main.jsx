import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LandingPage from "./pages/LandingPage.jsx"; // 👈 NEW
import Navbar from "./components/Navbar.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/landing" element={<LandingPage />} /> {/* 👈 NEW */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
