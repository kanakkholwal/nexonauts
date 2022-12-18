import styled from 'styled-components';



const Input = styled.input`
  letter-spacing: 0.1em;
  width: 100%;
  opacity: 0.95;
  margin-bottom: 1.5rem;
  font-weight: 600;
  
  transition: all .2s linear;
  border-radius: 0.5rem;
  padding: calc(0.33rem + 1px) calc(0.75rem + 1px);
  
  border: ${props => props.outlined ? "2px" : "1px"} solid  var(--form-border);
  background: var(--form-bg);
  color: var(--form-color);
  caret-color: var(--form-caret);
  
  &::placeholder {
    color: inherit;
    opacity: 0.75;
  }
  
  
  &:focus {
    border-color: var(--form-active);
    opacity: 1;
    background: var(--form-bg-active);

  
    &::placeholder {
        opacity: 1;
    }
  }
  
  &.checkValid:invalid,
  &.isInvalid {
    border-color: var(--danger)!important;
    animation-name: invalid;
    animation-timing-function: ease-in-out;
    animation-duration: 500ms;
    animation-fill-mode: both;
  
  }
  
  &.checkValid:focus:not(:placeholder-shown):valid,
  &.isValid {
    animation-name: valid;
    border-color: var(--success)!important;
    animation-timing-function: ease-in-out;
    animation-duration: 500ms;
    animation-fill-mode: both;
  }
  ${props => props.lg ? `font-size: 1rem !important;
  line-height: 2.15 !important;
  padding-left: 0.75em !important;
  padding-right: 0.75em !important;
  border-radius: 0.5rem !important;`: ""}
  
  ${props => props.sm ? `padding: 0.43em 0.99em 0.35em !important;
  font-size: .775rem !important;
  line-height: 1.6 !important;
  border-radius: 0.2rem !important;`: ""}
  
  ${props => props.underlined ? `
  border: 0;
  border-radius: 0;
  z-index: 1;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid  var(--form-border);
  font: inherit;
  font-size: 1.125rem;
  padding: .25rem 0;

  &::placeholder {
    visibility: hidden;
    transition: all 0.25 ease;
  }

  &:focus {
    border-bottom-color:  var(--form-active);

    &::placeholder {
      visibility: visible;
    }

    &~label {
      z-index: 2;
      color:  var(--form-color);
      transform: translateY(-1.5rem);
      font-size: calc(100% - 0.25rem);

    }
  }

  &:not(:placeholder-shown) {

    &~label {
      z-index: 2;
      color:  var(--form-color);
      transform: translateY(-1.5rem);
      font-size: calc(100% - 0.25rem);
    }
  }`: ""}

  ${props => props.floating ? `
  z-index: 1;
  background-color: transparent;
  border: none;
  border: 2px solid var(--form-border);
  font: inherit;
  font-size: 1.125rem;
  padding-top: 0.5rem;

  &::placeholder {
    visibility: hidden;
    transition: all 0.25 ease;
  }



  &:focus {

    &::placeholder {
      visibility: visible;
    }

    &~label {
      z-index: 2;

      color: var(--form-color-active);
      transform: translateY(-0.5rem) !important;
      font-size: calc(100% - 0.25rem);

    }


  }

  &:not(:placeholder-shown) {
    border-color: var(--form-border-active) !important;


    &~label {
      z-index: 2;

      color: var(--form-color-active);
      transform: translateY(-0.5rem) !important;
      font-size: calc(100% - 0.25rem);

    }


  }
${props => props.lg ? `
        &~label {
          transform: translateY(0.75rem) !important;
        }
    
        &:focus {
          &~label {
            transform: translateY(-0.75rem) !important;
            font-size: calc(100% - 0.25rem);
          }
        }
    
        &:not(:placeholder-shown) {    
          &~label {
            transform: translateY(-0.75rem) !important;
            font-size: calc(100% - 0.25rem);
          }
        }
      `: ""}
 
${props => props.sm ? `  &~label {
            transform: translateY(0.25rem) !important;
          }
      
          &:focus {
            &~label {
              transform: translateY(-1rem) !important;
              font-size: calc(100% - 0.15rem);
      
            }
          }
      
          &:not(:placeholder-shown) {
      
      
            &~label {
              transform: translateY(-1rem) !important;
              font-size: calc(100% - 0.15rem);
      
            }
      
      
          }` : ""}` : ""}
  `;

export default Input;
