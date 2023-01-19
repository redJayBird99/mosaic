import styled from "styled-components";
import { PostStyle } from "./post.style";

export const SkeletonPostStyle = styled(PostStyle)`
  display: block;
  border-radius: 5px;
  padding: 1rem;
`;

export const SkeletonLineStyle = styled.div`
  border-radius: 4px;
  height: 0.7rem;
  margin: 0.3rem 0;

  &:last-child {
    width: 80%;
  }
`;

export const SkeletonMediaStyle = styled.div`
  height: 400px;
  margin: 1rem 0;
`;
