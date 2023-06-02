import React, { useRef, useState } from 'react';
import Button from '../button';
import Icon from '../icons';
import { isBlockActive } from '../utils/all';
import usePopup from '../hooks/usePopup';
import { insertEmbed } from '../utils/embed';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { PopUpWrapper, PopUp, InputWrapper, TabHeader, TabButton, ActionButton, DragArea } from '../components';
import { Input } from 'components/form-elements';

// import './VideoInput.css'
const VideoInput = ({ editor }) => {
    const urlInputRef = useRef();
    const [showInput, setShowInput] = usePopup(urlInputRef);
    const [formData, setFormData] = useState({
        url: '',
        alt: ''
    })
    const [selection, setSelection] = useState();
    const handleButtonClick = (e) => {
        e.preventDefault();
        setSelection(editor.selection);
        selection && ReactEditor.focus(editor);

        setShowInput(prev => !prev);
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();

        selection && Transforms.select(editor, selection);
        selection && ReactEditor.focus(editor);

        insertEmbed(editor, { ...formData }, 'video');
        setShowInput(false);
        setFormData({
            url: '',
            alt: ''
        })
    }
    const handleFormChange = (e) => {
        const { value, name } = e.target;
        setFormData(prev => {
            if (name === 'url') {
                return {
                    ...prev,
                    url: value,
                }
            }
            return {
                ...prev,
                alt: value
            }
        })
    }
    return (
        <PopUpWrapper ref={urlInputRef}>
            <Button
                active={isBlockActive(editor, 'video')}
                format='video' onClick={handleButtonClick}>
                <Icon icon='video' />
            </Button>
            {
                showInput &&
                <PopUp>

                    <InputWrapper as="form" onSubmit={handleFormSubmit}>
                        <Input
                            style={{
                                padding: '0.125rem 0.25rem',
                                fontSize: '0.875rem',
                                lineHeight: '1.25rem',
                                borderRadius: '0.25rem',
                                order: '0',
                            }} name='url' type="text" placeholder='Enter some url' value={formData.url} onChange={handleFormChange} />
                        <Input
                            style={{
                                padding: '0.125rem 0.25rem',
                                fontSize: '0.875rem',
                                lineHeight: '1.25rem',
                                borderRadius: '0.25rem',
                                order: '0',
                            }} name='alt' type="text" placeholder='Enter alt' value={formData.alt} onChange={handleFormChange} />


                        <ActionButton type='submit' level="true" >Save</ActionButton>
                    </InputWrapper>
                </PopUp>
            }
        </PopUpWrapper>
    )
}

export default VideoInput;