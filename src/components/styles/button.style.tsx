import styled from "styled-components";

export const IconBtnStyle = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  display: inline-block;
  cursor: pointer;
  padding: 0.1rem;
  text-align: center;
  transition: all 0.3s linear;

  &:hover,
  &:focus {
    /* primary color with opacity */
    border: 1px solid hsla(210.11764705882354, 100%, 50%, 0.3);
    box-shadow: 0 0 0 0.15rem hsla(210.11764705882354, 100%, 50%, 0.2);
    transform: scale(1.2);
    outline: 0;
  }
`;
