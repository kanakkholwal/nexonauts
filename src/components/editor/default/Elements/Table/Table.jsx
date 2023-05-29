// import { serialize } from 'components/SlateEditor/utils/serializer';
import React, { useEffect, useState } from 'react';
import { Transforms, Editor, Element } from 'slate';
import { useSelected, useFocused, useSlateStatic } from 'slate-react';
import Icon from '../../common/Icon';
import useResize from '../../utils/customHooks/useResize.js';

const Table = ({ attributes, children, element }) => {
  const { width, height } = element;
  const editor = useSlateStatic();
  const selected = useSelected();
  const [size, onMouseDown, resizing] = useResize(width, height);

  useEffect(() => {
    if (!resizing) {
      selected &&
        Transforms.setNodes(
          editor,
          { ...size },
          {
            match: (n) =>
              !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table',
          }
        );
    }
  }, [resizing]);
  return (
    <div
      {...attributes}
      style={{ width: `${size.width}px`, height: `${size.height}px` }}>
      <table className="editorTable">
        <tbody {...attributes}>{children}</tbody>
      </table>
      {selected && (
        <button
          contentEditable={false}
          className="resizeButton"
          onMouseDown={onMouseDown}
          style={{
            width: '15px',
            height: '15px',
            opacity: 1,
            background: 'transparent',
          }}>
          <Icon icon="resize" />
        </button>
      )}
    </div>
  );
};

export default Table;
