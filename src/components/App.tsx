import React from "react";
import { Content, RedditContent } from "../reddit/reddit";
import { Post } from "./post";
import { SkeletonPost } from "./skeleton-post";
import { CtnrPostsStyle } from "./styles/App.style";

export class App extends React.PureComponent<any, { c: Content[] }> {
  mq = window.matchMedia("(max-width: 75rem)");
  reddit = new RedditContent("best");
  state = { c: [] };

  componentDidMount(): void {
    this.mq.addEventListener("change", this.onMediaQueryChange);
    this.fetchContent();
  }

  onMediaQueryChange = () => {
    this.forceUpdate();
  };

  componentWillUnmount(): void {
    this.mq.removeEventListener("change", this.onMediaQueryChange);
  }

  async fetchContent() {
    const batch = await this.reddit.getBatch();
    console.log(batch);
    this.setState((state) => ({
      c: state.c.concat(batch),
    }));
  }

  /** split the content in the given amount of containers */
  renderColumn(cols: number) {
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
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonPost key={i} />
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
