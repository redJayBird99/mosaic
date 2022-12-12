import styled from "styled-components";

export const PostStyle = styled.section`
  background-color: var(--bg-color);
  border: 1px solid var(--bg-color-200);
  border-radius: 2px;
  box-shadow: 0px 1px 2px 0px hsl(0, 0%, 10%, 0.15);
  display: flex;
`;

export const PostContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.5rem;
`;

export const PostTitleStyle = styled.h2`
  font-weight: 500;
  margin: 0.5rem;
  text-align: center;
`;

export const CtnrMediaStyle = styled.div`
  max-height: 400px;
`;

export const VideoStyle = styled.video`
  background-color: black;
  height: 100%;
  width: 100%;
`;

export const ImgStyle = styled.img`
  background-clip: padding-box;
  border-radius: 8px;
  height: 100%;
  margin: auto;
  object-fit: contain;
  width: auto;
`;

export const PostCtnrInfoStyle = styled.div`
  color: var(--on-bg-color-700);
  font-size: 0.9rem;
`;
