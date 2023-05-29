import React, { useRef, useState } from 'react';
import Button from '../../../common/Button';
import Icon from '../../../common/Icon';
import { isBlockActive } from '../../../utils/SlateUtilityFunctions';
import usePopup from '../../../utils/customHooks/usePopup';
import { insertEmbed } from '../../../utils/embed.js';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

// import './ImageInput.css';

const ImageInput = ({ editor, uploadImage }) => {
  const text = {
    default: 'Drag & Drop to Upload File',
    dragOver: 'Release to Upload File'
  };

  const urlInputRef = useRef();
  const fileUploadRef = useRef();
  const dragAreaRef = useRef(null);
  const [showInput, setShowInput] = usePopup(urlInputRef);
  const [isUpload, setIsUpload] = useState(true);
  const [formData, setFormData] = useState({
    url: '',
    alt: ''
  });
  const [uploadData, setUploadData] = useState({
    url: '',
    alt: ''
  });
  const [selection, setSelection] = useState();
  const [dragText, setDragText] = useState(text.default);
  const [file, setFile] = useState(null);
  const fileRef = useRef();

  const _setFile = (file) => {
    fileRef.current = file;
    setFile(file);
  };
  const resetState = () => {
    setShowInput(false);
    setIsUpload(true);
    setFormData({
      url: '',
      alt: ''
    });
    setUploadData({
      url: '',
      alt: ''
    });
    setDragText(text.default);
    _setFile(null);
  };
  const handleButtonClick = (e) => {
    e.preventDefault();
    setSelection(editor.selection);
    selection && ReactEditor.focus(editor);

    setShowInput((prev) => !prev);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    selection && Transforms.select(editor, selection);
    selection && ReactEditor.focus(editor);

    if (isUpload) {
      insertEmbed(editor, { ...uploadData }, 'image');
    } else {
      insertEmbed(editor, { ...formData }, 'image');
    }
    resetState();
  };
  const handleFormChange = (e) => {
    const { value, name } = e.target;
    if (isUpload) {
      setUploadData((prev) => ({
        ...prev,
        alt: value
      }));
      return;
    }
    setFormData((prev) => {
      if (name === 'url') {
        return {
          ...prev,
          url: value
        };
      }
      return {
        ...prev,
        alt: value
      };
    });
  };
  const handleInputToggle = (e) => {
    const name = e.target.getAttribute('name');
    setIsUpload(name === 'file');
  };
  const handleBrowse = () => {
    fileUploadRef?.current.click();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragText(text.dragOver);
  };
  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragText(text.default);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    _setFile(e.dataTransfer.files[0]);
    showImage();
  };
  const handleFileChange = (e) => {
    _setFile(e.target.files[0]);
    showImage();
  };
  const handleCancel = () => {
    resetState();
  };
  const showImage = async () => {
    // if(fileRef.current===null){
    //     console.log('Its null');
    //     return;
    // }
    try {
      const {
        data: { url }
      } = await uploadImage(fileRef.current);
      setUploadData((prev) => ({
        ...prev,
        url
      }));
    } catch (err) {
      setDragText(text.default);
      _setFile(null);
    }
  };
  return (
    <div ref={urlInputRef} className="popup-wrapper">
      <Button
        active={isBlockActive(editor, 'image')}
        style={{
          border: showInput ? '1px solid lightgray' : '',
          borderBottom: 'none'
        }}
        format="image"
        onClick={handleButtonClick}
      >
        <Icon icon="image" />
      </Button>
      {showInput && (
        <div className="popup imageInput">
          <div className="imageInputWrapper">
            <ul onClick={handleInputToggle}>
              <li
                name="file"
                style={{ borderBottomColor: isUpload && '#3F7BD6' }}
              >
                File Upload
              </li>
              <li
                name="url"
                style={{ borderBottomColor: !isUpload && '#3F7BD6' }}
              >
                URL
              </li>
            </ul>
            {isUpload ? (
              <>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className="dragArea"
                  ref={dragAreaRef}
                >
                  {uploadData.url ? (
                    <img
                      src={uploadData.url}
                      alt={uploadData.alt}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <>
                      <h4>{dragText}</h4>
                      <h3>OR</h3>
                      <button onClick={handleBrowse} id="browseButton">
                        Browse File
                      </button>
                    </>
                  )}
                </div>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  title=""
                  value=""
                  style={{ display: 'none' }}
                  ref={fileUploadRef}
                  onChange={handleFileChange}
                />
              </>
            ) : (
              <input
                name="url"
                type="text"
                placeholder="Enter URL"
                value={formData.url}
                onChange={handleFormChange}
              />
            )}
            <input
              name="alt"
              type="text"
              placeholder="Enter alt text"
              value={isUpload ? uploadData.alt : formData.alt}
              onChange={handleFormChange}
            />
            <div className="uploadFooter">
              <button onClick={handleFormSubmit} id="add">
                Add
              </button>
              <button onClick={handleCancel} id="cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
