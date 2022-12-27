const ACCOUNTS_KEY = "mosaic-accounts";
const LOGGED_IN_KEY = "mosaic-logged-in";

type Account = {
  key: string;
  password: string;
};

export function getLoggedIn(): Account | undefined {
  const lgIn = localStorage.getItem(LOGGED_IN_KEY);

  if (lgIn) {
    return JSON.parse(lgIn);
  }
}

export function isLoggedIn(): boolean {
  return Boolean(localStorage.getItem(LOGGED_IN_KEY));
}

function getAccounts(): Account[] {
  return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "[]");
}

export function logIn(key: string, password: string): boolean {
  const acc = getAccounts().find((a) => a.key === key);

  if (acc && acc.password === password) {
    localStorage.setItem(LOGGED_IN_KEY, JSON.stringify(acc));
    return true;
  }

  return false;
}

export function logOut() {
  localStorage.removeItem(LOGGED_IN_KEY);
}

export function signUp(key: string, password: string): boolean {
  const acs = getAccounts();

  if (password.length >= 8 && !acs.some((a) => a.key === key)) {
    const newAcc = { key, password };
    acs.push(newAcc);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(acs));
    localStorage.setItem(LOGGED_IN_KEY, JSON.stringify(newAcc));
    return true;
  }

  return false;
}
