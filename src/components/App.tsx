import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import {
  Content,
  listingContent,
  ContentBatch,
  searchContent,
  sortOptions,
  timeOptions,
  Query,
  serializeQuery,
  SavedBatch,
} from "../reddit/reddit";
import { getHistory } from "../util/history";
import { NavBar } from "./nav-bar";
import { PageHeader } from "./PageHeader";
import { NotFound } from "./post";
import { PostsContainer } from "./Posts-container";
import { QueryCtnrStyle } from "./styles/App.style";
import { SelectStyle } from "./styles/form.style";

export const mainRoutes = [
  { path: "search", element: <Search /> },
  { path: "saved", element: <Saved /> },
  { path: ":listing", element: <Listing /> },
  { path: "", element: <Listing />, index: true },
];

export function App() {
  const [nav, setNav] = useState(false);
  const toggleNav = () => setNav((nav) => !nav);

  return (
    <>
      <PageHeader toggleNav={toggleNav}></PageHeader>
      <NavBar open={nav} />
      <Outlet />
    </>
  );
}

type HandleChange = (e: ChangeEvent<HTMLSelectElement>) => void;

function Search() {
  let [searchPms, setSearchPms] = useSearchParams();
  const q = {
    q: searchPms.get("q"),
    sort: searchPms.get("sort"),
    t: searchPms.get("t"),
  };

  function onChange(key: keyof Query): HandleChange {
    return (e) => {
      q[key] = e.target.value;
      setSearchPms(serializeQuery(q));
    };
  }

  // random because we want a full refresh when already on current url (the state of the posts change with time)
  return (
    <Posts
      key={Math.random()}
      reddit={searchContent(q)}
      Controls={SearchControls(q, onChange)}
    />
  );
}

function SearchControls(q: Query, onChange: (k: keyof Query) => HandleChange) {
  return (
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
}

function Listing() {
  const listing = useParams().listing ?? "best";
  // random key because we want a full refresh when already on current url (the state of the posts change with time)
  return <Posts key={Math.random()} reddit={listingContent(listing)} />;
}

function Saved() {
  if (getHistory().saved.size === 0) {
    // TODO:
    return <div style={{ textAlign: "center" }}>sorry, nothing was saved </div>;
  }

  // we don't need a refresh here (the state of the posts is save locally...)
  return <Posts reddit={new SavedBatch()} />;
}

type FetcherState = {
  c: Content[];
  error: boolean;
  loading: boolean;
  end: boolean;
};

type FetcherAction = {
  type: "FETCH_SUCCESS" | "FETCH_ERROR" | "FETCH_END";
  c?: Content[];
};

function contentFetchReducer(state: FetcherState, action: FetcherAction) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        c: state.c.concat(action.c ?? []),
      };
    case "FETCH_ERROR": {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case "FETCH_END":
      return {
        ...state,
        loading: false,
        end: true,
      };
  }
}

function useRedditApi(reddit: ContentBatch): [FetcherState, () => void] {
  const [state, dispatch] = useReducer(contentFetchReducer, {
    c: [],
    loading: true,
    error: false,
    end: false,
  });

  async function fetchContent() {
    let batch: Content[] | null = [];

    try {
      batch = await reddit.getBatch();
    } catch (e) {
      // TODO: add some info
      dispatch({ type: "FETCH_ERROR" });
    }

    if (batch === null) {
      dispatch({ type: "FETCH_END" });
    } else if (batch.length > 0) {
      dispatch({ type: "FETCH_SUCCESS", c: batch });

      // TODO
      // if (state.loading) {
      //   // two options to remove the loading, one is o fire a load event or wait a little for every case
      //   // for now the latter was picked
      //   setTimeout(() => setState((s) => ({ ...s, loading: false })), 200);
      // }
    }
  }

  return [state, fetchContent];
}

/** render the posts from the given content fetcher, or fallback component (error or not found) */
function Posts(props: { reddit: ContentBatch; Controls?: JSX.Element }) {
  const [state, fetchContent] = useRedditApi(props.reddit);
  // we don't need to update it, because when ContentBatch change the entire
  // component is rebuild from scratch on every navigation
  const obsRef = useRef(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            fetchContent();
          }
        });
      },
      { rootMargin: "200px" }
    )
  );

  useEffect(() => {
    fetchContent();
  }, [props.reddit]);

  if (state.error) {
    // TODO
    return <div>Error was occurred</div>;
  } else if (state.end && state.c.length === 0) {
    return <NotFound term={props.reddit.q ?? ""} />;
  } else {
    return (
      <PostsContainer
        c={state.c}
        obs={obsRef.current}
        loading={state.loading}
        Controls={props.Controls}
      />
    );
  }
}
