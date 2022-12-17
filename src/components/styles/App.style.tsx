import styled from "styled-components";

export const CtnrPostsStyle = styled.main<{ cols: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, minmax(0px, 43rem));
  gap: 0.5rem;
  justify-content: center;
  margin: auto;
  margin-top: 1rem;
  max-width: 88rem;
  min-height: 105vh;
  padding: 0px 0.5rem;
  position: relative;

  & > * > * {
    margin-bottom: 0.5rem;
  }
`;

export const LoadingWindowStyle = styled.div`
  background-color: var(--bg-color-100);
  height: max(100vh, 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
`;

export const LoadingRingStyle = styled.div`
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  display: inline-block;
  height: 80px;
  left: calc(50% - 40px);
  position: sticky;
  top: calc(50% - 40px);
  width: 80px;

  & > div {
    animation: rotation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border: 5px solid var(--on-bg-color);
    border-color: var(--on-bg-color) transparent transparent transparent;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    height: 64px;
    margin: 8px;
    position: absolute;
    width: 64px;
  }

  & > div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & > div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & > div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
