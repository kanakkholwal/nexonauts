import { useState, useMemo, useCallback } from 'react';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';

const SlateEditor = ({ initialValue, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
    onChange(newValue);
  }, [onChange]);


  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      <Editable placeholder="Enter your blog post content here..." />
    </Slate>
  );
};

export default SlateEditor;
