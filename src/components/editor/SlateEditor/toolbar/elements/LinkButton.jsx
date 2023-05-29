import React, { useState, useRef } from 'react';
import { Transforms } from 'slate';
import { PopUpWrapper, PopUp } from "../components";
import usePopup from "../hooks/usePopup";
import { Input, CheckBox } from "components/form-elements";
import { insertLink } from '../utils/link'
import {isBlockActive} from '../utils/all'
import Button from "../button";
import Icon from "../icons";


const LinkButton = (props) => {
  const {editor} = props

  const popupRef = useRef(null);
  const [showPopup, setShowPopup] = usePopup(popupRef);
  const [url, setUrl] = useState('');
  const [showInNewTab, setShowInNewTab] = useState(false);
  const [selection,setSelection] = useState(null)
  const handleInsertLink = ()=>{
      Transforms.select(editor,selection);
      insertLink(editor,{url,showInNewTab})
      setUrl('');
      setShowPopup(prev => !prev);
      setShowInNewTab(false);
  }
  const toggleLink = ()=>{
      setSelection(editor.selection);
      if(!selection)
        return;
      setShowPopup(prev => !prev);
  }

  const handleInputChange = ({ target }) => {
    const { value, checked, type } = target;
    if (type === 'checkbox') {
      setShowInNewTab(checked);
    } else {
      setUrl(value);
    }
  };

  return (
    <PopUpWrapper ref={popupRef}>
      <Button
        className={`${showPopup ? 'isClicked' : ''}`}
        active={isBlockActive(editor,'link')}
        format="link"
        onClick={toggleLink}
      >
        <Icon icon="link" />
      </Button>
      {showPopup && (
        <PopUp>
          <div className='d-flex align-items-center m-2 g-0 justify-content-center'>
            <Button onClick={handleInsertLink}
            style={{
                padding:"0.125rem 0.25rem",
                fontSize:"0.875rem",
                lineHeight:"1.25rem",
                borderRadius:"0.25rem",
                order:"1"
              }}
            ><Icon icon="add" /></Button>
            <Input
              style={{
                padding:"0.125rem 0.25rem",
                fontSize:"0.875rem",
                lineHeight:"1.25rem",
                borderRadius:"0.25rem",
                order:"0"
              }}
              type="text"
              placeholder="Enter the URL"
              value={url}
              onChange={handleInputChange}
              autoFocus
              required
            />
          </div>
          <label className='d-flex align-items-center mb-2' style={{
            fontSize:"0.875rem",
            lineHeight:"1.25rem",
            fontWeight:"600",
            width:"100%"

          }}>
          <CheckBox
            size={"1rem"}
            style={{
              order:"0"
            }}
            label="Open in new tab"
            checked={showInNewTab}
            onChange={handleInputChange}
          />
            Open in New Tab
          </label>
        </PopUp>
      )}
    </PopUpWrapper>
  );
};

export default LinkButton;
