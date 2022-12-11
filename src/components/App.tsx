import React, { useState, useEffect } from "react";
import { Media, RedditContent } from "../reddit/reddit";
import { Content } from "../reddit/reddit";

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
    <div>
      {content.map((r, i) => (
        <Post key={i} c={r} />
      ))}
    </div>
  );
}

function Post({ c }: { c: Content }) {
  const image = c.images ? getFittingImage(c.images) : null;

  return (
    <section>
      <h2>{c.title}</h2>
      <div>
        {c.video ? (
          <video
            src={c.video.url}
            height={c.video.height}
            width={c.video.width}
            controls
          ></video>
        ) : (
          <img
            src={image!.url}
            height={image!.height}
            width={image!.width}
            alt={c.title}
          />
        )}
      </div>
    </section>
  );
}

function getFittingImage(images: Media[]): Media {
  const maxWidth = 600;
  const maxHeight = 500;
  console.log(images);

  for (let i = images.length - 1; i >= 0; i--) {
    if (images[i].height <= maxHeight && images[i].width <= maxWidth) {
      return images[i];
    }
  }

  return images[0];
}
