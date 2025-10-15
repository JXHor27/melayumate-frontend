import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/auth/LandingPage";
import EntryPage from "./pages/EntryPage";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/common/LoadingSpinner";

const ProtectedRoute = () => {
 const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    // loading for page reload
    return <LoadingSpinner />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};


function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<EntryPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
