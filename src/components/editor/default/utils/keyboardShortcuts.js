import { toggleMark } from '../utils/SlateUtilityFunctions.js';
import isHotkey from 'is-hotkey';

const isBoldKey = isHotkey('mod+b');
const isItalicKey = isHotkey('mod+i');
const isUnderlineKey = isHotkey('mod+u');
// const isLineKey = isHotkey('mod+d');

export const handleHotKey = (editor, e) => {
  e.preventDefault();
  let mark = '';
  if (isBoldKey(e)) {
    mark = 'bold';
  } else if (isItalicKey(e)) {
    mark = 'italic';
  } else if (isUnderlineKey(e)) {
    mark = 'underline';
  }
  // else if(isLineKey(e)){
  //     mark = 'strikethrough'
  // }
  !!mark && toggleMark(editor, mark);
};
