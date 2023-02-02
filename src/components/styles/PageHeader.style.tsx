import styled from "styled-components";
import { IconBtnStyle } from "./button.style";

// temporary until a find a nice icon
export const SearchBtnStyle = styled(IconBtnStyle)`
  @media (min-width: 44rem) {
    display: none;
  }
`;

export const AuthDialogStyle = styled.dialog`
  top: calc(100% + 1rem);
`;
