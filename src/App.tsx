// import { useState } from 'react'
import { useEffect } from "react";
import "./App.css";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function App() {
  // const [count, setCount] = useState(0)

  const hitServer = async () => {
    const resp = await fetch(SERVER_URL);
    const json = await resp.json();
    console.log(json);
  };

  useEffect(() => {
    hitServer();
  }, []);

  return (
    <>
      <p>Hey from the Client!</p>
    </>
  );
}

export default App;
