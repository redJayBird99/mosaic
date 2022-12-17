import { ThreeBars } from "./icons";
import {
  IconBtnStyle,
  OutlineBtnStyle,
  PrimaryBtnStyle,
} from "./styles/button.style";
import {
  AuthButtonsStyle,
  HeaderBarStyle,
  LeftBlockStyle,
  PageHeaderStyle,
} from "./styles/PageHeader.style";

export function PageHeader(props: { toggleNav: () => void }) {
  return (
    <PageHeaderStyle>
      <HeaderBarStyle>
        <LeftBlock toggleNav={props.toggleNav} />
        <AuthButtons />
      </HeaderBarStyle>
    </PageHeaderStyle>
  );
}

function LeftBlock(props: { toggleNav: () => void }) {
  return (
    <LeftBlockStyle>
      <IconBtnStyle onClick={props.toggleNav}>
        <ThreeBars />
      </IconBtnStyle>
      <h1>Mosaic</h1>
    </LeftBlockStyle>
  );
}

function AuthButtons() {
  return (
    <AuthButtonsStyle>
      <OutlineBtnStyle>log in</OutlineBtnStyle>
      <PrimaryBtnStyle>sign up</PrimaryBtnStyle>
    </AuthButtonsStyle>
  );
}
