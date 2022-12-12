import { Content, Media } from "../reddit/reddit";
import { Flag, Save, Share } from "./icons";
import { IconBtnStyle } from "./styles/button.style";
import {
  ControlsStyle,
  CtnrMediaStyle,
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
  if (props.video) {
    return (
      <CtnrMediaStyle>
        <VideoStyle
          src={props.video.url}
          height={props.video.height}
          width={props.video.width}
          controls
        />
      </CtnrMediaStyle>
    );
  } else if (props.images) {
    const image = getFittingImage(props.images);
    return (
      <CtnrMediaStyle>
        <ImgStyle src={image.url} height={image.height} width={image.width} />
      </CtnrMediaStyle>
    );
  }

  return <div>sorry there isn't any content</div>;
}

/** temporary image selector  */
function getFittingImage(images: Media[]): Media {
  const maxWidth = 600;
  const maxHeight = 500;

  for (let i = images.length - 1; i >= 0; i--) {
    if (images[i].height <= maxHeight && images[i].width <= maxWidth) {
      return images[i];
    }
  }

  return images[0];
}

function PostLeftSide({ score, ratio }: { score: number; ratio: number }) {
  const sc = score > 1000 ? `${Math.round(score / 1000)}k` : score;
  const arrow = score > 0 ? "ᐃ " : "ᐁ ";
  return (
    <LeftBarStyle>
      <CtnrVotesStyle>
        <ScoreStyle>{arrow + sc}</ScoreStyle>
        <div>{Math.round(ratio * 100)}%</div>
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