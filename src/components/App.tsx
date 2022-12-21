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
} from "../reddit/reddit";
import { NavBar } from "./nav-bar";
import { PageHeader } from "./PageHeader";
import { PostsContainer } from "./Posts-container";
import { QueryCtnrStyle } from "./styles/App.style";
import { SelectStyle } from "./styles/form.style";

export const mainRoutes = [
  { path: ":listing", element: <Listing /> },
  { path: "search", element: <Search /> },
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

function Search() {
  let [searchPms, setSearchPms] = useSearchParams();
  const q = {
    q: searchPms.get("q"),
    sort: searchPms.get("sort"),
    t: searchPms.get("t"),
  };

  function onChange(
    key: keyof Query
  ): (e: ChangeEvent<HTMLSelectElement>) => void {
    return (e) => {
      q[key] = e.target.value;
      setSearchPms(serializeQuery(q));
    };
  }

  const Controls = (
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

  return (
    <Posts
      key={`${q.q}${q.sort}${q.t}`}
      reddit={searchContent(q)}
      Controls={Controls}
    />
  );
}

function Listing() {
  const listing = useParams().listing ?? "";
  const redditRef = useRef(listingContent(listing || "best"));
  return <Posts key={listing} reddit={redditRef.current} />;
}

/** render the posts from the given content fetcher */
function Posts(props: { reddit: ContentBatch; Controls?: JSX.Element }) {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchContent() {
    const batch = await props.reddit.getBatch();

    if (batch.length > 0) {
      setContent((content) => content.concat(batch));

      if (loading) {
        // two options to remove the loading, one is o fire a load event or wait a little for every case
        // for now the latter was picked
        setTimeout(() => setLoading(false), 200);
      }
    }
  }

  const obsRef = useRef(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            fetchContent();
          }
        });
      },
      { rootMargin: "300px" }
    )
  );

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <PostsContainer
      c={content}
      obs={obsRef.current}
      loading={loading}
      Controls={props.Controls}
    />
  );
}
