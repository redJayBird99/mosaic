import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Content, RedditContent } from "../reddit/reddit";
import { Post } from "./post";
import { SkeletonPost } from "./skeleton-post";
import { CtnrPostsStyle } from "./styles/App.style";

export class App extends React.PureComponent<any, { c: Content[] }> {
  mq = window.matchMedia("(max-width: 75rem)");
  reddit = new RedditContent("best");
  state = { c: [] };

  onIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        this.fetchContent();
      }
    });
  };

  intersectionObs = new IntersectionObserver(this.onIntersection, {
    rootMargin: "900px",
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
    this.setState((state) => ({
      c: state.c.concat(batch),
    }));
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
      <CtnrPostsStyle cols={cols}>{this.renderColumn(cols)}</CtnrPostsStyle>
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
