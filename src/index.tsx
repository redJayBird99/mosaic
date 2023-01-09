import "./style.css";
import { createRoot } from "react-dom/client";
import { App, mainRoutes, Page404 } from "./components/App";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const root = document.createElement("div");
document.body.append(root);
const router = createBrowserRouter(
  [
    { path: "/", element: <App />, children: mainRoutes },
    { path: "*", element: <Page404 /> },
  ],
  { basename: "/mosaic/" }
);

createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
