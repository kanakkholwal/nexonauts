import React, { useState } from 'react';
import useContextMenu from '../hooks/useContextMenu';
import Icon from '../icons';
import { TableUtil } from '../utils/table';
import { Transforms } from 'slate';
import { ContextMenuWrapper, ContextMenuItem } from '../components';

export default function TableContextMenu({ editor }) {
  const [selection, setSelection] = useState(null);
  const [showMenu, { top, left }] = useContextMenu(editor, 'table', setSelection);
  const table = new TableUtil(editor);

  const menu = [
    // {
    //   icon: 'insertColumnRight',
    //   text: 'Insert Columns to the Right',
    //   action: {
    //     type: 'insertColumn',
    //     position: 'after',
    //   },
    // },
    // {
    //   icon: 'insertColumnLeft',
    //   text: 'Insert Columns to the Left',
    //   action: {
    //     type: 'insertColumn',
    //     position: 'at',
    //   },
    // },
    // {
    //   icon: 'removeColumn',
    //   text: 'Remove the current Column',
    //   action: {
    //     type: 'removeColumn',
    //   },
    // },
    {
      icon: 'insertRowAbove',
      text: 'Insert Row Above',
      action: {
        type: 'insertRow',
        position: 'at',
      },
    },
    {
      icon: 'insertRowBelow',
      text: 'Insert Row Below',
      action: {
        type: 'insertRow',
        position: 'after',
      },
    },
    {
      icon: 'removeRow',
      text: 'Remove the current Row',
      action: {
        type: 'removeRow',
      },
    },
    {
      icon: 'delete',
      text: 'Remove Table',
      action: {
        type: 'remove',
      },
    },
  ];

  const handleInsert = ({ type, position }) => {
    if (!editor || !selection) {
      return; // Handle edge case: editor or selection is missing
    }

    Transforms.select(editor, selection ?? editor.selection);

    switch (type) {
      case 'insertRow':
        table.modifyCells('insert', 'row', position);
        break;
      case 'insertColumn':
        table.modifyCells('insert', 'column', position);
        break;
      case 'remove':
        table.removeTable();
        break;
      case 'removeRow':
        table.modifyCells('remove', 'row', 'at');
        break;
      case 'removeColumn':
        table.modifyCells('remove', 'column', 'at');
        break;
      default:
        return;
    }
  };

  return (
    showMenu && (
      <ContextMenuWrapper className={showMenu ? 'isOpen' : ''} style={{ '--top': top, '--left': left }}>
        {menu.map(({ icon, text, action }, index) => (
          <ContextMenuItem size="sm" key={index} onClick={() => handleInsert(action)}>
            <Icon icon={icon} />
            <span>{text}</span>
          </ContextMenuItem>
        ))}
      </ContextMenuWrapper>
    )
  );
}
