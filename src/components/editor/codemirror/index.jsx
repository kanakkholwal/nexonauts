import { useEffect, useRef } from 'react';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
import * as CodeMirror from 'codemirror';

// // Import additional CodeMirror modes and addons if needed
// import 'codemirror/mode/javascript/javascript';




function CodeMirrorEditor({ value, onChange }) {
    const textAreaRef = useRef(null);
    const editorRef = useRef(null);
  
    useEffect(() => {
      if (textAreaRef.current) {
        editorRef.current = CodeMirror.fromTextArea(textAreaRef.current, {
          lineNumbers: true,
          mode: 'javascript',
          theme: 'material',
        });
  
        editorRef.current.on('change', () => {
          if (editorRef.current) {
            onChange(editorRef.current.getValue());
          }
        });
      }
    }, [onChange]);
  
    useEffect(() => {
      if (editorRef.current) {
        editorRef.current.setValue(value);
      }
    }, [value]);
  
    return <textarea ref={textAreaRef} />;
  }
  
  export default CodeMirrorEditor;