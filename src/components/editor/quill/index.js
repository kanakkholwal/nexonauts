// next
import dynamic from 'next/dynamic';
// material
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles

import { Card } from 'components/Card';
//
import EditorToolbar, { formats } from './QuillEditorToolbar';

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function QuillEditor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  ...other
}) {
  const modules = {
    toolbar: {
      container: `#${id}`,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <Card
    >
      <EditorToolbar id={id} isSimple={simple} />
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder='Write something awesome...'
        {...other}
      />
    </Card>
  );
}
