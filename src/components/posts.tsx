import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Content, ContentBatch } from "../reddit/reddit";
import { NotFound, Post } from "./post";
import { SkeletonPost } from "./skeleton-post";
import {
  CtnrPostsStyle,
  LoadingRingStyle,
  LoadingWindowStyle,
} from "./styles/App.style";
import { useRedditApi } from "./use-reddit";

/** render the posts from the given content fetcher, or fallback component (error or not found) */
export function Posts(props: { reddit: ContentBatch; Controls?: JSX.Element }) {
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
    return (
      <NotFound
        text={
          "Sorry, unfortunately something went wrong. usually the problem could be that external requests to the Reddit api were blocked by some extension (like DuckDuckGo privacy, abs Block and etc) or some stricter browser privacy setting."
        }
      />
    );
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

class PostsContainer extends React.PureComponent<
  {
    c: Content[];
    obs: IntersectionObserver;
    loading: boolean;
    end: boolean;
    Controls?: JSX.Element;
  },
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

    // split the content in the given amount of column lists
    const list = this.props.c.reduce(
      (a, c, i) => {
        a[i % cols].push(<Post key={c.id} c={c} />);
        return a;
      },
      Array.from({ length: cols }, () => [] as JSX.Element[])
    );

    if (this.props.end) {
      return list.map((list, i) => <div key={i}>{list}</div>);
    }

    // if there is still something to fetch add skeletons and intersection observers
    return list.map((list, i) => {
      // add the tail a little bit before the content end so we can try to prefetch
      list.splice(
        list.length - 2,
        0,
        <PostsTail key={`tail${i}`} obs={this.props.obs} />
      );
      return (
        <div key={i}>
          {list}
          <SkeletonPost key="skeleton" />
        </div>
      );
    });
  }

  render() {
    const cols = this.mq.matches ? 1 : 2;
    return (
      <CtnrPostsStyle cols={cols}>
        {this.props.Controls}
        {this.props.loading && <LoadingWindow />}
        {this.renderColumn(cols)}
        <PostsTail obs={this.props.obs} />
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
  }, [obs]);

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
