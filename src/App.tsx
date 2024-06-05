import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Conversation from "./components/Conversation";
import Profile from "./pages/Profile";
import Shopping from "./pages/Shopping";
import About from "./pages/About";
import AuthRoute from "./components/AuthRoute";
import useAuthContext from "./hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";

function App() {
  const { token, logout } = useAuthContext();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          logout();
        }
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    }
  }, [token, logout]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile/:userId"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <AuthRoute>
              <Messages />
            </AuthRoute>
          }
        />
        <Route
          path="/messages/:recipientId"
          element={
            <AuthRoute>
              <Conversation />
            </AuthRoute>
          }
        />

        <Route path="/shopping" element={<Shopping />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
