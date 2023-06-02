import React, { useRef, useReducer, useEffect, useCallback } from 'react';
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
    padding: 0.75rem 1.25rem;
    user-select:none;
    border: ${props => props.outlined ? "2px" : "1px"} solid rgba(var(--muted-rgb),1);
    background:rgba(var(--theme-rgb),0.1);
    color:var(--text-color);
    caret-color: var(--theme);
    
    &::placeholder {
      color: inherit;
      opacity: 0.75;
    }
    
    
    &:focus {
      border-color: rgba(var(--theme-rgb),0.9);
      opacity: 1;
  
    
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
    ${props => props.size === "lg" ? `font-size: 1rem !important;
    line-height: 2.15 !important;
    padding-left: 0.75em !important;
    padding-right: 0.75em !important;
    border-radius: 0.5rem !important;`: ""}
    
    ${props => props.size === "sm" ? `padding: 0.43em 0.99em 0.35em !important;
    font-size: .775rem !important;
    line-height: 1.6 !important;
    border-radius: 0.2rem !important;`: ""}
    
  `;



const SelectDropdownWrapper = styled.div`
  position: absolute;
   top: 100%;
   left: 50%;
   z-index: 999;
   translate: -50% 0.5rem;
   width: max-content;
   min-width: 100%;
   transition: opacity .15s cubic-bezier(0, 0, .2, 1) 0ms, transform .15s cubic-bezier(0, 0, .2, 1) 0ms, -webkit-transform .15s cubic-bezier(0, 0, .2, 1) 0ms;
   overflow: hidden auto;
    min-height: 16px;
    max-width: calc(100% - 32px);
    outline: 0px;
    box-shadow: rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px;
    border-radius: 12px;
    max-height: 260px;
       transform: scale(.8);
   opacity: 0;
   pointer-events:none;
border-radius: 0.25rem;
background: #fbfbfb;
      
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
width: max-content;
min-width: 100%;
gap: 0;
`;

const SelectDropdownItem = styled.li`
    display: flex;
    justify-content: space-between;
    padding-block: 0.5rem;
    padding-inline: 1.5rem;
    color: rgba(0, 0, 0, 0.87);
    transition: all 0.25s ease-in-out;
    opacity: 0.85;
    box-sizing: border-box;
    white-space: nowrap;
    border-radius: 6px;
    line-height: 1.57143;
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: capitalize;
    width: 100%;
    cursor: pointer;
    margin: 0px 8px;
    
    &:is(:hover, :active ) {
      opacity:1;
      background:rgba(0,0,0,0.05);
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
    ${props => props.size === "sm" ? 
    `padding-block: 0.25rem;
    padding-inline: 0.75rem;
    font-size: 0.775rem;
    line-height: 1.6;
    `: ""}
`;



const initialState = {
  usingOptions: [],
  open: false,
  selectedOption: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_OPTIONS':
      return {
        ...state,
        usingOptions: action.payload,
        selectedOption: action.payload.find((option) => option.option === true) || action.payload[0],
      };
    case 'SET_SELECTED_OPTION':
      return {
        ...state,
        selectedOption: action.payload,
        open: false,
      };
    case 'SET_OPEN':
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
}

function Select({ options, value, onChange, size, ...props }) {
  const selectRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateOption = useCallback(
    (e) => {
      const target = e.target;
      const selectedOption = state.usingOptions.find((option) => option.value.toString() === target.getAttribute('value'));

      const updatedOptions = state.usingOptions.map((option) => ({
        ...option,
        option: option === selectedOption,
      }));

      dispatch({ type: 'SET_SELECTED_OPTION', payload: selectedOption });
      dispatch({ type: 'SET_OPTIONS', payload: updatedOptions });
    },
    [state.usingOptions]
  );

  const close = useCallback(
    (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        dispatch({ type: 'SET_OPEN', payload: false });
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener('mouseup', close);
    return () => {
      document.removeEventListener('mouseup', close);
    };
  }, [close]);

  useEffect(() => {
    onChange(state.selectedOption);
  }, [state.selectedOption, onChange]);

  useEffect(() => {
    const usingOptions = options.map((option) => ({
      value: option.value,
      label: option.label,
      option: option.value === value,
    }));

    dispatch({ type: 'SET_OPTIONS', payload: usingOptions });
  }, [options, value]);

  const { usingOptions, open, selectedOption } = state;

  return (
    <>
      <select value={selectedOption?.value.toString()} onChange={() => {}} hidden style={{ display: 'none!important' }}>
        {options.map((option, index) => (
          <option key={index} value={option.value.toString()}>
            {option.label}
          </option>
        ))}
      </select>
      <SelectWrapper {...props} ref={selectRef}>
        <SelectToggle
          type="text"
          outlined
          className={open ? 'isActive' : ''}
          role="listbox"
          readOnly
          onClick={() => dispatch({ type: 'SET_OPEN', payload: !open })}
          value={selectedOption ? selectedOption.label || selectedOption.value.toString() : ''}
          invert={!open}
          size={size}
        />
        <MdOutlineUnfoldMore onClick={() => dispatch({ type: 'SET_OPEN', payload: !open })} />
        <SelectDropdownWrapper className={open ? 'isOpen' : ''}>
          <SelectDropdown>
            {usingOptions.map((Option, index) => (
              <SelectDropdownItem
                size={size}
                className={Option.value === selectedOption.value ? 'isActive' : ''}
                onClick={updateOption}
                value={Option.value.toString()}
                key={index}
              >
                {Option.label ? Option.label.toString() : Option.value.toString()}
              </SelectDropdownItem>
            ))}
          </SelectDropdown>
        </SelectDropdownWrapper>
      </SelectWrapper>
    </>
  );
}

export default Select;
