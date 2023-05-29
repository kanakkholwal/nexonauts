import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createEditor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import Toolbar from './Toolbar/Toolbar';
import { getMarked, getBlock } from './utils/SlateUtilityFunctions.js';
import withLinks from './plugins/withLinks.js';
import withTables from './plugins/withTable.js';
import withEmbeds from './plugins/withEmbeds.js';
import withEquation from './plugins/withEquation.js';
import CodeToText from './Elements/CodeToText/CodeToText';
import { deserialize, getSerialized } from './utils/serializer';
import { handleHotKey } from './utils/keyboardShortcuts';
// import 'katex/dist/katex.min.css';

const Element = (props) => {
  return getBlock(props);
};
const Leaf = ({ attributes, children, leaf }) => {
  children = getMarked(leaf, children);
  return <span {...attributes}>{children}</span>;
};
const SlateEditor = (props) => {
  const { onChange, initialValue, uploadImage, showToolbarOnFocus, type } = props;
  const editor = useMemo(
    () =>
      withEquation(
        withHistory(
          withEmbeds(withTables(withLinks(withReact(createEditor()))))
        )
      ),
    []
  );
  const defaultValue = [
    {
      type: 'paragaph',
      children: [{ text: '' }]
    }
  ];

  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [showToolbar, setShowToolbar] = useState(true);
  const isEditorClicked = useRef(null);
  const editorRef = useRef();
  const editorWrapperRef = useRef();
  const valueRef = useRef();
  valueRef.current = defaultValue;
  const [height, setHeight] = useState('400px');
  useEffect(() => {
    if (initialValue !== value) {
      setLoading(true);
    }
    if (!initialValue || !loading) return;
    let jsonInitialValue = defaultValue;
    try {
      jsonInitialValue = JSON.parse(initialValue).children;
    } catch (e) {
      const draftHtml = new DOMParser().parseFromString(
        initialValue,
        'text/html'
      );
      jsonInitialValue = deserialize(draftHtml.body).filter(
        (item) => item.type
      );
    } finally {
      setValue(jsonInitialValue);
      valueRef.current = jsonInitialValue;
    }
  }, [initialValue]);
  useEffect(() => {
    document.addEventListener('click', handleEditorClick);
    if (type === 'question' || type === 'solution') {
      setHeight('200px');
    } else if (type === 'option') {
      setHeight('fit-content');
    }
    if (showToolbarOnFocus) {
      setShowToolbar(false);
    }
    return () => document.removeEventListener('click', handleEditorClick);
  }, []);

  // This is a reduntant handleFocus, because the handleFocus does not trigger everywhere on the editor
  const handleEditorClick = (e) => {
    const { target } = e;
    const attrRegex = new RegExp('data-slate.*');
    const elementAttributes = Object.values(target.attributes);
    const isNode = !!elementAttributes?.some(({ name }) =>
      attrRegex.test(name)
    );
    if (!editorWrapperRef.current?.contains(target)) {
      isEditorClicked.current = false;
      showToolbarOnFocus && setShowToolbar(false);
    }
    if (editorRef.current?.contains(target)) {
      isEditorClicked.current = true;
      if (!isNode && !editor.selection) {
        Transforms.select(editor, [valueRef.current.length - 1]);
        Transforms.collapse(editor, { edge: 'end' });
      }
      setShowToolbar(true);
      ReactEditor.focus(editor);
    }
  };
  const handleEditorChange = (newValue) => {
    setLoading(false);
    let convertedHtml = getSerialized(
      JSON.stringify({
        children: newValue
      })
    );
    convertedHtml = convertedHtml.replaceAll('\n', '<br/>');
    onChange(convertedHtml);
    setValue(newValue);
    valueRef.current = newValue;
  };
  const handleFocus = () => {
    if (isEditorClicked.current) return;
    if (!editor.selection) {
      Transforms.select(editor, [valueRef.current.length - 1]);
      Transforms.collapse(editor, { edge: 'end' });
    }
    setShowToolbar(true);
    // editorWrapperRef.current.scrollIntoView();
  };
  const renderElement = useCallback((props) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const [htmlAction, setHtmlAction] = useState({
    showInput: false,
    html: '',
    action: '',
    location: ''
  });
  const handleCodeToText = (partialState) => {
    setHtmlAction((prev) => ({
      ...prev,
      ...partialState
    }));
  };

  return (
    <Slate editor={editor} value={value} onChange={handleEditorChange}>
      <div
        ref={editorWrapperRef}
        onFocus={handleFocus}
        style={{ marginTop: '10px' }}
      >
        {showToolbar && (
          <Toolbar
            handleCodeToText={handleCodeToText}
            uploadImage={uploadImage}
          />
        )}
        <div
          ref={editorRef}
          className="editor-wrapper"
          style={{
            border: '1px solid #f3f3f3',
            padding: '0 10px',
            minHeight: height,
            marginBottom: type === 'solution' ? '100px' : '0'
          }}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyUp={(e) => handleHotKey(editor, e)}
          />
        </div>
        {htmlAction.showInput && (
          <CodeToText {...htmlAction} handleCodeToText={handleCodeToText} />
        )}
      </div>
    </Slate>
  );
};

export default SlateEditor;
