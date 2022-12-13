import styled from "styled-components";

export const CtnrPostsStyle = styled.main<{ cols: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, minmax(0px, 43rem));
  gap: 0.5rem;
  justify-content: center;
  margin: auto;
  max-width: 88rem;
  padding: 0px 0.5rem;

  & > * > * {
    margin-bottom: 0.5rem;
  }
`;
