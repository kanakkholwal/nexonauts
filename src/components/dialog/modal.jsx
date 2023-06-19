import styled, { keyframes } from "styled-components";
import { useState, useEffect, forwardRef } from "react";

const slideInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(50%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutAnimation = keyframes`
  to {
    opacity: 0;
  }
`;

const ModalDialog = styled.dialog`
  inset: 0px;
  margin: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  outline: none;
  max-width: ${({maxWidth}) => maxWidth || "720px"};
  transition: all 0.5s cubic-bezier(0.5, -0.5, 0.1, 1.5);
  --animation-in-settings: 500ms cubic-bezier(0.25, 0, 0.3, 1) normal;
  --animation-out-settings: 500ms cubic-bezier(0.5, -0.5, 0.1, 1.5) normal;

  &[open] {
    animation: ${slideInAnimation} var(--animation-in-settings);
  }

  &.closing{
    transform: translateY(100%);
    opacity: 0;
    visibility: hidden;
    &::backdrop {
      animation: ${fadeOutAnimation} var(--animation-out-settings);
    }
  }

  

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(2px);
  }
`;

export const useModal = (ref) => {
  const [show, setShow] = useState(false);

  const open = () => {
    if (ref.current) {
        ref.current.showModal();
      setShow(true);

    }
  };

  const close = () => {
    if (ref.current) {
        ref.current.classList.add("closing");
        const closeDialog = () => {
            ref.current.removeEventListener("transitionend", closeDialog);
            ref.current.classList.remove("closing");
            ref.current.close();
            setShow(false);
        }
        ref.current.addEventListener("transitionend",closeDialog);

    }
  };

  const toggle = () => {
    if (ref.current) {
      if (show) {
        close();
      } else {
        open();
      }
    }
  };
  

  useEffect(() => {
    const dialog = ref.current;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };

    const handleClick = (e) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {

        
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dialog && dialog.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      dialog && dialog.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return {
     show, 
     toggle, 
     open,
      close,

     };
};

export const Modal = forwardRef((props, ref) => {
  return (
    <>
      <ModalDialog ref={ref} {...props}>
        {props.children}
      </ModalDialog>
    </>
  );
});
