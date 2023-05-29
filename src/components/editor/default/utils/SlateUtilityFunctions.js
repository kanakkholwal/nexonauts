import { Editor, Transforms, Element as SlateElement } from 'slate';
import Link from '../Elements/Link/Link';
import Image from '../Elements/Embed/Image';
import Video from '../Elements/Embed/Video';
import Equation from '../Elements/Equation/Equation';
import HtmlCode from '../Elements/CodeToText/HtmlCode';
import EditableHtmlCode from '../Elements/CodeToText/EditableHtmlCode';
import Table from '../Elements/Table/Table';
const alignment = ['alignLeft', 'alignRight', 'alignCenter'];
const list_types = ['orderedList', 'unorderedList'];

export const sizeMap = {
  small: '0.75em',
  normal: '1em',
  medium: '1.75em',
  huge: '2.5em',
};
export const fontFamilyMap = {
  sans: 'Helvetica,Arial, sans serif',
  serif: 'Georgia, Times New Roaman,serif',
  monospace: 'Monaco, Courier New,monospace',
};

export const getNode = (editor, format) => {
  const { selection } = editor;
  if (!!selection) {
    const [node] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });
    return node;
  }

  return null;
};
export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = list_types.includes(format);
  const isIndent = alignment.includes(format);
  const isAligned = alignment.some((alignmentType) =>
    isBlockActive(editor, alignmentType)
  );

  /*If the node is already aligned and change in indent is called we should unwrap it first and split the node to prevent
    messy, nested DOM structure and bugs due to that.*/
  if (isAligned && isIndent) {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        alignment.includes(
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
        ),
      split: true,
    });
  }

  /* Wraping the nodes for alignment, to allow it to co-exist with other block level operations*/
  if (isIndent) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: [],
    });
    return;
  }
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      list_types.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (isList && !isActive) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: [],
    });
  }
};
export const addMarkData = (editor, data) => {
  Editor.addMark(editor, data.format, data.value);
};
export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

export const activeMark = (editor, format) => {
  const defaultMarkData = {
    color: 'black',
    bgColor: 'black',
    fontSize: 'normal',
    fontFamily: 'sans',
  };
  const marks = Editor.marks(editor);
  const defaultValue = defaultMarkData[format];
  return marks?.[format] ?? defaultValue;
};

export const getMarked = (leaf, children) => {
  if (leaf.bold) {
    children = <strong data-slate-type="bold">{children}</strong>;
  }

  if (leaf.code) {
    children = <code data-slate-type="code">{children}</code>;
  }

  if (leaf.italic) {
    children = <em data-slate-type="italic">{children}</em>;
  }
  if (leaf.strikethrough) {
    children = (
      <span
        data-slate-type="strikethrough"
        style={{ textDecoration: 'line-through' }}>
        {children}
      </span>
    );
  }
  if (leaf.underline) {
    children = <u data-slate-type="underline">{children}</u>;
  }
  if (leaf.superscript) {
    children = <sup data-slate-type="superscript">{children}</sup>;
  }
  if (leaf.subscript) {
    children = <sub data-slate-type="subscript">{children}</sub>;
  }
  if (leaf.color) {
    children = (
      <span
        data-slate-type="color"
        data-color={leaf.color}
        style={{ color: leaf.color }}>
        {children}
      </span>
    );
  }
  if (leaf.bgColor) {
    children = (
      <span
        data-slate-type="bgcolor"
        data-color={leaf.bgColor}
        style={{ backgroundColor: leaf.bgColor }}>
        {children}
      </span>
    );
  }
  if (leaf.fontSize) {
    const size = sizeMap[leaf.fontSize];
    children = (
      <span
        data-slate-type="fontSize"
        data-size={size}
        style={{ fontSize: size }}>
        {children}
      </span>
    );
  }
  if (leaf.fontFamily) {
    const family = fontFamilyMap[leaf.fontFamily];
    children = (
      <span
        data-slate-type="fontFamily"
        data-family={family}
        style={{ fontFamily: family }}>
        {children}
      </span>
    );
  }
  return children;
};

export const getBlock = (props, serialize = false) => {
  const { element, children } = props;

  // This is done to check if this method is called by editor or the serializing function
  const attributes = serialize ? {} : props.attributes;
  const { url, alt, width, height } = element;

  switch (element.type) {
    case 'headingOne':
      return (
        <h1 data-slate-type="headingOne" {...attributes} {...element.attr}>
          {children}
        </h1>
      );
    case 'headingTwo':
      return (
        <h2 data-slate-type="headingTwo" {...attributes} {...element.attr}>
          {children}
        </h2>
      );
    case 'headingThree':
      return (
        <h3 data-slate-type="headingThree" {...attributes} {...element.attr}>
          {children}
        </h3>
      );
    case 'blockquote':
      return (
        <blockquote
          data-slate-type="blockuote"
          {...attributes}
          {...element.attr}>
          {children}
        </blockquote>
      );
    case 'alignLeft':
      return (
        <div
          data-slate-type="alignLeft"
          style={{
            display: 'flex',
            alignItems: 'left',
            listStylePosition: 'inside',
            flexDirection: 'column',
          }}
          {...attributes}
          {...element.attr}>
          {children}
        </div>
      );
    case 'alignCenter':
      return (
        <div
          data-slate-type="alignCenter"
          style={{
            display: 'flex',
            alignItems: 'center',
            listStylePosition: 'inside',
            flexDirection: 'column',
          }}
          {...attributes}
          {...element.attr}>
          {children}
        </div>
      );
    case 'alignRight':
      return (
        <div
          data-slate-type="alignRight"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            listStylePosition: 'inside',
            flexDirection: 'column',
          }}
          {...attributes}
          {...element.attr}>
          {children}
        </div>
      );
    case 'list-item':
      return (
        <li data-slate-type="list-item" {...attributes} {...element.attr}>
          {children}
        </li>
      );
    case 'orderedList':
      return (
        <ol data-slate-type="orderedList" type="1" {...attributes}>
          {children}
        </ol>
      );
    case 'unorderedList':
      return (
        <ul data-slate-type="unorderedList" {...attributes}>
          {children}
        </ul>
      );
    case 'link':
      return serialize ? (
        <a data-slate-type="link" href={element.href} target={element.target}>
          {children}
        </a>
      ) : (
        <Link {...props} />
      );
    case 'table':
      return serialize ? (
        <table
          data-slate-type="table"
          style={{ width: `${width}px`, height: `${height}px` }}>
          <tbody {...element.attr}>{children}</tbody>
        </table>
      ) : (
        <Table {...props} />
      );
    case 'table-row':
      return (
        <tr data-slate-type="table-row" {...attributes}>
          {children}
        </tr>
      );
    case 'table-cell':
      return (
        <td data-slate-type="table-cell" {...element.attr} {...attributes}>
          {children}
        </td>
      );
    case 'image':
      return serialize ? (
        <img
          data-slate-type="image"
          src={url}
          alt={alt}
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      ) : (
        <Image {...props} />
      );
    case 'video':
      return serialize ? (
        <iframe
          data-slate-type="video"
          src={url}
          title={alt}
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      ) : (
        <Video {...props} />
      );

    case 'equation':
      const { inline, math } = element;
      return serialize ? (
        <div
          data-slate-type="equation"
          data-math={math}
          data-inline={inline}></div>
      ) : (
        <Equation {...props} />
      );
    case 'htmlCode':
      return serialize ? (
        <div data-slate-type="htmlCode" data-html-code={element.html}></div>
      ) : (
        <HtmlCode {...props} />
      );
    case 'editableHtmlCode':
      return serialize ? (
        <div
          data-slate-type="editableHtmlCode"
          data-slate-object={element.children}></div>
      ) : (
        <EditableHtmlCode {...props} />
      );
    case 'break':
      return <br />;
    default:
      return (
        <div data-slate-type="paragraph" {...element.attr} {...attributes}>
          {children}
        </div>
      );
  }
};
