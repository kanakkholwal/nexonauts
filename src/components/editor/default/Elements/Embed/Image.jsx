import React, { useEffect } from 'react';
import { Transforms } from 'slate';
import { useSelected, useFocused, useSlateStatic } from 'slate-react';
import Icon from '../../common/Icon';
import useResize from '../../utils/customHooks/useResize.js';

const Image = ({ attributes, element, children }) => {
  const { url, alt, width, height } = element;
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  const [size, onMouseDown, resizing] = useResize(width, height);

  useEffect(() => {
    if (!resizing) {
      selected && Transforms.setNodes(editor, { ...size });
    }
  }, [resizing]);
  return (
    <div
      {...attributes}
      className="embed"
      style={{
        display: 'flex',
        boxShadow: selected && '0 0 3px 3px lightgray',
        marginRight: '20px',
      }}
      {...element.attr}>
      <div
        contentEditable={false}
        style={{ width: `${size.width}px`, height: `${size.height}px` }}>
        <img alt={alt} src={url} />
        {selected && (
          <button
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
      {children}
    </div>
  );
};
export default Image;
