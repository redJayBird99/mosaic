import { LiStyle, NavBarStyle, LinkStyle } from "./styles/nav-bar.style";

export const listings = [
  "best",
  "hot",
  "new",
  "controversial",
  "rising",
  "top",
];

export function NavBar(props: { open: boolean }) {
  return (
    <NavBarStyle open={props.open}>
      <ul>
        {listings.map((l) => (
          <LiStyle key={l}>
            <NavLink to={l} />
          </LiStyle>
        ))}
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
