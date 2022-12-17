import styled from "styled-components";

export const PageHeaderStyle = styled.header`
  background-color: var(--bg-color);
  border-bottom: 1px solid lightgray;
  box-shadow: 0px 1px 3px 0px hsl(0, 0%, 10%, 0.15);
  position: sticky;
  top: 0px;
  z-index: 6;
`;

export const HeaderBarStyle = styled.div`
  align-items: center;
  display: flex;
  height: var(--header-height);
  justify-content: space-between;
  margin: auto;
  padding: 0 clamp(0.5rem, 2%, 1rem);
`;

export const LeftBlockStyle = styled.div`
  align-items: center;
  display: flex;
  gap: 1.5rem;

  & > h1 {
    margin: 0;
  }
`;

export const AuthButtonsStyle = styled.div`
  display: flex;
  gap: 6px;
`;
