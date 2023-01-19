import { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { listingContent, SavedBatch } from "../reddit/reddit";
import { getHistory } from "../util/history";
import { listings, NavBar } from "./nav-bar";
import { PageHeader } from "./PageHeader";
import { NotFound } from "./post";
import { Posts } from "./posts";
import { Search } from "./search";

export const mainRoutes = [
  { path: "search", element: <Search /> },
  { path: "saved", element: <Saved /> },
  { path: ":listing", element: <Listing /> },
  { element: <Listing />, index: true },
];

export function Layout({ main }: { main: JSX.Element }) {
  const [navOpen, setNavOpen] = useState(false);
  const l = useLocation();
  const [oldPath, setOldPath] = useState(l.pathname);

  if (oldPath !== l.pathname) {
    setOldPath(l.pathname);
    setNavOpen(false);
  }

  return (
    <>
      <PageHeader
        navOpen={navOpen}
        toggleNav={() => setNavOpen((nav) => !nav)}
      ></PageHeader>
      <NavBar open={navOpen} />
      {main}
    </>
  );
}

export function App() {
  return <Layout main={<Outlet />} />;
}

export function Page404() {
  return <Layout main={<MainNotFound />} />;
}

function MainNotFound() {
  return (
    <NotFound text="404 Sorry, the page you are looking for doesn't exist" />
  );
}

function Listing() {
  const listing = useParams().listing ?? "best";

  if (!listings.includes(listing)) {
    return <MainNotFound />;
  }

  // random key because we want a full refresh when already on current url (the state of the posts change with time)
  return <Posts key={Math.random()} reddit={listingContent(listing)} />;
}

function Saved() {
  if (getHistory().saved.size === 0) {
    return <NotFound text={"Sorry, we couldn't find any saved post"} />;
  }

  // we don't need a refresh here (the state of the posts is save locally...)
  return <Posts reddit={new SavedBatch()} />;
}
