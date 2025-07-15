import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  background-color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 0.6rem;
  border: 2px solid black;
  color: black;
  font-weight: bold;
  font-size: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 2px 2px 0px black;

  &:hover {
    background-color: black;
    color: white;
    transform: translateY(-2px);
    box-shadow: 4px 4px 0px black;
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 1px 1px 0px black;
  }

  ${({ $variant }) =>
    $variant === "delete" &&
    css`
      background-color: #ffecec;
      color: red;
      border-color: red;

      &:hover {
        background-color: red;
        color: white;
        box-shadow: 4px 4px 0px red;
      }

      &:active {
        transform: translateY(1px);
        box-shadow: 1px 1px 0px red;
      }
    `}
`;
