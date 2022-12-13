import {
  SkeletonLineStyle,
  SkeletonMediaStyle,
  SkeletonPostStyle,
} from "./styles/skeleton-post.style";

export function SkeletonPost() {
  return (
    <SkeletonPostStyle>
      <div>
        <SkeletonLineStyle />
        <SkeletonLineStyle />
      </div>
      <SkeletonMediaStyle />
      <SkeletonLineStyle />
    </SkeletonPostStyle>
  );
}
