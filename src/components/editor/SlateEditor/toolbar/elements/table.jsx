import React, { useEffect, useRef, useState } from 'react';
import Button from '../button';
import Icon from '../icons';
import usePopup from '../hooks/usePopup';
import { Transforms } from 'slate';
import { TableUtil } from '../utils/table';
import { PopUpWrapper, PopUp, TableInput, TableUnit } from '../components';

const TableSelector = ({ editor }) => {
  const tableOptionsRef = useRef();
  const [selection, setSelection] = useState();
  const [showOptions, setShowOptions] = usePopup(tableOptionsRef);
  const [tableData, setTableData] = useState({
    row: 0,
    column: 0,
  });
  const [tableInput, setTableInput] = useState(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 6 }, (v, i) => ({
        bg: 'lightGray',
        column: i,
      }))
    )
  );

  useEffect(() => {
    const newTable = Array.from({ length: 6 }, (obj, row) =>
      Array.from({ length: 6 }, (v, col) => ({
        bg: row + 1 <= tableData.row && col + 1 <= tableData.column ? 'orange' : 'lightgray',
        column: col,
      }))
    );
    setTableInput(newTable);
  }, [tableData]);

  useEffect(() => {
    if (!showOptions) {
      setTableData({
        row: 0,
        column: 0,
      });
    }
  }, [showOptions]);

  const table = new TableUtil(editor);

  const handleButtonClick = () => {
    setSelection(editor.selection);
    setShowOptions((prev) => !prev);
  };

  const handleInsert = () => {
    selection && Transforms.select(editor, selection);
    table.insertTable(tableData.row, tableData.column);
    setShowOptions(false);
  };

  return (
    <PopUpWrapper ref={tableOptionsRef}>
      <Button active={showOptions} title='table' onClick={handleButtonClick}>
        <Icon icon='table' />
      </Button>
      {showOptions && (
        <PopUp className='p-2'>
          <strong>
            <i>{`Insert a ${tableData.row >= 1 ? `${tableData.row} x ${tableData.column}` : 'X x Y'} table`}</i>
          </strong>
          <div>
            <TableInput>
              {tableInput.map((grp, rowIndex) => (
                <div key={rowIndex}>

                  {grp.map(({ column, bg }, columnIndex) => (
                    <TableUnit
                      key={column}
                      onClick={handleInsert}
                      onMouseOver={() => setTableData({ row: rowIndex + 1, column: columnIndex + 1 })}
                      style={{ border: `1px solid ${bg}` }}
                    >
                      {/* Remove the cell reference */}
                    </TableUnit>
                  ))}
                </div>
              ))}
            </TableInput>
          </div>
        </PopUp>
      )}
    </PopUpWrapper>
  );
};

export default TableSelector;
