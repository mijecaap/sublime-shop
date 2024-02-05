import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";
import { FirebaseAppProvider } from "reactfire";
import { BrowserRouter } from "react-router-dom";
import { firebaseConfig } from "./firebase";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <App />
      </FirebaseAppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
