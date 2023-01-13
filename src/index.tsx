import "./style.css";
import { createRoot } from "react-dom/client";
import { App, mainRoutes, Page404 } from "./components/App";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** this function is specifically to handle a customized redirection from the 404 github pages,
 * because gitHub pages doesn't support Single Page Apps we need some hacks
 *
 * when the 404 page get hit, it redirects the request to the index page,
 * but to do that the original path is converted as a query string, this function
 * take care of reconstructing the original requested url, only if "gh-path" query exists
 *
 * as reference https://github.com/rafgraph/spa-github-pages/blob/gh-pages/404.html
 * the idea is basically the the same
 */
function handleGitHubPages404Redirection() {
  const prs = new URLSearchParams(location.search);
  const path = prs.get("gh-path");

  if (path) {
    prs.delete("gh-path");
    history.replaceState({}, "", path + "?" + prs.toString() + location.hash);
  }
}

handleGitHubPages404Redirection();

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
