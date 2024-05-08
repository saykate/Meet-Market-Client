import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Login from "./modals/Login";
import "./App.css";

function App() {


  return (
    <>
      <p>Hey from the Client!</p>
    <Navbar />  
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  );
}

export default App;
