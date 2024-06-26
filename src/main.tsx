import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import theme from "./context/theme.ts";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authContext.tsx";
import CategoryModalProvider from "./context/categoryModalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <CategoryModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CategoryModalProvider>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
