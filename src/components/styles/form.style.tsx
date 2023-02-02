import styled from "styled-components";

export const SelectStyle = styled.select`
  appearance: none;
  -moz-padding-start: calc(0.75rem - 3px);
  background-color: var(--bg-color);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 16px 12px;
  border: 1px solid var(--bg-color-200);
  border-radius: 14px;
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

export const InputStyle = styled.input`
  appearance: none;
  background-color: var(--bg-color);
  background-clip: padding-box;
  border: 1px solid var(--bg-color-200);
  border-radius: 0.375rem;
  color: var(--on-bg-color);
  display: block;
  padding: 0.375rem 0.75rem;
  transition: all 0.15s linear;
  width: 100%;

  &::placeholder {
    color: var(--on-bg-color-600);
    opacity: 1;
  }

  &:focus {
    border-color: var(--primary-color-400);
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    outline: 0;
  }

  &:not(:placeholder-shown):invalid,
  &.invalid {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-position: right calc(0.375em + 0.1875rem) center;
    background-repeat: no-repeat;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    border-color: var(--error-color);
    padding-right: calc(1.5em + 0.75rem);
  }

  &:not(:placeholder-shown):focus:invalid,
  &:focus.invalid {
    border-color: var(--error-color);
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
  }
`;
