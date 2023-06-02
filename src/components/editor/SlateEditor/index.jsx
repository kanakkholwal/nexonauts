// ./slate/index.jsx
import React, { useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { EditableArea,EditorWrapper } from './toolbar/components';

import {
  toggleMark,
  Element,
  Leaf,
} from "./toolbar/helper"

import Toolbar from './toolbar';
import withLinks from './toolbar/plugins/withLinks';
import withEmbeds from './toolbar/plugins/withEmbeds';
import withTable from './toolbar/plugins/withTable';
// import { serializeHtml } from '@udecode/plate';

const html = serializeHtml(editor, {
  nodes: editor.children,
});
const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}


const RichTextExample = ({ initialValue, onChange }) => {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withTable(withEmbeds(withLinks(withHistory(withReact(createEditor()))))), [])

  return (
    <EditorWrapper>
        <Slate editor={editor} value={initialValue} onChange={onChange}>
      <Toolbar/>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Write Something Awesome..."
        spellCheck
        autoFocus
        as={EditableArea}
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
    </EditorWrapper>
  
  )
}

export default RichTextExample
