import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Query,
  searchContent,
  serializeQuery,
  sortOptions,
  timeOptions,
} from "../reddit/reddit";
import { Posts } from "./posts";
import { SelectQueryStyle } from "./styles/form.style";
import { Users } from "./users";

type SearchType = "post" | "user";
type HandleChange = (e: ChangeEvent<HTMLSelectElement>) => void;
type OnQueryChange = (key: keyof Query) => HandleChange;

function useQuerySearch(): [Query, OnQueryChange] {
  let [searchPms, setSearchPms] = useSearchParams();
  const q = {
    q: searchPms.get("q"),
    sort: searchPms.get("sort"),
    t: searchPms.get("t"),
  };

  function onQueryChange(key: keyof Query): HandleChange {
    return (e) => {
      q[key] = e.target.value;
      setSearchPms(serializeQuery(q));
    };
  }

  return [q, onQueryChange];
}

export function Search() {
  const [type, setType] = useState<SearchType>("post");

  const TypeControls = (
    <div className="mb-2 flex gap-1">
      <button
        className={`btn-sub-search ${type === "post" ? "bg-white shadow" : ""}`}
        onClick={() => setType("post")}
      >
        Posts
      </button>
      <button
        className={`btn-sub-search ${type === "user" ? "bg-white shadow" : ""}`}
        onClick={() => setType("user")}
      >
        People
      </button>
    </div>
  );

  return type === "post" ? (
    <SearchPosts ctrl={TypeControls} />
  ) : (
    <SearchUser ctrl={TypeControls} />
  );
}

function SearchPosts(props: { ctrl: JSX.Element }) {
  const [q, onChange] = useQuerySearch();

  const controls = (
    <section className="col-span-full">
      {props.ctrl}
      <div className="flex gap-1">
        <SelectQueryStyle
          className="w-32"
          onChange={onChange("sort")}
          value={q.sort ?? ""}
          form="search"
        >
          <option value="">Sort</option>
          {sortOptions.map((e) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </SelectQueryStyle>
        <SelectQueryStyle
          onChange={onChange("t")}
          value={q.t ?? ""}
          form="search"
        >
          <option value="">Time</option>
          {timeOptions.map((e) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </SelectQueryStyle>
      </div>
    </section>
  );

  // random because we want a full refresh when already on current url (the state of the posts change with time)
  return (
    <Posts key={Math.random()} reddit={searchContent(q)} Controls={controls} />
  );
}

function SearchUser(props: { ctrl: JSX.Element }) {
  let [searchPms] = useSearchParams();
  const q = searchPms.get("q");

  return q ? (
    <div>
      {props.ctrl}
      <Users q={q} key={Math.random()} />
    </div>
  ) : null;
}
