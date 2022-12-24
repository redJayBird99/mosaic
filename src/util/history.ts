const KEY = "mosaic-history";
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

export function addToHistory(k: keyof UserHistory, id: string): void {
  updateHistory((history) => history[k].add(id));
}

export function deleteFromHistory(k: keyof UserHistory, id: string): void {
  updateHistory((history) => history[k].delete(id));
}
