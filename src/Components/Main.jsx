import React from "react";
import "./Main.css";
import { Routes, Route } from "react-router-dom";
import CitiesNames from "./Pages/CitiesNames.jsx";
import CityDetails from "./Pages/CityDetails.jsx";
import Clock from "./Pages/Clock.jsx";
import Header from "./Header.jsx";
import Calendar from "./Pages/Calendar.jsx";

const Main = () => {
  return (
    <div className="main-div">
      <Header />
      <Routes>
        <Route path="/" element={<Clock />} />
        <Route path="/city/:cityName" element={<CityDetails />} />
        <Route path="/cities" element={<CitiesNames />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </div>
  );
};

export default Main;
