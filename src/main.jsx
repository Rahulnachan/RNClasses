import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>      {/* ✅ single top-level Router */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);