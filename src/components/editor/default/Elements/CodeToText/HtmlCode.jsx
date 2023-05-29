import Interweave from 'interweave';
import React, { useEffect } from 'react';
import { Transforms, Path } from 'slate';
import { useSelected, useFocused, useSlateStatic } from 'slate-react';
import useFormat from '../../utils/customHooks/useFormat';

const HtmlCode = (props) => {
  const { attributes, element, children } = props;
  const selected = useSelected();
  const focused = useFocused();
  const editor = useSlateStatic();

  const isHtmlEmbed = useFormat(editor, 'htmlCode');
  const handleKeyUp = (e) => {
    if (!isHtmlEmbed) return;
    if (e.keyCode === 13) {
      const parentPath = Path.parent(editor.selection.focus.path);
      const nextPath = Path.next(parentPath);
      Transforms.insertNodes(
        editor,
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
        {
          at: nextPath,
          select: true, // Focus on this node once inserted
        }
      );
    } else if (e.keyCode === 8) {
      Transforms.removeNodes(editor);
    }
    // console.log(e);
  };
  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isHtmlEmbed]);
  return (
    <div
      {...attributes}
      {...element.attr}
      style={{
        boxShadow: selected && focused && '0 0 3px 3px lightgray',
        marginRight: '20px',
      }}>
      <div contentEditable={false}>
        <Interweave content={element.html} />
      </div>
      {children}
    </div>
  );
};

export default HtmlCode;
