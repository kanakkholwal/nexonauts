import styled from "styled-components";

export const FloatingMenu = styled.div`
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 100;
  width: max-content;
  max-width: 35rem;
  margin-inline: auto;
  margin-block: 1rem;
  padding: 0.5rem;
  background-color: rgba(var(--light-rgb), 0.9);
  backdrop-filter: blur(0.5rem);
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease-in-out;

  @media (width <= 728px) {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    margin-block: 0;
    border-top: 1px solid rgb(242, 242, 242);
  }
  .ActionButton {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    color: rgba(var(--text-rgb), 0.75);
    background: rgba(var(--grey-rgb), 0);
    &:hover {
      color: rgba(var(--text-rgb), 1);
      background: rgba(var(--grey-rgb), 0.05);
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    & > svg {
      width: 1rem;
      height: 1rem;
      transition: all 0.3s ease-in-out;
    }
    & > span {
      font-size: 0.75rem;
      font-weight: 400;
    }
    &:hover {
      & > svg {
        transform: scale(1.05) translateY(-0.25rem);
      }
    }
  }
`;
