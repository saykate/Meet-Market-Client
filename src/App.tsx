import { Routes, Route } from "react-router-dom";
// import AuthRoute from "./components/AuthRoute";
import Login from "./pages/Login";
import "./App.css";

function App() {


  return (
    <>
      <p>Hey from the Client!</p>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
    </>
  );
}

export default App;
