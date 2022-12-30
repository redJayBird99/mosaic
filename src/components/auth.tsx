import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasAccount, logIn, signUp } from "../util/account";
import { Close } from "./icons";
import {
  CloseBtnStyle,
  DialogFormStyle,
  DialogHeaderStyle,
  DialogTitleStyle,
  OutputStyle,
  SubmitBtnStyle,
} from "./styles/auth.style";
import { InputStyle, HideLabelStyle } from "./styles/form.style";
import { AuthDialogStyle } from "./styles/PageHeader.style";

type AuthType = "LOG_IN" | "SING_UP";
type AuthFn = (key: string, pass: string) => boolean;
type DigControl = { open: boolean; setOpen: (b: boolean) => void };

function Auth({
  auth,
  title,
  open,
  setOpen,
  type,
}: { auth: AuthFn; title: JSX.Element; type: AuthType } & DigControl) {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState({ opacity: 0 });
  const [output, setOutput] = useState("");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const key = form?.key.value ?? "";
    const pass = form?.password.value ?? "";

    if (/^\w{4,14}$/.test(key) && /^\w{8,18}$/.test(pass)) {
      if (auth(key, pass)) {
        // refresh
        navigate(0);
      } else {
        setOutput("the given name or password is incorrect");
      }
    } else {
      // TODO error notification
    }
  }

  useEffect(() => {
    setOpacity({ opacity: open ? 1 : 0 });
  }, [open]);

  return (
    <AuthDialogStyle
      open={open}
      aria-labelledby={title.props.id}
      style={opacity}
    >
      <DialogHeaderStyle>
        {title}
        <CloseBtnStyle
          autoFocus
          onClick={() => setOpen(false)}
          aria-label="close dialog"
        >
          <Close />
        </CloseBtnStyle>
      </DialogHeaderStyle>
      <DialogFormStyle onSubmit={onSubmit}>
        <NameInput authType={type} id={type + "name"} />
        <PasswordInput id={type + "pass"} />
        <div>
          <SubmitBtnStyle onBlur={() => setOutput("")} id="user-submit-btn">
            Submit
          </SubmitBtnStyle>
          <OutputStyle htmlFor="user-submit-btn">{output}</OutputStyle>
        </div>
      </DialogFormStyle>
    </AuthDialogStyle>
  );
}

function NameInput({ authType, id }: { authType: AuthType } & { id: string }) {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const onBlur = (v: string) => {
    if (v.length !== 0 && !/^\w{4,14}$/.test(v)) {
      setOutput("the name must be between 4 and 14 alphanumeric characters");
    } else if (v.length !== 0 && authType === "SING_UP" && hasAccount(v)) {
      setOutput("this name was already taken");
    } else {
      setOutput("");
    }
  };

  return (
    <div>
      <HideLabelStyle htmlFor={id}>User Name</HideLabelStyle>
      <InputStyle
        className={output !== "" ? "invalid" : ""}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
        title="between 4 and 14 alphanumeric characters"
        placeholder="name"
        required
        pattern="\w{4,14}"
        name="key"
        type="text"
      />
      <OutputStyle htmlFor="user-name">{output}</OutputStyle>
    </div>
  );
}

function PasswordInput({ id }: { id: string }) {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const onBlur = (value: string) => {
    if (value.length !== 0 && !/^\w{8,18}$/.test(value)) {
      setOutput(
        "the password must be between 8 and 18 alphanumeric characters"
      );
    } else {
      setOutput("");
    }
  };

  return (
    <div>
      <HideLabelStyle htmlFor={id}>User Password</HideLabelStyle>
      <InputStyle
        id={id}
        className={output !== "" ? "invalid" : ""}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
        title="between 8 and 18 alphanumeric characters"
        placeholder="password"
        required
        pattern="\w{8,18}"
        name="password"
        type="password"
      />
      <OutputStyle htmlFor="user-name">{output}</OutputStyle>
    </div>
  );
}

export function LogInDialog({ open, setOpen }: DigControl) {
  return (
    <Auth
      auth={logIn}
      title={<DialogTitleStyle id="dig-title-log">Log in</DialogTitleStyle>}
      open={open}
      setOpen={setOpen}
      type="LOG_IN"
    />
  );
}

export function SignUpDialog({ open, setOpen }: DigControl) {
  return (
    <Auth
      auth={signUp}
      title={<DialogTitleStyle id="dig-title-sign">Sign up</DialogTitleStyle>}
      open={open}
      setOpen={setOpen}
      type="SING_UP"
    />
  );
}
