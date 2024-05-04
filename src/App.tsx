import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Input from "./components/Input";
import "./App.css";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function App() {

  const hitServer = async () => {
    const resp = await fetch(SERVER_URL);
    const json = await resp.json();
    console.log(json);
  };

  useEffect(() => {
    hitServer();
  }, []);

  const [inputValue, setInputValue] = useState("")

  return (
    <>
      <p>Hey from the Client!</p>
      <Input 
        name="login"
        type="text"
        value={inputValue}
        placeholder="Enter username"
        onChange={(e) => console.log(e.target.value)}
          />
    <Routes>
      <Route />
    </Routes>
    </>
  );
}

export default App;
