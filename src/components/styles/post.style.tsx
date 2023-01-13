import styled from "styled-components";

const SMALL_SCREEN = 450;

export const PostStyle = styled.section`
  background-color: var(--bg-color);
  border: 1px solid var(--bg-color-200);
  border-radius: 5px;
  box-shadow: 0px 1px 2px 0px hsl(0, 0%, 10%, 0.15);
  display: flex;

  @media (max-width: ${SMALL_SCREEN}px) {
    flex-direction: column;
  }
`;

export const PostContentStyle = styled.div`
  border-radius: 0 5px 5px 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 3px;
  justify-content: space-between;
  overflow: hidden;
  padding: 4px 0 0 0;

  @media (max-width: ${SMALL_SCREEN}px) {
    border-radius: 0 0 5px 5px;
  }
`;

export const PostAnchorStyle = styled.a`
  color: var(--on-bg-color);
  text-decoration: none;
`;

export const PostTitleStyle = styled.h2`
  font-weight: 400;
  font-size: 1.1rem;
  margin: 0 3px 4px 0.5rem;
  overflow-wrap: break-word;
`;

export const VideoStyle = styled.video`
  background-color: black;
  height: 100%;
  width: 100%;
`;

export const ImgStyle = styled.img`
  height: auto;
  object-fit: contain;
  margin: auto;
  max-height: 600px;
`;

export const PostCtnrInfoStyle = styled.div`
  color: var(--on-bg-color-600);
  font-size: 0.9rem;
  font-style: italic;
  padding: 0 3px 0 0.5rem;
`;

export const LeftBarStyle = styled.div`
  background: linear-gradient(0deg, var(--bg-color), var(--bg-color-50));
  border-right: 1px solid var(--bg-color-100);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 6px 3px;
  border-radius: 5px 0 0 5px;

  @media (max-width: ${SMALL_SCREEN}px) {
    border-radius: 5px 5px 0 0;
    flex-direction: row;
    background: linear-gradient(270deg, var(--bg-color), var(--bg-color-50));
    border-right: none;
    border-bottom: 1px solid var(--bg-color-100);
    padding: 3px 6px;
  }
`;

export const CtnrVotesStyle = styled.div`
  align-items: baseline;
  display: flex;
  color: var(--on-bg-color-600);
  gap: 0.5rem;
  writing-mode: vertical-lr;

  @media (max-width: ${SMALL_SCREEN}px) {
    writing-mode: unset;
  }
`;

export const ScoreStyle = styled.div`
  align-items: center;
  color: var(--secondary-color);
  display: flex;
  font-weight: bold;
  white-space: nowrap;
`;

export const ArrowStyle = styled.span`
  filter: invert(21%) sepia(31%) saturate(6450%) hue-rotate(6deg)
    brightness(100%) contrast(103%);
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

  @media (max-width: ${SMALL_SCREEN}px) {
    flex-direction: row;
  }
`;

export const NotFoundStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  min-height: calc(100vh - var(--header-height));
  text-align: center;

  & > h3 {
    padding: 0 0.5rem;
  }
`;
