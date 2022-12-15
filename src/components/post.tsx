import { Content, Media } from "../reddit/reddit";
import { Flag, Save, Share } from "./icons";
import { IconBtnStyle } from "./styles/button.style";
import {
  ControlsStyle,
  CtnrVotesStyle,
  ImgStyle,
  LeftBarStyle,
  PostContentStyle,
  PostCtnrInfoStyle,
  PostStyle,
  PostTitleStyle,
  ScoreStyle,
  VideoStyle,
} from "./styles/post.style";

/** container for a listing reddit post, render the post content, infos and user post controls */
export function Post({ c }: { c: Content }) {
  return (
    <PostStyle>
      <PostLeftSide score={c.score} ratio={c.voteRatio} />
      <PostContentStyle>
        <PostTitleStyle>{c.title}</PostTitleStyle>
        <PostMediaContent video={c.video} images={c.images} />
        <PostCtnrInfoStyle>
          by <strong>{c.author}</strong>
          <time className="post__date">
            {" " + new Date(c.created).toLocaleDateString()}
          </time>
          {" on subreddit "}
          <strong>{c.subreddit}</strong>
        </PostCtnrInfoStyle>
      </PostContentStyle>
    </PostStyle>
  );
}

/** get  video or image element from the given available content */
function PostMediaContent(props: { video?: Media; images?: Media[] }) {
  // we need to set it manually because of this bug https://stackoverflow.com/questions/14554908/imgs-max-height-not-respecting-parents-dimensions
  const maxHeight = (h: number) => `${h > 600 ? 600 : h}px`;

  if (props.video) {
    // we use aspect ratio because height and width don't prevent the layout shift https://github.com/w3c/csswg-drafts/issues/7524
    return (
      <div>
        <VideoStyle
          style={{
            maxHeight: maxHeight(props.video.height),
            aspectRatio: `${props.video.width / props.video.height}`,
          }}
          src={props.video.url}
          controls
        />
      </div>
    );
  } else if (props.images) {
    const image = props.images[props.images.length - 1];
    return (
      <div>
        <ImgStyle
          srcSet={getScrSet(props.images)}
          sizes="(max-width: 43rem) 85vw, 39rem"
          height={image.height}
          width={image.width}
        />
      </div>
    );
  }

  return <div>sorry there isn't any content</div>;
}

function getScrSet(images: Media[]) {
  return images.map((img) => `${img.url} ${img.width}w`).join(", ");
}

function PostLeftSide({ score, ratio }: { score: number; ratio: number }) {
  const sc = score > 1000 ? `${Math.round(score / 1000)}k` : score;
  const arrow = score > 0 ? "ᐃ " : "ᐁ ";
  return (
    <LeftBarStyle>
      <CtnrVotesStyle>
        <ScoreStyle title="votes">{arrow + sc}</ScoreStyle>
        <div title="vote ratio">{Math.round(ratio * 100)}%</div>
      </CtnrVotesStyle>
      <PostControls />
    </LeftBarStyle>
  );
}

function PostControls() {
  return (
    <ControlsStyle>
      <li>
        <IconBtnStyle title="Share" aria-label="Share">
          <Share />
        </IconBtnStyle>
      </li>
      <li>
        <IconBtnStyle title="Save" aria-label="Save">
          <Save />
        </IconBtnStyle>
      </li>
      <li>
        <IconBtnStyle title="Report" aria-label="Report">
          <Flag />
        </IconBtnStyle>
      </li>
    </ControlsStyle>
  );
}
