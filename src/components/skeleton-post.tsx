import {
  SkeletonLineStyle,
  SkeletonMediaStyle,
  SkeletonPostStyle,
} from "./styles/skeleton-post.style";

export function SkeletonPost() {
  return (
    <SkeletonPostStyle>
      <div>
        <SkeletonLineStyle className="skeleton-animate" />
        <SkeletonLineStyle className="skeleton-animate" />
      </div>
      <SkeletonMediaStyle className="skeleton-animate" />
    </SkeletonPostStyle>
  );
}
