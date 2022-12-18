import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBarStyle = styled.nav<{ open: boolean }>`
  background-color: var(--bg-color);
  border-right: 1px solid var(--bg-color-200);
  box-shadow: 1px 0px 3px 0px hsl(0, 0%, 10%, 0.15);
  color: var(--on-color);
  height: calc(100vh - var(--header-height));
  left: ${(props) => (props.open ? 0 : "-15.5rem")};
  position: fixed;
  overflow: auto;
  top: var(--header-height);
  transition: left 0.3s linear;
  width: 15rem;
  z-index: 5;

  & > ul {
    padding-left: 0;
  }
`;

export const LiStyle = styled.li`
  border-bottom: 1px solid var(--bg-color-50);
  list-style-type: none;
  text-transform: capitalize;
  transition: background-color 0.2s linear;

  &:hover {
    background-color: var(--bg-color-50);
  }
`;

export const LinkStyle = styled(Link)`
  align-items: center;
  color: var(--on-color);
  display: flex;
  height: 100%;
  gap: 8px;
  padding: 12px 5px 12px 20px;
  text-decoration: none;
  width: 100%;
`;
