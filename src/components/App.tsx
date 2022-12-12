import React, { useState, useEffect } from "react";
import { RedditContent } from "../reddit/reddit";
import { Post } from "./post";
import { CtnrPostsStyle } from "./styles/App.style";

export function App() {
  const reddit = new RedditContent("best");
  const [content, setContent] = useState([]);

  async function addContent() {
    const batch = await reddit.getBatch();
    setContent((content) => content.concat(batch));
  }

  useEffect(() => {
    addContent();
  }, []);

  return (
    <CtnrPostsStyle>
      {content.map((r, i) => (
        <Post key={i} c={r} />
      ))}
    </CtnrPostsStyle>
  );
}
