import styled from 'styled-components';



const Input = styled.input<{
    nature?: string;
    noBorder?: string;
    underlined?: string;
    floating?: boolean;
    level?:boolean;
    lg?: boolean;
    sm?: boolean;
}>`
  letter-spacing: 0.065em;
  font-weight: 500;
  transition: all .3s ease-in-out;
  border-radius: 8px;
  padding: 8px 12px;
  border: 2px solid var(--form-border);
  background: var(--form-bg);
  color: var(--form-color);
  caret-color: var(--form-caret);
  transition: all .3s ease-in-out;
  outline: none;
  width: 100%;
  font-size: 1rem;

  &:autofill,
    &:autofill:hover,
    &:autofill:focus,
    &:autofill:active {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: var(--form-color) !important;
        background: var(--form-bg);

    }
  ${({nature}) =>{
    if(nature)
    return`
    --form-border: rgba(var(--${nature}-rgb),0.25);
    --form-active: rgba(var(--${nature}-rgb),0.5);
    `

  }}
  &::placeholder {
    color: inherit;
    color:var(--form-placeholder);
  }
  
  

&:focus {
    border-color: var(--form-border-active);
    background: var(--form-bg-active);
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
  ${props => props.lg ? `
  font-size: 1rem !important;
  line-height: 2.15 !important;
  border-radius: 0.5rem !important;
  padding:0.75rem 0.875rem !important;`: ""}
  
  ${props => props.sm ? `
  font-size: 0.875rem !important;
  line-height: 1rem!important;
  padding: 8px 24px 8px 8px!important;
  border-radius: 0.5rem !important;
  border-width: 1px !important;`: ""}

  
  ${props => props.noBorder === "true" ? `
  border: none!important;
  `: ""}
  
  ${props => props.underlined ? `
  border-bottom-left-radius: 0!important;
  border-bottom-right-radius: 0!important;
  z-index: 1;
  background-color: none;
  border: none;
  border-bottom: 2px solid var(--form-border);

  &::placeholder {
    // visibility: hidden;
    transition: all 0.25 ease-in-out;
  }

  &:focus {
    border-bottom-color:  var(--form-active);

    &::placeholder {
      visibility: visible;
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
 
${props => props.sm ? ` 
font-size: 0.875rem !important;
        line-height: 1rem!important;
        padding: 8px 24px 8px 8px!important;
        border-radius: 0.5rem !important;
        border-width: 1px !important;

&~label {
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


          &:disabled {
            background-color: var(--form-bg-disabled);
            cursor: not-allowed;
          }

            ${props => props.level ? `
            border-color: var(--form-bg-light);
            background-color: var(--form-bg-light);
            &:hover, &:focus {
                background-color: var(--form-bg-light);
                
            }
            `: ""}
${props => props.sm ?`
       font-size: 0.875rem !important;
        line-height: 1rem!important;
        padding: 8px 24px 8px 8px!important;
        border-radius: 0.5rem !important;
        border-width: 1px !important;
`:''}
${props => props.lg ?`
       font-size: 1.25rem !important;
        line-height: 1.25rem!important;
        padding: 0.5rem 1.5rem 0.5rem 0.5rem!important;
        border-radius: 0.5rem !important;
        border-width: 2px !important;
`:''}
  `;

export default Input;
