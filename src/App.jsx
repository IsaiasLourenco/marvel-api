import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/pages/SplashScreen";
import Home from "./components/pages/Home";
import Details from "./components/pages/Details";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false); // Finaliza a splash
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
