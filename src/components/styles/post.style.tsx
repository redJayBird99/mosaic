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

export const LeftBarStyle = styled.div`
  background: linear-gradient(0deg, var(--bg-color), var(--bg-color-50));
  border-right: 1px solid var(--bg-color-200);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 6px;
`;

export const CtnrVotesStyle = styled.div`
  align-items: center;
  display: flex;
  color: var(--on-bg-color-600);
  gap: 0.5rem;
  writing-mode: vertical-lr;
`;

export const ScoreStyle = styled.div`
  color: var(--secondary-color);
  font-weight: bold;
  white-space: nowrap;
`;

export const ControlsStyle = styled.menu`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;

  & > li {
    list-style-type: none;
  }
`;
