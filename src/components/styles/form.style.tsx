import styled from "styled-components";

export const InputGroupStyle = styled.div`
  align-items: stretch;
  background-color: transparent;
  border-radius: 12px;
  border: 1px solid var(--bg-color-200);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 6px 12px;
  transition: all linear 0.2s;

  &:focus-within {
    border-color: var(--primary-color-400);
    color: #212529;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
`;

export const InputGroupControlStyle = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
`;

export const SelectStyle = styled.select`
  appearance: none;
  -moz-padding-start: calc(0.75rem - 3px);
  background-color: var(--bg-color);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 16px 12px;
  border: 1px solid var(--bg-color-200);
  border-radius: 0.375rem;
  color: var(--on-bg-color);
  display: block;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  transition: all 0.2s linear;
  width: 100%;

  &:focus {
    border-color: var(--primary-color-400);
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
`;
