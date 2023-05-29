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

const ImageInput = ({ editor }) => {
  const text = {
    default: 'Drag & Drop to Upload File',
    dragOver: 'Release to Upload File',
  };

  const urlInputRef = useRef();
  const fileUploadRef = useRef();
  const dragAreaRef = useRef(null);
  const [showInput, setShowInput] = usePopup(urlInputRef);
  const [isUpload, setIsUpload] = useState(true);
  const [formData, setFormData] = useState({
    url: '',
    alt: '',
  });
  const [uploadData, setUploadData] = useState({
    url: '',
    alt: '',
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
      alt: '',
    });
    setUploadData({
      url: '',
      alt: '',
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
        alt: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

  const showImage = () => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setUploadData((prev) => ({
        ...prev,
        url: dataUrl,
      }));
    };
    reader.readAsDataURL(fileRef.current);
  };

  return (
    <PopUpWrapper ref={urlInputRef}>
      <Button
        active={isBlockActive(editor, 'image')}
        format="image"
        onClick={handleButtonClick}
      >
        <Icon icon="image" />
      </Button>
      {showInput && (
        <PopUp>
          <InputWrapper>
            <TabHeader onClick={handleInputToggle}>
              <TabButton
                name="file"
                style={{ borderBottomColor: isUpload && '#3F7BD6' }}
                className={isUpload ? 'isActive' : ''}
              >
                File Upload
              </TabButton>
              <TabButton
                name="url"
                style={{ borderBottomColor: !isUpload && '#3F7BD6' }}
                className={!isUpload ? 'isActive' : ''}
              >
                URL
              </TabButton>
            </TabHeader>
            {isUpload ? (
              <>
                <DragArea
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
                      <h5>{dragText}</h5>
                      <h6>OR</h6>
                      <button onClick={handleBrowse} id="browseButton">
                        Browse File
                      </button>
                    </>
                  )}
                </DragArea>
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
              <Input
                style={{
                  padding: '0.125rem 0.25rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                  borderRadius: '0.25rem',
                  order: '0',
                }}
                name="url"
                type="text"
                placeholder="Enter URL"
                value={formData.url}
                onChange={handleFormChange}
              />
            )}
            <Input
              style={{
                padding: '0.125rem 0.25rem',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                borderRadius: '0.25rem',
                order: '0',
              }}
              name="alt"
              type="text"
              placeholder="Enter alt text"
              value={isUpload ? uploadData.alt : formData.alt}
              onChange={handleFormChange}
            />
            <div className="d-flex align-items-center justify-content-center g-2">
              <ActionButton onClick={handleFormSubmit} id="add">
                Add
              </ActionButton>
              <ActionButton onClick={handleCancel} id="cancel" level="true">
                Cancel
              </ActionButton>
            </div>
          </InputWrapper>
        </PopUp>
      )}
    </PopUpWrapper>
  );
};

export default ImageInput;
