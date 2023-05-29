import { Transforms, Editor, Range } from 'slate';
import React, { useRef, useState } from 'react';
import Button from '../button';
import Icon from '../icons';
import usePopup from '../hooks/usePopup';
import { PopUpWrapper, PopUp } from '../components';
import { Input } from 'components/form-elements';

const Id = ({ editor }) => {
  const idInputRef = useRef(null);
  const [showInput, setShowInput] = usePopup(idInputRef);
  const [selection, setSelection] = useState(null);
  const [id, setId] = useState('');

  const toggleId = () => {
    if (editor.selection) {
      setSelection(editor.selection);
      setShowInput((prev) => !prev);
    }
  };

  const handleId = () => {
    if (!selection || !id) return;

    Transforms.select(editor, selection);
    Transforms.setNodes(editor, { attr: { id } }, { at: selection });
    setShowInput(false);
    setId('');
  };

  
  const isCollapsed = selection && Range.isCollapsed(selection);
  const isLink = isCollapsed && Editor.parent(editor, selection)?.[0].type === 'link';

  return (
    <PopUpWrapper ref={idInputRef}>
      <Button className={showInput ? 'clicked' : ''} format="add Id" onClick={toggleId}>
        <Icon icon="addId" />
      </Button>
      {showInput && (
        <PopUp>
          <div className="d-flex align-items-center m-2 g-0 justify-content-center p-2">
            <Input
              style={{
                padding: '0.125rem 0.25rem',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                borderRadius: '0.25rem',
                order: '0',
              }}
              type="text"
              placeholder="Enter a unique ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <Button
              style={{
                padding: '0.125rem 0.25rem',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                borderRadius: '0.25rem',
                order: '1',
              }}
              onClick={handleId}
            >
              <Icon icon={isLink ? 'edit' : 'add'} />
            </Button>
          </div>
        </PopUp>
      )}
    </PopUpWrapper>
  );
};

export default Id;
