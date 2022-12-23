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

export function addToHistory(k: keyof UserHistory, id: string): void {
  const history = getHistory();
  history[k].add(id);
  localStorage.setItem(
    KEY,
    JSON.stringify({
      flagged: [...history.flagged],
      saved: [...history.saved],
    })
  );
}
