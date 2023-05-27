import {Range, Editor, Transforms} from 'slate';
import React, {useRef, useState} from 'react';
import Button from '../../common/Button'
import Icon from '../../common/Icon'
import usePopup from '../../utils/customHooks/usePopup';
import styled from "styled-components";
import {Button} from "components/buttons";
import {Input} from "components/form-elements";

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
gap:0.25rem;
-webkit-tap-highlight-color: transparent;
background-color: rgba(33, 43, 54, 0.8);
height:100%;
width:100%;
z-index: 20;
`;
const Id = ({editor})=>{
    const idInputRef = useRef(null);
    const [showInput,setShowInput] = usePopup(idInputRef);
    const [selection,setSelection] = useState()
    const [id,setId] = useState('');
    const toggleId = ()=>{
        setSelection(editor.selection);
        setShowInput(prev => !prev);
    }
    const handleId = ()=>{
        // selection && Transforms.select(editor,selection);
        if(!selection || !id) return;
        Transforms.setNodes(editor,{
            attr:{id}
        },{
            at:selection,
        })
        setShowInput(false);
        setId('')
    }
    return (
        <PopUpWrapper ref={idInputRef}>
            <Button className={showInput?'clicked':''} format={'add Id'} onClick={toggleId}>
                <Icon icon='addId'/>
            </Button>
            {
                showInput &&
                <PopUp>
                    <Input type="text" placeholder='Enter an unique ID' value={id} onChange={(e)=>setId(e.target.value)}/>
                    <div onClick={handleId}><Icon icon='add'/></div>
                </PopUp>
            }
        </PopUpWrapper>
    )
}

export default Id;