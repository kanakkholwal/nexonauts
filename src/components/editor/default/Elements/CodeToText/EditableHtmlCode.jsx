import React from 'react';
import { useSelected, useFocused } from 'slate-react';

const EditableHtmlCode = (props) => {
  const { attributes, element, children } = props;
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div
      {...attributes}
      {...element.attr}
      style={{
        boxShadow: selected && focused && '0 0 3px 3px lightgray',
        marginRight: '20px',
      }}>
      {children}
    </div>
  );
};

export default EditableHtmlCode;
