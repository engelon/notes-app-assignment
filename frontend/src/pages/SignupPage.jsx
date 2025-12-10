import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup as signupApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await signupApi(email, password);
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        fontFamily: "'Inter', 'Avenir', 'Helvetica Neue', system-ui, sans-serif",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "white",
          padding: "2.5rem 2.25rem",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/bgimg.jpg"
          alt="App icon"
          style={{
            width: "64px",
            height: "64px",
            marginBottom: "0.75rem",
          }}
        />

        <h2
          style={{
            margin: 0,
            marginBottom: "0.25rem",
            fontWeight: 600,
            fontSize: "1.5rem",
            letterSpacing: "0.02em",
          }}
        >
          Create an Account
        </h2>

        <p
          style={{
            margin: 0,
            marginBottom: "1.25rem",
            fontSize: "0.9rem",
            color: "#666",
          }}
        >
          Start your notes journey
        </p>

        <div style={{ width: "100%" }}>
          <ErrorMessage message={error} />

          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: error ? "0.75rem" : "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem",
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.8rem 0.9rem",
                borderRadius: "10px",
                border: "1px solid #d0d0d0",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.8rem 0.9rem",
                borderRadius: "10px",
                border: "1px solid #d0d0d0",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "0.25rem",
                width: "100%",
                padding: "0.85rem",
                background: "#4a5cff",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "0.98rem",
                cursor: loading ? "default" : "pointer",
                fontWeight: 600,
                transition: "transform 0.1s ease, box-shadow 0.1s ease, opacity 0.2s",
                boxShadow: "0 6px 15px rgba(74, 92, 255, 0.35)",
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? <LoadingSpinner /> : "Sign Up"}
            </button>
          </form>

          <p
            style={{
              marginTop: "1.2rem",
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#4a5cff",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
