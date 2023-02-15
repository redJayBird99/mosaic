import { Post } from "../reddit/reddit";
import { getLoggedIn } from "./account";

const GUEST_KEY = "tmp";
const savedContentKey = (user?: string) => `mosaic-${user ?? GUEST_KEY}-saved`;
const historyKey = (user?: string) => `mosaic-${user ?? GUEST_KEY}-history`;
export type UserHistory = {
  user: string;
  // the strings are ids
  flagged: Set<string>;
  saved: Set<string>;
};
let history: undefined | UserHistory;

export function getHistory(): UserHistory {
  const user = getLoggedIn()?.key;

  if (history && history?.user === user) {
    return history;
  }

  const h = JSON.parse(localStorage.getItem(historyKey(user)) ?? "{}");
  return (history = {
    user: user ?? GUEST_KEY,
    flagged: new Set(h?.flagged ?? []),
    saved: new Set(h?.saved ?? []),
  });
}

function updateHistory(update: (h: UserHistory) => void) {
  const history = getHistory();
  update(history);
  localStorage.setItem(
    historyKey(history.user),
    JSON.stringify({
      user: history.user,
      flagged: [...history.flagged],
      saved: [...history.saved],
    })
  );
}

export function addToHistory(k: keyof UserHistory, c: Post): void {
  updateHistory((history) => {
    if (k === "saved" || k === "flagged") {
      history[k].add(c.id);
    }

    if (k === "saved") {
      addToSavedContent(c, history.user);
    }
  });
}

export function deleteFromHistory(k: keyof UserHistory, c: Post): void {
  updateHistory((history) => {
    if (k === "saved" || k === "flagged") {
      history[k].delete(c.id);
    }

    if (k === "saved") {
      deleteFromSavedContent(c, history.user);
    }
  });
}

export function getSavedContent(): Post[] {
  return JSON.parse(
    localStorage.getItem(savedContentKey(getLoggedIn()?.key)) ?? "[]"
  );
}

function updateSavedContent(update: (c: Post[]) => void, user?: string) {
  const saved = getSavedContent();
  update(saved);
  localStorage.setItem(savedContentKey(user), JSON.stringify(saved));
}

/** add to the saves without checking for duplication */
function addToSavedContent(c: Post, user?: string) {
  updateSavedContent((cs) => cs.push(c), user);
}

function deleteFromSavedContent(c: Post, user?: string) {
  updateSavedContent((saved) => {
    const i = saved.findIndex((save) => save.id === c.id);

    if (i !== -1) {
      saved.splice(i, 1);
    }
  }, user);
}
