import { ChangeEvent, useEffect, useRef, useState } from "react";
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

  return (
    <Posts
      key={`${q.q}${q.sort}${q.t}`}
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
  const listing = useParams().listing ?? "";
  const redditRef = useRef(listingContent(listing || "best"));
  return <Posts key={listing} reddit={redditRef.current} />;
}

function Saved() {
  if (getHistory().saved.size === 0) {
    // TODO:
    return <div style={{ textAlign: "center" }}>sorry, nothing was saved </div>;
  }

  const redditRef = useRef(new SavedBatch());
  return <Posts key="saved" reddit={redditRef.current} />;
}

/** render the posts from the given content fetcher, or a not fund one */
function Posts(props: { reddit: ContentBatch; Controls?: JSX.Element }) {
  // if the content is null nothing was found
  const [state, setState] = useState<{ c: Content[] | null; loading: boolean }>(
    { c: [], loading: true }
  );
  // only one fetch call for render (because the intersectingObserver could fire multiple times in a cycle)
  let fetchCalled = false;

  async function fetchContent() {
    if (fetchCalled) {
      return;
    }

    fetchCalled = true;
    const batch = await props.reddit.getBatch();

    if (batch === null && state.c?.length === 0) {
      setState({ c: null, loading: false });
    } else if (batch && batch.length > 0) {
      setState((s) => ({ ...s, c: s.c!.concat(batch) }));

      if (state.loading) {
        // two options to remove the loading, one is o fire a load event or wait a little for every case
        // for now the latter was picked
        setTimeout(() => setState((s) => ({ ...s, loading: false })), 200);
      }
    }
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          fetchContent();
        }
      });
    },
    { rootMargin: "200px" }
  );

  useEffect(() => {
    fetchContent();
  }, []);

  if (state.c) {
    return (
      <PostsContainer
        c={state.c}
        obs={obs}
        loading={state.loading}
        Controls={props.Controls}
      />
    );
  } else {
    return <NotFound term={props.reddit.q ?? ""} />;
  }
}
