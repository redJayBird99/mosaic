import {
  ChangeEvent,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
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
  Batch,
} from "../reddit/reddit";
import { getHistory } from "../util/history";
import { listings, NavBar } from "./nav-bar";
import { PageHeader } from "./PageHeader";
import { NotFound } from "./post";
import { PostsContainer } from "./Posts-container";
import { QueryCtnrStyle } from "./styles/App.style";
import { SelectStyle } from "./styles/form.style";

export const mainRoutes = [
  { path: "search", element: <Search /> },
  { path: "saved", element: <Saved /> },
  { path: ":listing", element: <Listing /> },
  { element: <Listing />, index: true },
];

export function Layout({ main }: { main: JSX.Element }) {
  const [nav, setNav] = useState(false);
  const toggleNav = () => setNav((nav) => !nav);

  return (
    <>
      <PageHeader toggleNav={toggleNav}></PageHeader>
      <NavBar open={nav} />
      {main}
    </>
  );
}

export function App() {
  return <Layout main={<Outlet />} />;
}

export function Page404() {
  return <Layout main={<MainNotFound />} />;
}

function MainNotFound() {
  return (
    <NotFound text="404 Sorry, the page you are looking for doesn't exist" />
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

  if (!listings.includes(listing)) {
    return <MainNotFound />;
  }

  // random key because we want a full refresh when already on current url (the state of the posts change with time)
  return <Posts key={Math.random()} reddit={listingContent(listing)} />;
}

function Saved() {
  if (getHistory().saved.size === 0) {
    return <NotFound text={"Sorry, we couldn't find any saved post"} />;
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
  type: "FETCH_SUCCESS" | "FETCH_ERROR" | "FETCH_END" | "STOP_LOADING";
  c?: Content[];
};

function contentFetchReducer(state: FetcherState, action: FetcherAction) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        c: state.c.concat(action.c ?? []),
      };
    case "FETCH_ERROR": {
      return {
        ...state,
        error: true,
      };
    }
    case "FETCH_END":
      return {
        ...state,
        end: true,
        c: state.c.concat(action.c ?? []),
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
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
  const stopLoading = () => {
    if (state.loading) {
      // two options to remove the loading, one is o fire a load event or wait a little for every case
      // for now the latter was picked
      setTimeout(() => dispatch({ type: "STOP_LOADING" }), 100);
    }
  };

  async function fetchContent() {
    let batch: Batch = { data: [], done: false };

    try {
      batch = await reddit.getBatch();
    } catch (e) {
      // TODO: add some info
      dispatch({ type: "FETCH_ERROR" });
      stopLoading();
    }

    if (batch.done) {
      dispatch({ type: "FETCH_END", c: batch.data });
      stopLoading();
    } else if (batch.data.length > 0) {
      dispatch({ type: "FETCH_SUCCESS", c: batch.data });
      stopLoading();
    }
  }

  return [state, fetchContent];
}

/** render the posts from the given content fetcher, or fallback component (error or not found) */
function Posts(props: { reddit: ContentBatch; Controls?: JSX.Element }) {
  const [state, fetchContent] = useRedditApi(props.reddit);
  // we don't need to update it, because when ContentBatch change the entire
  // component is rebuild from scratch on every navigation, although it still initial and ignored currently
  const obsRef = useRef(
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          fetchContent();
        }
      });
    })
  );

  useEffect(() => {
    fetchContent();
  }, [props.reddit]);

  if (state.error) {
    // TODO
    return <NotFound text={"Sorry, unfortunately something went wrong"} />;
  } else if (state.end && state.c.length === 0) {
    return (
      <NotFound
        text={
          props.reddit.q
            ? `Sorry, we couldn't find any results for "${props.reddit.q}"`
            : ""
        }
      />
    );
  } else {
    return (
      <PostsContainer
        c={state.c}
        obs={obsRef.current}
        loading={state.loading}
        end={state.end}
        Controls={props.Controls}
      />
    );
  }
}
