import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import bgTile from "/bgimg.jpg"; 

// Wrapper for protecting routes
function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" , minHeight: "100vh",
        backgroundImage: `url(${bgTile})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto", }}>
    
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <nav>
          {user ? (
            <>
              <span style={{ marginRight: "1rem" }}>{user.email}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              
            </>
          )}
        </nav>
      </header>

      {/* Routing */}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <NotesPage />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
