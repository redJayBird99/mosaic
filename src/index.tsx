import "./style.css";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";

const root = document.createElement("div");
document.body.append(root);
createRoot(root).render(<App />);
