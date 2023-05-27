import React, {useRef, useState} from 'react';
import Button from '../../common/Button'
import Icon from '../../common/Icon'
import {isBlockActive} from '../../utils/SlateUtilityFunctions'
import usePopup from '../../utils/customHooks/usePopup'
import {insertEmbed } from '../../utils/embed.js'
import { Transforms } from 'slate';
import {ReactEditor} from 'slate-react'

import styled from "styled-components";
import {Button} from "components/buttons";
import {Input,Label,FormElement} from "components/form-elements";


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
const Embed = ({editor,format}) =>{
    const urlInputRef = useRef();
    const [showInput,setShowInput] = usePopup(urlInputRef);
    const [formData,setFormData] = useState({
        url:'',
        alt:''
    })
    const [selection,setSelection] = useState();
    const handleButtonClick = (e)=>{
        e.preventDefault();
        setSelection(editor.selection);
        selection && ReactEditor.focus(editor);

        setShowInput(prev =>!prev);
    }
    const handleFormSubmit = (e)=>{
        e.preventDefault();

        selection && Transforms.select(editor,selection);
        selection && ReactEditor.focus(editor);

        insertEmbed(editor,{...formData},format);
        setShowInput(false);
        setFormData({
            url:'',
            alt:''
        })
    }
    const handleImageUpload = ()=>{
        setShowInput(false)
    }
    return (
        <PopUpWrapper ref={urlInputRef}>
            <Button active={isBlockActive(editor,format)} style={{border: showInput?'1px solid lightgray':'',borderBottom: 'none'}}  format={format} onClick={handleButtonClick}>
                <Icon icon={format}/>
            </Button>
            {
                showInput&&
                <PopUp>
                    {
                        format === 'image' &&
                        <div>
                            <div style={{display:'flex',gap:'10px'}} onClick={handleImageUpload}>
                                <Icon icon='upload'/>
                                <span>Upload</span>
                            </div>
                            <p className='text-center text-muted'>OR</p>

                        </div>
                    }
                    <form onSubmit={handleFormSubmit}>
                    <FormElement>
                        <Label>URL</Label>
                        <Input type="text" placeholder='Enter url' value={formData.url} onChange={(e)=>{
                            setFormData({...formData,url:e.target.value})
                        }}/>
                    </FormElement>
                    <FormElement>
                        <Label>Alt Text</Label>
                        <Input type="text" placeholder='Enter alt' value={formData.alt} onChange={(e)=>{
                            setFormData({...formData,alt:e.target.value})
                        }}/>
                    </FormElement>
    
                        <Button type='submit' size="sm" level="true">Save</Button>
                    </form>
                </PopUp>
            }
        </PopUpWrapper>
    )
}

export default Embed;