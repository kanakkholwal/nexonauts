import React, { useRef, useState, useEffect } from 'react';
import { MdFormatColorText, MdFormatColorFill, MdCheck } from 'react-icons/md';
import Button from '../button';
import { addMarkData, activeMark } from '../utils/all';
import { Transforms, Editor, Range } from 'slate';
import usePopup from '../hooks/usePopup';
import { ReactEditor } from 'slate-react';
import { PopUpWrapper, PopUp, ColorOption, ColorOptions } from '../components';
import { Input } from 'components/form-elements';

const logo = {
  color: <MdFormatColorText size={20} />,
  bgColor: <MdFormatColorFill size={20} />,
};

const ColorPicker = ({ format, editor }) => {
  const [selection, setSelection] = useState(editor.selection);
  const [hexValue, setHexValue] = useState('');
  const [validHex, setValidHex] = useState(false);
  const colorPickerRef = useRef(null);
  const [showOptions, setShowOptions] = usePopup(colorPickerRef);

  const isValidHexSix = new RegExp('^#[0-9A-Za-z]{6}');
  const isValidHexThree = new RegExp('^#[0-9A-Za-z]{3}');

  const changeColor = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const clickedColor = e.target.getAttribute('data-value');
    if (selection) {
      Transforms.select(editor, selection);
      ReactEditor.focus(editor);
    }

    addMarkData(editor, { format, value: clickedColor });
    setShowOptions(false);
  };

  const toggleOption = () => {
    if (editor.selection) {
      setSelection(editor.selection);
      ReactEditor.focus(editor);
      setShowOptions((prev) => !prev);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validHex) return;
    if (selection) {
      Transforms.select(editor, selection);
    }

    addMarkData(editor, { format, value: hexValue });
    setShowOptions(false);
    setValidHex(false);
    setHexValue('');
    selection && ReactEditor.focus(editor);
};

  const handleHexChange = (e) => {
    e.preventDefault();
    const newHex = e.target.value;
    setValidHex(isValidHexSix.test(newHex) || isValidHexThree.test(newHex));
    setHexValue(newHex);
  };




  return (
    <PopUpWrapper ref={colorPickerRef}>
      <Button
        style={{ color: showOptions ? 'black' : activeMark(editor, format), opacity: '1' }}
        className={showOptions ? 'clicked' : ''}
        onClick={toggleOption}
      >
        {logo[format]}
      </Button>
      {showOptions && (
        <PopUp>
          <ColorOptions>
            {colors.map((color, index) => (
              <ColorOption
                key={index}
                data-value={color}
                onClick={changeColor}
                className="option"
                style={{ background: color }}
              ></ColorOption>
            ))}
          </ColorOptions>
          <p className="text-center">OR</p>
          <form className="d-flex align-items-center m-2 g-2 justify-content-center p-2" onSubmit={handleFormSubmit}>
            <ColorOption
              className="hexPreview"
              style={{ background: validHex ? hexValue : '#000000' }}
            ></ColorOption>
            <Input
              style={{
                padding: '0.125rem 0.25rem',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                borderRadius: '0.25rem',
                order: '1',
                borderColor: validHex === false ? 'var(--danger)' : '',
              }}
              type="text"
              placeholder="#000000"
              value={hexValue}
              onChange={handleHexChange}
            />
            <Button style={{ color: validHex ? 'green' : '', order: '2' }} type="submit">
              <MdCheck size={20} />
            </Button>
          </form>
        </PopUp>
      )}
    </PopUpWrapper>
  );
};

const colors = [
  '#000000',
  '#e60000',
  '#ff9900',
  '#ffff00',
  '#008a00',
  '#0066cc',
  '#9933ff',
  '#ffffff',
  '#facccc',
  '#ffebcc',
  '#ffffcc',
  '#cce8cc',
  '#cce0f5',
  '#ebd6ff',
  '#bbbbbb',
  '#f06666',
  '#ffc266',
  '#ffff66',
  '#66b966',
  '#66a3e0',
  '#c285ff',
  '#888888',
  '#a10000',
  '#b26b00',
  '#b2b200',
  '#006100',
  '#0047b2',
  '#6b24b2',
  '#444444',
  '#5c0000',
  '#663d00',
  '#666600',
  '#003700',
  '#002966',
  '#3d1466',
];

export default ColorPicker;
