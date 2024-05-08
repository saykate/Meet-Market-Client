import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Login from "./modals/Login";
import Register from "./modals/Register"

function App() {

  return (
    <>
    <Navbar />  
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  );
}

export default App;
