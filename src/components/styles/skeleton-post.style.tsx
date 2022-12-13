import styled from "styled-components";
import { PostStyle } from "./post.style";

export const SkeletonPostStyle = styled(PostStyle)`
  display: block;
  padding: 1rem;

  @keyframes wait-anime {
    from {
      background-color: var(--on-bg-color-600);
    }

    to {
      background-color: var(--bg-color-200);
    }
  }
`;

export const SkeletonLineStyle = styled.div`
  animation: wait-anime 1s linear infinite alternate;
  border-radius: 4px;
  height: 0.7rem;
  margin: 0.3rem 0;

  &:last-child {
    width: 80%;
  }
`;

export const SkeletonMediaStyle = styled.div`
  animation: wait-anime 1s linear infinite alternate;
  height: 400px;
  margin: 1rem 0;
`;
