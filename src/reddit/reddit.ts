import { getSavedContent } from "../util/history";

type JsonRes = any;
type RedditPosition = {
  limit: number;
  after?: string;
  count?: number;
};
export type Media = {
  url: string;
  width: number;
  height: number;
};
/** the url is a MPEG-DASH url */
export type MediaVideo = { hls_url: string; fallback_url: string } & Media;
export type Content = {
  id: string;
  title: string;
  author: string;
  created: number;
  score: number;
  subreddit: string;
  voteRatio: number;
  link: string;
  video?: MediaVideo;
  images?: Media[];
};

async function redditFetch(url: string) {
  try {
    const res = await fetch(url);

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

  // const res = await fetch(url);
  // if (res.ok) {
  //   throw new Error("net off");
  //   return await res.json();
  // }
}

/** fetch from the reddit api the given listing and return the response as a json */
async function getListing(listing: string, p: RedditPosition) {
  return await redditFetch(
    `https://www.reddit.com/${listing}.json?raw_json=1&limit=${p.limit}${
      p.after ? `&after=${p.after}` : ""
    }${p.count ? `&count=${p.count}` : ""}`
  );
}

export const sortOptions = ["relevance", "hot", "top", "new"];
export const timeOptions = ["hour", "day", "week", "month", "year", "all"];
export type Query = {
  q: string | null;
  sort: string | null;
  t: string | null; // time
};

/** search for posts on the reddit api for the given q */
async function search(q: Query, p: RedditPosition) {
  return await redditFetch(
    `https://www.reddit.com/search.json?raw_json=1&limit=${p.limit}&q=${q.q}${
      p.after ? `&after=${p.after}` : ""
    }${p.count ? `&count=${p.count}` : ""}${q.sort ? `&sort=${q.sort}` : ""}${
      q.t ? `&t=${q.t}` : ""
    }`
  );
}

/** only values with a valid string are returned */
export function serializeQuery(q: Query): { [key: string]: string } {
  const rst: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(q)) {
    value && (rst[key] = value);
  }

  return rst;
}

export interface ContentBatch {
  /** get a batch of Content */
  getBatch(): Promise<Content[] | null>;
  /** what was searching */
  q?: string;
}

/** an interface to fetch and consume content from the reddit api */
class RemoteBatch {
  private buff = [];
  private count = 0;
  private after: undefined | string;
  private fetching = false;

  /** the fetcher is responsible for the specific reddit api request, while this class keep track of position */
  constructor(
    private fetcher: (p: RedditPosition) => Promise<JsonRes>,
    public q: string
  ) {}

  /** get around the next 10 media content to show, from the reddit api (some duplicate is possible),
   * multiple called while it is already fetching are ignore,
   * @Returns an array if it was able to find some posts otherwise null
   */
  async getBatch(): Promise<Content[] | null> {
    if (!this.fetching && this.buff.length === 0) {
      this.fetching = true;
      const json = await this.fetcher({
        limit: 30,
        count: this.count,
        after: this.after,
      });
      this.fetching = false;

      if (json.data.dist === 0) {
        return null;
      }

      this.buff = json.data.children
        .map((r: JsonRes) => toMediaContent(r.data))
        .filter((r: Content | undefined) => r);
      this.after = json.data.after;
      this.count += 30;
    }

    return this.buff.splice(0, this.buff.length <= 14 ? this.buff.length : 10);
  }
}

export class SavedBatch {
  private buff = getSavedContent();

  /** get a batch of the content saved by the user, from the reddit api (some duplicate is possible),
   * @Returns an array if it was able to find some posts otherwise null
   */
  async getBatch(): Promise<Content[] | null> {
    console.log(this.buff);
    if (this.buff.length === 0) {
      return null;
    }

    return this.buff.splice(0, 8);
  }
}

/** get and store content from the given reddit listing */
export function listingContent(listing: string): ContentBatch {
  return new RemoteBatch(
    (p: RedditPosition) => getListing(listing, p),
    listing
  );
}

/** get and store content from the given reddit listing */
export function searchContent(q: Query): ContentBatch {
  return new RemoteBatch((p: RedditPosition) => search(q, p), q.q ?? "");
}

/** if the give data is an video or a image response converts it to Content */
function toMediaContent(data: JsonRes): Content | undefined {
  const rst = {
    id: data.id,
    title: data.title,
    author: data.author,
    created: data.created_utc * 1000, // it is in seconds
    score: data.score,
    subreddit: data.subreddit,
    voteRatio: data.upvote_ratio,
    link: "https://www.reddit.com" + data.permalink,
  };

  if (data.is_video) {
    return {
      ...rst,
      video: {
        height: data.media["reddit_video"].height,
        width: data?.media?.["reddit_video"]?.width,
        url: data?.media?.["reddit_video"]?.["dash_url"],
        fallback_url: data?.media?.["reddit_video"]?.["fallback_url"],
        hls_url: data?.media?.["reddit_video"]?.["hls_url"],
      },
    } as Content;
  } else if (
    data.preview?.enabled &&
    data.preview?.images[0]?.resolutions?.length > 0
  ) {
    return { ...rst, images: data.preview.images[0].resolutions } as Content;
  }

  return;
}
