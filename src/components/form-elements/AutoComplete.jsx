import Chip from "components/topography/chips";
import { useEffect,useReducer ,useRef} from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import {MdOutlineClear} from "react-icons/md";
import {IoIosArrowDown} from "react-icons/io";
import {AiOutlineLoading} from "react-icons/ai";


const StyledWrapper = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    letter-spacing: 0.065em;
    font-weight: 500;
     max-width: 100%;
    min-width: 140px;
    gap:2px;
    transition: all .3s ease-in-out;
    border-radius: 0.5rem;
    padding:0.75rem 0.875rem;
    border: 2px solid var(--form-border);
    background: var(--form-bg);
    color: var(--form-color);
    caret-color: var(--form-caret);
    transition: all .3s ease-in-out;
    outline: none;
    order:2;

    &:focus, &:has(input:focus), &:has(input:active), &:focus-within {
    border-color: var(--form-active);
    background: var(--form-bg-active);
 
    } 
    ${props => props.size === "sm" ? 
    `
        font-size: 0.875rem !important;
        line-height: 1rem!important;
        padding: 8px 24px 8px 8px!important;
        border-radius: 0.5rem !important;
        border-width: 1px !important;
    `: ""}
`;
const SelectedWrapper = styled.div`
transition: all .3s ease-in-out;
display:inline-flex;
flex-wrap: wrap;
gap:0.25rem;
align-items: center;
justify-content: flex-start;
`;
const StyledInput = styled.input`
transition: all .3s ease-in-out;
background:none;
border:none;
outline:none;

margin-inline:0.5rem;
flex:1 1 auto;
&:focus{
    outline:none;
}

`;
const Controls = styled.div`
display:flex;
align-items: center;
justify-content: flex-end;
gap:0.5rem;
flex:1 1 auto;
position:absolute;
right:0.5rem;
top:50%;
translate:0 -50%;
svg{
    cursor:pointer;
    transition: all .3s ease-in-out;
    &:hover{
        scale:1.1;
    }

}
`;
export default function AutoComplete({
  multiple = false,
  options,
  onChange,
  onAdd,
  async = false,
  placeholder,
  id,
   size = "md",
}) {
  const initialState = {
    isOpen: false,
    state: 'IDLE'|'PENDING'|'RESOLVED'|'REJECTED',
    usingOptions: options,
    selected: [],
    inputValue: '',
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_IS_OPEN':
        return { ...state, isOpen: action.payload };
      case 'SET_USING_OPTIONS':
        return { ...state, usingOptions: action.payload };
      case 'SET_SELECTED':
        return { ...state, selected: action.payload };
      case 'RESET_SELECTED':
        return { ...state, selected: []};
     case 'REMOVE_SELECTED':
        return { ...state, selected: state.selected.filter((item) => item.value !== action.payload.value)};
      case 'SET_INPUT_VALUE':
        return { ...state, inputValue: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const wrapperRef = useRef(null);
  const { isOpen, usingOptions, selected, inputValue ,componentState} = state;

  const handleClick = async (event, option, newOption = false) => {
    event.preventDefault();
    event.stopPropagation();

        if (multiple) {
            dispatch({ type: 'SET_SELECTED', payload: [...selected, option] });
        } else {
            dispatch({ type: 'SET_SELECTED', payload: [option] });
        }

        if (newOption === true) {

            if (async && onAdd) {
                console.log("async");
                dispatch({ type: 'SET_STATE', payload: 'PENDING' });
                await onAdd(option);
                dispatch({ type: 'SET_STATE', payload: 'RESOLVED' });
            } else {
                onAdd && onAdd(option);
            }
            console.log("newOption", option);
            dispatch({ type: 'SET_USING_OPTIONS', payload: [...usingOptions, option] });
        }

        dispatch({ type: 'SET_INPUT_VALUE', payload: '' });
    };

  useEffect(() => {
    onChange && onChange(selected);
  }, [selected]);

  useEffect(() => {
    if (inputValue.length > 0) {
      dispatch({
        type: 'SET_USING_OPTIONS',
        payload: options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        ),
      });
    }
    else if(inputValue.length === 0){
      dispatch({
        type: 'SET_USING_OPTIONS',
        payload: options,
      });
    }
    
  }, [inputValue, options]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                dispatch({ type: 'SET_IS_OPEN', payload: false });
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

  return (
    <StyledWrapper      
       ref={wrapperRef}
       size={size}
    >
    <SelectedWrapper 
  
    >
      {multiple ?
        selected.map((option, index) => (
          <Chip
            key={index}
            label={option.label}
            onEndIconClick={() => {
                dispatch({ type: 'REMOVE_SELECTED', payload: option });

            }}
          />
        )):selected.map((item) => item.label).join(', ')}
    </SelectedWrapper>
      <StyledInput
        type="text"
        value={inputValue}
        placeholder={placeholder}
        id={id}
        onChange={(event) =>
          dispatch({ type: 'SET_INPUT_VALUE', payload: event.target.value })
        }
        onFocus={() => dispatch({ type: 'SET_IS_OPEN', payload: true })}
      />
          <Controls>
              <MdOutlineClear
                  size={16}
                  onClick={() => {
                      dispatch({ type: 'RESET_SELECTED' });
                  }}
                  style={{
                        opacity: selected.length > 0 ? 1 : 0,
                        display: selected.length > 0 && state.state !== 'PENDING' ? 'block' : 'none',
                    
                  }}
              />
                <AiOutlineLoading 
                    size={16}
                    style={{
                        animation: state.state === 'PENDING' ? 'spin 1s linear infinite' : 'none',
                        opacity: state.state === 'PENDING' ? 1 : 0,
                        display: state.state === 'PENDING' ? 'block' : 'none',
                    }}
                />
              <IoIosArrowDown
                  size={16}
                  onClick={() => {
                        dispatch({ type: 'SET_IS_OPEN', payload: !isOpen });
                  }}
                  style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
              />

          </Controls>
      <DropdownWrapper className={isOpen ? 'isOpen' : ''}>
        <Dropdown>
                  {usingOptions.length > 0 ? (
                      usingOptions.filter((option) => selected.every((item) => item.value !== option.value)).map((option, index) => (
                          <DropdownItem
                              key={index}
                              size={size}
                              id={option.value || (Math.random() * 100).toString()}
                              onClick={(event) => handleClick(event, option)}
                          >
                              {option.label || 'No label'}
                          </DropdownItem>
                      ))
                  ) : multiple === false ? (
                      'No options found'
                  ) : (
                      <>
                          {inputValue.length > 0 && (
                              <DropdownItem
                                  key={0}
                                  id={0}
                                  onClick={(event) =>
                                      handleClick(event, { label: inputValue, value: inputValue }, true)
                                  }
                              >
                              <span>Add </span> <strong>{inputValue}</strong> 
                              <span>as a new option </span> 
                              </DropdownItem>

                          )}
                      </>
                  )}
        </Dropdown>
      </DropdownWrapper>
    </StyledWrapper>
  );
}
AutoComplete.propTypes = {
    multiple: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    onChange: PropTypes.func,
    onAdd: PropTypes.func,
    async: PropTypes.bool,
    placeholder: PropTypes.string,
    id: PropTypes.string,
  };


const DropdownWrapper = styled.div`
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
const Dropdown = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: max-content;
min-width: 100%;
gap: 0;
margin-left: 0;
padding-block:0.25rem;
`;

const DropdownItem = styled.div`
    display: flex;
    justify-content: flex-start;
    gap:0.25rem;
    padding-block: 0.5rem;
    padding-inline: 1rem;
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
    `
        font-size: 0.875rem !important;
        line-height: 1rem!important;
        padding: 8px 24px 8px 8px!important;
        border-radius: 0.25rem !important;
    `: ""}

`;
