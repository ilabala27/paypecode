import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Country } from '../view/screens/master/address/country/Country';
import { Home } from '../view/screens/home/Home';
import '../utils/css/App.css';

function MainNavigator() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        
        {/* Home */}
        <Route path="/" element={<Home />} />
        
        {/* Masters */}
        <Route path="about" element={<Country />} />

      </Routes>
    </div>
  );
}

export default MainNavigator;
