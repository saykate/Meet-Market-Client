import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Shopping from "./pages/Shopping";
import AuthRoute from "./components/AuthRoute";

function App() {

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
        <Route path="/shopping" element={<Shopping />} />
      </Routes>
    </>
  );
}

export default App;
