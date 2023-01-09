// this file contain all svg enabled as components, (store in asset too)
import styled from "styled-components";

const SmallIconStyle = styled.svg`
  width: 1rem;
`;

const MidIconStyle = styled.svg`
  width: 1.5rem;
  fill: #0080ff;
`;

const SearchIconStyle = styled(SmallIconStyle)`
  align-self: center;
  margin-right: 0.5rem;
`;

const IconHoverStyle = styled.svg`
  &:hover > *,
  &:focus-visible {
    filter: invert(34%) sepia(89%) saturate(3218%) hue-rotate(197deg)
      brightness(103%) contrast(104%);
  }
`;

export function Save({ active }: { active: boolean }) {
  return (
    <SmallIconStyle
      className={active ? "saved" : ""}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      role="img"
      aria-label="stored papers"
    >
      <path
        fill="#42404f"
        fillRule="nonzero"
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
      role="img"
      aria-label="network od dots"
    >
      <path
        fill="#42404f"
        d="M429.531 345.86c-25.841 0-49.488 11.769-64.918 31.551L162.241 276.925A82.299 82.299 0 0 0 164.939 256c0-7.229-.943-14.24-2.698-20.926l202.457-100.526c15.112 19.216 38.547 31.592 64.833 31.592 45.473 0 82.469-36.995 82.469-82.469S475.005 1.203 429.531 1.203s-82.469 36.995-82.469 82.469c0 7.229.942 14.24 2.697 20.925L147.302 205.124c-15.112-19.216-38.547-31.592-64.833-31.592C36.995 173.532 0 210.527 0 256.001s36.995 82.469 82.469 82.469c26.287 0 49.722-12.378 64.834-31.592l202.433 100.514c-1.776 6.776-2.672 13.774-2.672 20.937 0 45.474 36.995 82.469 82.469 82.469s82.469-36.995 82.469-82.469c-.001-45.474-36.997-82.469-82.471-82.469zm0-311.185c27.018 0 48.998 21.98 48.998 48.998 0 27.018-21.98 48.998-48.998 48.998-27.018 0-48.998-21.98-48.998-48.998 0-27.018 21.98-48.998 48.998-48.998zM82.469 304.999c-27.018 0-48.998-21.981-48.998-48.998s21.98-48.998 48.998-48.998c27.019 0 48.999 21.98 48.999 48.998 0 27.017-21.98 48.998-48.999 48.998zm347.062 172.327c-27.018 0-48.998-21.98-48.998-48.998 0-26.683 21.414-48.998 48.998-48.998 27.018 0 48.998 21.98 48.998 48.998s-21.98 48.998-48.998 48.998z"
      />
    </SmallIconStyle>
  );
}

export function Flag({ active }: { active: boolean }) {
  return (
    <SmallIconStyle
      className={active ? "flagged" : ""}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      fill="none"
      stroke="#42404f"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      role="img"
      aria-label="flag"
    >
      <path d="m1.75 14.25v-11s2-1.5 4-1.5 2.5 1.5 4.5 1.5 4-1.5 4-1.5v7s-2 1.5-4 1.5-2.5-1.5-4.5-1.5-4 1.5-4 1.5" />
    </SmallIconStyle>
  );
}

export function Search() {
  return (
    <SearchIconStyle
      role="img"
      aria-label="magnifying glass"
      color="#6e6e6e"
      fill="##6e6e6e"
      height="14"
      viewBox="0 0 24 24"
      width="14"
    >
      <path
        d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="16.511"
        x2="22"
        y1="16.511"
        y2="22"
      ></line>
    </SearchIconStyle>
  );
}

export function ThreeBars() {
  return (
    <IconHoverStyle
      width="26px"
      height="26px"
      viewBox="0 -4 26 26"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="three horizontal bars"
    >
      <g transform="translate(-150 -54)">
        <path
          d="M175,64H155V62h20a1,1,0,0,1,0,2Zm0-8H155V54h20a1,1,0,0,1,0,2ZM150,71a.945.945,0,0,1,1-1h2v2h-2A.945.945,0,0,1,150,71Zm0-8a.945.945,0,0,1,1-1h2v2h-2A.945.945,0,0,1,150,63Zm0-8a.945.945,0,0,1,1-1h2v2h-2A.945.945,0,0,1,150,55Zm26,16a.945.945,0,0,1-1,1H155V70h20A.945.945,0,0,1,176,71Z"
          fill="#444"
        />
      </g>
    </IconHoverStyle>
  );
}

export function Close() {
  return (
    <svg
      fill="#e32636"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="x symbol"
    >
      <path d="M5.997 6.784l4.454 4.359.787-.804-4.43-4.336 4.465-4.3-.78-.81-4.49 4.323L1.55.857l-.787.804 4.43 4.336-4.465 4.3.78.81 4.49-4.323z" />
    </svg>
  );
}

export function MagnifyingGlass() {
  return (
    <MidIconStyle
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 54.18 54.18"
      role="img"
      aria-label="magnifying glass"
    >
      <path d="m39.484 37.379.06-.072c.288-.333.571-.675.839-1.021l.064-.082.1-.134a22.528 22.528 0 1 0-18.012 9 22.592 22.592 0 0 0 13.775-4.708c.329-.255.663-.529.995-.815l.054-.048.069-.06a20.034 20.034 0 0 0 1.995-1.991Zm-4.523-2.414a17.577 17.577 0 1 1 5.147-12.426 17.457 17.457 0 0 1-5.147 12.421ZM54.14 48.766l-.662-.658-7.292-7.292a.162.162 0 0 0-.226 0l-.245.243-3.443 3.444-1.455 1.456a.168.168 0 0 0-.046.117.163.163 0 0 0 .046.107l7.95 7.952a.155.155 0 0 0 .116.043.148.148 0 0 0 .105-.042l2.576-2.572 2.571-2.575a.161.161 0 0 0 0-.223ZM43.086 40.4l-1.683-1.682-.214.248-.025.029-.047.054c-.355.4-.679.743-1 1.064s-.647.628-1.057.993l-.01.011-.041.034-.286.247 1.682 1.685 1.341-1.343Z" />
    </MidIconStyle>
  );
}

export function UpArrow() {
  return (
    <SmallIconStyle xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M11 20V7.825l-5.6 5.6L4 12l8-8 8 8-1.4 1.425-5.6-5.6V20Z" />
    </SmallIconStyle>
  );
}
