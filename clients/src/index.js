import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { AuthContextProvider } from "./context/AuthContext";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
