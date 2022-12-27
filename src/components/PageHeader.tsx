import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeBars } from "./icons";
import {
  IconBtnStyle,
  OutlineBtnStyle,
  PrimaryBtnStyle,
} from "./styles/button.style";
import {
  AuthButtonsStyle,
  HeaderBarStyle,
  LeftBlockStyle,
  PageHeaderStyle,
  SearchBtnStyle,
  SearchForm,
} from "./styles/PageHeader.style";
import { Search as SearchIcon } from "./icons";
import { InputGroupControlStyle, InputGroupStyle } from "./styles/form.style";
import { SignUpDialog } from "./auth";
import { isLoggedIn, logOut } from "../util/account";

export function PageHeader(props: { toggleNav: () => void }) {
  // it only effect small screen, on big screen it is always open
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <PageHeaderStyle>
      <HeaderBarStyle>
        <LeftBlock toggleNav={props.toggleNav} />
        <Search open={openSearch} />
        <HeadButtons toggleSearch={() => setOpenSearch((open) => !open)} />
      </HeaderBarStyle>
    </PageHeaderStyle>
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
    <SearchForm className={open ? "open" : ""} onSubmit={onSummit} id="search">
      <InputGroupStyle>
        <SearchIcon />
        <InputGroupControlStyle
          name="search"
          type="search"
          placeholder="Search"
        />
      </InputGroupStyle>
    </SearchForm>
  );
}

function LeftBlock(props: { toggleNav: () => void }) {
  return (
    <LeftBlockStyle>
      <IconBtnStyle onClick={props.toggleNav}>
        <ThreeBars />
      </IconBtnStyle>
      <h1>Mosaic</h1>
    </LeftBlockStyle>
  );
}

function HeadButtons({ toggleSearch }: { toggleSearch: () => void }) {
  return (
    <AuthButtonsStyle>
      <SearchBtnStyle onClick={toggleSearch}>search</SearchBtnStyle>
      {isLoggedIn() ? <LogOut /> : <LogInBtn />}
      <SignUpBtn />
    </AuthButtonsStyle>
  );
}

function LogInBtn() {
  const [openDig, setOpenDig] = useState(false);

  return (
    <>
      <OutlineBtnStyle onClick={() => setOpenDig(!openDig)}>
        log in
      </OutlineBtnStyle>
      <SignUpDialog open={openDig} setOpen={setOpenDig} />
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
      <SignUpDialog open={openDig} setOpen={setOpenDig} />
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
