import { LiStyle, NavBarStyle, LinkStyle } from "./styles/nav-bar.style";

export function NavBar(props: { open: boolean }) {
  return (
    <NavBarStyle open={props.open}>
      <ul>
        <LiStyle>
          <NavLink to="best" />
        </LiStyle>
        <LiStyle>
          <NavLink to="hot" />
        </LiStyle>
        <LiStyle>
          <NavLink to="new" />
        </LiStyle>
        <LiStyle>
          <NavLink to="controversial" />
        </LiStyle>
        <LiStyle>
          <NavLink to="rising" />
        </LiStyle>
        <LiStyle className="nav-setting">
          <NavLink to="top" />
        </LiStyle>
        <LiStyle>
          <NavLink to="saved" />
        </LiStyle>
      </ul>
    </NavBarStyle>
  );
}

function NavLink(props: { to: string }) {
  return (
    <LinkStyle to={props.to}>
      <span>{props.to}</span>
    </LinkStyle>
  );
}
