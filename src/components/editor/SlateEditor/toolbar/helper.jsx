// ./slate/helper.jsx
import { Editor, Transforms, Element as SlateElement, Range, Path } from 'slate';
import { useSlate } from 'slate-react';
import Link from "./elements/unLinkButton";
// import Video from "./elements/videoRender";
import TableComponent from "./elements/tableRender";
import HtmlCode from "./elements/html2code";
import Video from "./elements/video";
import Button from "./button"
import Icon from "./icons";
import Image from "next/image";
// import { Table as TableElement } from 'components/table';

const TableCell = ({ attributes, children }) => {
  return <td {...attributes}>{children}</td>;
};

const TableRow = ({ attributes, children }) => {
  return <tr {...attributes}>{children}</tr>;
};

// const Table = ({ attributes, children }) => {
//   return <TableElement {...attributes}>{children}</TableElement>;
// };

const TEXT_ALIGN_TYPES = ['alignLeft', 'alignRight', 'alignCenter'];
const LIST_TYPES = ['orderedList', 'unorderedList'];
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
export const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
  
    // Handle heading cases
    if (format.startsWith('heading')) {
      const newProperties = {
        type: isActive ? 'paragraph' : format,
      };
      Transforms.setNodes(editor, newProperties);
      return;
    }
  
    const isList = LIST_TYPES.includes(format);
  
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    });
  
    let newProperties;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      };
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
      };
    }
  
    Transforms.setNodes(editor, newProperties);
  
    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };
  

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor

  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
    })
  )

  return !!match
}

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}
export const Element = (props) => {
  return getBlock(props);
};
export const getBlock = (props) => {
  const { element, children } = props;

  const serialize = props.serialize || false;
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
          data-slate-type="blockquote"
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
            style={{ width: `${width}px`, height: `${height}px` }}
            {...element.attr}
          >
            <tbody {...attributes}>{children}</tbody>
          </table>
        ) : (
          <TableComponent attributes={attributes} {...props}>
            {children}
          </TableComponent>
        );
      case 'table-row':
        return serialize ? (
          <tr data-slate-type="table-row" {...attributes}>
            {children}
          </tr>
        ) : (
          <TableRow attributes={attributes} {...props}>
            {children}
          </TableRow>
        );
      case 'table-cell':
        return serialize ? (
          <td
            data-slate-type="table-cell"
            {...element.attr}
            {...attributes}
          >
            {children}
          </td>
        ) : (
          <TableCell attributes={attributes} {...props}>
            {children}
          </TableCell>
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
        <Image  data-slate-type="image"
        src={url}
        alt={alt}
        width={width}
        height={height} />
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
} 

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
export const Leaf = ({ attributes, children, leaf }) => {
  children = getMarked(leaf, children);
  return <span {...attributes}>{children}</span>;
};

export const BlockButton = ({ format, icon }) => {
  const editor = useSlate()

  return (
    <Button
      active={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon icon={icon} />
    </Button>
  )
}

export const MarkButton = ({ format, icon }) => {
  const editor = useSlate()

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon icon={icon} />
    </Button>
  )
}


const wrapLink = (editor, url, targetBlank, noReferrer) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
    target: targetBlank ? '_blank' : null,
    rel: noReferrer ? 'noreferrer' : null,
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};




export const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === 'link' });
  return !!link;
};

export const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === 'link' });
};

export const isSelectionInLink = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) => n.type === 'link',
    mode: 'lowest',
  });
  return !!link;
};

export const isSelectionAcrossLink = (editor) => {
  if (!editor.selection) return false;
  const [startNode] = Editor.nodes(editor, {
    match: (n) => n.type === 'link',
    mode: 'lowest',
  });
  const [endNode] = Editor.nodes(editor, {
    match: (n) => n.type === 'link',
    mode: 'highest',
  });
  return !Path.equals(startNode[1], endNode[1]);
};

export const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      if (isSelectionInLink(editor) || isSelectionAcrossLink(editor)) {
        unwrapLink(editor);
      }
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      if (isSelectionInLink(editor) || isSelectionAcrossLink(editor)) {
        unwrapLink(editor);
      }
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const createLinkNode = (href,showInNewTab,noReferrer,text) =>(
    {
        type:'link',
        href,
        target:showInNewTab ? '_blank': '_self',
        rel:noReferrer ? 'noreferrer': null,
        children:[{ text }]
    }
)
export const removeLink = (editor) =>{
  Transforms.unwrapNodes(editor,{
      match:n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link'
  })
};
export const insertLink = (editor,{url,showInNewTab})=>{
  if(!url) return;

  const { selection } = editor;
  const link = createLinkNode(url,showInNewTab,'Link');
  if(!!selection){
      const [parent, parentPath] = Editor.parent(editor,selection.focus.path);
      if(parent.type === 'link'){
          removeLink(editor);
      }

      
      if(editor.isVoid(parent)){
          Transforms.insertNodes(editor, 
              {type:'paragraph',children:[link]},
              {
                  at:Path.next(parentPath),
                  select:true
              }

          )
      }
      else if(Range.isCollapsed(selection)){
          Transforms.insertNodes(editor,link, {select:true});
      }
      else{
          Transforms.wrapNodes(editor,link,
              {split:true}
          )

      }
  }
  else{
      Transforms.insertNodes(editor,{type:'paragraph',children:[link]})
  }
};