type JsonRes = any;
export type Media = {
  url: string;
  width: number;
  height: number;
};
export type Content = {
  title: string;
  author: string;
  created: string;
  score: number;
  subreddit: string;
  voteRatio: number;
  video?: Media;
  images?: Media[];
};

/** fetch from the reddit api the given listing and return the response as a json */
async function redditGet(
  listing: string,
  limit = 50,
  after?: string,
  count?: number
) {
  try {
    const res = await fetch(
      `https://www.reddit.com/${listing}.json?raw_json=1&limit=${limit}${
        after ? `&after=${after}` : ""
      }${count ? `&count=${count}` : ""}`
    );

    if (res.ok) {
      return await res.json();
    } else {
      // TODO
      console.error(res.status);
    }
  } catch (err) {
    // TODO
    console.error(err);
  }
}

/** an interface to fetch and consume content from the reddit api */
export class RedditContent {
  private buff = [];
  private count = 0;
  private after: undefined | string;

  constructor(public listing: string) {}

  /** get the at most the next 10 media content to show, from the reddit api */
  async getBatch() {
    if (this.buff.length === 0) {
      const json = await redditGet(this.listing, 30, this.after, this.count);
      this.buff = json.data.children
        .map((r: JsonRes) => toMediaContent(r.data))
        .filter((r: Content | undefined) => r);
      this.after = json.data.after;
      this.count += 30;
    }

    return this.buff.splice(0, 10);
  }
}

/** if the give data is an video or a image response converts it to Content */
function toMediaContent(data: JsonRes): Content | undefined {
  const rst = {
    title: data.title,
    author: data.author,
    created: data.created,
    score: data.score,
    subreddit: data.subreddit,
    voteRatio: data.upvote_ratio,
  };

  if (data.is_video) {
    return {
      ...rst,
      video: {
        height: data.media["reddit_video"].height,
        width: data?.media?.["reddit_video"]?.width,
        url: data?.media?.["reddit_video"]?.["fallback_url"],
      },
    } as Content;
  } else if (data.preview?.enabled) {
    return { ...rst, images: data.preview.images[0].resolutions } as Content;
  }

  return;
}
