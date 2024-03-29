import { getSavedContent } from "../util/history";

const MAX_COUNT = 100;

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
export type MediaVideo = {
  hls_url: string;
  fallback_url: string;
  poster: string;
} & Media;

export type Post = {
  id: string;
  title: string;
  author: string;
  created: number;
  score: number;
  subreddit: string;
  voteRatio: number;
  link: string;
  isSelf: boolean;
  selfText?: string;
  video?: MediaVideo;
  images?: Media[];
};

export type User = {
  iconUrl: string;
  name: string;
  created: number;
  karma: number;
  id: string;
};

export type Community = {
  iconUrl?: string;
  name: string;
  subscribers: number;
  description: string;
  id: string;
};

async function redditFetch(url: string) {
  const res = await fetch(url);

  if (res.ok) {
    return await res.json();
  } else {
    // TODO
    console.error("WHAT", res.status);
    throw new Error(`the request resolved with ${res.status} status`);
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

async function searchUser(q: string, p: RedditPosition) {
  return await redditFetch(
    `https://www.reddit.com/search.json?raw_json=1&type=user&q=${q}&limit=${
      p.limit
    }${p.after ? `&after=${p.after}` : ""}${p.count ? `&count=${p.count}` : ""}`
  );
}

async function searchSub(q: string, p: RedditPosition) {
  return await redditFetch(
    `https://www.reddit.com/search.json?raw_json=1&type=sr&q=${q}&limit=${
      p.limit
    }${p.after ? `&after=${p.after}` : ""}${p.count ? `&count=${p.count}` : ""}`
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

export type Batch<T> = { data: T[]; done: boolean };
export interface Batcher<T> {
  /** get a batch of Content */
  getBatch(): Promise<Batch<T>>;
  /** what was searching or listing */
  q?: string;
}

/** an interface to fetch and consume content from the reddit api */
class RemoteBatch<T extends { id: string }> implements Batcher<T> {
  private buff: T[] = [];
  private fetched = new Set<string>();
  private count = 0;
  private after: undefined | string;
  private fetching = false;
  // true there are no more remote content to fetch
  private remoteEnd = false;
  // keep track if there already a client waiting to resolve a request
  private clientWaiting = false;

  /** the fetcher is responsible for the specific reddit api request, while this class keep track of position */
  constructor(
    private fetcher: (p: RedditPosition) => Promise<JsonRes>,
    private transformer: (r: JsonRes) => T | undefined,
    private batchSize: number,
    public q: string
  ) {}

  /** fetch and store the content from the reddit api, multiple called while it is already fetching are ignore.
   * it keep making request until a threshold buffer is reached (so we can amortize the fetching delay cost)
   */
  async fetch() {
    const fetchSize = Math.min(this.batchSize * 3, MAX_COUNT);

    if (
      !this.remoteEnd &&
      !this.fetching &&
      this.buff.length <= Math.min(this.batchSize * 1.5, MAX_COUNT)
    ) {
      this.fetching = true;
      const json = await this.fetcher({
        limit: fetchSize,
        count: this.count,
        after: this.after,
      });
      const data = json?.data ?? {};
      this.fetching = false;

      if (!data.after) {
        this.remoteEnd = true;
      }

      if (data.children) {
        this.buff.push(
          ...data.children
            .map((r: JsonRes) => this.transformer(r.data))
            .filter((r: T | undefined) => {
              if (r && !this.fetched.has(r.id)) {
                this.fetched.add(r.id);
                return true;
              }
            })
        );
      }

      this.after = data.after;
      this.count += fetchSize;
      this.fetch();
    }
  }

  /** get around the next 10 media content to show, from the reddit api (some duplicate is possible),
   * multiple called while it is already fetching are ignore,
   * @Returns an array of content and a flag indicating if there is more content available
   */
  async getBatch(): Promise<Batch<T>> {
    // there is no need to resolve multiple request if the fetching is pending
    if (!this.clientWaiting && this.buff.length === 0) {
      this.clientWaiting = true;
      await this.fetch();
      this.clientWaiting = false;
    } else {
      this.fetch();
    }

    const batch = this.buff.splice(0, this.batchSize);
    return { data: batch, done: this.remoteEnd && this.buff.length === 0 };
  }
}

export class SavedBatch implements Batcher<Post> {
  private buff = getSavedContent();

  /** get a batch of the content saved by the user, from the reddit api (some duplicate is possible),
   * @Returns an array of content and a flag indicating if there is more content available
   */
  async getBatch(): Promise<Batch<Post>> {
    const batch = this.buff.splice(0, 10);
    return { data: batch, done: this.buff.length === 0 };
  }
}

export function searchRemoteUser(q: string): Batcher<User> {
  return new RemoteBatch<User>(
    (p: RedditPosition) => searchUser(q, p),
    toUser,
    30,
    q
  );
}

export function searchRemoteCommunity(q: string): Batcher<Community> {
  return new RemoteBatch<Community>(
    (p: RedditPosition) => searchSub(q, p),
    toCommunity,
    15,
    q
  );
}

/** get and store content from the given reddit listing */
export function listingContent(listing: string): Batcher<Post> {
  return new RemoteBatch<Post>(
    (p: RedditPosition) => getListing(listing, p),
    toMedia,
    10,
    listing
  );
}

/** get and store content from the given reddit listing */
export function searchContent(q: Query): Batcher<Post> {
  return new RemoteBatch<Post>(
    (p: RedditPosition) => search(q, p),
    toPost,
    10,
    q.q ?? ""
  );
}

/** if the give data is an video or a image response converts it to Content */
function toPost(data: JsonRes): Post | undefined {
  const rst: Post = {
    id: data.id,
    title: data.title,
    author: data.author,
    created: data.created_utc * 1000, // it is in seconds
    score: data.score,
    subreddit: data.subreddit,
    voteRatio: data.upvote_ratio,
    link: "https://www.reddit.com" + data.permalink,
    isSelf: data.is_self && Boolean(data.selftext),
  };

  if (rst.isSelf) {
    rst.selfText = data.selftext;
    return rst;
  } else if (data.is_video) {
    return {
      ...rst,
      video: {
        height: data.media["reddit_video"].height,
        width: data?.media?.["reddit_video"]?.width,
        url: data?.media?.["reddit_video"]?.["dash_url"],
        fallback_url: data?.media?.["reddit_video"]?.["fallback_url"],
        hls_url: data?.media?.["reddit_video"]?.["hls_url"],
        poster:
          data.preview?.images[0]?.resolutions?.findLast(
            (img: any) => img.width < 640 // a low resolution for a poster should be decent enough
          )?.url ?? "",
      },
    };
  } else if (
    data.preview?.enabled &&
    data.preview?.images[0]?.resolutions?.length > 0
  ) {
    return { ...rst, images: data.preview.images[0].resolutions };
  }

  return;
}

/** only post with videos or images are returned as Post, textual content is discarded */
function toMedia(data: JsonRes): Post | undefined {
  if (!data.is_self) {
    return toPost(data);
  }
}

function toUser(data: JsonRes): User | undefined {
  // for now we don't touch suspended accounts
  if (data.name && !data.is_suspended && !data.is_blocked) {
    return {
      name: data.name,
      iconUrl: data.icon_img,
      created: data.created_utc * 1000,
      karma: data.comment_karma,
      id: data.id ?? data.name,
    };
  }
}

function toCommunity(data: JsonRes): Community | undefined {
  if (data.id) {
    return {
      description: data.public_description,
      name: data.display_name,
      iconUrl: data.community_icon,
      id: data.id,
      subscribers: data.subscribers,
    };
  }
}
