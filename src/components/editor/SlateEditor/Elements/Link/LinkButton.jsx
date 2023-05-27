
import {useRef, useState} from 'react'
import { insertLink } from '../../utils/link.js'
import Button from '../../common/Button.jsx'
import Icon from '../../common/Icon.jsx'
import {isBlockActive} from '../../utils/SlateUtilityFunctions.js'
import usePopup  from '../../utils/customHooks/usePopup.jsx'
import { Transforms } from 'slate'
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
-webkit-tap-highlight-color: transparent;
background-color: rgba(33, 43, 54, 0.8);
height:100%;
width:100%;
z-index: 20;
`;
const LinkButton = (props)=>{
    const {editor} = props
    const linkInputRef = useRef(null);
    const [showInput,setShowInput] = usePopup(linkInputRef)
    const [url,setUrl] = useState('')
    const [showInNewTab,setShowInNewTab] = useState(false)
    const [selection,setSelection] = useState()
    const handleInsertLink = ()=>{
        Transforms.select(editor,selection);
        insertLink(editor,{url,showInNewTab})
        setUrl('');
        setShowInput(prev => !prev);
        setShowInNewTab(false);
    }
    const toggleLink = ()=>{
        setSelection(editor.selection);
        setShowInput(prev => !prev);
    }
    const handleInputChange = ({target})=>{
        if(target.type === 'checkbox'){
            setShowInNewTab(prev => !prev);
        }
        else{
            setUrl(target.value)
        }
    }
    return (
        <PopUpWrapper  ref={linkInputRef}>
            <Button className={showInput?'clicked':''} active={isBlockActive(editor,'link')} format={'link'} onClick={toggleLink}>
                <Icon icon='link'/>
            </Button>
            {
                showInput &&
                <PopUp>
                    <div style={{display:'flex',gap:'4px',margin:'5px 2px'}}>
                        <Input type="text" placeholder='https://google.com' value={url} onChange={handleInputChange} />
                        <div onClick={handleInsertLink}><Icon icon='add'/></div>
                    </div>
                    <label>
                        <Input type="checkbox" checked={showInNewTab} onChange={handleInputChange}/>
                        <span style={{fontSize:'0.8em'}}>Open in new tab</span>
                    </label>
                </PopUp>
            }
        </PopUpWrapper>
    )
}


export default LinkButton;