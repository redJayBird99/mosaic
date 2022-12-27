import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedIn, logIn, signUp } from "../util/account";
import { Close } from "./icons";
import {
  CloseBtnStyle,
  DialogFormStyle,
  DialogHeaderStyle,
  DialogTitleStyle,
  HideLabelStyle,
} from "./styles/auth.style";
import { PrimaryBtnStyle } from "./styles/button.style";
import { InputStyle } from "./styles/form.style";

type AuthFn = (key: string, pass: string) => boolean;
type DigControl = { open: boolean; setOpen: (b: boolean) => void };

function Auth({
  auth,
  title,
  open,
  setOpen,
}: { auth: AuthFn; title: JSX.Element } & DigControl) {
  const navigate = useNavigate();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const key = form?.key.value ?? "";
    const pass = form?.password.value ?? "";
    console.log();

    if (key.length >= 4 && pass.length >= 8 && auth(key, pass)) {
      // refresh
      navigate(0);
    } else {
      // TODO error notification
    }
  }

  return (
    <dialog open={open} aria-labelledby="dig-title">
      <DialogHeaderStyle>
        {title}
        <CloseBtnStyle onClick={() => setOpen(false)} aria-label="close dialog">
          <Close />
        </CloseBtnStyle>
      </DialogHeaderStyle>
      <DialogFormStyle onSubmit={onSubmit}>
        <HideLabelStyle htmlFor="user-name">User Name</HideLabelStyle>
        <InputStyle
          id="user-name"
          title="between 4 and 14 alphanumeric characters"
          placeholder="name"
          required
          pattern="\w{4,14}"
          name="key"
          type="text"
        />
        <HideLabelStyle htmlFor="user-pass">User Password</HideLabelStyle>
        <InputStyle
          id="user-pass"
          title="between 8 and 18 alphanumeric characters"
          placeholder="password"
          required
          pattern="\w{8,18}"
          name="password"
          type="password"
        />
        <PrimaryBtnStyle>Submit</PrimaryBtnStyle>
      </DialogFormStyle>
    </dialog>
  );
}

export function LogInDialog({ open, setOpen }: DigControl) {
  return (
    <Auth
      auth={logIn}
      title={<DialogTitleStyle id="dig-title">Log in</DialogTitleStyle>}
      open={open}
      setOpen={setOpen}
    />
  );
}

export function SignUpDialog({ open, setOpen }: DigControl) {
  return (
    <Auth
      auth={signUp}
      title={<DialogTitleStyle id="dig-title">Sign up</DialogTitleStyle>}
      open={open}
      setOpen={setOpen}
    />
  );
}
