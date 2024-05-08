import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./shared/context/LoadingContext.jsx";
import { AuthProvider } from "./shared/context/AuthContext.jsx";
import { GlobalSearchProvider } from "./shared/context/GlobalSearchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GlobalSearchProvider>
          <LoadingProvider>
            <Toaster
              duration={2500}
              richColors
              closeButton
              position="top-right"
            />
            <App />
          </LoadingProvider>
        </GlobalSearchProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
