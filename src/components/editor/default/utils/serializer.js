import { Text } from 'slate';
import {
  fontFamilyMap,
  getBlock,
  getMarked,
  sizeMap,
} from './SlateUtilityFunctions.js';
import { jsx } from 'slate-hyperscript';
import ReactDOMServer from 'react-dom/server';

const alignMap = {
  left: 'alignLeft',
  center: 'alignCenter',
  right: 'alignRight',
};
let regx = new RegExp('[a-z]+');
const leafElements = [
  'bold',
  'italic',
  'code',
  'strikethrough',
  'underline',
  'subscript',
  'superscript',
  'color',
  'bgColor',
  'fontSize',
  'fontFamily',
];
// const attributeElements = ['link','image','video','equation','htmlCode','editableHtmlCode']
const extractParaIndent = (el) => {
  const alignment = el.style.textAlign;

  if (alignment) {
    return {
      type: alignMap[alignment],
    };
  }
  return {
    type: 'paragraph',
  };
};
const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};
const handleEmbedTag = (el, format) => {
  let width = format === 'image' ? el.style.width : el.getAttribute('width');
  let height = format === 'image' ? el.style.height : el.getAttribute('height');

  //The image size is given in [0-9*]px format while video size is given in [0-9*] or both as 'auto'
  //Removing the text keeping only the number.
  width = regx[Symbol.replace](width, '');
  height = regx[Symbol.replace](height, '');

  return {
    type: format,
    url: el.getAttribute('src'),
    alt: el.getAttribute('alt'),
    width,
    height,
  };
};
const ELEMENT_TAGS = {
  A: (el) => ({
    type: 'link',
    href: el.getAttribute('href'),
    target: el.getAttribute('target'),
  }),
  BLOCKQUOTE: () => ({ type: 'blockquote' }),
  H1: () => ({ type: 'headingOne' }),
  H2: () => ({ type: 'headingTwo' }),
  H3: () => ({ type: 'headingThree' }),
  EMBED: handleEmbedTag,
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'orderedList' }),
  P: extractParaIndent,
  DIV: extractParaIndent,
  BR: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'unorderedList' }),
  LATEX: (el) => ({
    type: 'equation',
    inline: true,
    math: el.getAttribute('math'),
  }),
  BLOCKLATEX: (el) => ({
    type: 'equation',
    inline: false,
    math: el.getAttribute('math'),
  }),
  // TABLE: () => ({type:'table'}),
  // TR: () => ({type:'table-row'}),
  // TD: () => ({type:'table-cell'})
};

const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
  SUP: () => ({ superscript: true }),
  SUB: () => ({ subscript: true }),
  // BR: () => ({text:'\n'})
};

const getSlateObject = (el, type) => {
  let attr = { type };
  const elemStyle = el.style;
  if (el.id) {
    attr.attr = {
      id: el.id,
    };
  }
  if (leafElements.includes(type)) {
    attr = {
      [type]: true,
    };
    switch (type) {
      case 'color':
        attr.color = elemStyle.color;
        break;
      case 'bgColor':
        attr.bgColor = elemStyle.backgroundColor;
        break;
      case 'fontSize':
        attr.fontSize = getKeyByValue(sizeMap, elemStyle.fontSize);
        break;
      case 'fontFamily':
        attr.fontFamily = getKeyByValue(fontFamilyMap, elemStyle.fontFamily);
        break;
      default:
        break;
    }
  } else {
    switch (type) {
      case 'link':
        attr.href = el.getAttribute('href');
        attr.target = el.getAttribute('target');
        break;
      case 'image':
        attr = handleEmbedTag(el, 'image');
        break;
      case 'video':
        attr = handleEmbedTag(el, 'video');
        break;
      case 'equation':
        const { math, inline } = el.dataset;
        attr.math = math;
        attr.inline = inline === 'true';
        break;
      case 'table':
        let { width, height } = elemStyle;
        attr.width = regx[Symbol.replace](width, '');
        attr.height = regx[Symbol.replace](height, '');
        break;
      case 'htmlCode':
        const { htmlCode } = el.dataset;
        attr.html = htmlCode;
        break;
      case 'editableHtmlCode':
        const { slateObject } = el.dataset;
        attr.children = JSON.parse(slateObject);
        break;
      default:
        break;
    }
  }
  return attr;
};
export const deserialize = (el) => {
  if (el.nodeType === 3) {
    return el.textContent.trim() ? el.textContent : null;
  } else if (el.nodeType !== 1) {
    return null;
  }

  const { nodeName } = el;
  let parent = el;

  // This deserializer can be used to handle pasted html in the future
  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0];
  }

  let children = Array.from(parent.childNodes).map(deserialize).flat();
  children = children.filter((elem) => !!elem);
  if (children.length === 0) {
    children = [{ text: ' ' }];
  }
  const slateType = el.dataset.slateType;

  if (!!slateType) {
    const slateAttr = getSlateObject(el, slateType);
    if (leafElements.includes(slateType)) {
      return children.map((child) => {
        return jsx('text', slateAttr, child);
      });
    }
    return jsx('element', slateAttr, children);
  }

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }
  if (nodeName === 'BR') {
    return '\n';
  }
  let elemTag = ELEMENT_TAGS[nodeName];
  let format = '';
  if (['IMG', 'IFRAME'].includes(nodeName)) {
    elemTag = ELEMENT_TAGS['EMBED'];
    format = nodeName === 'IMG' ? 'image' : 'video';
  }
  if (elemTag) {
    const attrs = elemTag(el, format);
    return jsx('element', attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => {
      return jsx('text', attrs, child);
    });
  }
  return children;
};

export const serialize = (node) => {
  if (Text.isText(node)) {
    let string = getMarked(node, node.text);
    return string;
  }
  const children = node.children.map((n) => serialize(n));
  if (!node.type) {
    return <>{children}</>;
  }
  let block = getBlock({ children, element: node }, true);
  return block;
};

export const getSerialized = (string) => {
  let slateObj = string;
  // console.log(string);
  try {
    slateObj = JSON.parse(slateObj);
    slateObj = ReactDOMServer.renderToStaticMarkup(serialize(slateObj));
  } catch (e) {}
  return slateObj;
};
