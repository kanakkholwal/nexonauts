import React, { useEffect, useCallback } from 'react';
import { useSelected, useFocused, useSlateStatic } from 'slate-react';
import Icon from '../icons';
import Button from '../button';
import {EmbedWrapper,EmbedSetting} from '../components';
import useResize from '../hooks/useResize';
import { Transforms } from 'slate';

const Video = ({ attributes, element, children }) => {
  const { url, alt, width, height } = element;
  const [size, onMouseDown, resizing] = useResize(width, height);
  const selected = useSelected();
  const focused = useFocused();
  const editor = useSlateStatic();

  useEffect(() => {
    if (!resizing && selected) {
      Transforms.setNodes(editor, size);
    }
  }, [resizing, selected, editor, size]);

  const handleMouseDown = useCallback(
    (event) => {
      event.preventDefault();
      onMouseDown(event);
    },
    [onMouseDown]
  );

  return (
    <EmbedWrapper
    active={selected && focused}
      {...attributes}
     
      {...element.attr}
    >
      <div contentEditable={false} style={{ width: `${size.width}px`, height: `${size.height}px` }}>
        {resizing ? (
          <EmbedSetting>
            <Icon icon='videoPlayer' />
          </EmbedSetting>
        ) : (
          <iframe src={url} title={alt} width={size.width} height={size.height} />
        )}

        {selected && (
          <EmbedSetting>
          <Button
            onMouseDown={handleMouseDown}
          >
            <Icon icon='resize' />
          </Button>

          </EmbedSetting>

        )}
      </div>
      {children}
    </EmbedWrapper>
  );
};

export default Video;
