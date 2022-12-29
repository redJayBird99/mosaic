import styled from "styled-components";
import { IconBtnStyle, OutlineBtnStyle } from "./button.style";

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

  @media (max-width: 32rem) {
    gap: 0.5rem;
  }

  & > h1 {
    margin: 0;
  }

  @media (max-width: 21rem) {
    & > h1 {
      display: none;
    }
  }
`;

export const AuthButtonsStyle = styled.div`
  align-items: center;
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
    padding: 0 1rem 4px 1rem;
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
export const SearchBtnStyle = styled(IconBtnStyle)`
  @media (min-width: 44rem) {
    display: none;
  }
`;

export const AuthDialogStyle = styled.dialog`
  top: calc(100% + 1rem);
`;
