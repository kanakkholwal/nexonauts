import React, { useState } from 'react';
import useContextMenu from '../../utils/customHooks/useContextMenu.js';
import Icon from '../../common/Icon';
import { Transforms, Node, Path } from 'slate';

const HtmlContextMenu = (props) => {
  const { editor, handleCodeToText } = props;
  const [selection, setSelection] = useState();
  const [showMenu, { top, left }] = useContextMenu(
    editor,
    'htmlCode',
    setSelection
  );
  const handleEditHtml = () => {
    Transforms.select(editor, selection);
    const parentPath = Path.parent(selection.focus.path);
    const htmlNode = Node.get(editor, parentPath);
    handleCodeToText({
      showInput: true,
      html: htmlNode.html,
      action: 'update',
      location: selection,
    });
  };
  return (
    showMenu && (
      <div className="contextMenu" style={{ top, left }}>
        <div className="menuOption" onClick={handleEditHtml}>
          <Icon icon="pen" />
          <span>Edit HTML</span>
        </div>
      </div>
    )
  );
};

export default HtmlContextMenu;
