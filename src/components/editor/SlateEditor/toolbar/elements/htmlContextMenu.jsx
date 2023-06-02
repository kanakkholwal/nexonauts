import React, { useState } from 'react';
import useContextMenu from '../hooks/useContextMenu';
import Icon from '../icons';
import { Transforms, Node, Path } from 'slate';
import { ContextMenuWrapper, ContextMenuItem } from '../components';

const HtmlContextMenu = (props) => {
  const { editor, handleCodeToText } = props;
  const [selection, setSelection] = useState(null);
  const [showMenu, { top, left }] = useContextMenu(
    editor,
    'htmlCode',
    setSelection
  );
  const handleEditHtml = () => {
    Transforms.select(editor, selection ?? editor.selection);
    const parentPath = Path.parent(selection.focus.path ?? editor.selection.focus.path);
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
      <ContextMenuWrapper className={showMenu ? 'isOpen' : ''} style={{ '--top': top, '--left': left }}>
        <ContextMenuItem onClick={handleEditHtml}>
          <Icon icon="pen" />
          <span>Edit HTML</span>
        </ContextMenuItem>
      </ContextMenuWrapper>
    )
  );
};

export default HtmlContextMenu;
