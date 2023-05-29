import React from 'react';
import { useFocused, useSelected, useSlateStatic } from 'slate-react';
import { BiUnlink } from 'react-icons/bi';
import { removeLink } from '../utils/link';
import { LinkedWrapper, LinkedContainer } from '../components';
import Button from '../button';

const UnLink = ({ attributes, element, children }) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <LinkedWrapper>
      <span className="link">
        <a href={element.href} {...attributes} {...element.attr} target={element.target}>
          {children}
        </a>
      </span>
      {selected && focused && (
        <LinkedContainer>
          <a href={element.href} target={element.target} spellCheck={false} contentEditable={false}>
            {element.href}
          </a>
          <Button nature="danger" onClick={() => removeLink(editor)}>
            <BiUnlink />
          </Button>
        </LinkedContainer>
      )}
    </LinkedWrapper>
  );
};

export default UnLink;
