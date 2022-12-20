import React, { useLayoutEffect, useRef } from "react";
import { Content } from "../reddit/reddit";
import { Post } from "./post";
import { SkeletonPost } from "./skeleton-post";
import {
  CtnrPostsStyle,
  LoadingRingStyle,
  LoadingWindowStyle,
} from "./styles/App.style";

export class PostsContainer extends React.PureComponent<
  { c: Content[]; obs: IntersectionObserver; loading: boolean },
  {}
> {
  mq = window.matchMedia("(max-width: 75rem)");

  componentDidMount(): void {
    this.mq.addEventListener("change", this.onMediaQueryChange);
  }

  onMediaQueryChange = () => {
    this.forceUpdate();
  };

  componentWillUnmount(): void {
    this.mq.removeEventListener("change", this.onMediaQueryChange);
  }

  /** split the content in the given amount of containers */
  renderColumn(cols: number) {
    if (this.props.c.length === 0) {
      return null;
    }

    return this.props.c
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
          <PostsTail key={`tail${i}`} obs={this.props.obs} />
          {Array.from({ length: 3 }, (_, j) => (
            <SkeletonPost key={j} />
          ))}
        </div>
      ));
  }

  render() {
    const cols = this.mq.matches ? 1 : 2;
    return (
      <CtnrPostsStyle cols={cols}>
        {this.props.loading && <LoadingWindow />}
        {this.renderColumn(cols)}
      </CtnrPostsStyle>
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
