import "./style.css";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import React from "react";

const root = document.createElement("div");
document.body.append(root);
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
