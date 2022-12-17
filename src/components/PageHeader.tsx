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

export function PageHeader() {
  return (
    <PageHeaderStyle>
      <HeaderBarStyle>
        <LeftBlock />
        <AuthButtons />
      </HeaderBarStyle>
    </PageHeaderStyle>
  );
}

function LeftBlock() {
  return (
    <LeftBlockStyle>
      <IconBtnStyle>
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
