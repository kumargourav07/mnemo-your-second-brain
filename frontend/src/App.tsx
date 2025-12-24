import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { SharePage } from "./pages/SharePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  function AuthListener() {
    const navigate = useNavigate();
    React.useEffect(() => {
      const handler = () => {
        if (window.location.pathname !== "/auth") navigate("/auth");
      };
      window.addEventListener("unauthorized", handler);
      return () => window.removeEventListener("unauthorized", handler);
    }, [navigate]);
    return null;
  }

  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <AuthListener />
          <Routes>
            <Route path="/brain/:shareHash" element={<SharePage />} />

            <Route element={<PublicRoute />}>
              <Route path="/auth" element={<AuthPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

      <Toaster richColors={false} position="bottom-right" />
    </>
  );
}

export default App;
