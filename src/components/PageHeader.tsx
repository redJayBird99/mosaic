import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Close, MagnifyingGlass, ThreeBars } from "./icons";
import {
  OutlineBtnStyle,
  PlainBtnStyle,
  PrimaryBtnStyle,
} from "./styles/button.style";
import { Search as SearchIcon } from "./icons";
import { LogInDialog, SignUpDialog } from "./auth";
import { isLoggedIn, logOut } from "../util/account";

export function PageHeader(props: { toggleNav: () => void; navOpen: boolean }) {
  // it only effect small screen, on big screen it is always open
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <header className="bg-color border-b border-solid border-gray-300 shadow sticky z-10 top-0">
      <div className="flex items-center h-header justify-between m-auto p-header">
        <LeftBlock toggleNav={props.toggleNav} open={props.navOpen} />
        <Search open={openSearch} />
        <HeadButtons toggleSearch={() => setOpenSearch((open) => !open)} />
      </div>
    </header>
  );
}

function Search({ open }: { open: boolean }) {
  const navigate = useNavigate();
  const onSummit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const q = form.search.value;
    const sort = form.sort?.value;
    const time = form.time?.value;

    if (q) {
      navigate(
        `/search?q=${q}${sort ? `&sort=${sort}` : ""}${
          time ? `&sort=${time}` : ""
        }`
      );
    }
  };

  return (
    <form
      className={`search-form ${open ? "search-open" : ""}`}
      onSubmit={onSummit}
      id="search"
    >
      <label className="hide" htmlFor="search-input">
        Search term
      </label>
      <div className="inputGroup">
        <SearchIcon />
        <input
          className="bg-transparent flex-grow outline-none border-none"
          name="search"
          type="search"
          placeholder="Search"
          id="search-input"
        />
      </div>
    </form>
  );
}

function LeftBlock(props: { toggleNav: () => void; open: boolean }) {
  return (
    <div className="flex items-center gap-2 sm:gap-6">
      <button
        className="icon-btn w-8"
        aria-label="toggle navigation menu"
        onClick={props.toggleNav}
      >
        {props.open ? <Close /> : <ThreeBars />}
      </button>
      <h1 className="font-bold text-3xl m-0 title-hidden ">Mosaic</h1>
    </div>
  );
}

function HeadButtons({ toggleSearch }: { toggleSearch: () => void }) {
  return (
    <div className="items-center flex gap-1">
      <button
        className="icon-btn md:hidden"
        aria-label="open search"
        onClick={toggleSearch}
      >
        <MagnifyingGlass />
      </button>
      {isLoggedIn() ? (
        <LogOut />
      ) : (
        <>
          <LogInBtn />
          <SignUpBtn />
        </>
      )}
    </div>
  );
}

function LogInBtn() {
  const [openDig, setOpenDig] = useState(false);

  return (
    <>
      <PlainBtnStyle onClick={() => setOpenDig(!openDig)}>log in</PlainBtnStyle>
      <LogInDialog key={Math.random()} open={openDig} setOpen={setOpenDig} />
    </>
  );
}

function SignUpBtn() {
  const [openDig, setOpenDig] = useState(false);

  return (
    <>
      <PrimaryBtnStyle onClick={() => setOpenDig(!openDig)}>
        sign up
      </PrimaryBtnStyle>
      <SignUpDialog key={Math.random()} open={openDig} setOpen={setOpenDig} />
    </>
  );
}

function LogOut() {
  const navigate = useNavigate();
  const onClick = () => {
    logOut();
    navigate(0);
  };
  return <OutlineBtnStyle onClick={onClick}>log out</OutlineBtnStyle>;
}
