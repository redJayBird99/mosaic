import { Content } from "../reddit/reddit";

const KEY = "mosaic-history";
const SAVED_CONTENT_KEY = "mosaic-saved";
export type UserHistory = {
  // the strings are ids
  flagged: Set<string>;
  saved: Set<string>;
};
let history: undefined | UserHistory;

export function getHistory(): UserHistory {
  if (history) {
    return history;
  }

  const h = JSON.parse(localStorage.getItem(KEY) ?? "{}");
  return (history = {
    flagged: new Set(h?.flagged ?? []),
    saved: new Set(h?.saved ?? []),
  });
}

function updateHistory(update: (h: UserHistory) => void) {
  const history = getHistory();
  update(history);
  localStorage.setItem(
    KEY,
    JSON.stringify({
      flagged: [...history.flagged],
      saved: [...history.saved],
    })
  );
}

export function addToHistory(k: keyof UserHistory, c: Content): void {
  updateHistory((history) => {
    history[k].add(c.id);

    if (k === "saved") {
      addToSavedContent(c);
    }
  });
}

export function deleteFromHistory(k: keyof UserHistory, c: Content): void {
  updateHistory((history) => {
    history[k].delete(c.id);

    if (k === "saved") {
      deleteFromSavedContent(c);
    }
  });
}

export function getSavedContent(): Content[] {
  return JSON.parse(localStorage.getItem(SAVED_CONTENT_KEY) ?? "[]");
}

function updateSavedContent(update: (c: Content[]) => void) {
  const saved = getSavedContent();
  update(saved);
  localStorage.setItem(SAVED_CONTENT_KEY, JSON.stringify(saved));
}

/** add to the saves without checking for duplication */
function addToSavedContent(c: Content) {
  updateSavedContent((cs) => cs.push(c));
}

function deleteFromSavedContent(c: Content) {
  updateSavedContent((saved) => {
    const i = saved.findIndex((save) => save.id === c.id);

    if (i !== -1) {
      saved.splice(i, 1);
    }
  });
}
