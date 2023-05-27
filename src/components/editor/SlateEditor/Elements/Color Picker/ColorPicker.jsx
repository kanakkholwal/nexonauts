import React, { useRef, useState } from 'react';
import {MdFormatColorText, MdFormatColorFill, MdCheck} from 'react-icons/md'
// import './ColorPicker.css'
import {colors} from './defaultColors.js'
import { addMarkData,activeMark } from '../../utils/SlateUtilityFunctions.js'
import { Transforms } from 'slate';
import usePopup  from '../../utils/customHooks/usePopup'
import { ReactEditor } from 'slate-react';
import styled from "styled-components";
import {Button} from "components/buttons";
import {Input} from "components/form-elements";

const ColorOptions = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(auto, 1fr));
align-items: center;
grid-gap: 5px;
`;
const PopUpWrapper = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
`;
const PopUp = styled.div`
position: absolute;
display: flex;
align-items: center;
justify-content: center;
top: calc(100% + 3px);
-webkit-tap-highlight-color: transparent;
background-color: rgba(33, 43, 54, 0.8);
height:100%;
width:100%;
z-index: 20;
`;

const logo = {
    color:<MdFormatColorText size={20}/>,
    bgColor:<MdFormatColorFill size={20}/>,
}
const ColorPicker = ({format,editor}) =>{
    const [selection,setSelection] = useState()
    const [hexValue,setHexValue] = useState('')
    const [validHex,setValidHex] = useState();
    const colorPickerRef = useRef(null);
    const [showOptions,setShowOptions] = usePopup(colorPickerRef)

    const isValidHexSix = new RegExp('^#[0-9A-Za-z]{6}')
    const isValidHexThree = new RegExp('^#[0-9A-Za-z]{3}')

    const changeColor = (e) =>{
        const clickedColor = e.target.getAttribute("data-value");
        selection && Transforms.select(editor,selection)
        selection && ReactEditor.focus(editor);

        addMarkData(editor,{format,value:clickedColor})
        setShowOptions(false);
    }
    const toggleOption = ()=>{
        setSelection(editor.selection);
        selection && ReactEditor.focus(editor);

        setShowOptions(prev => !prev)
    }
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        if(!validHex) return;
        selection && Transforms.select(editor,selection)

        addMarkData(editor,{format,value:hexValue})
        setShowOptions(false);
        setValidHex('');
        setHexValue('');
        selection && ReactEditor.focus(editor);


    }
    const handleHexChange = (e)=>{
        e.preventDefault();
        const newHex = e.target.value;
        setValidHex(isValidHexSix.test(newHex) || isValidHexThree.test(newHex));
        setHexValue(newHex);
    }
    return (
        <PopUpWrapper ref={colorPickerRef}>
            <Button size="sm" level="true" low="true" style={{color:showOptions?'var(--theme)':activeMark(editor,format),opacity:'1'}} className={showOptions?'clicked':''} onClick={toggleOption}>{logo[format]}</Button>
            {showOptions &&
                <PopUp>
                    <ColorOptions>
                        {
                            colors.map((color, index) => {
                                return <div key={index} data-value={color} onClick={changeColor} className='option' style={{background:color}}></div>
                            })
                        }

                    </ColorOptions>
                    <p  className="text-center text-muted">OR</p>
                    <form onSubmit={handleFormSubmit}>
                        <div className='hexPreview' style={{background:validHex?hexValue:'#000000'}}></div>
                        <Input type="text" placeholder='#000000' value={hexValue} onChange={handleHexChange} style={{border:validHex === false?'1px solid red':'1px solid rgba(var(--theme-rgb),0.2)'}}/>
                        <Button size="sm" level="true" low="true" nature={validHex?'success':''} type={'submit'}><MdCheck size={20}/></Button>
                    </form>
                </PopUp>
            }
        </PopUpWrapper>
    )
}

export default ColorPicker;
