import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./shared/context/LoadingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <Toaster duration={2500} richColors closeButton position="top-right" />
        <App />
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
