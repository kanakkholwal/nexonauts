import React, { useEffect, useState } from 'react';
import useContextMenu from '../../utils/customHooks/useContextMenu.js';
import Icon from '../../common/Icon';
import { Transforms, Editor, Element } from 'slate';
// import { serialize } from 'components/SlateEditor/utils/serializer.js';
import ReactDOMServer from 'react-dom/server';

const EditableHtmlContextMenu = (props) => {
  const { editor, handleCodeToText } = props;
  const [selection, setSelection] = useState();
  const [showMenu, { top, left }] = useContextMenu(
    editor,
    'editableHtmlCode',
    setSelection
  );
  const handleEditHtml = () => {
    Transforms.select(editor, selection);
    const [[htmlNode]] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        n.type === 'editableHtmlCode',
      mode: 'highest',
    });
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

export default EditableHtmlContextMenu;
