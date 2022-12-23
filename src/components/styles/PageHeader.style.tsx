import styled from "styled-components";
import { OutlineBtnStyle } from "./button.style";

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

export const SearchForm = styled.form`
  @media (max-width: 44rem) {
    background-color: var(--bg-color);
    box-shadow: 0px 2px 2px -1px hsl(0, 0%, 10%, 0.15);
    visibility: hidden;
    left: 0;
    opacity: 0;
    padding: 5px 1rem;
    position: absolute;
    top: 100%;
    transition: all 0.3s linear;
    width: 100%;

    &.open {
      opacity: 1;
      visibility: visible;
    }
  }
`;

// temporary until a find a nice icon
export const SearchBtnStyle = styled(OutlineBtnStyle)`
  @media (min-width: 44rem) {
    display: none;
  }
`;
