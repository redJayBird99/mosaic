// this file contain all svg enabled as components, (store in asset too)
import styled from "styled-components";

const SmallIconStyle = styled.svg`
  width: 1rem;
  height: 1rem;
`;

export function Save() {
  return (
    <SmallIconStyle xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#42404f"
        fill-rule="nonzero"
        d="M20.496 5.627A2.25 2.25 0 0 1 22 7.75v10A4.25 4.25 0 0 1 17.75 22h-10a2.25 2.25 0 0 1-2.123-1.504l2.097.004H17.75a2.75 2.75 0 0 0 2.75-2.75v-10l-.004-.051V5.627ZM17.246 2a2.25 2.25 0 0 1 2.25 2.25v12.997a2.25 2.25 0 0 1-2.25 2.25H4.25A2.25 2.25 0 0 1 2 17.247V4.25A2.25 2.25 0 0 1 4.25 2h12.997Zm0 1.5H4.25a.75.75 0 0 0-.75.75v12.997c0 .414.336.75.75.75h12.997a.75.75 0 0 0 .75-.75V4.25a.75.75 0 0 0-.75-.75ZM10.75 6.75a.75.75 0 0 1 .75.75V10H14a.75.75 0 1 1 0 1.5h-2.5V14a.75.75 0 1 1-1.5 0v-2.5H7.5a.75.75 0 1 1 0-1.5H10V7.5a.75.75 0 0 1 .75-.75Z"
      />
    </SmallIconStyle>
  );
}

export function Share() {
  return (
    <SmallIconStyle
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.001 512.001"
    >
      <path
        fill="#42404f"
        d="M429.531 345.86c-25.841 0-49.488 11.769-64.918 31.551L162.241 276.925A82.299 82.299 0 0 0 164.939 256c0-7.229-.943-14.24-2.698-20.926l202.457-100.526c15.112 19.216 38.547 31.592 64.833 31.592 45.473 0 82.469-36.995 82.469-82.469S475.005 1.203 429.531 1.203s-82.469 36.995-82.469 82.469c0 7.229.942 14.24 2.697 20.925L147.302 205.124c-15.112-19.216-38.547-31.592-64.833-31.592C36.995 173.532 0 210.527 0 256.001s36.995 82.469 82.469 82.469c26.287 0 49.722-12.378 64.834-31.592l202.433 100.514c-1.776 6.776-2.672 13.774-2.672 20.937 0 45.474 36.995 82.469 82.469 82.469s82.469-36.995 82.469-82.469c-.001-45.474-36.997-82.469-82.471-82.469zm0-311.185c27.018 0 48.998 21.98 48.998 48.998 0 27.018-21.98 48.998-48.998 48.998-27.018 0-48.998-21.98-48.998-48.998 0-27.018 21.98-48.998 48.998-48.998zM82.469 304.999c-27.018 0-48.998-21.981-48.998-48.998s21.98-48.998 48.998-48.998c27.019 0 48.999 21.98 48.999 48.998 0 27.017-21.98 48.998-48.999 48.998zm347.062 172.327c-27.018 0-48.998-21.98-48.998-48.998 0-26.683 21.414-48.998 48.998-48.998 27.018 0 48.998 21.98 48.998 48.998s-21.98 48.998-48.998 48.998z"
      />
    </SmallIconStyle>
  );
}

export function Flag() {
  return (
    <SmallIconStyle
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      fill="none"
      stroke="#42404f"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <path d="m1.75 14.25v-11s2-1.5 4-1.5 2.5 1.5 4.5 1.5 4-1.5 4-1.5v7s-2 1.5-4 1.5-2.5-1.5-4.5-1.5-4 1.5-4 1.5" />
    </SmallIconStyle>
  );
}