import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, useLocation} from "react-router-dom";
import Main from "./Main";
import { AuthProvider } from "./AuthProvider/AuthProvider";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);


root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
