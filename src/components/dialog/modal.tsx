import styled, { keyframes } from "styled-components";
import { useState, useEffect, forwardRef, useCallback, Ref } from "react";

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
interface ModalProps {
    maxWidth?: string;
    children: React.ReactNode;
    open?: boolean;
  }
  
  const ModalDialog = styled.dialog<ModalProps>`
  inset: 0px;
  margin: auto;
  padding:2rem 1rem ;
  border-radius: 0.5rem;
  outline: none;
  overflow: unset;
  height: fit-content;
  width:100%;
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

export const useModal = (ref,isBlocked = false) => {
  const [show, setShow] = useState(false);

  const open = () => {
    if (ref.current && show === false) {
        ref.current.classList.remove("closing");
        ref.current.showModal();
        setShow(true);

    }
  };

  
  const close = useCallback(() => {
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
  }, [ref]);


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
      const handleKeyDown = (e : KeyboardEvent) => {
          if (e.key === "Escape" && !isBlocked) {
                // close();
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
type ModalRef = HTMLDialogElement;

export const Modal = forwardRef((props: ModalProps, ref: Ref<ModalRef>) => {
    return <ModalDialog ref={ref} {...props}>{props.children}</ModalDialog>;
  });