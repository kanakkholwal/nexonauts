import React from "react";
import styled from 'styled-components';
import { MdOutlineUnfoldMore } from "react-icons/md";

export const SelectWrapper = styled.div`
position: relative;
svg {
    position: absolute;
    height: 20px;
    top: 50%;
    right: 0.65rem;
    transform: translateY(-50%);
  }
`;
const SelectToggle = styled.input.attrs(props => ({
  type: 'text',
}))`
    letter-spacing: 0.1em;
    width: 100%;
    opacity: 0.95;
    font-weight: 600;
    cursor:pointer;
    transition: all .2s linear;
    border-radius: 0.5rem;
    padding: calc(0.33rem + 1px) calc(0.75rem + 1px);
    user-select:none;
    border: ${props => props.outlined ? "2px" : "1px"} solid var(--form-border);
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
        
        
            }` : ""}` : ""}`




const SelectDropdownWrapper = styled.div`
  position: absolute;
   top: 100%;
   left: 50%;
   z-index: 9;
   translate: -50% 0.5rem;
   width: max-content;
   min-width: 100%;
   transition: opacity .15s cubic-bezier(0, 0, .2, 1) 0ms, transform .15s cubic-bezier(0, 0, .2, 1) 0ms, -webkit-transform .15s cubic-bezier(0, 0, .2, 1) 0ms;
   box-shadow: var(--dropdown-shadow);
   transform: scale(.8);
   opacity: 0;
   pointer-events:none;
         &.isOpen {
             transform: scale(1);
             opacity: 1;
             pointer-events:auto;

         }
 
`;
const SelectDropdown = styled.ul`
display: flex;
flex-direction: column;
align-items: center;
border-radius: 0.25rem;
padding-block: 0.25rem;
background: var(--drop-bg);
width: max-content;
min-width: 100%;
gap: 0;
border-radius:0.5rem;

`;

const SelectDropdownItem = styled.li`
display: flex;
    justify-content: space-between;
    padding-block: 0.5rem;
    padding-inline: 1.5rem;
    color: var(--charcoal);
    transition: var(--transition-1);
    opacity: 0.85;
    font-weight:600;
width: 100%;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
cursor: pointer;

&:is(:hover, :active ) {
opacity:1;
}
&.isActive{
    color:var(--theme)
}


&:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

&:last-child {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
`;


function Select({ options, value, onChange, ...props }) {
  const selectRef = React.useRef(null);

  // const [usingOptions, SetUsingOptions] = React.useState(options);

  const usingOptions = options;
  const [open, SetOpen] = React.useState(false);
  const [SelectedOption, SetSelectedOption] = React.useState(usingOptions.find(({ option }) => option === true) || usingOptions[0]);

  const UpdateOption = (e) => {
    const target = e.target;

    const SelectedOption = usingOptions.find((Option) => Option.value.toString() === target.getAttribute("value"));


    const Updated = usingOptions?.map((option) => {
      if (option === SelectedOption)
        option.option = true;
      else
        option.option = false;

      return option
    });
    if (typeof Updated !== void [] && Updated !== undefined && Updated !== null) {

      SetSelectedOption(Updated.find((option) => option === SelectedOption));

      SetOpen(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener("mouseup", (e) => {
      if (selectRef.current) {
        if (!selectRef.current.contains(e.target))
          SetOpen(false)
      }
    });
  }, []);

  React.useEffect(() => {
    onChange(SelectedOption);
  }, [onChange, SelectedOption]);


  return (
    <>
      <select
        value={SelectedOption?.value.toString()}
        onChange={(e) => SetSelectedOption(usingOptions.map((option) => {
          if (option === SelectedOption)
            option.option = true;
          else
            option.option = false;

          return option
        }).find(({ value }) => value === e.target.value))} hidden={true} style={{ display: "none!important" }}>
        {options.map((option, index) => (
          <option key={index} value={option.value.toString()}>{option.label}</option>
        ))}
      </select>
      <SelectWrapper {...props} ref={selectRef}>
        <SelectToggle
          type="text"
          outlined
          className={(open ? " isActive" : "")}
          role="listbox"
          readOnly={true}
          onClick={() => SetOpen(!open)}
          value={SelectedOption.label ? SelectedOption.label : SelectedOption.value.toString()}
          invert={!open}
        />
        <MdOutlineUnfoldMore onClick={() => SetOpen(!open)} />
        <SelectDropdownWrapper className={(open ? " isOpen" : "")}>
          <SelectDropdown>
            {usingOptions.map((Option, index) => {
              return <SelectDropdownItem className={Option.value === SelectedOption.value ? " isActive" : " "} onClick={(e) => UpdateOption(e)} value={Option.value.toString()} key={index}>{Option.label ? Option.label.toString() : Option.value.toString()}</SelectDropdownItem>
            })}
          </SelectDropdown>

        </SelectDropdownWrapper>

      </SelectWrapper>

    </>
  )
}
export default Select;