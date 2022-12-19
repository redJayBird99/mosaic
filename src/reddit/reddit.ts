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
  created: string;
  score: number;
  subreddit: string;
  voteRatio: number;
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
}

/** fetch from the reddit api the given listing and return the response as a json */
async function getListing(listing: string, p: RedditPosition) {
  return await redditFetch(
    `https://www.reddit.com/${listing}.json?raw_json=1&limit=${p.limit}${
      p.after ? `&after=${p.after}` : ""
    }${p.count ? `&count=${p.count}` : ""}`
  );
}

/** search for posts on the reddit api for the given q */
async function search(q: string, p: RedditPosition) {
  return await redditFetch(
    `https://www.reddit.com/search.json?raw_json=1&limit=${p.limit}&q=${q}${
      p.after ? `&after=${p.after}` : ""
    }${p.count ? `&count=${p.count}` : ""}`
  );
}

//@ts-ignore
window.redditSearch = search;

/** an interface to fetch and consume content from the reddit api */
export class ContentBatch {
  private buff = [];
  private count = 0;
  private after: undefined | string;
  private fetching = false;

  /** the fetcher is responsible for the specific reddit api request, while this class keep track of position */
  constructor(private fetcher: (p: RedditPosition) => Promise<JsonRes>) {}

  /** get around the next 10 media content to show, from the reddit api (some duplicate is possible),
   * multiple called while it is already fetching are ignore,
   */
  async getBatch(): Promise<Content[]> {
    if (!this.fetching && this.buff.length === 0) {
      this.fetching = true;
      const json = await this.fetcher({
        limit: 30,
        count: this.count,
        after: this.after,
      });
      // const json = await redditGet(this.listing, 30, this.after, this.count);
      this.fetching = false;
      this.buff = json.data.children
        .map((r: JsonRes) => toMediaContent(r.data))
        .filter((r: Content | undefined) => r);
      this.after = json.data.after;
      this.count += 30;
    }

    return this.buff.splice(0, this.buff.length <= 14 ? this.buff.length : 10);
  }
}

/** get and store content from the given reddit listing */
export function listingContent(listing: string): ContentBatch {
  return new ContentBatch((p: RedditPosition) => getListing(listing, p));
}

/** get and store content from the given reddit listing */
export function searchContent(q: string): ContentBatch {
  return new ContentBatch((p: RedditPosition) => search(q, p));
}

/** if the give data is an video or a image response converts it to Content */
function toMediaContent(data: JsonRes): Content | undefined {
  const rst = {
    id: data.id,
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
