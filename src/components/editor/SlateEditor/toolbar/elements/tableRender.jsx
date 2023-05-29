import React, { useEffect } from 'react';
import { Transforms, Editor, Element as SlateElement } from 'slate';
import { useSelected, useFocused, useSlateStatic, ReactEditor } from 'slate-react';
// import Icon from '../icons';
// import Button from '../button';
import useResize from '../hooks/useResize';
import { Table as TableElement, Tbody } from 'components/table';
import {  TableContainer } from '../components';

const RenderTable = ({ attributes, children, element }) => {
  const { width, height } = element;
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  const [size, onMouseDown, resizing] = useResize(width, height);

  useEffect(() => {
    if (!resizing) {
      selected &&
        Transforms.setNodes(
          editor,
          { ...size },
          {
            match: (n) =>
              !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'table',
          }
        );
    }
  }, [resizing]);

  const deleteTable = () => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, { at: path, voids: true });
  };

  const addRow = () => {
    const path = ReactEditor.findPath(editor, element);
    const newRow = {
      type: 'table-row',
      children: Array.from({ length: element.children[0].children.length }, () => ({
        type: 'table-cell',
        children: [{ text: '' }],
      })),
    };
    Transforms.insertNodes(editor, newRow, { at: path.concat(element.children.length) });
  };

  const addColumn = () => {
    const path = ReactEditor.findPath(editor, element);
    const rowCount = element.children.length;

    for (let i = 0; i < rowCount; i++) {
      const rowPath = path.concat(i);
      const cellPath = rowPath.concat(element.children[i].children.length);

      const newCell = {
        type: 'table-cell',
        children: [{ text: '' }],
      };

      Transforms.insertNodes(editor, newCell, {
        at: cellPath,
      });
    }
  };
  const deleteRow = (rowIndex) => {
    const path = ReactEditor.findPath(editor, element);
    const rowPath = path.concat(rowIndex);
    Transforms.removeNodes(editor, { at: rowPath, voids: true });
  };

  const deleteColumn = (columnIndex) => {
    const path = ReactEditor.findPath(editor, element);
    const rowCount = element.children.length;

    for (let i = 0; i < rowCount; i++) {
      const rowPath = path.concat(i);
      const cellPath = rowPath.concat(columnIndex);
      Transforms.removeNodes(editor, { at: cellPath, voids: true });
    }
  };

  return (
    <TableContainer
      {...attributes}
      style={{
        minWidth: `${size.width}px`,
        position: 'relative',
        display: 'initial',
      }}
    >
      <TableElement bordered="true">
        <Tbody {...attributes}>{children}</Tbody>
      </TableElement>
    </TableContainer>
  );
};

export default RenderTable;
