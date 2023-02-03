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
import { QueryCtnrStyle } from "./styles/App.style";
import { SelectStyle } from "./styles/form.style";
import { Users } from "./users";

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
  const [type, setType] = useState("");

  return (
    <>
      <div>
        <button onClick={() => setType("")}>Posts</button>
        <button onClick={() => setType("user")}>People</button>
      </div>
      {type === "" ? <SearchPosts /> : <SearchUser />}
    </>
  );
}

function SearchPosts() {
  const [q, onChange] = useQuerySearch();

  const controls = (
    <QueryCtnrStyle>
      <SelectStyle
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
      </SelectStyle>
      <SelectStyle onChange={onChange("t")} value={q.t ?? ""} form="search">
        <option value="">Time</option>
        {timeOptions.map((e) => (
          <option value={e} key={e}>
            {e}
          </option>
        ))}
      </SelectStyle>
    </QueryCtnrStyle>
  );

  // random because we want a full refresh when already on current url (the state of the posts change with time)
  return (
    <Posts key={Math.random()} reddit={searchContent(q)} Controls={controls} />
  );
}

function SearchUser() {
  let [searchPms] = useSearchParams();
  const q = searchPms.get("q");

  return q ? <Users q={q} key={Math.random()} /> : null;
}
