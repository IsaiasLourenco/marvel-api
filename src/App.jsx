import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from "./components/context/ThemeContext";
import { AppProvider } from "./components/context/AppContext";
import SplashScreen from "./components/pages/SplashScreen";
import Home from "./components/pages/Home";
import Details from "./components/pages/Details";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false); // Finaliza a splash
  };

    return (
    <AppProvider>
      <ThemeContextProvider>
        {showSplash ? (
          <SplashScreen onFinish={handleSplashFinish} />
        ) : (
          <BrowserRouter>
            <Routes>
              {/* rota padrão para "/" */}
              <Route index element={<Home />} />
              <Route path="/characters/:id" element={<Details />} />
            </Routes>
          </BrowserRouter>
        )}
      </ThemeContextProvider>
    </AppProvider>
  );

}

export default App;