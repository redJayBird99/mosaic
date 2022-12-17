import styled from "styled-components";

export const IconBtnStyle = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  display: inline-block;
  cursor: pointer;
  padding: 0.1rem;
  text-align: center;
`;

export const IconBtnGlowStyle = styled(IconBtnStyle)`
  transition: all 0.3s linear;

  &:hover,
  &:focus-visible {
    /* primary color with opacity */
    border: 1px solid hsla(210.11764705882354, 100%, 50%, 0.3);
    box-shadow: 0 0 0 0.35rem hsla(210.11764705882354, 100%, 50%, 0.2);
    transform: scale(1.2);
    outline: 0;
    filter: contrast(150%) brightness(80%);
  }
`;

export const BtnStyle = styled.button`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: all 0.15s linear;

  &:hover {
    color: var(--btn-hover-color);
    background-color: var(--btn-hover-bg);
    border-color: var(--btn-hover-border-color);
  }

  &:focus-visible {
    color: var(--btn-hover-color);
    background-color: var(--btn-hover-bg);
    border-color: var(--btn-hover-border-color);
    outline: 0;
    box-shadow: var(--btn-focus-box-shadow);
  }
`;

export const PrimaryBtnStyle = styled(BtnStyle)`
  color: var(--bg-color);
  background-color: var(--primary-color);
  --btn-hover-color: var(--bg-color-50);
  --btn-hover-bg: var(--primary-color-600);
  --btn-hover-border-color: var(--primary-color-650);
  --btn-focus-box-shadow: 0px 0px 0px 3px
    hsla(209.88235294117646, 100%, 50%, 0.4);
`;

export const OutlineBtnStyle = styled(BtnStyle)`
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  background-color: transparent;
  --btn-hover-color: var(--bg-color-50);
  --btn-hover-bg: var(--primary-color-600);
  --btn-hover-border-color: var(--primary-color-650);
  --btn-focus-box-shadow: 0px 0px 0px 3px
    hsla(209.88235294117646, 100%, 50%, 0.4);
`;
