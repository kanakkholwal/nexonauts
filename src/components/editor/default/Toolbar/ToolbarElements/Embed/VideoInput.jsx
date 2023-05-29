import React, {useRef, useState} from 'react';
import Button from '../../../common/Button'
import Icon from '../../../common/Icon'
import {isBlockActive} from '../../../utils/SlateUtilityFunctions'
import usePopup from '../../../utils/customHooks/usePopup'
import {insertEmbed } from '../../../utils/embed.js'
import { Transforms } from 'slate';
import {ReactEditor} from 'slate-react'

// import './VideoInput.css'
const VideoInput = ({editor}) =>{
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

        insertEmbed(editor,{...formData},'video');
        setShowInput(false);
        setFormData({
            url:'',
            alt:''
        })
    }
    const handleFormChange = (e) => {
        const { value, name } = e.target;
        setFormData(prev => {
            if(name === 'url'){
                return {
                    ...prev,
                    url:value,
                }
            }
            return {
                ...prev,
                alt:value
            }
        })
    }
    return (
        <div ref={urlInputRef} className='popup-wrapper'>
            <Button active={isBlockActive(editor,'video')} style={{border: showInput?'1px solid lightgray':'',borderBottom: 'none'}}  format='video' onClick={handleButtonClick}>
                <Icon icon='video'/>
            </Button>
            {
                showInput&&
                <div  className='popup videoInput'>
                    <form onSubmit={handleFormSubmit}>
                        <input name='url' type="text" placeholder='Enter some url' value={formData.url} onChange={handleFormChange}/>
                        <input name='alt' type="text" placeholder='Enter alt' value={formData.alt} onChange={handleFormChange}/>
                        

                        <Button type='submit'>Save</Button>
                    </form>
                </div>
            }
        </div>
    )
}

export default VideoInput;