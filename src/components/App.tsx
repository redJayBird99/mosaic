import React, { useLayoutEffect, useRef, useState } from "react";
import { Outlet, Params, useParams } from "react-router-dom";
import { Content, RedditContent } from "../reddit/reddit";
import { NavBar } from "./nav-bar";
import { PageHeader } from "./PageHeader";
import { Post } from "./post";
import { SkeletonPost } from "./skeleton-post";
import {
  CtnrPostsStyle,
  LoadingRingStyle,
  LoadingWindowStyle,
} from "./styles/App.style";

export const mainRoutes = [
  { path: ":listing", element: <WrapMain /> },
  { path: "", element: <WrapMain />, index: true },
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

function WrapMain() {
  const params = useParams();
  return <Main key={params.listing || ""} params={params} />;
}

class Main extends React.PureComponent<
  { params: Readonly<Params<string>> },
  { c: Content[]; loading: boolean }
> {
  mq = window.matchMedia("(max-width: 75rem)");
  reddit: RedditContent;
  // contains all the ids of the currently displaying content,
  // this is used to prevent a very few duplicate posts that could potentially happen
  showing = new Set<string>();
  state = { c: [], loading: true };
  i = 0;

  constructor(props: { params: Readonly<Params<string>> }) {
    super(props);
    console.log(props.params?.listing);
    this.reddit = new RedditContent(props.params?.listing || "best");
  }

  onIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        this.fetchContent();
      }
    });
  };

  intersectionObs = new IntersectionObserver(this.onIntersection, {
    rootMargin: "500px",
  });

  componentDidMount(): void {
    this.mq.addEventListener("change", this.onMediaQueryChange);
    this.fetchContent();
  }

  onMediaQueryChange = () => {
    this.forceUpdate();
  };

  componentWillUnmount(): void {
    this.intersectionObs.disconnect();
    this.mq.removeEventListener("change", this.onMediaQueryChange);
  }

  async fetchContent() {
    const batch = await this.reddit.getBatch();
    const free = batch.filter((c) => !this.showing.has(c.id));
    free.forEach((c) => this.showing.add(c.id));

    if (free.length > 0) {
      this.setState((state) => ({
        c: state.c.concat(free),
      }));

      if (this.state.loading) {
        // two options to remove the loading, one is o fire a load event or wait a little for every case
        // for now the latter was picked
        setTimeout(() => this.setState({ loading: false }), 200);
      }
    }
  }

  /** split the content in the given amount of containers */
  renderColumn(cols: number) {
    if (this.state.c.length === 0) {
      return null;
    }

    return this.state.c
      .reduce(
        (a, c, i) => {
          a[i % cols].push(<Post key={i} c={c} />);
          return a;
        },
        Array.from({ length: cols }, () => [] as JSX.Element[])
      )
      .map((list, i) => (
        <div key={i}>
          {list}
          <PostsTail key={`tail${i}`} obs={this.intersectionObs} />
          {Array.from({ length: 3 }, (_, j) => (
            <SkeletonPost key={j} />
          ))}
        </div>
      ));
  }

  render() {
    const cols = this.mq.matches ? 1 : 2;
    return (
      <>
        <CtnrPostsStyle cols={cols}>
          {this.state.loading && <LoadingWindow />}
          {this.renderColumn(cols)}
        </CtnrPostsStyle>
        <PostsTail obs={this.intersectionObs} />
      </>
    );
  }
}

/** every time this element connects add itself to the observer,
 * used as tail of all posts so when the bottom is reached fetch new content*/
function PostsTail({ obs }: { obs: IntersectionObserver }) {
  const divRef = useRef<HTMLDivElement>(null);

  // useEffect runs asynchronously so when cleaning up the reference to divRef.current
  // won't exist, so we need to go synchronously using useLayoutEffect
  useLayoutEffect(() => {
    obs.observe(divRef.current!);

    return () => {
      obs.unobserve(divRef.current!);
    };
  }, []);

  return <div ref={divRef}></div>;
}

function LoadingWindow() {
  return (
    <LoadingWindowStyle>
      <LoadingRingStyle>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoadingRingStyle>
    </LoadingWindowStyle>
  );
}
